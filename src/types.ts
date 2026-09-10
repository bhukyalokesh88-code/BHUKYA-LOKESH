export type Language = 'en' | 'hi' | 'te';

export interface SourceReference {
  id: string;
  title: string;
  organization: 'MoHFW (Govt of India)' | 'WHO' | 'ICMR' | 'NVBDCP' | 'National Health Mission';
  url?: string;
  year?: string;
  verified: boolean;
}

export interface KnowledgeChunk {
  id: string;
  diseaseOrTopic: string;
  category: 'Vector-Borne' | 'Waterborne & Foodborne' | 'Respiratory' | 'Vaccine-Preventable' | 'Maternal & Child' | 'General Health' | 'Emergency Care';
  contentEn: string;
  contentHi: string;
  contentTe: string;
  symptoms: string[];
  prevention: string[];
  warningSigns: string[];
  source: SourceReference;
  keywords: string[];
  embeddingPreview?: number[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  language: Language;
  sources?: SourceReference[];
  retrievedChunks?: {
    id: string;
    topic: string;
    score: number;
    sourceName: string;
  }[];
  isEmergencyAlert?: boolean;
  emergencyActions?: string[];
  requiresHumanEscalation?: boolean;
  suggestedFollowUps?: string[];
}

export interface SymptomAssessment {
  selectedSymptoms: string[];
  durationDays: number;
  hasRedFlags: boolean;
  redFlagsList: string[];
  ageGroup: 'infant' | 'child' | 'adult' | 'elderly' | 'pregnant';
  temperature?: number;
}

export interface TriageResult {
  severity: 'mild' | 'moderate' | 'emergency';
  titleEn: string;
  titleHi: string;
  titleTe: string;
  explanationEn: string;
  explanationHi: string;
  explanationTe: string;
  recommendationsEn: string[];
  recommendationsHi: string[];
  recommendationsTe: string[];
  escalateTo: 'Home Care + Monitor' | 'Visit PHC / Sub-Centre (24h)' | 'Immediate Emergency Hospital / Call 108';
  disclaimer: string;
}

export interface VaccineItem {
  id: string;
  name: string;
  diseaseTarget: string;
  ageSchedule: string;
  ageWeeks: number;
  doseNumber: string;
  route: string;
  benefits: {
    en: string;
    hi: string;
    te: string;
  };
  sideEffects: {
    en: string;
    hi: string;
    te: string;
  };
  program: 'Universal Immunization Programme (UIP)' | 'Mission Indradhanush' | 'Adult / Maternal';
}

export interface HealthFacility {
  id: string;
  name: string;
  type: 'Primary Health Centre (PHC)' | 'Community Health Centre (CHC)' | 'District Hospital' | 'Ayushman Arogya Mandir' | 'Sub-Centre';
  district: string;
  state: string;
  address: string;
  distanceKm: number;
  contactNumber: string;
  ambulanceContact: string;
  timings: string;
  services: string[];
  hasMaternity: boolean;
  hasEmergency24x7: boolean;
  hasVaccination: boolean;
  latitude: number;
  longitude: number;
}

export interface OutbreakAlert {
  id: string;
  title: {
    en: string;
    hi: string;
    te: string;
  };
  disease: string;
  severity: 'Warning' | 'High Alert' | 'Advisory';
  affectedRegion: string;
  dateReported: string;
  summary: {
    en: string;
    hi: string;
    te: string;
  };
  preventionTips: {
    en: string[];
    hi: string[];
    te: string[];
  };
  issuingAuthority: string;
}

export type ViewTab = 'dashboard' | 'chat' | 'symptom-triage' | 'vaccines' | 'clinics' | 'alerts' | 'rag-inspector';

export type InterfaceMode = 'web' | 'whatsapp';
