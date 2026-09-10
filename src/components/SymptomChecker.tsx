import React, { useState } from 'react';
import { Language, TriageResult } from '../types';
import { 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  HelpCircle, 
  Stethoscope, 
  RotateCcw,
  ShieldCheck,
  Building2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface SymptomCheckerProps {
  language: Language;
  onSwitchToClinics: () => void;
  onOpenDisclaimer: () => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({
  language,
  onSwitchToClinics,
  onOpenDisclaimer,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [hasRedFlags, setHasRedFlags] = useState<string[]>([]);
  const [ageGroup, setAgeGroup] = useState<'infant' | 'child' | 'adult' | 'elderly' | 'pregnant'>('adult');
  const [durationDays, setDurationDays] = useState<number>(2);
  const [result, setResult] = useState<TriageResult | null>(null);

  const symptomList = [
    { id: 'fever_high', labelEn: 'Sudden High Fever (>102°F)', labelHi: 'अचानक तेज बुखार (>102°F)', labelTe: 'అకస్మాత్తుగా తీవ్ర జ్వరం' },
    { id: 'fever_chills', labelEn: 'Fever with Shivering & Chills', labelHi: 'कंपकंपी और ठंड के साथ बुखार', labelTe: 'చలితో వణుకుతూ వచ్చే జ్వరం' },
    { id: 'headache_eye', labelEn: 'Pain behind the eyes & severe headache', labelHi: 'आंखों के पीछे दर्द व सिरदर्द', labelTe: 'కళ్ళ వెనుక నొప్పి & తీవ్ర తలనొప్పి' },
    { id: 'joint_pain', labelEn: 'Severe joint & muscle pain (Breakbone)', labelHi: 'जोड़ों व मांसपेशियों में तेज दर्द', labelTe: 'కీళ్ళు & కండరాల తీవ్ర నొప్పులు' },
    { id: 'loose_stools', labelEn: 'Watery loose stools & diarrhoea', labelHi: 'पानी जैसे पतले दस्त', labelTe: 'నీళ్ల విరేచనాలు' },
    { id: 'vomiting', labelEn: 'Nausea and repeated vomiting', labelHi: 'जी मिचलाना और बार-बार उल्टी', labelTe: 'వాంతులు & వికారం' },
    { id: 'cough_prolonged', labelEn: 'Cough lasting more than 2 weeks', labelHi: '2 सप्ताह से अधिक समय से खांसी', labelTe: '2 వారాలకు మించి దగ్గు' },
    { id: 'skin_rash', labelEn: 'Skin rash or red spots on body', labelHi: 'त्वचा पर लाल दाने या चकत्ते', labelTe: 'చర్మంపై దద్దుర్లు లేదా ఎర్రటి మచ్చలు' },
    { id: 'extreme_thirst', labelEn: 'Dry mouth, sunken eyes, extreme thirst', labelHi: 'मुंह सूखना, अत्यधिक प्यास, धंसी आंखें', labelTe: 'నోరు ఎండిపోవడం, విపరీతమైన దాహం' },
    { id: 'animal_bite', labelEn: 'Recent animal bite (dog/monkey/cat)', labelHi: 'कुत्ते, बंदर या बिल्ली का काटना', labelTe: 'కుక్క లేదా జంతువు కాటు' },
  ];

  const redFlagOptions = [
    { id: 'rf_bleed', labelEn: 'Bleeding from gums, nose, or blood in stool/vomit', labelHi: 'मसूड़ों/नाक से खून आना, उल्टी या शौच में खून', labelTe: 'చిగుళ్ళు/ముక్కు నుండి రక్తం, మలంలో రక్తం' },
    { id: 'rf_breath', labelEn: 'Severe difficulty breathing or gasping', labelHi: 'सांस लेने में भारी तकलीफ या घरघराहट', labelTe: 'తీవ్రమైన శ్వాస తీసుకోవడంలో ఇబ్బంది' },
    { id: 'rf_unconscious', labelEn: 'Confusion, extreme drowsiness, or fainting', labelHi: 'अत्यधिक सुस्ती, बेहोशी या भ्रम की स्थिति', labelTe: 'స్పృహ తగ్గడం లేదా స్పృహ కోల్పోవడం' },
    { id: 'rf_no_urine', labelEn: 'No urination for over 8 hours (Severe dehydration)', labelHi: '8 घंटे से अधिक समय से पेशाब न आना', labelTe: '8 గంటలుగా మూత్రం రాకపోవడం' },
    { id: 'rf_belly_pain', labelEn: 'Severe, unyielding abdominal pain', labelHi: 'पेट में असहनीय, लगातार तेज दर्द', labelTe: 'తీవ్రమైన కడుపు నొప్పి' },
  ];

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleRedFlag = (id: string) => {
    setHasRedFlags(prev => 
      prev.includes(id) ? prev.filter(rf => rf !== id) : [...prev, id]
    );
  };

  const evaluateTriage = () => {
    // Evaluation Logic based on National Health Mission Clinical Triage Guidelines
    const isEmergency = hasRedFlags.length > 0 || 
      (selectedSymptoms.includes('animal_bite')) || 
      (selectedSymptoms.includes('fever_high') && durationDays > 4 && ageGroup === 'infant');

    const isModerate = !isEmergency && (
      selectedSymptoms.length >= 3 ||
      selectedSymptoms.includes('cough_prolonged') ||
      (selectedSymptoms.includes('loose_stools') && selectedSymptoms.includes('vomiting')) ||
      durationDays >= 4
    );

    if (isEmergency) {
      setResult({
        severity: 'emergency',
        titleEn: 'Immediate Emergency Care Required',
        titleHi: 'तत्काल आपातकालीन चिकित्सा की आवश्यकता है',
        titleTe: 'తక్షణ అత్యవసర వైద్య చికిత్స అవసరం',
        explanationEn: 'One or more high-risk danger signs are present. Delayed care in severe conditions can be dangerous.',
        explanationHi: 'एक या अधिक गंभीर खतरे के लक्षण मौजूद हैं। ऐसे मामलों में देरी करना खतरनाक हो सकता है।',
        explanationTe: 'ఒకటి లేదా అంతకంటే ఎక్కువ తీవ్రమైన ప్రమాద సంకేతాలు ఉన్నాయి. ఆలస్యం చేయకుండా వెంటనే ఆసుపత్రికి వెళ్ళండి.',
        recommendationsEn: [
          'Dial 108 Emergency Ambulance immediately for transportation to the nearest CHC or District Hospital.',
          'If an animal bite occurred, wash with soap and running water for 15 minutes and receive ARV vaccine immediately.',
          'Do NOT give unprescribed over-the-counter painkillers like Ibuprofen or Aspirin.',
          'Alert your village ASHA worker or Community Health Officer for urgent transfer support.',
        ],
        recommendationsHi: [
          'तुरंत 108 एम्बुलेंस पर कॉल करें और नजदीकी सामुदायिक स्वास्थ्य केंद्र (CHC) या जिला अस्पताल पहुंचें।',
          'यदि जानवर ने काटा है, तो घाव को बहते पानी व साबुन से 15 मिनट धोएं और तुरंत एंटी-रेबीज टीका (ARV) लगवाएं।',
          'इबुप्रोफेन या एस्पिरिन जैसी दर्दनिवारक दवाएं कतई न लें।',
          'स्थानीय आशा कार्यकर्ता या स्वास्थ्य अधिकारी को तुरंत सूचित करें।',
        ],
        recommendationsTe: [
          'వెంటనే 108 అంబులెన్స్‌కు కాల్ చేసి సమీప సామాజిక ఆరోగ్య కేంద్రం (CHC) లేదా జిల్లా ఆసుపత్రికి చేరుకోండి.',
          'జంతువు కాటు అయితే, 15 నిమిషాల పాటు సబ్బు నీటితో కడిగి వెంటనే యాంటీ-రేబిస్ టీకా వేయించుకోండి.',
          'డాక్టర్ సలహా లేకుండా నొప్పి నివారణ మాత్రలు వేసుకోవద్దు.',
          'గ్రామ ఆశా కార్యకర్త సహాయం తీసుకోండి.',
        ],
        escalateTo: 'Immediate Emergency Hospital / Call 108',
        disclaimer: 'This assessment is for public awareness and symptom triage only. It is NOT a clinical medical diagnosis.',
      });
    } else if (isModerate) {
      setResult({
        severity: 'moderate',
        titleEn: 'Primary Health Centre (PHC) Visit Advised',
        titleHi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) में डॉक्टर को दिखाना आवश्यक है',
        titleTe: 'ప్రాథమిక ఆరోగ్య కేంద్రం (PHC) లో వైద్యుడిని సంప్రదించండి',
        explanationEn: 'Symptoms indicate a moderate infection or persistent ailment (such as probable Dengue, Malaria, Typhoid, or Prolonged Cough) requiring lab tests.',
        explanationHi: 'लक्षण किसी संक्रमण (जैसे संभावित डेंगू, मलेरिया, टाइफाइड या टीबी) की ओर संकेत करते हैं, जिनकी जांच सरकारी अस्पताल में आवश्यक है।',
        explanationTe: 'ఈ లక్షణాలు డెంగ్యూ, మలేరియా, టైఫాయిడ్ లేదా క్షయ వంటి వ్యాధులకు సంబంధించినవి కావచ్చు. రక్త పరీక్షలు అవసరం.',
        recommendationsEn: [
          'Visit your nearest Primary Health Centre (PHC) or Ayushman Arogya Mandir within 24 hours for free rapid blood tests (Malaria RDT, Dengue NS1, CBC).',
          'Stay well hydrated with ORS, coconut water, and clean fluids.',
          'Take Paracetamol only if fever exceeds 100°F (under doctor/ANM guidance).',
          'If symptoms worsen or any red-flag appears, escalate immediately to 108.',
        ],
        recommendationsHi: [
          'अगले 24 घंटे के भीतर नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) जाकर मुफ्त मलेरिया, डेंगू या बलगम की जांच कराएं।',
          'ओआरएस (ORS), नारियल पानी और साफ़ तरल पदार्थों का सेवन जारी रखें।',
          'हल्के बुखार में केवल पैरासिटामोल लें, अन्य दवाएं डॉक्टर से पूछकर ही लें।',
          'यदि कोई गंभीर लक्षण (खून आना, तेज पेट दर्द) दिखे, तो तुरंत 108 पर कॉल करें।',
        ],
        recommendationsTe: [
          'రాబోయే 24 గంటల్లో సమీప ప్రాథమిక ఆరోగ్య కేంద్రం (PHC) కి వెళ్లి ఉచిత రక్త పరీక్షలు చేయించుకోండి.',
          'ఓఆర్ఎస్, కొబ్బరి నీళ్ళు ఎక్కువగా త్రాగాలి.',
          'పారాసిటమాల్ మాత్రమే వాడండి, ఇతర మందులు డాక్టర్ సూచించిన తర్వాతే వాడాలి.',
          'లక్షణాలు తీవ్రమైతే వెంటనే 108 కి కాల్ చేయండి.',
        ],
        escalateTo: 'Visit PHC / Sub-Centre (24h)',
        disclaimer: 'This assessment is for public awareness and symptom triage only. It is NOT a clinical medical diagnosis.',
      });
    } else {
      setResult({
        severity: 'mild',
        titleEn: 'Mild Symptoms – Supportive Home Care & Monitoring',
        titleHi: 'हल्के लक्षण – घरेलू देखभाल व निगरानी',
        titleTe: 'స్వల్ప లక్షణాలు – విశ్రాంతి & పరిశీలన',
        explanationEn: 'The selected symptoms are currently mild with no danger signs. Close observation and supportive hydration are recommended.',
        explanationHi: 'वर्तमान में लक्षण हल्के हैं और कोई खतरे का संकेत नहीं है। उचित आराम, तरल पदार्थ और निगरानी की आवश्यकता है।',
        explanationTe: 'ప్రస్తుతం లక్షణాలు స్వల్పంగా ఉన్నాయి, ప్రమాద సంకేతాలు లేవు. విశ్రాంతి మరియు తగినంత నీరు త్రాగడం ముఖ్యం.',
        recommendationsEn: [
          'Drink plenty of clean fluids: ORS, lemon water, rice kanji, or buttermilk.',
          'Ensure complete physical rest in a cool, mosquito-netted environment.',
          'Monitor body temperature twice daily.',
          'If fever persists beyond 3 days or new symptoms emerge, visit the local PHC or inform the ASHA worker.',
        ],
        recommendationsHi: [
          'भरपूर साफ़ पानी, ओआरएस का घोल, दाल का पानी या छाछ पिएं।',
          'पर्याप्त आराम करें और मच्छरदानी में सोएं।',
          'दिन में दो बार थर्मामीटर से तापमान मापें।',
          'यदि बुखार 3 दिन से अधिक रहे, तो नजदीकी स्वास्थ्य केंद्र या आशा कार्यकर्ता से संपर्क करें।',
        ],
        recommendationsTe: [
          'స్వచ్ఛమైన నీరు, ఓఆర్ఎస్ ద్రావణం, మజ్జిగ పుష్కలంగా త్రాగాలి.',
          'మంచి విశ్రాంతి తీసుకోవాలి, దోమతెర కింద పడుకోవాలి.',
          'రోజుకు రెండుసార్లు జ్వరం కొలవండి.',
          'జ్వరం 3 రోజులకు మించి తగ్గకపోతే వెంటనే ప్రాథమిక ఆరోగ్య కేంద్రానికి వెళ్ళండి.',
        ],
        escalateTo: 'Home Care + Monitor',
        disclaimer: 'This assessment is for public awareness and symptom triage only. It is NOT a clinical medical diagnosis.',
      });
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setHasRedFlags([]);
    setResult(null);
    setCurrentStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
            <Stethoscope className="w-4 h-4" />
            <span>Community Health Triage Tool</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            {language === 'hi' ? 'चरणबद्ध लक्षण जांच व मार्गदर्शन' : language === 'te' ? 'దశలవారీగా లక్షణాల పరిశీలన & మార్గదర్శకత్వం' : 'Step-by-Step Health Triage & Guidance'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'hi' 
              ? 'ग्रामीण व अर्ध-शहरी समुदायों के लिए 3-चरणीय प्राथमिक स्वास्थ्य मार्गदर्शन और खतरे के संकेतों की पहचान'
              : language === 'te'
              ? 'గ్రామీణ మరియు పట్టణ ప్రజల కోసం 3-దశల ప్రాథమిక ఆరోగ్య సూచనలు మరియు ప్రమాద సంకేతాల గుర్తింపు'
              : 'Structured 3-step community triage to identify common ailments and detect red-flag danger signs.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDisclaimer}
            className="text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Non-Diagnostic Disclaimer
          </button>
        </div>
      </div>

      {!result ? (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          {/* Step Progress Tracker */}
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between gap-2 max-w-xl mx-auto">
              {[
                { step: 1, title: language === 'hi' ? '१. रोगी विवरण' : language === 'te' ? '1. వ్యక్తి వివరాలు' : '1. Patient Info' },
                { step: 2, title: language === 'hi' ? '२. लक्षण चयन' : language === 'te' ? '2. లక్షణాలు' : '2. Symptoms' },
                { step: 3, title: language === 'hi' ? '३. खतरे के संकेत' : language === 'te' ? '3. ప్రమాద సంకేతాలు' : '3. Danger Signs' },
              ].map((s) => {
                const isActive = currentStep === s.step;
                const isCompleted = currentStep > s.step;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setCurrentStep(s.step as any)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-teal-50 text-teal-800 border border-teal-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                      isActive ? 'bg-white text-teal-700' : isCompleted ? 'bg-teal-600 text-white' : 'bg-slate-300 text-slate-700'
                    }`}>
                      {isCompleted ? '✓' : s.step}
                    </span>
                    <span>{s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 1: Patient Category & Duration */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
                  <span>{language === 'hi' ? 'रोगी की आयु या श्रेणी चुनें:' : language === 'te' ? 'వ్యక్తి వయస్సు వర్గాన్ని ఎంచుకోండి:' : 'Select Patient Category:'}</span>
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Triage thresholds adapt automatically for infants, pregnant mothers, and elderly persons.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'infant', label: 'Infant (<1 yr)' },
                    { id: 'child', label: 'Child (1-12 yr)' },
                    { id: 'adult', label: 'Adult (13-59 yr)' },
                    { id: 'elderly', label: 'Elderly (60+ yr)' },
                    { id: 'pregnant', label: 'Pregnant Mother' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setAgeGroup(cat.id as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                        ageGroup === cat.id
                          ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-600/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="text-xs font-bold text-slate-800 block mb-1.5">
                  {language === 'hi' ? 'लक्षण कितने दिनों से दिखाई दे रहे हैं?' : language === 'te' ? 'లక్షణాలు ఎన్ని రోజులుగా ఉన్నాయి?' : 'How long have symptoms lasted?'}
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full sm:w-80 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-teal-600"
                >
                  <option value={1}>1 Day (Just started today)</option>
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days</option>
                  <option value={5}>4 to 7 Days (Persistent)</option>
                  <option value={15}>More than 2 weeks (Chronic / Sub-acute)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-2">
                  *Fever lasting &gt;3 days or cough &gt;2 weeks warrants government lab testing (Dengue NS1, Malaria smear, or Sputum AFB).
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>{language === 'hi' ? 'अगला: लक्षण चुनें' : language === 'te' ? 'తర్వాత: లక్షణాలు ఎంచుకోండి' : 'Next: Choose Symptoms'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Observed Common Symptoms */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {language === 'hi' ? 'अनुभव किए जा रहे लक्षण चुनें' : language === 'te' ? 'కనిపిస్తున్న లక్షణాలను ఎంచుకోండి' : 'Select Observed Symptoms'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'hi' ? 'लागू होने वाले सभी लक्षणों पर क्लिक करें' : language === 'te' ? 'వర్తించే అన్ని లక్షణాలపై క్లిక్ చేయండి' : 'Click on all symptoms that apply:'}
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-lg border border-teal-200">
                  {selectedSymptoms.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {symptomList.map((item) => {
                  const isSelected = selectedSymptoms.includes(item.id);
                  const label = language === 'hi' ? item.labelHi : language === 'te' ? item.labelTe : item.labelEn;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSymptom(item.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/80 text-teal-950 ring-1 ring-teal-600'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-semibold">{label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>{language === 'hi' ? 'अगला: खतरे के संकेत जांचें' : language === 'te' ? 'తర్వాత: ప్రమాద సంకేతాల పరిశీలన' : 'Next: Check Danger Signs'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Red Flags (Critical Warning Signs) */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-rose-50/80 p-4 rounded-xl border border-rose-200">
                <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>{language === 'hi' ? 'खतरे के संकेत (रेड फ्लैग्स) - ध्यान दें' : language === 'te' ? 'ముఖ్యమైన ప్రమాద సంకేతాలు' : 'Danger Signs / Red Flags Check'}</span>
                </h3>
                <p className="text-xs text-rose-800 mb-3">
                  {language === 'hi' ? 'यदि इनमें से कोई भी लक्षण है तो यह तत्काल अस्पताल जाने का संकेत है:' : language === 'te' ? 'ఇందులో ఏదైనా ఉంటే వెంటనే ఆసుపత్రికి వెళ్ళాలి:' : 'Does the person have any of these life-threatening indicators? Check all that apply:'}
                </p>

                <div className="space-y-2">
                  {redFlagOptions.map((rf) => {
                    const isChecked = hasRedFlags.includes(rf.id);
                    const label = language === 'hi' ? rf.labelHi : language === 'te' ? rf.labelTe : rf.labelEn;
                    return (
                      <button
                        key={rf.id}
                        type="button"
                        onClick={() => toggleRedFlag(rf.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isChecked
                            ? 'border-rose-600 bg-rose-100 text-rose-950 font-bold shadow-xs'
                            : 'border-rose-200 hover:border-rose-300 text-rose-900 bg-white'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-rose-600 border-rose-600 text-white' : 'border-rose-300'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>

                <button
                  type="button"
                  onClick={evaluateTriage}
                  disabled={selectedSymptoms.length === 0 && hasRedFlags.length === 0}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                    selectedSymptoms.length === 0 && hasRedFlags.length === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-700/20'
                  }`}
                >
                  {language === 'hi' ? 'लक्षणों का विश्लेषण व मार्गदर्शन प्राप्त करें' : language === 'te' ? 'ఫలితాలను విశ్లేషించండి' : 'Analyze Symptoms & Get Guidance'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className={`p-5 rounded-2xl border flex items-start gap-4 ${
            result.severity === 'emergency'
              ? 'bg-rose-50 border-rose-300 text-rose-950'
              : result.severity === 'moderate'
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          }`}>
            <div className={`p-3 rounded-xl shrink-0 ${
              result.severity === 'emergency' ? 'bg-rose-600 text-white' : result.severity === 'moderate' ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
            }`}>
              {result.severity === 'emergency' ? (
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              ) : result.severity === 'moderate' ? (
                <AlertCircle className="w-6 h-6" />
              ) : (
                <CheckCircle2 className="w-6 h-6" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full ${
                  result.severity === 'emergency'
                    ? 'bg-rose-200 text-rose-900 border border-rose-300'
                    : result.severity === 'moderate'
                    ? 'bg-amber-200 text-amber-900 border border-amber-300'
                    : 'bg-emerald-200 text-emerald-900 border border-emerald-300'
                }`}>
                  {result.severity.toUpperCase()} TIER
                </span>
                <span className="text-xs font-bold text-slate-600">
                  Target Action: {result.escalateTo}
                </span>
              </div>

              <h3 className="text-lg font-black mt-1">
                {language === 'hi' ? result.titleHi : language === 'te' ? result.titleTe : result.titleEn}
              </h3>

              <p className="text-xs mt-1 leading-relaxed opacity-90 font-medium">
                {language === 'hi' ? result.explanationHi : language === 'te' ? result.explanationTe : result.explanationEn}
              </p>
            </div>
          </div>

          {/* Action Recommendations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>{language === 'hi' ? 'सलाह व अनुशंसित कदम:' : language === 'te' ? 'సిఫార్సు చేయబడిన చర్యలు:' : 'Recommended Steps (MoHFW Protocol):'}</span>
            </h4>

            <div className="space-y-2.5">
              {(language === 'hi' ? result.recommendationsHi : language === 'te' ? result.recommendationsTe : result.recommendationsEn).map((rec, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'hi' ? 'नई जांच करें' : language === 'te' ? 'మళ్ళీ పరిశీలించండి' : 'Start Over'}</span>
            </button>

            <div className="flex items-center gap-2">
              <a
                href="tel:108"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 108</span>
              </a>
              <button
                onClick={onSwitchToClinics}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Find Nearby PHC/Hospital</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
