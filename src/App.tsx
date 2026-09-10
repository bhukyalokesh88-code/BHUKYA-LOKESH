import React, { useState } from 'react';
import { ViewTab, Language, InterfaceMode } from './types';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { ChatInterface } from './components/ChatInterface';
import { SymptomChecker } from './components/SymptomChecker';
import { VaccinationHub } from './components/VaccinationHub';
import { ClinicLocator } from './components/ClinicLocator';
import { HealthAlerts } from './components/HealthAlerts';
import { RAGVisualizer } from './components/RAGVisualizer';
import { DisclaimerModal } from './components/DisclaimerModal';
import { ShieldCheck, PhoneCall, HeartPulse } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [language, setLanguage] = useState<Language>('en');
  const [interfaceMode, setInterfaceMode] = useState<InterfaceMode>('web');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);
  const [pendingChatQuery, setPendingChatQuery] = useState<string>('');

  const handleNavigate = (tab: ViewTab, initialChatQuery?: string) => {
    if (initialChatQuery) {
      setPendingChatQuery(initialChatQuery);
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* App Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        interfaceMode={interfaceMode}
        setInterfaceMode={setInterfaceMode}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6">
        {activeTab === 'dashboard' && (
          <HomeDashboard
            language={language}
            onNavigate={handleNavigate}
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          />
        )}

        {activeTab === 'chat' && (
          <ChatInterface
            language={language}
            interfaceMode={interfaceMode}
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
            onSwitchToClinics={() => setActiveTab('clinics')}
            initialQuery={pendingChatQuery}
          />
        )}

        {activeTab === 'symptom-triage' && (
          <SymptomChecker
            language={language}
            onSwitchToClinics={() => setActiveTab('clinics')}
            onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          />
        )}

        {activeTab === 'vaccines' && (
          <VaccinationHub language={language} />
        )}

        {activeTab === 'clinics' && (
          <ClinicLocator language={language} />
        )}

        {activeTab === 'alerts' && (
          <HealthAlerts language={language} />
        )}

        {activeTab === 'rag-inspector' && (
          <RAGVisualizer language={language} />
        )}
      </main>

      {/* Global Public Health Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">AI-FORCE</span>
            <span>•</span>
            <span>Public Health Awareness & Disease Surveillance</span>
            <span>•</span>
            <button
              onClick={() => setIsDisclaimerOpen(true)}
              className="hover:underline text-teal-700 font-semibold cursor-pointer"
            >
              Non-Diagnostic Disclaimer
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Grounded in MoHFW, WHO & ICMR Guidelines</span>
            </span>
            <a
              href="tel:108"
              className="font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Ambulance: 108</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        language={language}
      />
    </div>
  );
}
