import React, { useState } from 'react';
import { Language, ViewTab } from '../types';
import { NEARBY_CLINICS, OUTBREAK_ALERTS } from '../data/healthKnowledgeBase';
import {
  MessageSquare,
  Stethoscope,
  Syringe,
  Building2,
  BellRing,
  PhoneCall,
  ShieldCheck,
  Search,
  ArrowRight,
  Sparkles,
  HeartPulse,
  AlertTriangle,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Users,
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface HomeDashboardProps {
  language: Language;
  onNavigate: (tab: ViewTab, initialChatQuery?: string) => void;
  onOpenDisclaimer: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  language,
  onNavigate,
  onOpenDisclaimer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDob, setPreviewDob] = useState('');
  const [quickCalcResult, setQuickCalcResult] = useState<{ nextVaccine: string; dueText: string } | null>(null);

  const t = {
    en: {
      heroBadge: 'Ministry of Health & WHO Grounded Intelligence',
      heroTitle: 'Reliable Public Health Guidance for Every Citizen',
      heroSubtitle:
        'AI-FORCE connects rural and semi-urban communities with verified health awareness, symptom triage, immunization schedules, and emergency healthcare facilities.',
      searchPlaceholder: 'Ask a health question (e.g., Dengue symptoms, ORS preparation, baby vaccines)...',
      askAiButton: 'Ask Health AI',
      popularQueries: [
        'Dengue warning signs & platelets',
        'How to make ORS at home',
        'Child vaccine schedule by birthdate',
        'What to do after a dog bite?',
        'Symptoms of malaria vs viral fever',
      ],
      quickActionsTitle: 'Public Health Care Services',
      quickActionsSubtitle: 'Access primary healthcare information, screening, and emergency resources',
      actions: {
        chat: {
          title: 'Health AI Chatbot',
          desc: 'Conversational assistant in English, Hindi, and Telugu grounded in MoHFW & WHO protocols.',
          tag: 'Multilingual Voice & Text',
        },
        triage: {
          title: 'Symptom Triage',
          desc: 'Step-by-step risk checker to detect critical warning signs and determine home care vs clinical visits.',
          tag: '4-Step Clinical Evaluation',
        },
        vaccines: {
          title: 'Vaccination Hub',
          desc: 'Universal Immunization Programme schedule calculator with SMS & WhatsApp reminders.',
          tag: 'UIP Birth to 16 Years',
        },
        clinics: {
          title: 'Nearby Clinics & PHCs',
          desc: 'Directory of verified Primary Health Centres, CHCs, and District Hospitals with 24x7 emergency beds.',
          tag: 'Emergency Navigation',
        },
        alerts: {
          title: 'Outbreak Alerts',
          desc: 'Real-time Integrated Disease Surveillance Programme (IDSP) bulletins and epidemic precautions.',
          tag: 'Active Surveillance',
        },
      },
      emergencyTitle: 'Emergency Health Response & Lifeline',
      emergencyDesc:
        'In acute distress, every second counts. Connect directly with government ambulance and health helpline services.',
      ambulanceText: 'Dial 108 – Free Ambulance (24x7)',
      helplineText: 'Dial 104 – Health Advice & Information',
      goldenHourTitle: 'Critical Emergency Red Flags (Act Within the Golden Hour)',
      redFlags: [
        'Sudden severe difficulty breathing or gasping for air',
        'Severe chest pain or pressure radiating to left arm/jaw',
        'Unconsciousness, sudden drowsiness, or convulsions/fits',
        'Severe unyielding vomiting or inability to keep liquids down',
      ],
      vaccineCardTitle: 'Quick Vaccine Due Calculator',
      vaccineCardDesc: 'Enter a child’s date of birth to check the next scheduled immunization:',
      dobPlaceholder: 'Select Date of Birth',
      calculateButton: 'Check Next Vaccine',
      viewFullSchedule: 'View Full Immunization Schedule',
      clinicsTitle: 'Nearest Verified Health Facilities',
      viewAllClinics: 'View All Clinics & Hospitals',
      alertsTitle: 'Live Disease Surveillance & Weather Advisories',
      viewAllAlerts: 'View All Outbreak Bulletins',
      communitySupportTitle: 'Frontline Community Health Support',
      communitySupportDesc:
        'For maternal checks, child malnutrition, and village health queries, reach out to your local ASHA worker, Auxiliary Nurse Midwife (ANM), or Village Health Sanitation Committee.',
      disclaimerNotice:
        'Safety Notice: AI-FORCE is strictly an educational public health awareness system and does not provide clinical medical diagnosis or prescription. Always consult a certified medical practitioner.',
      readDisclaimer: 'Read Non-Diagnostic Disclaimer',
    },
    hi: {
      heroBadge: 'स्वास्थ्य मंत्रालय एवं WHO प्रमाणित स्वास्थ्य जागरूकता',
      heroTitle: 'हर नागरिक के लिए भरोसेमंद सार्वजनिक स्वास्थ्य परामर्श',
      heroSubtitle:
        'AI-FORCE ग्रामीण और अर्ध-शहरी समुदायों को प्रामाणिक स्वास्थ्य जानकारी, लक्षण जांच, टीकाकरण समय-सारणी और आपातकालीन स्वास्थ्य केंद्रों से जोड़ता है।',
      searchPlaceholder: 'स्वास्थ्य संबंधी प्रश्न पूछें (जैसे: डेंगू के लक्षण, ओआरएस कैसे बनाएं, बच्चे के टीके)...',
      askAiButton: 'AI से पूछें',
      popularQueries: [
        'डेंगू के शुरुआती लक्षण और खतरे के संकेत',
        'घर पर ओआरएस घोल कैसे बनाएं',
        'जन्म तिथि से बच्चे के टीके की जांच',
        'कुत्ता काटने पर तुरंत क्या करें?',
        'मलेरिया और सामान्य बुखार में अंतर',
      ],
      quickActionsTitle: 'सार्वजनिक स्वास्थ्य सेवाएं',
      quickActionsSubtitle: 'प्राथमिक स्वास्थ्य जानकारी, लक्षण जांच और आपातकालीन सहायता',
      actions: {
        chat: {
          title: 'स्वास्थ्य AI चैटबॉट',
          desc: 'हिन्दी, अंग्रेजी व तेलुगु में स्वास्थ्य मंत्रालय व WHO नियमों पर आधारित भरोसेमंद परामर्श।',
          tag: 'ध्वनि व टेक्स्ट समर्थित',
        },
        triage: {
          title: 'लक्षण जांच एवं ट्राइएज',
          desc: 'गंभीर लक्षणों की पहचान के लिए चरण-दर-चरण जांच ताकि सही समय पर अस्पताल पहुंचा जा सके।',
          tag: '4-चरणीय जांच',
        },
        vaccines: {
          title: 'टीकाकरण केंद्र',
          desc: 'सार्वभौमिक टीकाकरण कार्यक्रम (UIP) के तहत जन्म से 16 वर्ष तक के टीकों की तारीख व एसएमएस अलर्ट।',
          tag: 'जन्म से 16 वर्ष',
        },
        clinics: {
          title: 'नजदीकी PHC एवं अस्पताल',
          desc: '24x7 आपातकालीन बेड, मुफ्त दवाओं और ओपीडी वाले सरकारी स्वास्थ्य केंद्रों की सूची।',
          tag: 'आपातकालीन दिशा-निर्देश',
        },
        alerts: {
          title: 'मौसमी रोग अलर्ट',
          desc: 'एकीकृत रोग निगरानी कार्यक्रम (IDSP) द्वारा जारी आधिकारिक बुलेटिन व सावधानियां।',
          tag: 'सक्रिय निगरानी',
        },
      },
      emergencyTitle: 'आपातकालीन स्वास्थ्य सहायता एवं हेल्पलाइन',
      emergencyDesc: 'आपात स्थिति में हर पल महत्वपूर्ण है। तत्काल सरकारी एम्बुलेंस और स्वास्थ्य हेल्पलाइन से जुड़ें।',
      ambulanceText: 'डायल 108 – मुफ्त एम्बुलेंस (24x7)',
      helplineText: 'डायल 104 – राज्य स्वास्थ्य हेल्पलाइन',
      goldenHourTitle: 'गंभीर आपातकालीन खतरे के संकेत (गोल्डन ऑवर में तुरंत कार्रवाई करें)',
      redFlags: [
        'सांस लेने में अत्यधिक कठिनाई या घरघराहट',
        'छाती में तेज दर्द या दबाव',
        'बेहोशी, अत्यधिक सुस्ती या दौरे पड़ना',
        'लगातार खून की उल्टी या मल में खून आना',
      ],
      vaccineCardTitle: 'त्वरित टीकाकरण कैलकुलेटर',
      vaccineCardDesc: 'बच्चे की जन्म तिथि चुनें और अगला आने वाला टीका तुरंत जानें:',
      dobPlaceholder: 'जन्म तिथि चुनें',
      calculateButton: 'टीका जांचें',
      viewFullSchedule: 'पूर्ण टीकाकरण सारणी देखें',
      clinicsTitle: 'नजदीकी प्रमाणित स्वास्थ्य केंद्र',
      viewAllClinics: 'सभी स्वास्थ्य केंद्र देखें',
      alertsTitle: 'सक्रिय रोग निगरानी एवं अलर्ट',
      viewAllAlerts: 'सभी बुलेटिन देखें',
      communitySupportTitle: 'समुदाय स्तर पर अग्रिम पंक्ति के कार्यकर्ता',
      communitySupportDesc:
        'मातृ स्वास्थ्य, पोषण और बाल स्वास्थ्य के लिए अपने गाँव की आशा (ASHA) कार्यकर्ता या एएनएम (ANM) से संपर्क करें।',
      disclaimerNotice:
        'सुरक्षा सूचना: AI-FORCE केवल एक सार्वजनिक स्वास्थ्य जागरूकता प्रणाली है, यह चिकित्सीय निदान या दवा का नुस्खा नहीं है।',
      readDisclaimer: 'अस्वीकरण पढ़ें',
    },
    te: {
      heroBadge: 'MoHFW మరియు WHO ధృవీకరించిన ప్రజా ఆరోగ్య సమాచారం',
      heroTitle: 'ప్రతి ఒక్కరికీ నమ్మకమైన ప్రజా ఆరోగ్య మార్గదర్శనం',
      heroSubtitle:
        'AI-FORCE గ్రామీణ మరియు పట్టణ ప్రాంత ప్రజలకు నమ్మకమైన ఆరోగ్య సమాచారం, లక్షణాల తనిఖీ, టీకాల పట్టిక మరియు సమీప ఆసుపత్రుల వివరాలను అందిస్తుంది.',
      searchPlaceholder: 'ఆరోగ్య ప్రశ్నను అడగండి (ఉదా: డెంగ్యూ లక్షణాలు, ORS తయారీ, టీకాలు)...',
      askAiButton: 'AI ని అడగండి',
      popularQueries: [
        'డెంగ్యూ ప్రమాదకర లక్షణాలు & ప్లేట్‌లెట్స్',
        'ఇంట్లోనే ORS ద్రావణం ఎలా తయారు చేయాలి?',
        'పిల్లల పుట్టిన తేదీ ప్రకారం టీకాల వివరాలు',
        'కుక్క కరిచినప్పుడు వెంటనే ఏమి చేయాలి?',
        'మలేరియా మరియు వైరల్ జ్వరం తేడాలు',
      ],
      quickActionsTitle: 'ప్రజా ఆరోగ్య సేవలు',
      quickActionsSubtitle: 'ప్రాథమిక ఆరోగ్య సమాచారం, లక్షణాల తనిఖీ మరియు అత్యవసర సేవలు',
      actions: {
        chat: {
          title: 'ఆరోగ్య AI చాట్‌బాట్',
          desc: 'తెలుగు, హిందీ మరియు ఇంగ్లీషులో అధికారిక మార్గదర్శకాలతో నమ్మకమైన ఆరోగ్య సలహాలు.',
          tag: 'వాయిస్ & టెక్స్ట్ సపోర్ట్',
        },
        triage: {
          title: 'లక్షణాల తనిఖీ',
          desc: 'ప్రమాదకర లక్షణాలను గుర్తించి, ఇంటి చికిత్స లేదా ఆసుపత్రి అవసరాన్ని అంచనా వేస్తుంది.',
          tag: '4-దశల పరిశీలన',
        },
        vaccines: {
          title: 'టీకాల పట్టిక & రిమైండర్లు',
          desc: 'యూనివర్సల్ ఇమ్యునైజేషన్ ప్రోగ్రామ్ ప్రకారం పుట్టినప్పటి నుండి 16 ఏళ్ల వరకు టీకాల షెడ్యూల్.',
          tag: 'UIP షెడ్యూల్',
        },
        clinics: {
          title: 'సమీప PHC & ఆసుపత్రులు',
          desc: 'ఉచిత మందులు, ఓపీడీ మరియు 24x7 ప్రసవ సౌకర్యాలు కలిగిన ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రాలు.',
          tag: 'అత్యవసర కేంద్రాలు',
        },
        alerts: {
          title: 'వ్యాధి హెచ్చరికలు',
          desc: 'IDSP విడుదల చేసిన తాజా అంటువ్యాధుల హెచ్చరికలు మరియు ముందు జాగ్రత్త చర్యలు.',
          tag: 'లైవ్ నిఘా',
        },
      },
      emergencyTitle: 'అత్యవసర ఆరోగ్య సేవలు & లైఫ్‌లైన్',
      emergencyDesc: 'అత్యవసర సమయంలో ప్రతి క్షణం విలువైంది. వెంటనే ప్రభుత్వ అంబులెన్స్ మరియు హెల్ప్‌లైన్‌కు కాల్ చేయండి.',
      ambulanceText: 'డయల్ 108 – ఉచిత అంబులెన్స్ (24x7)',
      helplineText: 'డయల్ 104 – ఆరోగ్య సమాచార హెల్ప్‌లైన్',
      goldenHourTitle: 'అత్యవసర ప్రమాద సంకేతాలు (గోల్డెన్ అవర్‌లో తక్షణ చర్య)',
      redFlags: [
        'తీవ్రమైన శ్వాస ఆడకపోవడం లేదా ఆయాసం',
        'గుండెల్లో భరించలేని నొప్పి లేదా ఒత్తిడి',
        'స్పృహ కోల్పోవడం, మగత లేదా ఫిట్స్ రావడం',
        'నిరంతర రక్త వాంతులు లేదా తీవ్ర డీహైడ్రేషన్',
      ],
      vaccineCardTitle: 'టీకాల త్వరిత కాలిక్యులేటర్',
      vaccineCardDesc: 'పిల్లల పుట్టిన తేదీని నమోదు చేసి తదుపరి తీసుకోవాల్సిన టీకాను తెలుసుకోండి:',
      dobPlaceholder: 'పుట్టిన తేదీని ఎంచుకోండి',
      calculateButton: 'టీకా తనిఖీ చేయండి',
      viewFullSchedule: 'పూర్తి టీకాల పట్టికను చూడండి',
      clinicsTitle: 'సమీప ధృవీకరించిన ఆరోగ్య కేంద్రాలు',
      viewAllClinics: 'అన్ని ఆసుపత్రుల వివరాలు',
      alertsTitle: 'ప్రస్తుత వ్యాధి హెచ్చరికలు',
      viewAllAlerts: 'అన్ని హెచ్చరికలు చూడండి',
      communitySupportTitle: 'గ్రామ స్థాయి ఆరోగ్య కార్యకర్తల సహాయం',
      communitySupportDesc:
        'తల్లి మరియు బిడ్డ ఆరోగ్యం, పౌష్టికాహార సలహాల కోసం మీ స్థానిక ఆశా (ASHA) లేదా ఏఎన్ఎం (ANM) కార్యకర్తను సంప్రదించండి.',
      disclaimerNotice:
        'భద్రతా గమనిక: AI-FORCE కేవలం ప్రజా ఆరోగ్య అవగాహన వ్యవస్థ మాత్రమే. ఇది వైద్య నిర్ధారణ లేదా చికిత్స కాదు.',
      readDisclaimer: 'అస్వీకార ప్రకటన చదవండి',
    },
  }[language];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('chat', searchQuery.trim());
    } else {
      onNavigate('chat');
    }
  };

  const handleQuickQuestion = (q: string) => {
    onNavigate('chat', q);
  };

  const handleCalculateQuickVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewDob) return;
    const dob = new Date(previewDob);
    if (isNaN(dob.getTime())) return;

    const now = new Date();
    const diffDays = Math.floor((now.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 42) {
      setQuickCalcResult({
        nextVaccine: '6 Weeks: Pentavalent-1, OPV-1, Rotavirus-1, fIPV-1, PCV-1',
        dueText: 'Due at 6 weeks from birth',
      });
    } else if (diffDays < 70) {
      setQuickCalcResult({
        nextVaccine: '10 Weeks: Pentavalent-2, OPV-2, Rotavirus-2',
        dueText: 'Due at 10 weeks from birth',
      });
    } else if (diffDays < 98) {
      setQuickCalcResult({
        nextVaccine: '14 Weeks: Pentavalent-3, OPV-3, Rotavirus-3, fIPV-2, PCV-2',
        dueText: 'Due at 14 weeks from birth',
      });
    } else if (diffDays < 270) {
      setQuickCalcResult({
        nextVaccine: '9-12 Months: MR-1 (Measles-Rubella), JE-1, PCV Booster, Vitamin A',
        dueText: 'Due between 9 to 12 months',
      });
    } else if (diffDays < 500) {
      setQuickCalcResult({
        nextVaccine: '16-24 Months: MR-2, DPT Booster-1, OPV Booster, Vitamin A-2',
        dueText: 'Due between 16 to 24 months',
      });
    } else {
      setQuickCalcResult({
        nextVaccine: '5-6 Years: DPT Booster-2 (School Entry Immunization)',
        dueText: 'Childhood booster dose',
      });
    }
  };

  // Preview data
  const previewClinics = NEARBY_CLINICS.slice(0, 3);
  const previewAlerts = OUTBREAK_ALERTS.slice(0, 2);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* 1. HERO SECTION & HEALTH SEARCH */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-800 text-white p-6 sm:p-10 shadow-xl shadow-teal-900/10 border border-teal-600/30">
        {/* Subtle decorative circles */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-teal-100 text-xs font-semibold border border-white/20 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight sm:leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-teal-100/90 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Health Awareness Search / Chat Query Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl p-1.5 shadow-2xl border border-teal-200/50 gap-2">
              <div className="flex items-center flex-1 px-3 py-1.5 gap-2.5">
                <Search className="w-5 h-5 text-teal-600 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t.askAiButton}</span>
              </button>
            </div>
          </form>

          {/* Popular / Suggested Query Pills */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-teal-200/80 font-medium hidden sm:inline">Try asking:</span>
            {t.popularQueries.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(pq)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-white/90 transition-colors border border-white/10 text-[11px] sm:text-xs cursor-pointer text-left"
              >
                {pq}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. EMERGENCY LIFELINE BANNER (HIGH PROMINENCE) */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-rose-200 shadow-md shadow-rose-600/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>{t.emergencyTitle}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {t.goldenHourTitle}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.emergencyDesc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1.5 text-xs text-slate-700">
              {t.redFlags.map((rf, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span className="font-medium text-[11.5px] leading-tight">{rf}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 justify-center">
            <a
              href="tel:108"
              className="px-5 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>{t.ambulanceText}</span>
            </a>
            <a
              href="tel:104"
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.helplineText}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. MAIN NAVIGATION / QUICK ACTION CARDS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t.quickActionsTitle}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {t.quickActionsSubtitle}
            </p>
          </div>
          <button
            onClick={onOpenDisclaimer}
            className="text-xs text-teal-700 font-bold hover:underline self-start sm:self-auto cursor-pointer"
          >
            {t.readDisclaimer} →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Chatbot */}
          <div
            onClick={() => onNavigate('chat')}
            className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-600/5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  {t.actions.chat.tag}
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                  {t.actions.chat.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {t.actions.chat.desc}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>Start Health Conversation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Symptom Triage */}
          <div
            onClick={() => onNavigate('symptom-triage')}
            className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-600/5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {t.actions.triage.tag}
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {t.actions.triage.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {t.actions.triage.desc}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Check Symptoms Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Vaccination Schedule */}
          <div
            onClick={() => onNavigate('vaccines')}
            className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-600/5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <Syringe className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  {t.actions.vaccines.tag}
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                  {t.actions.vaccines.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {t.actions.vaccines.desc}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
              <span>Calculate Immunization Dates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Nearby Clinics */}
          <div
            onClick={() => onNavigate('clinics')}
            className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-600/5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {t.actions.clinics.tag}
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {t.actions.clinics.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {t.actions.clinics.desc}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>Find Nearest Facility</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Outbreak Alerts */}
          <div
            onClick={() => onNavigate('alerts')}
            className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-600/5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <BellRing className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {t.actions.alerts.tag}
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                  {t.actions.alerts.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {t.actions.alerts.desc}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>View Surveillance Advisories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Grounded RAG & Judge Inspection */}
          <div
            onClick={() => onNavigate('rag-inspector')}
            className="group bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 hover:shadow-lg hover:shadow-indigo-950/20 transition-all cursor-pointer flex flex-col justify-between border border-indigo-800"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                  Judge View
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-white group-hover:text-indigo-200 transition-colors">
                  RAG Architecture & Embeddings
                </h3>
                <p className="text-xs text-indigo-100/80 mt-1 leading-relaxed">
                  Inspect the semantic retrieval pipeline, vector cosine similarities, and MoHFW citation verification.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-indigo-300">
              <span>Inspect Vector Pipeline</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. TWO-COLUMN SPLIT: VACCINE CALCULATOR WIDGET & SURVEILLANCE FEED */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Quick Vaccine Reminder Widget */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <Syringe className="w-4 h-4 text-teal-600" />
              <span>Universal Immunization Programme (UIP)</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              {t.vaccineCardTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.vaccineCardDesc}
            </p>

            <form onSubmit={handleCalculateQuickVaccine} className="mt-4 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="date"
                  value={previewDob}
                  onChange={(e) => setPreviewDob(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-teal-600"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {t.calculateButton}
                </button>
              </div>
            </form>

            {quickCalcResult && (
              <div className="mt-3.5 p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs space-y-1 animate-fadeIn">
                <span className="font-extrabold text-teal-900 block">
                  Next Scheduled Vaccine:
                </span>
                <p className="text-teal-800 font-semibold">{quickCalcResult.nextVaccine}</p>
                <span className="text-[11px] text-teal-600 font-medium block">
                  ● {quickCalcResult.dueText}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('vaccines')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>{t.viewFullSchedule}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Live Outbreak Bulletins Preview */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                <BellRing className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>{t.alertsTitle}</span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                Live Feed
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {previewAlerts.map((alert) => {
                const title = language === 'hi' ? alert.title.hi : language === 'te' ? alert.title.te : alert.title.en;
                return (
                  <div
                    key={alert.id}
                    onClick={() => onNavigate('alerts')}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 transition-all cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={`font-bold px-2 py-0.5 rounded-md ${
                        alert.severity === 'High Alert' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-slate-500 font-medium">{alert.affectedRegion}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{alert.disease}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onNavigate('alerts')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>{t.viewAllAlerts}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. NEARBY HEALTHCARE FACILITIES PREVIEW */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Public Health Infrastructure Directory</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              {t.clinicsTitle}
            </h3>
          </div>
          <button
            onClick={() => onNavigate('clinics')}
            className="text-xs text-teal-700 font-bold hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{t.viewAllClinics}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {previewClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50/50 hover:bg-white transition-all space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    {clinic.type.split(' ')[0]}
                  </span>
                  {clinic.hasEmergency24x7 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      24x7 Emergency
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-black text-slate-900 leading-snug">{clinic.name}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{clinic.address}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-600 font-semibold text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>{clinic.distanceKm} km away</span>
                </div>
                <a
                  href={`tel:${clinic.contactNumber}`}
                  className="px-2.5 py-1 rounded-md bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. COMMUNITY SUPPORT & AWARENESS GUARANTEE */}
      <section className="rounded-2xl p-5 sm:p-6 bg-slate-100 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Users className="w-5 h-5" />
          </div>
          <div className="space-y-1 max-w-2xl">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
              {t.communitySupportTitle}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.communitySupportDesc}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDisclaimer}
          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
        >
          {t.readDisclaimer}
        </button>
      </section>
    </div>
  );
};
