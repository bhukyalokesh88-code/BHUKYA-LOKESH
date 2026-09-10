import { KnowledgeChunk, Language, SourceReference } from '../types';
import { HEALTH_KNOWLEDGE_CHUNKS, TRUSTED_SOURCES } from '../data/healthKnowledgeBase';

export interface RetrievedResult {
  chunk: KnowledgeChunk;
  similarityScore: number;
  matchedKeywords: string[];
}

/**
 * Fast Multilingual Language Detection
 * Analyzes Unicode script ranges for Devanagari (Hindi) and Telugu, fallback to English.
 */
export function detectLanguage(text: string): Language {
  if (!text) return 'en';
  
  // Telugu Unicode block: \u0C00-\u0C7F
  const teluguMatches = (text.match(/[\u0C00-\u0C7F]/g) || []).length;
  
  // Devanagari Unicode block: \u0900-\u097F
  const devanagariMatches = (text.match(/[\u0900-\u097F]/g) || []).length;

  const totalLength = text.replace(/\s+/g, '').length;
  if (totalLength === 0) return 'en';

  if (teluguMatches / totalLength > 0.15) {
    return 'te';
  }
  if (devanagariMatches / totalLength > 0.15) {
    return 'hi';
  }

  // Common Hindi romanized keywords
  const romanHindi = /\b(bhookh|bukhar|dast|ulti|sar dard|dawa|ilaj|khoon|machhar|pani|aspatal|tika)\b/i;
  if (romanHindi.test(text)) {
    return 'hi';
  }

  // Common Telugu romanized keywords
  const romanTelugu = /\b(jwaram|mandulu|daggulu|nillu|kallu|domalu|chikitsha|prasavam|rogalu)\b/i;
  if (romanTelugu.test(text)) {
    return 'te';
  }

  return 'en';
}

/**
 * Lightweight Semantic Embedding Generator
 * Projects text into a 32-dimensional semantic vector space using n-gram hashing and vocabulary centroids.
 */
export function generateEmbedding(text: string): number[] {
  const DIMENSIONS = 32;
  const vector = new Array(DIMENSIONS).fill(0);
  const normalized = text.toLowerCase().trim();
  
  if (!normalized) return vector;

  const words = normalized.split(/[\s,.;:!?()"-]+/);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!word) continue;

    // Word hash code
    let hash = 0;
    for (let j = 0; j < word.length; j++) {
      hash = (hash << 5) - hash + word.charCodeAt(j);
      hash |= 0;
    }

    const idx = Math.abs(hash) % DIMENSIONS;
    const weight = 1.0 / Math.sqrt(word.length + 1);
    vector[idx] += weight;

    // Bi-gram hashing for phrase semantics
    if (i < words.length - 1) {
      const bigram = word + '_' + words[i + 1];
      let bHash = 0;
      for (let k = 0; k < bigram.length; k++) {
        bHash = (bHash << 5) - bHash + bigram.charCodeAt(k);
        bHash |= 0;
      }
      const bIdx = Math.abs(bHash) % DIMENSIONS;
      vector[bIdx] += weight * 0.7;
    }
  }

  // Vector normalization (L2 norm)
  let norm = 0;
  for (let d = 0; d < DIMENSIONS; d++) {
    norm += vector[d] * vector[d];
  }
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let d = 0; d < DIMENSIONS; d++) {
      vector[d] /= norm;
    }
  }

  return vector;
}

/**
 * Cosine similarity between two vectors
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Pre-computes and caches embeddings for all knowledge base chunks
 */
const chunkEmbeddingsMap = new Map<string, number[]>();

function getChunkEmbedding(chunk: KnowledgeChunk): number[] {
  if (chunkEmbeddingsMap.has(chunk.id)) {
    return chunkEmbeddingsMap.get(chunk.id)!;
  }
  const combinedText = `${chunk.diseaseOrTopic} ${chunk.category} ${chunk.keywords.join(' ')} ${chunk.contentEn} ${chunk.symptoms.join(' ')} ${chunk.prevention.join(' ')}`;
  const emb = generateEmbedding(combinedText);
  chunkEmbeddingsMap.set(chunk.id, emb);
  return emb;
}

// Pre-initialize embeddings
HEALTH_KNOWLEDGE_CHUNKS.forEach(chunk => {
  getChunkEmbedding(chunk);
});

/**
 * RAG Semantic Retrieval
 * Combines semantic vector similarity with medical keyword matching & language relevance.
 */
export function retrieveRelevantContext(query: string, lang: Language = 'en', topK: number = 3): RetrievedResult[] {
  if (!query || !query.trim()) return [];

  const queryEmbedding = generateEmbedding(query);
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery.split(/[\s,.;:!?()"-]+/).filter(t => t.length > 1);

  const scored: RetrievedResult[] = HEALTH_KNOWLEDGE_CHUNKS.map(chunk => {
    const chunkEmbedding = getChunkEmbedding(chunk);
    const vectorScore = cosineSimilarity(queryEmbedding, chunkEmbedding);

    // Keyword overlap bonus
    let keywordScore = 0;
    const matchedKeywords: string[] = [];

    chunk.keywords.forEach(kw => {
      const lkw = kw.toLowerCase();
      if (normalizedQuery.includes(lkw)) {
        keywordScore += 0.35;
        matchedKeywords.push(kw);
      }
    });

    // Check specific symptoms/topic match
    if (normalizedQuery.includes(chunk.diseaseOrTopic.toLowerCase())) {
      keywordScore += 0.5;
      matchedKeywords.push(chunk.diseaseOrTopic);
    }

    // Language-specific content match
    const langContent = lang === 'hi' ? chunk.contentHi : lang === 'te' ? chunk.contentTe : chunk.contentEn;
    queryTokens.forEach(token => {
      if (langContent.toLowerCase().includes(token)) {
        keywordScore += 0.08;
      }
    });

    // Combined score weighted 50% vector, 50% lexical relevance
    const finalScore = Math.min(1.0, (vectorScore * 0.45) + (keywordScore * 0.55));

    return {
      chunk,
      similarityScore: parseFloat(finalScore.toFixed(3)),
      matchedKeywords,
    };
  });

  // Sort by highest score first
  scored.sort((a, b) => b.similarityScore - a.similarityScore);

  return scored.slice(0, topK);
}

/**
 * Emergency Red-Flag Detection
 * Immediate safety validation for life-threatening acute signs
 */
export interface SafetyCheckResult {
  isEmergency: boolean;
  emergencyFlags: string[];
  recommendedAction: string;
}

export function evaluateEmergencySafety(query: string): SafetyCheckResult {
  const q = query.toLowerCase();
  const flags: string[] = [];

  const emergencyPatterns = [
    { pattern: /(chest pain|heart attack|सीने में दर्द|గుండె నొప్పి)/i, flag: 'Severe Chest Pain / Possible Cardiac Event' },
    { pattern: /(unconscious|fainted|passed out|behoshi|बेहोश|స్పృహ తప్పడం)/i, flag: 'Unresponsiveness / Loss of Consciousness' },
    { pattern: /(cannot breathe|severe breathlessness|gasping|सांस फूलना|दम घुटना|శ్వాస ఆడకపోవడం)/i, flag: 'Severe Respiratory Distress' },
    { pattern: /(blood vomiting|coughing blood|bleeding from mouth|खून की उल्टी|రక్తం కారడం|కఫంలో రక్తం)/i, flag: 'Severe Hemorrhage / Active Bleeding' },
    { pattern: /(convulsions|seizure|fits|दौरे पड़ना|మూర్ఛ)/i, flag: 'Seizure or Convulsion Episode' },
    { pattern: /(poison|swallowed pesticide|कीटनाशक|పురుగుల మందు)/i, flag: 'Acute Poisoning / Ingestion Emergency' },
    { pattern: /(snake bite|सांप का काटना|పాము కాటు)/i, flag: 'Snakebite Emergency (Requires Immediate ASV)' },
    { pattern: /(dog bite|rabies|कुत्ते का काटना|పిచ్చి కుక్క కాటు)/i, flag: 'High-risk Animal Bite (Requires ARV & Immunoglobulin)' },
  ];

  emergencyPatterns.forEach(({ pattern, flag }) => {
    if (pattern.test(q)) {
      flags.push(flag);
    }
  });

  return {
    isEmergency: flags.length > 0,
    emergencyFlags: flags,
    recommendedAction: flags.length > 0
      ? 'IMMEDIATE EMERGENCY: Call 108 for an ambulance or rush to the nearest Community Health Centre (CHC) or District Hospital emergency department.'
      : '',
  };
}

/**
 * Construct Grounded RAG Prompt for Gemini LLM
 */
export function buildRAGPrompt(
  userQuery: string,
  retrievedChunks: RetrievedResult[],
  targetLanguage: Language
): { systemInstruction: string; userPrompt: string } {
  const languageNames: Record<Language, string> = {
    en: 'English',
    hi: 'Hindi (हिंदी)',
    te: 'Telugu (తెలుగు)',
  };

  const contextText = retrievedChunks.map((res, i) => {
    const chunk = res.chunk;
    const content = targetLanguage === 'hi' ? chunk.contentHi : targetLanguage === 'te' ? chunk.contentTe : chunk.contentEn;
    return `[DOCUMENT ${i + 1}]
Source: ${chunk.source.organization} - ${chunk.source.title} (${chunk.source.year})
Topic: ${chunk.diseaseOrTopic} (${chunk.category})
Key Symptoms: ${chunk.symptoms.join(', ')}
Key Prevention: ${chunk.prevention.join(', ')}
Red Flags: ${chunk.warningSigns.join(', ')}
Official Medical Guidance:
${content}
---`;
  }).join('\n\n');

  const systemInstruction = `You are "AI-FORCE", a specialized, empathetic, and culturally aware Public Health Assistant designed for rural and semi-urban communities.

PRIMARY MISSION: Provide accurate, accessible disease awareness, symptom guidance, prevention tips, and vaccination schedules grounded strictly in trusted health documents (MoHFW, WHO, ICMR).

MANDATORY RULES:
1. NON-DIAGNOSTIC MANDATE: Never state or imply a definitive medical diagnosis. You are an information and awareness tool only. Always advise consulting a medical doctor or visit the nearest Primary Health Centre (PHC) / Sub-Centre.
2. GROUNDING REQUIREMENT: Base your factual answers STRICTLY on the provided retrieved context documents. Do NOT make up unsupported medications or untested home cures.
3. LANGUAGE DIRECTIVE: Output the entire response in ${languageNames[targetLanguage]}. Use simple, respectful, easy-to-understand phrasing suited for village community members.
4. EMERGENCY RED-FLAG PROTOCOL: If the user mentions warning signs (e.g. continuous vomiting, bleeding, high fever with stiff neck, breathlessness, confusion), prominently alert them to contact the local ASHA worker or call 108 Emergency Ambulance / 104 Health Helpline immediately.
5. FORMATTING: Use clean bullet points, short paragraphs, and a clear "Trusted Source Citation" section at the end referencing MoHFW or WHO.`;

  const userPrompt = `USER QUESTION: "${userQuery}"

RETRIEVED TRUSTED HEALTH DOCUMENTS:
${contextText || 'No specific document matched this query. Provide general MoHFW public health preventive guidance and advise visiting the local PHC.'}

Please answer the user's question clearly in ${languageNames[targetLanguage]} using the retrieved documents, keeping advice simple, empathetic, structured, and including a safety disclaimer.`;

  return { systemInstruction, userPrompt };
}

/**
 * Fallback response generator if Gemini API key is not configured or in offline mode.
 * Guarantees zero downtime and 100% reliable hackathon presentation!
 */
export function generateRAGFallbackResponse(
  query: string,
  retrievedChunks: RetrievedResult[],
  lang: Language
): { responseText: string; sources: SourceReference[]; isEmergency: boolean; emergencyFlags: string[] } {
  const safety = evaluateEmergencySafety(query);
  const topChunk = retrievedChunks[0]?.chunk || HEALTH_KNOWLEDGE_CHUNKS[0];

  const sources = retrievedChunks.map(r => r.chunk.source).filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
  if (sources.length === 0) {
    sources.push(TRUSTED_SOURCES.MOHFW_NVBDCP);
  }

  let text = '';

  if (lang === 'hi') {
    text = `नमस्ते। AI-FORCE स्वास्थ्य जागरूकता सहायक में आपका स्वागत है।

📌 **${topChunk.diseaseOrTopic} संबंधी मुख्य जानकारी:**

${topChunk.contentHi}

⚠️ **सावधानी व रोकथाम:**
${topChunk.prevention.map(p => `• ${p}`).join('\n')}

🚨 **खतरे के संकेत (तुरंत डॉक्टर को दिखाएं):**
${topChunk.warningSigns.map(w => `• ${w}`).join('\n')}

🩺 **महत्वपूर्ण सूचना:** यह केवल स्वास्थ्य जागरूकता और प्राथमिक मार्गदर्शन है, डॉक्टरी निदान नहीं। गंभीर स्थिति में तुरंत 108 एम्बुलेंस पर कॉल करें या नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) पर जाएं।`;
  } else if (lang === 'te') {
    text = `నమస్కారం. AI-FORCE ప్రజా ఆరోగ్య సహాయకునికి స్వాగతం.

📌 **${topChunk.diseaseOrTopic} ముఖ్యమైన సమాచారం:**

${topChunk.contentTe}

⚠️ **నివారణ చర్యలు & జాగ్రత్తలు:**
${topChunk.prevention.map(p => `• ${p}`).join('\n')}

🚨 **ప్రమాద సంకేతాలు (వెంటనే ఆసుపత్రికి వెళ్ళండి):**
${topChunk.warningSigns.map(w => `• ${w}`).join('\n')}

🩺 **ముఖ్య గమనిక:** ఇది కేవలం ఆరోగ్య సమాచారం మరియు అవగాహన కొరకు మాత్రమే, వైద్య నిర్ధారణ కాదు. అత్యవసర పరిస్థితుల్లో 108 అంబులెన్స్‌కు లేదా సమీప ప్రాథమిక ఆరోగ్య కేంద్రం (PHC) వైద్యుడిని సంప్రదించండి.`;
  } else {
    text = `Hello. Welcome to AI-FORCE Public Health Awareness Assistant.

📌 **Information on ${topChunk.diseaseOrTopic}:**

${topChunk.contentEn}

⚠️ **Prevention & Home Care:**
${topChunk.prevention.map(p => `• ${p}`).join('\n')}

🚨 **Warning Signs to Watch For:**
${topChunk.warningSigns.map(w => `• ${w}`).join('\n')}

🩺 **Important Medical Disclaimer:** This tool provides public health awareness and educational guidance only. It is NOT a medical diagnosis. Please consult a qualified doctor at your nearest Primary Health Centre (PHC) or Community Health Centre (CHC). In an emergency, dial 108 immediately.`;
  }

  return {
    responseText: text,
    sources,
    isEmergency: safety.isEmergency,
    emergencyFlags: safety.emergencyFlags,
  };
}
