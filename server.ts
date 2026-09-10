import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  retrieveRelevantContext,
  detectLanguage,
  evaluateEmergencySafety,
  buildRAGPrompt,
  generateRAGFallbackResponse,
  generateEmbedding,
  cosineSimilarity,
} from './src/services/ragEngine';
import {
  HEALTH_KNOWLEDGE_CHUNKS,
  TRUSTED_SOURCES,
  VACCINE_SCHEDULE,
  NEARBY_CLINICS,
  OUTBREAK_ALERTS,
} from './src/data/healthKnowledgeBase';
import { Language } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client lazily and safely
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// ==========================================
// API ROUTES FIRST
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AI-FORCE Public Health API',
    ragChunksIndexed: HEALTH_KNOWLEDGE_CHUNKS.length,
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

/**
 * Main RAG Chatbot Endpoint
 * Executes:
 * 1. Query Preprocessing & Language Detection
 * 2. Emergency Red-Flag Safety Evaluation
 * 3. Semantic Vector Search & Context Retrieval
 * 4. Grounded Prompt Construction
 * 5. Gemini 3.8 Flash Generation (with automatic RAG fallback)
 * 6. Safety Verification & Source Citation Binding
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { query, language: selectedLanguage, conversationHistory } = req.body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const trimmedQuery = query.trim();

    // 1. Language determination (auto-detect if 'auto' or not specified, else use user choice)
    let lang: Language = 'en';
    if (selectedLanguage && ['en', 'hi', 'te'].includes(selectedLanguage)) {
      lang = selectedLanguage as Language;
    } else {
      lang = detectLanguage(trimmedQuery);
    }

    // 2. Safety & Emergency red-flag evaluation
    const safetyResult = evaluateEmergencySafety(trimmedQuery);

    // 3. RAG Retrieval from trusted knowledge base
    const retrievedResults = retrieveRelevantContext(trimmedQuery, lang, 3);
    const sources = retrievedResults.map(r => r.chunk.source).filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
    if (sources.length === 0) {
      sources.push(TRUSTED_SOURCES.MOHFW_NVBDCP);
    }

    const chunkSummary = retrievedResults.map(r => ({
      id: r.chunk.id,
      topic: r.chunk.diseaseOrTopic,
      score: r.similarityScore,
      sourceName: r.chunk.source.title,
    }));

    // 4. Try Gemini 3.8 Flash if API key is present
    const ai = getGenAI();
    let finalAnswer = '';
    let usedModel = 'rag-verified-knowledge-base';

    if (ai) {
      try {
        const { systemInstruction, userPrompt } = buildRAGPrompt(trimmedQuery, retrievedResults, lang);
        
        const geminiResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.2, // Low temperature for high factual accuracy and adherence to medical context
          },
        });

        if (geminiResponse && geminiResponse.text) {
          finalAnswer = geminiResponse.text;
          usedModel = 'gemini-3.8-flash';
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed or rate-limited; switching to verified RAG fallback:', geminiError);
      }
    }

    // 5. If Gemini was not used or didn't return text, use structured RAG response
    if (!finalAnswer) {
      const fallback = generateRAGFallbackResponse(trimmedQuery, retrievedResults, lang);
      finalAnswer = fallback.responseText;
    }

    // 6. Append safety warning if emergency flags were detected
    let emergencyActions: string[] = [];
    if (safetyResult.isEmergency) {
      emergencyActions = [
        'Call 108 Emergency Ambulance immediately',
        'Contact Village ASHA worker or Community Health Officer',
        'Reach the nearest 24x7 Community Health Centre (CHC) or District Hospital',
      ];
    }

    return res.json({
      text: finalAnswer,
      detectedLanguage: lang,
      sources,
      retrievedChunks: chunkSummary,
      isEmergencyAlert: safetyResult.isEmergency,
      emergencyFlags: safetyResult.emergencyFlags,
      emergencyActions,
      usedModel,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'An error occurred while processing the health query.',
      details: error?.message,
    });
  }
});

/**
 * Get all indexed RAG documents & chunk statistics
 */
app.get('/api/rag/documents', (req, res) => {
  res.json({
    totalChunks: HEALTH_KNOWLEDGE_CHUNKS.length,
    trustedOrganizations: [
      'Ministry of Health and Family Welfare (MoHFW), Govt of India',
      'World Health Organization (WHO)',
      'Indian Council of Medical Research (ICMR)',
      'National Vector Borne Disease Control Programme (NVBDCP)',
      'Universal Immunization Programme (UIP)',
    ],
    documents: HEALTH_KNOWLEDGE_CHUNKS.map(chunk => ({
      id: chunk.id,
      topic: chunk.diseaseOrTopic,
      category: chunk.category,
      source: chunk.source,
      keywords: chunk.keywords,
      symptomsCount: chunk.symptoms.length,
      preventionCount: chunk.prevention.length,
      warningSignsCount: chunk.warningSigns.length,
      contentEnSnippet: chunk.contentEn.substring(0, 160) + '...',
      contentHiSnippet: chunk.contentHi.substring(0, 140) + '...',
      contentTeSnippet: chunk.contentTe.substring(0, 140) + '...',
    })),
  });
});

/**
 * Semantic Vector Search Tester (for Hackathon Judges)
 */
app.post('/api/rag/search', (req, res) => {
  const { query, language } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const lang: Language = (language as Language) || detectLanguage(query);
  const results = retrieveRelevantContext(query, lang, 5);

  const queryVector = generateEmbedding(query);

  res.json({
    query,
    detectedLanguage: lang,
    queryVectorSample: queryVector.slice(0, 8),
    vectorDimensions: queryVector.length,
    results: results.map(r => ({
      chunkId: r.chunk.id,
      topic: r.chunk.diseaseOrTopic,
      category: r.chunk.category,
      similarityScore: r.similarityScore,
      matchedKeywords: r.matchedKeywords,
      source: r.chunk.source,
      contentSnippet: (lang === 'hi' ? r.chunk.contentHi : lang === 'te' ? r.chunk.contentTe : r.chunk.contentEn).substring(0, 200) + '...',
    })),
  });
});

/**
 * Outbreak Alerts Endpoint
 */
app.get('/api/alerts', (req, res) => {
  res.json(OUTBREAK_ALERTS);
});

/**
 * Nearby Clinics & Facilities Endpoint
 */
app.get('/api/clinics', (req, res) => {
  const { district, type } = req.query;
  let facilities = [...NEARBY_CLINICS];

  if (district) {
    facilities = facilities.filter(f => f.district.toLowerCase().includes(String(district).toLowerCase()));
  }
  if (type) {
    facilities = facilities.filter(f => f.type === type);
  }

  res.json(facilities);
});

/**
 * Vaccines Schedule Endpoint
 */
app.get('/api/vaccines', (req, res) => {
  res.json(VACCINE_SCHEDULE);
});

// ==========================================
// Vite Middleware / Static Serving
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
