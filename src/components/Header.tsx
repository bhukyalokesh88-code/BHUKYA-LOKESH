import React from 'react';
import { ViewTab, Language, InterfaceMode } from '../types';
import { 
  ShieldAlert, 
  MessageSquare, 
  Stethoscope, 
  Syringe, 
  Building2, 
  BellRing, 
  Cpu, 
  PhoneCall, 
  Smartphone, 
  Monitor,
  HeartPulse,
  LayoutDashboard
} from 'lucide-react';

interface HeaderProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  interfaceMode: InterfaceMode;
  setInterfaceMode: (mode: InterfaceMode) => void;
  onOpenDisclaimer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  interfaceMode,
  setInterfaceMode,
  onOpenDisclaimer,
}) => {
  const translations = {
    en: {
      appName: 'AI-FORCE',
      tagline: 'Public Health Chatbot & Awareness System',
      badge: 'MoHFW & WHO Grounded',
      callAmbulance: 'Emergency: Dial 108',
      callHealthLine: 'Helpline: 104',
      tabs: {
        dashboard: 'Home Dashboard',
        chat: 'Health Chatbot',
        symptom: 'Symptom Triage',
        vaccines: 'Vaccination Schedule',
        clinics: 'Nearby Clinics & PHCs',
        alerts: 'Outbreak Alerts',
        rag: 'RAG Architecture',
      },
      mode: {
        web: 'Web View',
        whatsapp: 'WhatsApp Mode',
      },
    },
    hi: {
      appName: 'AI-FORCE',
      tagline: 'सार्वजनिक स्वास्थ्य जागरूकता चैटबॉट',
      badge: 'स्वास्थ्य मंत्रालय व WHO प्रमाणित',
      callAmbulance: 'आपातकाल: डायल 108',
      callHealthLine: 'हेल्पलाइन: 104',
      tabs: {
        dashboard: 'मुख्य डैशबोर्ड',
        chat: 'स्वास्थ्य चैटबॉट',
        symptom: 'लक्षण जांच',
        vaccines: 'टीकाकरण सारणी',
        clinics: 'नजदीकी अस्पताल/PHC',
        alerts: 'रोग अलर्ट',
        rag: 'RAG आर्किटेक्चर',
      },
      mode: {
        web: 'वेब दृश्य',
        whatsapp: 'व्हाट्सएप मोड',
      },
    },
    te: {
      appName: 'AI-FORCE',
      tagline: 'ప్రజా ఆరోగ్య సహాయకుడు & అవగాహన వ్యవస్థ',
      badge: 'MoHFW & WHO సమాచారం',
      callAmbulance: 'అత్యవసరం: డయల్ 108',
      callHealthLine: 'హెల్ప్‌లైన్: 104',
      tabs: {
        dashboard: 'హోమ్ డాష్‌బోర్డ్',
        chat: 'ఆరోగ్య చాట్‌బాట్',
        symptom: 'లక్షణాల తనిఖీ',
        vaccines: 'టీకాల పట్టిక',
        clinics: 'సమీప క్లినిక్‌లు/PHC',
        alerts: 'వ్యాధి హెచ్చరికలు',
        rag: 'RAG ఆర్కిటెక్చర్',
      },
      mode: {
        web: 'వెబ్ మోడ్',
        whatsapp: 'వాట్సాప్ మోడ్',
      },
    },
  };

  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification Strip with Emergency Actions */}
      <div className="bg-slate-900 text-slate-100 text-xs px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            ● {t.badge}
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <button 
            onClick={onOpenDisclaimer} 
            className="hover:underline text-amber-300 text-[11px] flex items-center gap-1 font-medium cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Health Awareness Only (Not Medical Diagnosis)</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:108"
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] transition-colors"
            title="Dial 108 Emergency Medical Services"
          >
            <PhoneCall className="w-3 h-3 animate-pulse" />
            <span>{t.callAmbulance}</span>
          </a>
          <a
            href="tel:104"
            className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700 transition-colors"
            title="Dial 104 State Health Information & Advice"
          >
            <span>{t.callHealthLine}</span>
          </a>
        </div>
      </div>

      {/* Main Branding & Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-700 text-white flex items-center justify-center shadow-md shadow-teal-700/20">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                {t.appName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-md">
                Public Health AI
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium line-clamp-1">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Global Controls: Language Selector & Interface Toggle */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Interface Mode Switch: Modern Web vs WhatsApp Style */}
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-xs font-semibold text-slate-700">
            <button
              onClick={() => setInterfaceMode('web')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                interfaceMode === 'web'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{t.mode.web}</span>
            </button>
            <button
              onClick={() => setInterfaceMode('whatsapp')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                interfaceMode === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{t.mode.whatsapp}</span>
            </button>
          </div>

          {/* Multilingual Selector: English, Hindi, Telugu */}
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-xs font-medium">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                language === 'en'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                language === 'hi'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-semibold ${
                language === 'te'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <nav className="border-t border-slate-100 overflow-x-auto scrollbar-none px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex gap-1 sm:gap-2 py-1.5 min-w-max">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t.tabs.dashboard}</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.tabs.chat}</span>
          </button>

          <button
            onClick={() => setActiveTab('symptom-triage')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'symptom-triage'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>{t.tabs.symptom}</span>
          </button>

          <button
            onClick={() => setActiveTab('vaccines')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'vaccines'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Syringe className="w-4 h-4" />
            <span>{t.tabs.vaccines}</span>
          </button>

          <button
            onClick={() => setActiveTab('clinics')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'clinics'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{t.tabs.clinics}</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'alerts'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BellRing className="w-4 h-4" />
            <span>{t.tabs.alerts}</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab('rag-inspector')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'rag-inspector'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>{t.tabs.rag}</span>
            <span className="text-[10px] bg-indigo-200 text-indigo-900 px-1.5 py-0.2 rounded font-mono font-bold">
              Judge View
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};
