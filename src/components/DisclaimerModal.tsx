import React from 'react';
import { Language } from '../types';
import { ShieldAlert, PhoneCall, CheckCircle2, HeartPulse, X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                {language === 'hi' ? 'महत्वपूर्ण चिकित्सा एवं सुरक्षा अस्वीकरण' : language === 'te' ? 'ముఖ్యమైన ఆరోగ్య & భద్రతా ప్రకటన' : 'Important Health & Safety Disclaimer'}
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                AI-FORCE Public Health Awareness System
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
            <strong className="block text-sm font-black mb-1">
              {language === 'hi' ? 'यह डॉक्टरी निदान प्रणाली नहीं है:' : language === 'te' ? 'ఇది వైద్య నిర్ధారణ వ్యవస్థ కాదు:' : 'NOT A MEDICAL DIAGNOSIS SYSTEM:'}
            </strong>
            <p>
              {language === 'hi'
                ? 'AI-FORCE केवल सार्वजनिक स्वास्थ्य जागरूकता, बीमारी की रोकथाम, टीकाकरण अनुसूची और प्राथमिक लक्षण मार्गदर्शन प्रदान करता है। यह किसी भी प्रकार का चिकित्सीय निदान (Medical Diagnosis) या दवा का नुस्खा (Prescription) नहीं है।'
                : language === 'te'
                ? 'AI-FORCE కేవలం ప్రజా ఆరోగ్య అవగాహన, వ్యాధి నివారణ, టీకాల పట్టిక మరియు లక్షణాల ప్రాథమిక సమాచారం కొరకు రూపొందించబడింది. ఇది వైద్య నిర్ధారణ లేదా చికిత్స కాదు.'
                : 'AI-FORCE is strictly an educational and health awareness system. It is NOT a clinical medical diagnosis system and does not replace in-person consultation with a registered medical practitioner.'}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {language === 'hi' ? 'आपातकालीन दिशा-निर्देश:' : language === 'te' ? 'అత్యవసర సూచనలు:' : 'Emergency Guidelines & Helplines:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="tel:108"
                className="p-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl flex items-center justify-between text-rose-900 transition-colors"
              >
                <div>
                  <span className="font-extrabold text-sm block">108</span>
                  <span className="text-[11px] text-rose-700 font-medium">Emergency Ambulance</span>
                </div>
                <PhoneCall className="w-4 h-4 text-rose-600" />
              </a>

              <a
                href="tel:104"
                className="p-3 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl flex items-center justify-between text-teal-900 transition-colors"
              >
                <div>
                  <span className="font-extrabold text-sm block">104</span>
                  <span className="text-[11px] text-teal-700 font-medium">State Health Helpline</span>
                </div>
                <PhoneCall className="w-4 h-4 text-teal-600" />
              </a>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <h4 className="font-bold text-slate-900 text-xs">
              {language === 'hi' ? 'समुदाय स्तर पर सहायता:' : language === 'te' ? 'గ్రామ స్థాయిలో సంప్రదించండి:' : 'Community Frontline Support:'}
            </h4>
            <p className="text-slate-600">
              {language === 'hi'
                ? 'किसी भी निरंतर बुखार, दस्त, या बच्चे के बीमार होने पर अपने गाँव की आशा (ASHA) कार्यकर्ता, एएनएम (ANM) या नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) से तत्काल संपर्क करें।'
                : language === 'te'
                ? 'తీవ్ర జ్వరం లేదా విరేచనాలు ఉన్నప్పుడు వెంటనే గ్రామ ఆశా కార్యకర్త లేదా సమీప ప్రాథమిక ఆరోగ్య కేంద్రాన్ని (PHC) సంప్రదించండి.'
                : 'For persistent fever, vomiting, diarrhea, or illness in children, please consult your village ASHA worker, ANM, or proceed to the nearest Primary Health Centre.'}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'hi' ? 'मैं समझता हूँ और स्वीकार करता हूँ' : language === 'te' ? 'నేను అర్థం చేసుకున్నాను' : 'I Understand & Accept'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
