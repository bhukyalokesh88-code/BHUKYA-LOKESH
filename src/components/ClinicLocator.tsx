import React, { useState } from 'react';
import { Language, HealthFacility } from '../types';
import { NEARBY_CLINICS } from '../data/healthKnowledgeBase';
import { 
  Building2, 
  PhoneCall, 
  MapPin, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  Check, 
  AlertCircle,
  Stethoscope,
  HeartPulse
} from 'lucide-react';

interface ClinicLocatorProps {
  language: Language;
}

export const ClinicLocator: React.FC<ClinicLocatorProps> = ({ language }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [only24x7, setOnly24x7] = useState<boolean>(false);

  const filteredClinics = NEARBY_CLINICS.filter(facility => {
    if (filterType !== 'all' && facility.type !== filterType) return false;
    if (only24x7 && !facility.hasEmergency24x7) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = facility.name.toLowerCase().includes(q);
      const matchDistrict = facility.district.toLowerCase().includes(q);
      const matchAddress = facility.address.toLowerCase().includes(q);
      return matchName || matchDistrict || matchAddress;
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Public Health Network & Healthcare Escalation</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            {language === 'hi' ? 'नजदीकी सरकारी स्वास्थ्य केंद्र एवं अस्पताल' : language === 'te' ? 'సమీప ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రాలు (PHC) & ఆసుపత్రులు' : 'Nearby Primary Health Centres & Hospitals'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'hi'
              ? 'मुफ्त ओपीडी परामर्श, दवाएं, टीकाकरण, जांच और 24x7 आपातकालीन मातृत्व देखभाल केंद्र।'
              : language === 'te'
              ? 'ఉచిత డాక్టర్ సంప్రదింపులు, మందులు, టీకాలు మరియు 24x7 అత్యవసర ప్రసవ కేంద్రాలు.'
              : 'Directory of Government Primary Health Centres (PHC), Community Health Centres (CHC), and District Hospitals.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:108"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            <span>Emergency 108</span>
          </a>
          <a
            href="tel:104"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 font-bold text-xs"
          >
            <span>Swasthya Vani 104</span>
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'hi' ? 'नाम या गाँव से खोजें...' : language === 'te' ? 'పేరు లేదా ప్రాంతంతో వెతకండి...' : 'Search by village or facility name...'}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-teal-600 outline-none bg-slate-50 text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-700 outline-none focus:border-teal-600"
          >
            <option value="all">All Facility Types</option>
            <option value="Primary Health Centre (PHC)">Primary Health Centre (PHC)</option>
            <option value="Community Health Centre (CHC)">Community Health Centre (CHC)</option>
            <option value="District Hospital">District Hospital</option>
            <option value="Ayushman Arogya Mandir">Ayushman Arogya Mandir</option>
          </select>

          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={only24x7}
              onChange={(e) => setOnly24x7(e.target.checked)}
              className="accent-teal-600 rounded"
            />
            <span>24x7 Emergency Only</span>
          </label>
        </div>
      </div>

      {/* Facility Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClinics.map((facility) => (
          <div
            key={facility.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-300 transition-all shadow-xs flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  {facility.type}
                </span>
                <span className="text-xs font-black text-teal-700 flex items-center gap-1 shrink-0">
                  <Navigation className="w-3 h-3 text-teal-600" />
                  <span>{facility.distanceKm} km away</span>
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900 mt-2">
                {facility.name}
              </h3>

              <p className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{facility.address}, {facility.district}</span>
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Timings: {facility.timings}</span>
              </div>

              {/* Badges: Maternity & 24x7 */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {facility.hasEmergency24x7 && (
                  <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11px] font-bold border border-rose-200">
                    ● 24x7 Emergency Casualty
                  </span>
                )}
                {facility.hasMaternity && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[11px] font-bold border border-purple-200">
                    ● 24x7 Labour & Maternity
                  </span>
                )}
                {facility.hasVaccination && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                    ● Free Vaccination
                  </span>
                )}
              </div>

              {/* Services List */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Key Services:
                </div>
                <div className="flex flex-wrap gap-1">
                  {facility.services.map((svc, i) => (
                    <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href={`tel:${facility.contactNumber}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{facility.contactNumber}</span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${facility.latitude},${facility.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 transition-colors"
              >
                <Navigation className="w-3 h-3 text-teal-700" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Frontline Health Worker Escalation Info Card */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <HeartPulse className="w-4 h-4 text-amber-700" />
          <span>Village Frontline Health Worker Escalation (ASHA / ANM / CHO)</span>
        </div>
        <p className="leading-relaxed text-amber-900 font-medium">
          If you are unable to travel immediately to a health facility, contact your village <strong>Accredited Social Health Activist (ASHA)</strong> or <strong>Auxiliary Nurse Midwife (ANM)</strong> at the local Anganwadi/Sub-Centre. They carry essential emergency supplies including ORS packets, Zinc tablets, Chloroquine/ACT for malaria, Paracetamol, and rapid diagnostic kits.
        </p>
      </div>
    </div>
  );
};
