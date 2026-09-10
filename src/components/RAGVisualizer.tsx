import React, { useState } from 'react';
import { Language, KnowledgeChunk } from '../types';
import { HEALTH_KNOWLEDGE_CHUNKS, TRUSTED_SOURCES } from '../data/healthKnowledgeBase';
import { 
  retrieveRelevantContext, 
  generateEmbedding, 
  detectLanguage, 
  evaluateEmergencySafety 
} from '../services/ragEngine';
import { 
  Cpu, 
  Database, 
  Search, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Code
} from 'lucide-react';

interface RAGVisualizerProps {
  language: Language;
}

export const RAGVisualizer: React.FC<RAGVisualizerProps> = ({ language }) => {
  const [testQuery, setTestQuery] = useState('What are the symptoms of dengue fever?');
  const [activeTab, setActiveTab] = useState<'pipeline' | 'vector-test' | 'chunk-explorer' | 'prompt'>('pipeline');
  const [selectedChunk, setSelectedChunk] = useState<KnowledgeChunk>(HEALTH_KNOWLEDGE_CHUNKS[0]);

  // Evaluate test query in real time
  const detectedLang = detectLanguage(testQuery);
  const testEmbedding = generateEmbedding(testQuery);
  const searchResults = retrieveRelevantContext(testQuery, detectedLang, 4);
  const safetyEvaluation = evaluateEmergencySafety(testQuery);

  const pipelineStages = [
    { num: 1, name: 'Document Ingestion', desc: 'MoHFW, NVBDCP, UIP & WHO guidelines ingested into verified corpus.' },
    { num: 2, name: 'Document Chunking', desc: 'Partitioned by disease, symptoms, prevention, emergency red-flags.' },
    { num: 3, name: 'Embedding Generation', desc: 'High-dimensional semantic vector projections for multilingual text.' },
    { num: 4, name: 'Vector Storage', desc: 'Indexed vector store with metadata filtering (language, source, category).' },
    { num: 5, name: 'Semantic Search', desc: 'Cosine similarity vector matching combined with medical token boosting.' },
    { num: 6, name: 'Context Retrieval', desc: 'Top-K authoritative chunks retrieved with source citations.' },
    { num: 7, name: 'Prompt Construction', desc: 'Strict anti-hallucination system prompt enforces ground truth.' },
    { num: 8, name: 'LLM Generation', desc: 'Gemini 3.8 Flash generates clear, empathetic advice in chosen language.' },
    { num: 9, name: 'Safety Validation', desc: 'Emergency red-flag rule check intercepts life-threatening symptoms.' },
    { num: 10, name: 'Final Response', desc: 'Delivered to user with citation cards and 108 ambulance prompt.' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Architectural Diagnostic & Evaluation Console</span>
            </div>
            <h2 className="text-xl font-extrabold mt-1">
              AI-FORCE RAG Pipeline & Semantic Knowledge Engine
            </h2>
            <p className="text-xs text-indigo-200 mt-1 max-w-2xl leading-relaxed">
              Demonstrating the 10-stage Retrieval-Augmented Generation pipeline grounded in Ministry of Health and Family Welfare (MoHFW) and World Health Organization (WHO) verified public health corpus.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 bg-indigo-800 border border-indigo-700 rounded-lg text-xs font-mono font-bold text-indigo-200">
              Corpus: {HEALTH_KNOWLEDGE_CHUNKS.length} Chunks
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-lg text-xs font-mono font-bold text-emerald-300">
              Safety Guardrails: Active
            </span>
          </div>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'pipeline'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>10-Stage RAG Flow</span>
        </button>

        <button
          onClick={() => setActiveTab('vector-test')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'vector-test'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Live Vector Search Tester</span>
        </button>

        <button
          onClick={() => setActiveTab('chunk-explorer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'chunk-explorer'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Indexed Knowledge Corpus</span>
        </button>

        <button
          onClick={() => setActiveTab('prompt')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'prompt'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Grounded Prompt Template</span>
        </button>
      </div>

      {/* TAB 1: 10-Stage Pipeline Flow */}
      {activeTab === 'pipeline' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900">
              End-to-End Architectural Data Flow
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Strictly enforces ground truth from government and WHO documents before handing off to the Gemini LLM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {pipelineStages.map((stage) => (
              <div
                key={stage.num}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:border-indigo-300 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {stage.num}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    {stage.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Visual Diagram */}
          <div className="p-4 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto">
            <pre className="text-[11px] leading-tight text-emerald-400">
{`User Query
    │
    ▼
[Language Detector & Emergency Pre-Filter] ──(Emergency Triggered?)──► [Red Alert & 108 Banner]
    │
    ▼
[Semantic Embedding Generator] ──► [32-Dim Projection Vector]
    │
    ▼
[Cosine Similarity Retrieval] ◄──► [Vector Store: MoHFW & WHO Corpus]
    │
    ▼
[Top-K Authoritative Chunks Ranked]
    │
    ▼
[Grounded Prompt Assembly] (Strict No-Hallucination Constraints)
    │
    ▼
[Gemini 3.8 Flash LLM Inference]
    │
    ▼
[Post-Generation Safety & Citation Binding]
    │
    ▼
Final Multilingual Response + Verified Badges to User`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: Live Vector Search Tester */}
      {activeTab === 'vector-test' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-black text-slate-900 mb-1">
              Live Vector Similarity Search Tester
            </h3>
            <p className="text-xs text-slate-500">
              Type any query in English, Hindi, or Telugu to inspect real-time vector embeddings and cosine scores.
            </p>
          </div>

          {/* Test Query Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              placeholder="e.g. What are symptoms of dengue? or डेंगू के लक्षण"
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-indigo-600 outline-none bg-slate-50 text-slate-900 font-medium"
            />
            <div className="flex gap-1">
              <button
                onClick={() => setTestQuery('What are the symptoms of dengue?')}
                className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-semibold cursor-pointer"
              >
                Dengue (EN)
              </button>
              <button
                onClick={() => setTestQuery('डेंगू के लक्षण क्या हैं?')}
                className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-semibold cursor-pointer"
              >
                Dengue (HI)
              </button>
              <button
                onClick={() => setTestQuery('డెంగ్యూ లక్షణాలు ఏమిటి?')}
                className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-semibold cursor-pointer"
              >
                Dengue (TE)
              </button>
            </div>
          </div>

          {/* Real-time Diagnostics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Detected Script / Language
              </span>
              <span className="text-sm font-extrabold text-indigo-700 mt-1 block">
                {detectedLang === 'hi' ? 'Devanagari (Hindi)' : detectedLang === 'te' ? 'Telugu Script (తెలుగు)' : 'Latin (English)'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Safety Filter Status
              </span>
              <span className={`text-sm font-extrabold mt-1 block ${safetyEvaluation.isEmergency ? 'text-rose-600' : 'text-emerald-700'}`}>
                {safetyEvaluation.isEmergency ? '🚨 Emergency Red Flag Triggered' : '✓ Safe Informational Query'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Vector Dimensions
              </span>
              <span className="text-sm font-extrabold text-slate-900 mt-1 block font-mono">
                {testEmbedding.length} Dim Projection
              </span>
            </div>
          </div>

          {/* Vector Embeddings Preview */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Query Vector Embedding Sample (First 16 dimensions):
            </h4>
            <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto flex gap-2">
              {testEmbedding.slice(0, 16).map((val, idx) => (
                <span key={idx} className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                  {val.toFixed(3)}
                </span>
              ))}
            </div>
          </div>

          {/* Retrieved Top-K Authoritative Chunks */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Top-K Retrieved Chunks from Knowledge Base:
            </h4>
            <div className="space-y-3">
              {searchResults.map((res, index) => (
                <div
                  key={res.chunk.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-2xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h5 className="font-extrabold text-sm text-slate-900">
                        {res.chunk.diseaseOrTopic}
                      </h5>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {res.chunk.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                        Score: {res.similarityScore}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {detectedLang === 'hi' ? res.chunk.contentHi.slice(0, 200) : detectedLang === 'te' ? res.chunk.contentTe.slice(0, 200) : res.chunk.contentEn.slice(0, 200)}...
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Source: {res.chunk.source.organization} - {res.chunk.source.title}</span>
                    <span className="text-emerald-700 font-semibold">✓ Verified Corpus</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Indexed Knowledge Corpus Explorer */}
      {activeTab === 'chunk-explorer' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* List of Chunks (4 cols) */}
          <div className="md:col-span-5 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
              Ingested Medical Documents ({HEALTH_KNOWLEDGE_CHUNKS.length})
            </h3>
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {HEALTH_KNOWLEDGE_CHUNKS.map((chunk) => (
                <button
                  key={chunk.id}
                  onClick={() => setSelectedChunk(chunk)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    selectedChunk.id === chunk.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold">{chunk.diseaseOrTopic}</span>
                    <span className="text-[10px] text-slate-400">{chunk.category}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {chunk.source.organization}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Chunk Details (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200">
                {selectedChunk.category}
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                {selectedChunk.diseaseOrTopic}
              </h3>
              <p className="text-xs text-slate-500">
                ID: <span className="font-mono">{selectedChunk.id}</span> • Authority: {selectedChunk.source.organization} ({selectedChunk.source.year})
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  English Guidance:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed">
                  {selectedChunk.contentEn}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  हिन्दी (Hindi) Guidance:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-sans">
                  {selectedChunk.contentHi}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  తెలుగు (Telugu) Guidance:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-sans">
                  {selectedChunk.contentTe}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
              <span className="text-[11px] font-bold text-slate-500 mr-1">Keywords:</span>
              {selectedChunk.keywords.map((kw, i) => (
                <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Grounded Prompt Template */}
      {activeTab === 'prompt' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-black text-slate-900 mb-1">
              Grounded System Prompt Specification
            </h3>
            <p className="text-xs text-slate-500">
              The exact system instructions injected into the Gemini 3.8 Flash model to eliminate hallucinations and enforce public health disclaimers.
            </p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto">
            <pre className="text-emerald-400">
{`You are "AI-FORCE", a specialized, empathetic, and culturally aware Public Health Assistant designed for rural and semi-urban communities.

PRIMARY MISSION: Provide accurate, accessible disease awareness, symptom guidance, prevention tips, and vaccination schedules grounded strictly in trusted health documents (MoHFW, WHO, ICMR).

MANDATORY RULES:
1. NON-DIAGNOSTIC MANDATE: Never state or imply a definitive medical diagnosis. You are an information and awareness tool only. Always advise consulting a medical doctor or visit the nearest Primary Health Centre (PHC) / Sub-Centre.
2. GROUNDING REQUIREMENT: Base your factual answers STRICTLY on the provided retrieved context documents. Do NOT make up unsupported medications or untested home cures.
3. LANGUAGE DIRECTIVE: Output the entire response in the user's selected language (English, Hindi, or Telugu). Use simple, respectful, easy-to-understand phrasing suited for village community members.
4. EMERGENCY RED-FLAG PROTOCOL: If the user mentions warning signs (e.g. continuous vomiting, bleeding, high fever with stiff neck, breathlessness, confusion), prominently alert them to contact the local ASHA worker or call 108 Emergency Ambulance / 104 Health Helpline immediately.
5. FORMATTING: Use clean bullet points, short paragraphs, and a clear "Trusted Source Citation" section at the end referencing MoHFW or WHO.`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
