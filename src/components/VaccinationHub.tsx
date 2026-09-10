import React, { useState } from 'react';
import { Language, VaccineItem } from '../types';
import { VACCINE_SCHEDULE } from '../data/healthKnowledgeBase';
import { 
  Syringe, 
  Calendar, 
  Bell, 
  ShieldCheck, 
  CheckCircle2, 
  Info, 
  Smartphone, 
  MessageSquare,
  Baby,
  Clock
} from 'lucide-react';

interface VaccinationHubProps {
  language: Language;
}

export const VaccinationHub: React.FC<VaccinationHubProps> = ({ language }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [birthDate, setBirthDate] = useState<string>('');
  const [reminderNumber, setReminderNumber] = useState<string>('');
  const [reminderVaccine, setReminderVaccine] = useState<string>('vac-penta-1');
  const [reminderSuccess, setReminderSuccess] = useState<boolean>(false);
  const [calculatedSchedule, setCalculatedSchedule] = useState<{ name: string; dueDate: string; ageTarget: string }[]>([]);

  const calculateUpcomingDates = (dobString: string) => {
    if (!dobString) return;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return;

    const list = [
      { name: 'BCG, OPV-0, Hepatitis B (Birth)', days: 0, ageTarget: 'At Birth' },
      { name: 'OPV-1, Pentavalent-1, Rotavirus-1, fIPV-1, PCV-1', days: 42, ageTarget: '6 Weeks' },
      { name: 'OPV-2, Pentavalent-2, Rotavirus-2', days: 70, ageTarget: '10 Weeks' },
      { name: 'OPV-3, Pentavalent-3, Rotavirus-3, fIPV-2, PCV-2', days: 98, ageTarget: '14 Weeks' },
      { name: 'MR-1 (Measles-Rubella), JE-1, Vitamin A (1st dose)', days: 270, ageTarget: '9-12 Months' },
      { name: 'MR-2, DPT Booster-1, OPV Booster, Vitamin A (2nd dose)', days: 485, ageTarget: '16-24 Months' },
      { name: 'DPT Booster-2', days: 1825, ageTarget: '5-6 Years' },
    ];

    const results = list.map(item => {
      const targetDate = new Date(dob);
      targetDate.setDate(targetDate.getDate() + item.days);
      return {
        name: item.name,
        ageTarget: item.ageTarget,
        dueDate: targetDate.toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };
    });

    setCalculatedSchedule(results);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateUpcomingDates(birthDate);
  };

  const handleSendReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderNumber) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setReminderSuccess(true);
    setTimeout(() => {
      setReminderSuccess(false);
    }, 6000);
  };

  const filteredVaccines = VACCINE_SCHEDULE.filter(v => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'birth') return v.ageWeeks === 0;
    if (selectedFilter === 'infant') return v.ageWeeks > 0 && v.ageWeeks <= 14;
    if (selectedFilter === 'toddler') return v.ageWeeks > 14 && v.ageWeeks <= 52;
    if (selectedFilter === 'maternal') return v.program === 'Adult / Maternal';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
            <Syringe className="w-4 h-4" />
            <span>Universal Immunization Programme (UIP)</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            {language === 'hi' ? 'राष्ट्रीय टीकाकरण सारणी एवं अनुस्मारक (रिमाइंडर)' : language === 'te' ? 'జాతీయ టీకాల పట్టిక & రిమైండర్లు' : 'National Immunization Schedule & Reminders'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'hi'
              ? 'मिशन इंद्रधनुष व भारत सरकार द्वारा सभी सरकारी केंद्रों पर 12 जानलेवा बीमारियों से बचाव हेतु निःशुल्क टीके।'
              : language === 'te'
              ? 'ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రాలలో 12 ప్రాణాంతక వ్యాధుల నుండి రక్షించే ఉచిత టీకాలు.'
              : 'Free life-saving vaccines under Mission Indradhanush at all government Sub-Centres and PHCs.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Free at Govt PHCs</span>
          </span>
        </div>
      </div>

      {/* Grid: 2 Columns - Left: Vaccine Due Date Calculator & SMS Reminder; Right: Vaccine List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Interactive Tools (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Tool 1: Birth Date Due Date Calculator */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Baby className="w-4 h-4" />
              <span>{language === 'hi' ? 'टीका तिथि कैलकुलेटर' : language === 'te' ? 'టీకా తేదీ గణన' : 'Vaccine Due Date Calculator'}</span>
            </div>
            <h3 className="text-sm font-black text-slate-900 mb-1">
              {language === 'hi' ? 'बच्चे की जन्म तिथि दर्ज करें' : language === 'te' ? 'శిశువు పుట్టిన తేదీని నమోదు చేయండి' : 'Enter Child\'s Date of Birth'}
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              {language === 'hi' ? 'आगामी टीकों की सटीक तारीखें स्वतः प्राप्त करें' : language === 'te' ? 'రాబోయే టీకాల తేదీలను స్వయంచాలకంగా లెక్కించండి' : 'Calculates the complete schedule tailored to your child\'s age.'}
            </p>

            <form onSubmit={handleScheduleSubmit} className="space-y-3">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-teal-600 outline-none bg-slate-50"
              />
              <button
                type="submit"
                className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {language === 'hi' ? 'टीकाकरण तिथियां देखें' : language === 'te' ? 'టీకాల తేదీలను చూడండి' : 'Calculate Upcoming Dates'}
              </button>
            </form>

            {/* Render Calculated Dates */}
            {calculatedSchedule.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 max-h-60 overflow-y-auto pr-1">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  Upcoming Milestones:
                </div>
                {calculatedSchedule.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-100 text-xs flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-teal-950 block">{item.ageTarget}</span>
                      <span className="text-[11px] text-teal-800 line-clamp-1">{item.name}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-white text-teal-700 font-extrabold text-[11px] shrink-0 border border-teal-200">
                      {item.dueDate}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tool 2: WhatsApp / SMS Reminder Setup Simulator */}
          <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'व्हाट्सएप / एसएमएस अलर्ट' : language === 'te' ? 'వాట్సాప్ / ఎస్ఎంఎస్ హెచ్చరిక' : 'Automated Reminder Alert'}</span>
            </div>
            <h3 className="text-sm font-black text-emerald-950 mb-1">
              {language === 'hi' ? 'टीकाकरण अनुस्मारक सेट करें' : language === 'te' ? 'టీకా రిమైండర్ ఏర్పాటు చేసుకోండి' : 'Setup Free Vaccine Reminder'}
            </h3>
            <p className="text-xs text-emerald-800 mb-3">
              {language === 'hi'
                ? 'गाँव की माताओं और अभिभावकों के लिए नियत तिथि से 2 दिन पहले मुफ्त संदेश प्राप्त करें।'
                : language === 'te'
                ? 'టీకా తేదీకి 2 రోజుల ముందు ఉచిత వాట్సాప్ లేదా ఎస్ఎంఎస్ సందేశం పొందండి.'
                : 'Sends timely WhatsApp/SMS alerts to mothers and village health workers.'}
            </p>

            {reminderSuccess ? (
              <div className="p-4 bg-white rounded-xl border border-emerald-300 text-emerald-900 text-xs space-y-2 shadow-xs animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Reminder Scheduled Successfully!</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  A simulated SMS alert will be dispatched to <strong>{reminderNumber}</strong> prior to the dose session at your local Anganwadi/PHC.
                </p>
                <div className="p-2 bg-emerald-50 rounded-lg text-[11px] font-mono text-emerald-900 border border-emerald-200">
                  📩 [AI-FORCE ALERT]: Reminder for {VACCINE_SCHEDULE.find(v => v.id === reminderVaccine)?.name}. Venue: Nearest PHC / Sub-Centre. Carry MCP Card.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendReminder} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Mobile Number:
                  </label>
                  <input
                    type="tel"
                    value={reminderNumber}
                    onChange={(e) => setReminderNumber(e.target.value)}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 focus:border-emerald-600 outline-none bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Select Upcoming Vaccine Dose:
                  </label>
                  <select
                    value={reminderVaccine}
                    onChange={(e) => setReminderVaccine(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 focus:border-emerald-600 outline-none bg-white text-slate-900"
                  >
                    {VACCINE_SCHEDULE.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.ageSchedule})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'अनुस्मारक सक्रिय करें' : language === 'te' ? 'రిమైండర్ యాక్టివేట్ చేయండి' : 'Activate Free Reminder'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: Vaccine Directory (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Vaccines' },
              { id: 'birth', label: 'At Birth' },
              { id: 'infant', label: '6-14 Weeks' },
              { id: 'toddler', label: '9-24 Months' },
              { id: 'maternal', label: 'Adult / Maternal' },
            ].map(pill => (
              <button
                key={pill.id}
                onClick={() => setSelectedFilter(pill.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === pill.id
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Vaccine Cards */}
          <div className="space-y-3.5">
            {filteredVaccines.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-teal-300 transition-all shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      {v.program}
                    </span>
                    <h4 className="text-base font-black text-slate-900 mt-1">
                      {v.name}
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-extrabold text-teal-700 block">
                      {v.ageSchedule}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {v.doseNumber} • {v.route}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-700 space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p>
                    <strong className="text-slate-900">
                      {language === 'hi' ? 'सुरक्षा:' : language === 'te' ? 'రక్షణ:' : 'Target Protection:'}
                    </strong>{' '}
                    {v.diseaseTarget}
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-slate-900">
                      {language === 'hi' ? 'लाभ:' : language === 'te' ? 'ప్రయోజనం:' : 'Benefits:'}
                    </strong>{' '}
                    {language === 'hi' ? v.benefits.hi : language === 'te' ? v.benefits.te : v.benefits.en}
                  </p>
                  <p className="text-slate-600 text-[11px]">
                    <strong className="text-slate-700">
                      {language === 'hi' ? 'अपेक्षित सामान्य लक्षण:' : language === 'te' ? 'సాధారణ సైడ్ ఎఫెక్ట్స్:' : 'Normal Post-Vaccine Signs:'}
                    </strong>{' '}
                    {language === 'hi' ? v.sideEffects.hi : language === 'te' ? v.sideEffects.te : v.sideEffects.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
