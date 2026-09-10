import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatMessage, 
  Language, 
  InterfaceMode, 
  SourceReference 
} from '../types';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Sparkles,
  PhoneCall,
  CheckCheck,
  User,
  Bot,
  Info,
  Copy,
  Check
} from 'lucide-react';

interface ChatInterfaceProps {
  language: Language;
  interfaceMode: InterfaceMode;
  onOpenDisclaimer: () => void;
  onSwitchToClinics: () => void;
  initialQuery?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  language,
  interfaceMode,
  onOpenDisclaimer,
  onSwitchToClinics,
  initialQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: language === 'hi' 
          ? `नमस्ते! मैं AI-FORCE सार्वजनिक स्वास्थ्य जागरूकता सहायक हूँ।\n\nआप मुझसे डेंगू, मलेरिया, टाइफाइड, टीबी, बच्चों के टीकाकरण, ओआरएस घोल, या प्राथमिक स्वास्थ्य केंद्र (PHC) की जानकारी किसी भी भाषा में पूछ सकते हैं।\n\nकृपया ध्यान दें: यह प्रणाली केवल स्वास्थ्य जागरूकता के लिए है, डॉक्टरी निदान के लिए नहीं।`
          : language === 'te'
          ? `నమస్కారం! నేను AI-FORCE ప్రజా ఆరోగ్య అవగాహన సహాయకుడిని.\n\nమీరు డెంగ్యూ, మలేరియా, టైఫాయిడ్, టీబీ, చిన్నపిల్లల టీకాలు, లేదా సమీప ప్రాథమిక ఆరోగ్య కేంద్రాల (PHC) గురించి నన్ను అడగవచ్చు.\n\nముఖ్య గమనిక: ఇది కేవలం అవగాహన కోసం మాత్రమే, వైద్య నిర్ధారణ కోసం కాదు.`
          : `Hello! I am AI-FORCE, your AI-powered Public Health Assistant.\n\nI can help you with reliable information on Dengue, Malaria, Typhoid, Diarrhoea & ORS, Childhood Vaccinations, Heatwave precautions, and finding nearby Primary Health Centres.\n\nImportant Note: This is an informational and health awareness system, NOT a medical diagnosis system.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: language,
        sources: [
          {
            id: 'mohfw-welcome',
            title: 'National Health Mission Public Guidelines',
            organization: 'MoHFW (Govt of India)',
            url: 'https://nhm.gov.in',
            year: '2024',
            verified: true,
          }
        ]
      }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const hasProcessedInitialQuery = useRef(false);

  const suggestedQuestions: Record<Language, string[]> = {
    en: [
      'What are the symptoms of dengue?',
      'How to prepare ORS solution at home?',
      'Polio & Pentavalent vaccine schedule',
      'What should I do immediately after a dog bite?',
      'How to protect from summer heatstroke?',
    ],
    hi: [
      'डेंगू के लक्षण क्या हैं?',
      'घर पर ओआरएस (ORS) का घोल कैसे बनाएं?',
      'बच्चों का टीका (पोलियो व पेंटावेलेंट) कब लगता है?',
      'कुत्ते के काटने पर तुरंत क्या करना चाहिए?',
      'लू (हीटस्ट्रोक) से बचने के मुख्य उपाय क्या हैं?',
    ],
    te: [
      'డెంగ్యూ లక్షణాలు ఏమిటి?',
      'ఇంట్లో ఓఆర్ఎస్ (ORS) ద్రావణం ఎలా తయారు చేయాలి?',
      'చిన్నపిల్లల టీకాలు ఎప్పుడు వేయించాలి?',
      'కుక్క కాటు వేసినప్పుడు వెంటనే ఏం చేయాలి?',
      'వడదెబ్బ తగలకుండా తీసుకోవాల్సిన జాగ్రత్తలు ఏమిటి?',
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Speech Recognition setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    }
  };

  // Text to Speech Read-Aloud
  const handleReadAloud = (messageId: string, text: string, msgLang: Language) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown characters for pleasant speech synthesis
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .substring(0, 800);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = msgLang === 'hi' ? 'hi-IN' : msgLang === 'te' ? 'te-IN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: language,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text || 'Information retrieved.',
        timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: data.detectedLanguage || language,
        sources: data.sources || [],
        retrievedChunks: data.retrievedChunks || [],
        isEmergencyAlert: data.isEmergencyAlert || false,
        emergencyActions: data.emergencyActions || [],
        suggestedFollowUps: data.suggestedFollowUps || [],
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const fallbackMessage: ChatMessage = {
        id: `assistant-fallback-${Date.now()}`,
        sender: 'assistant',
        text: language === 'hi'
          ? 'क्षमा करें, सूचना प्राप्त करने में कुछ कठिनाई हुई। कृपया अपना प्रश्न दोबारा पूछें या आपातकाल में 108 डायल करें।'
          : language === 'te'
          ? 'క్షమించండి, సమాచారాన్ని పొందడంలో అంతరాయం ఏర్పడింది. దయచేసి మళ్ళీ ప్రయత్నించండి లేదా అత్యవసర పరిస్థితుల్లో 108 కి కాల్ చేయండి.'
          : 'I encountered an issue retrieving the data. Please try asking again, or dial 108 for emergency health guidance.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: language,
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery && !hasProcessedInitialQuery.current) {
      hasProcessedInitialQuery.current = true;
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleCopyMessage = (id: string, text: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear conversation history?')) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      setMessages([
        {
          id: `welcome-cleared-${Date.now()}`,
          sender: 'assistant',
          text: language === 'hi'
            ? 'चर्चा साफ़ कर दी गई है। आप कोई भी नया स्वास्थ्य प्रश्न पूछ सकते हैं।'
            : language === 'te'
            ? 'సంభాషణ క్లియర్ చేయబడింది. మీరు ఏదైనా కొత్త ఆరోగ్య ప్రశ్నను అడగవచ్చు.'
            : 'Conversation cleared. How can I assist with your public health awareness today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          language: language,
        }
      ]);
    }
  };

  const handleExportChat = () => {
    const transcript = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n');
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI-FORCE-Health-Transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const isWhatsApp = interfaceMode === 'whatsapp';

  return (
    <div className={`flex flex-col h-[calc(100vh-140px)] min-h-[550px] max-w-5xl mx-auto ${isWhatsApp ? 'bg-[#efeae2]' : 'bg-white rounded-2xl border border-slate-200 shadow-sm'} overflow-hidden`}>
      {/* WhatsApp Custom Header (if WhatsApp mode selected) */}
      {isWhatsApp && (
        <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-white text-[#075e54] flex items-center justify-center font-bold text-lg shadow-inner">
              <Bot className="w-6 h-6 text-[#075e54]" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075e54] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-base leading-tight">
                <span>AI-FORCE Swasthya Bot</span>
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
              </div>
              <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                <span>Verified Public Health AI</span> • <span>online</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportChat}
              className="p-1.5 hover:bg-[#128c7e] rounded-full text-white transition-colors cursor-pointer"
              title="Export Conversation"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleClearChat}
              className="p-1.5 hover:bg-[#128c7e] rounded-full text-white transition-colors cursor-pointer"
              title="Clear Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Web Header Action Bar (if Web mode selected) */}
      {!isWhatsApp && (
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="font-semibold text-slate-800">
              {language === 'hi' ? 'स्वास्थ्य जागरूकता संवाद' : language === 'te' ? 'ఆరోగ్య సమాచార చాట్' : 'Health Awareness Chat'}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-[11px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200 font-medium">
              RAG + Grounded LLM
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleExportChat}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Export Transcript"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Reset Conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages Container */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isWhatsApp ? 'bg-[radial-gradient(#d1d7db_1px,transparent_1px)] [background-size:16px_16px]' : 'bg-slate-50/50'}`}>
        {/* Medical Non-Diagnostic Banner */}
        <div className="max-w-2xl mx-auto bg-amber-50/90 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5 shadow-2xs">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-950">
              {language === 'hi' ? 'स्वास्थ्य जागरूकता सूचना:' : language === 'te' ? 'ఆరోగ్య అవగాహన సూచన:' : 'Public Health Awareness Notice:'}
            </p>
            <p className="text-amber-800 leading-relaxed mt-0.5">
              {language === 'hi' 
                ? 'यह प्रणाली केवल प्राथमिक जागरूकता और जानकारी के लिए है। यह डॉक्टरी निदान या दवा का नुस्खा नहीं है।'
                : language === 'te'
                ? 'ఈ సమాధానాలు అవగాహన కొరకు మాత్రమే. వైద్య చికిత్స కోసం సమీప ప్రాథమిక ఆరోగ్య కేంద్రాన్ని (PHC) సంప్రదించండి.'
                : 'This system provides vetted public health guidance only and does NOT provide medical diagnosis or prescriptions. Always consult a qualified medical professional.'}
            </p>
          </div>
          <button 
            onClick={onOpenDisclaimer} 
            className="text-amber-700 underline text-[11px] font-semibold whitespace-nowrap cursor-pointer hover:text-amber-900"
          >
            Details
          </button>
        </div>

        {/* Render Messages */}
        {messages.map((message) => {
          const isUser = message.sender === 'user';
          return (
            <div
              key={message.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} transition-all`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 text-sm leading-relaxed shadow-xs ${
                  isUser
                    ? isWhatsApp
                      ? 'bg-[#d9fdd3] text-slate-900 rounded-tr-xs'
                      : 'bg-teal-600 text-white rounded-tr-xs'
                    : isWhatsApp
                    ? 'bg-white text-slate-900 rounded-tl-xs border border-slate-200/60'
                    : 'bg-white text-slate-900 rounded-tl-xs border border-slate-200'
                }`}
              >
                {/* Emergency Alert Tag inside assistant message */}
                {message.isEmergencyAlert && (
                  <div className="mb-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 flex items-start gap-2.5 animate-pulse">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wide text-rose-700">
                        {language === 'hi' ? 'आपातकालीन चेतावनी' : language === 'te' ? 'అత్యవసర హెచ్చరిక' : 'Emergency Red Flag Warning'}
                      </h4>
                      <p className="text-xs text-rose-800 font-medium mt-0.5">
                        {language === 'hi' 
                          ? 'गंभीर लक्षण पाए गए हैं! तुरंत 108 डायल करें या नजदीकी अस्पताल के आपातकालीन विभाग में जाएं।'
                          : language === 'te'
                          ? 'ప్రమాదకర లక్షణాలు గుర్తించబడ్డాయి! వెంటనే 108 అంబులెన్స్‌కు కాల్ చేయండి లేదా ఆసుపత్రికి వెళ్ళండి.'
                          : 'Severe warning signs detected! Please call 108 Emergency Ambulance or proceed immediately to the nearest hospital casualty.'}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <a
                          href="tel:108"
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs shadow-xs"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call 108 Ambulance</span>
                        </a>
                        <button
                          onClick={onSwitchToClinics}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 rounded-lg font-semibold text-xs cursor-pointer"
                        >
                          Find Nearest Clinic
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message Body */}
                <div className="whitespace-pre-wrap font-sans text-[13.5px] sm:text-sm">
                  {message.text}
                </div>

                {/* Grounded Source Citations (for Assistant) */}
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      <span>{language === 'hi' ? 'सत्यापित स्रोत:' : language === 'te' ? 'ధృవీకరించబడిన మూలాలు:' : 'Verified Sources:'}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {message.sources.map((src) => (
                        <a
                          key={src.id}
                          href={src.url || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-[11px] font-medium transition-colors"
                        >
                          <span>{src.organization}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Audio Read Aloud & Timestamp Row */}
                <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    {!isUser && (
                      <button
                        onClick={() => handleReadAloud(message.id, message.text, message.language)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          speakingMessageId === message.id
                            ? 'bg-teal-100 text-teal-800 animate-pulse'
                            : 'hover:bg-slate-100 text-slate-600'
                        }`}
                        title={speakingMessageId === message.id ? 'Stop audio' : 'Listen aloud'}
                      >
                        {speakingMessageId === message.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-teal-700" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => handleCopyMessage(message.id, message.text)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                        copiedMessageId === message.id
                          ? 'bg-emerald-100 text-emerald-800'
                          : isUser
                          ? 'hover:bg-white/20 text-white/80'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                      title="Copy response text"
                    >
                      {copiedMessageId === message.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="text-emerald-700 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-1 ml-auto">
                    <span>{message.timestamp}</span>
                    {isUser && isWhatsApp && (
                      <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className={`p-3 rounded-2xl rounded-tl-xs text-xs flex items-center gap-2.5 ${
              isWhatsApp ? 'bg-white border border-slate-200 text-slate-600' : 'bg-white border border-slate-200 text-slate-600 shadow-xs'
            }`}>
              <div className="flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="font-medium text-slate-700">
                {language === 'hi' 
                  ? 'स्वास्थ्य मंत्रालय व WHO दिशा-निर्देशों से जानकारी खोजी जा रही है...'
                  : language === 'te'
                  ? 'MoHFW మరియు WHO నివేదికల నుండి పరిశీలిస్తోంది...'
                  : 'Retrieving verified guidelines from MoHFW & WHO knowledge base...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className={`px-4 py-2 border-t ${isWhatsApp ? 'bg-[#f0f2f5] border-slate-300' : 'bg-slate-50 border-slate-200'} overflow-x-auto scrollbar-none`}>
        <div className="flex gap-1.5 min-w-max">
          <span className="text-[11px] font-bold text-slate-500 flex items-center mr-1">
            {language === 'hi' ? 'सुझाव:' : language === 'te' ? 'సూచనలు:' : 'Suggested:'}
          </span>
          {suggestedQuestions[language].map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                isWhatsApp
                  ? 'bg-white hover:bg-emerald-50 text-slate-700 border border-slate-300 shadow-2xs hover:border-emerald-500'
                  : 'bg-white hover:bg-teal-50 text-slate-700 border border-slate-200 shadow-2xs hover:border-teal-500'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box & Voice Input Bar */}
      <div className={`p-3 sm:p-4 border-t ${isWhatsApp ? 'bg-[#f0f2f5] border-slate-300' : 'bg-white border-slate-200'}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-600/30'
                : isWhatsApp
                ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Speak your question (Voice input)'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              isListening
                ? (language === 'hi' ? 'सुन रहा हूँ... बोलिए' : language === 'te' ? 'వింటున్నాను... మాట్లాడండి' : 'Listening... please speak')
                : (language === 'hi' ? 'डेंगू, टीबी, टीका या स्वास्थ्य के बारे में पूछें...' : language === 'te' ? 'డెంగ్యూ, టీకాలు లేదా ఆరోగ్యం గురించి అడగండి...' : 'Ask about dengue, malaria, fever, vaccines, clinics...')
            }
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 text-sm rounded-xl outline-none transition-all ${
              isWhatsApp
                ? 'bg-white border border-slate-300 focus:border-emerald-600 text-slate-900 shadow-inner'
                : 'bg-slate-50 border border-slate-300 focus:border-teal-600 focus:bg-white text-slate-900'
            }`}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className={`p-2.5 rounded-xl font-semibold text-white transition-all cursor-pointer flex items-center justify-center shrink-0 ${
              isLoading || !inputValue.trim()
                ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                : isWhatsApp
                ? 'bg-[#00a884] hover:bg-[#068065] shadow-md shadow-[#00a884]/20'
                : 'bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-700/20'
            }`}
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
