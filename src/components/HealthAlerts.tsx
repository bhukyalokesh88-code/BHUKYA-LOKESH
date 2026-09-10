import React, { useState } from 'react';
import { Language, OutbreakAlert } from '../types';
import { OUTBREAK_ALERTS } from '../data/healthKnowledgeBase';
import { 
  BellRing, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Building2,
  ExternalLink,
  Flag,
  X,
  Send,
  Radio
} from 'lucide-react';

interface HealthAlertsProps {
  language: Language;
}

export const HealthAlerts: React.FC<HealthAlertsProps> = ({ language }) => {
  const [speakingAlertId, setSpeakingAlertId] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportData, setReportData] = useState({
    category: 'fever_cluster',
    location: '',
    affectedCount: '2-5 people',
    contact: '',
    description: '',
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setIsReportModalOpen(false);
      setReportData({
        category: 'fever_cluster',
        location: '',
        affectedCount: '2-5 people',
        contact: '',
        description: '',
      });
    }, 3500);
  };

  const handleReadAloud = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (speakingAlertId === id) {
      window.speechSynthesis.cancel();
      setSpeakingAlertId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingAlertId(null);
    utterance.onerror = () => setSpeakingAlertId(null);

    setSpeakingAlertId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
            <BellRing className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Disease Surveillance & Outbreak Advisories</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            {language === 'hi' ? 'सार्वजनिक स्वास्थ्य एवं मौसमी रोग अलर्ट' : language === 'te' ? 'ప్రజా ఆరోగ్య & వ్యాధి హెచ్చరికలు' : 'Public Health & Seasonal Outbreak Alerts'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'hi'
              ? 'एकीकृत रोग निगरानी कार्यक्रम (IDSP) व स्वास्थ्य मंत्रालय द्वारा जारी आधिकारिक बुलेटिन।'
              : language === 'te'
              ? 'MoHFW మరియు IDSP ద్వారా విడుదల చేయబడిన అధికారిక వ్యాధి హెచ్చరికలు మరియు జాగ్రత్తలు.'
              : 'Official real-time health surveillance bulletins from IDSP & Ministry of Health.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Active Surveillance Feed</span>
          </span>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'स्थानीय घटना की रिपोर्ट करें' : language === 'te' ? 'సమస్యను నివేదించండి' : 'Report Health Incident'}</span>
          </button>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-5">
        {OUTBREAK_ALERTS.map((alert) => {
          const title = language === 'hi' ? alert.title.hi : language === 'te' ? alert.title.te : alert.title.en;
          const summary = language === 'hi' ? alert.summary.hi : language === 'te' ? alert.summary.te : alert.summary.en;
          const tips = language === 'hi' ? alert.preventionTips.hi : language === 'te' ? alert.preventionTips.te : alert.preventionTips.en;

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl p-5 border transition-all shadow-xs ${
                alert.severity === 'High Alert'
                  ? 'border-rose-300 ring-1 ring-rose-300/40'
                  : 'border-slate-200 hover:border-teal-300'
              }`}
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    alert.severity === 'High Alert'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : alert.severity === 'Warning'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-teal-50 text-teal-800 border border-teal-200'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs font-extrabold text-slate-700">
                    {alert.disease}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{alert.dateReported}</span>
                  <span>•</span>
                  <span>{alert.affectedRegion}</span>
                </div>
              </div>

              {/* Title & Summary */}
              <h3 className="text-base font-black text-slate-900 mt-2.5">
                {title}
              </h3>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
                {summary}
              </p>

              {/* Prevention Tips Box */}
              <div className="mt-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>{language === 'hi' ? 'महत्वपूर्ण सावधानियां एवं बचाव:' : language === 'te' ? 'ముఖ్యమైన జాగ్రత్తలు & నివారణ:' : 'Mandatory Preventive Action Points:'}</span>
                </div>
                <ul className="space-y-1.5">
                  {tips.map((tip, idx) => (
                    <li key={idx} className="text-xs text-slate-800 flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-1.5"></span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer with Read Aloud & Issuing Authority */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-semibold text-[11px]">
                  Issued By: {alert.issuingAuthority}
                </span>

                <button
                  onClick={() => handleReadAloud(alert.id, `${title}. ${summary}. ${tips.join('. ')}`)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    speakingAlertId === alert.id
                      ? 'bg-teal-100 text-teal-800 animate-pulse'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {speakingAlertId === alert.id ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-teal-700" />
                      <span>Stop Audio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen to Advisory</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Health Incident Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Flag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {language === 'hi' ? 'सामुदायिक स्वास्थ्य घटना रिपोर्ट' : language === 'te' ? 'కమ్యూనిటీ ఆరోగ్య సంఘటన నివేదిక' : 'Community Health Event / Outbreak Alert'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Reports are logged into the IDSP District Surveillance Dashboard
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-base text-slate-900">
                  {language === 'hi' ? 'रिपोर्ट सफलतापूर्वक दर्ज की गई!' : language === 'te' ? 'నివేదిక విజయవంతంగా సమర్పించబడింది!' : 'Incident Reported Successfully!'}
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Alert dispatched to the Block Medical Officer & District Epidemiologist. Local ASHA worker notified for field verification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="mt-4 space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Event Type / Concern:
                  </label>
                  <select
                    value={reportData.category}
                    onChange={(e) => setReportData({ ...reportData, category: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:border-teal-600 outline-none"
                  >
                    <option value="fever_cluster">Cluster of Unexplained High Fever / Joint Pain</option>
                    <option value="water_diarrhoea">Multiple Cases of Watery Diarrhoea / Vomiting</option>
                    <option value="animal_bite">Stray Dog / Monkey / Animal Bite Threat</option>
                    <option value="heatstroke">Severe Heat Exhaustion Cases in Village</option>
                    <option value="cough_rash">Prolonged Cough / Rash Cluster in Children</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Village / Ward & District:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rampur, Medak"
                      value={reportData.location}
                      onChange={(e) => setReportData({ ...reportData, location: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:border-teal-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Estimated People Affected:
                    </label>
                    <select
                      value={reportData.affectedCount}
                      onChange={(e) => setReportData({ ...reportData, affectedCount: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:border-teal-600 outline-none"
                    >
                      <option value="1 person">1 Person</option>
                      <option value="2-5 people">2 to 5 Persons</option>
                      <option value="6-15 people">6 to 15 Persons</option>
                      <option value="15+ people">More than 15 Persons (Cluster)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Contact Mobile Number:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={reportData.contact}
                    onChange={(e) => setReportData({ ...reportData, contact: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:border-teal-600 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Additional Details (Water source, days running, specific observations):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 4 families sharing the open well have severe stomach upset since yesterday..."
                    value={reportData.description}
                    onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:border-teal-600 outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit to Health Team</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
