import { KnowledgeChunk, SourceReference, VaccineItem, HealthFacility, OutbreakAlert } from '../types';

export const TRUSTED_SOURCES: Record<string, SourceReference> = {
  MOHFW_NVBDCP: {
    id: 'mohfw-nvbdcp-2024',
    title: 'National Vector Borne Disease Control Guidelines (NVBDCP)',
    organization: 'MoHFW (Govt of India)',
    url: 'https://nvbdcp.gov.in',
    year: '2024',
    verified: true,
  },
  WHO_DENGUE: {
    id: 'who-dengue-factsheet',
    title: 'WHO Dengue and Severe Dengue Fact Sheet & Clinical Guidelines',
    organization: 'WHO',
    url: 'https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue',
    year: '2024',
    verified: true,
  },
  MOHFW_UIP: {
    id: 'mohfw-uip-schedule',
    title: 'National Universal Immunization Programme (UIP) Manual',
    organization: 'MoHFW (Govt of India)',
    url: 'https://nhm.gov.in',
    year: '2024',
    verified: true,
  },
  WHO_CHOLERA: {
    id: 'who-cholera-ors',
    title: 'WHO Guidelines on Acute Diarrhoeal Disease and ORS Rehydration',
    organization: 'WHO',
    url: 'https://www.who.int/health-topics/cholera',
    year: '2023',
    verified: true,
  },
  ICMR_TYPHOID: {
    id: 'icmr-typhoid-management',
    title: 'ICMR Guidelines for Management of Enteric Fever (Typhoid)',
    organization: 'ICMR',
    url: 'https://main.icmr.nic.in',
    year: '2023',
    verified: true,
  },
  MOHFW_TB: {
    id: 'mohfw-ntep-tb',
    title: 'National Tuberculosis Elimination Programme (NTEP) Protocol',
    organization: 'MoHFW (Govt of India)',
    url: 'https://tbcindia.gov.in',
    year: '2024',
    verified: true,
  },
  MOHFW_HEATWAVE: {
    id: 'mohfw-heatwave-advisory',
    title: 'National Action Plan on Heat-Related Illnesses',
    organization: 'National Health Mission',
    url: 'https://nhm.gov.in',
    year: '2024',
    verified: true,
  },
  WHO_RABIES: {
    id: 'who-rabies-prophylaxis',
    title: 'WHO Rabies Post-Exposure Prophylaxis (PEP) Guidelines',
    organization: 'WHO',
    url: 'https://www.who.int/rabies',
    year: '2023',
    verified: true,
  },
};

export const HEALTH_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: 'chunk-dengue-01',
    diseaseOrTopic: 'Dengue Fever',
    category: 'Vector-Borne',
    source: TRUSTED_SOURCES.MOHFW_NVBDCP,
    keywords: ['dengue', 'mosquito', 'platelets', 'aedes', 'fever', 'breakbone', 'rash', 'डेंगू', 'డెంగ్యూ'],
    symptoms: [
      'High sudden fever (104°F/40°C)',
      'Severe headache and pain behind the eyes',
      'Muscle and joint aches (breakbone fever)',
      'Nausea, vomiting, and skin rash',
      'Extreme fatigue',
    ],
    prevention: [
      'Eliminate stagnant water in coolers, pots, tyres once a week (Dry Day campaign)',
      'Wear long-sleeved clothing and use mosquito nets or repellents',
      'Keep overhead water tanks covered with tight lids',
      'Use neem oil or approved mosquito repellent coils in rural homes',
    ],
    warningSigns: [
      'Severe persistent abdominal pain',
      'Persistent vomiting (cannot keep liquids down)',
      'Bleeding from gums or nose or black tarry stools',
      'Extreme restlessness, lethargy, or rapid breathing',
      'Cold, clammy extremities (Dengue Shock Syndrome)',
    ],
    contentEn: `Dengue is a viral infection transmitted to humans through the bite of infected female Aedes mosquitoes (primarily Aedes aegypti). Symptoms typically appear 4-10 days after the bite and last 2-7 days.
Management: Drink plenty of fluids (ORS, tender coconut water, clean water, soup) to prevent dehydration. Paracetamol may be taken for fever; avoid Aspirin, Ibuprofen, and NSAIDs as they increase bleeding risks.
Critical Warning: If severe abdominal pain, persistent vomiting, or mucosal bleeding appears as fever subsides (Day 3-7), go to the nearest Primary Health Centre (PHC) or Community Health Centre (CHC) immediately. Platelet count monitoring is recommended under doctor supervision.`,
    contentHi: `डेंगू एक विषाणुजनित (वायरल) बुखार है जो संक्रमित मादा एडीज (Aedes) मच्छर के काटने से फैलता है। यह मच्छर अक्सर दिन के समय काटता है।
मुख्य लक्षण: अचानक तेज बुखार (104°F), आंखों के पीछे तेज दर्द, सिरदर्द, जोड़ों और मांसपेशियों में तेज दर्द, जी मिचलाना, उल्टी और त्वचा पर लाल चकत्ते।
बचाव और देखभाल:
1. भरपूर तरल पदार्थ पिएं: ओआरएस (ORS), नारियल पानी, दाल का पानी, नींबू पानी।
2. बुखार कम करने के लिए केवल पैरासिटामोल (Paracetamol) लें। एस्पिरिन या इबुप्रोफेन कभी न लें क्योंकि इनसे रक्तस्राव का खतरा बढ़ जाता है।
3. घर के आसपास कूलरों, गमलों, टायरों में पानी जमा न होने दें (हर रविवार सूखा दिवस मनाएं)।
खतरे के संकेत: तेज पेट दर्द, लगातार उल्टी, मसूड़ों या नाक से खून आना, अत्यधिक सुस्ती। ऐसा होने पर तुरंत नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) या 108 एम्बुलेंस पर संपर्क करें।`,
    contentTe: `డెంగ్యూ అనేది ఇన్ఫెక్షన్ ఉన్న ఏడిస్ (Aedes) దోమ కాటు ద్వారా వ్యాపించే వైరల్ జ్వరం. ఈ దోమ సాధారణంగా పగటి సమయంలో కుడుతుంది.
ప్రధాన లక్షణాలు: అకస్మాత్తుగా వచ్చే తీవ్రమైన జ్వరం, కళ్ళ వెనుక తీవ్రమైన నొప్పి, తీవ్ర తలనొప్పి, కండరాలు మరియు కీళ్ళ నొప్పులు (ఎముకలు విరిగినంత నొప్పి), వాంతులు, ఒంటిపై దద్దుర్లు.
జాగ్రత్తలు & గృహ సంరక్షణ:
1. నిర్జలీకరణం నివారించడానికి తగినంత ఓఆర్ఎస్ (ORS), కొబ్బరి నీళ్ళు, పండ్ల రసాలు మరియు కాచి చల్లార్చిన నీరు త్రాగాలి.
2. జ్వరం కోసం డాక్టర్ సూచించిన పారాసిటమాల్ మాత్రమే వాడండి. ఆస్పిరిన్ లేదా ఇబుప్రోఫెన్ ఎప్పుడూ వాడవద్దు, ఎందుకంటే ఇవి రక్తస్రావం ప్రమాదాన్ని పెంచుతాయి.
3. కూలర్లు, పాత టైర్లు, కుండలలో నీరు నిల్వ ఉండకుండా వారానికి ఒకసారి శుభ్రం చేయాలి.
ప్రమాద సంకేతాలు: తీవ్రమైన కడుపు నొప్పి, ఆగని వాంతులు, చిగుళ్ళు లేదా ముక్కు నుండి రక్తం కారడం, తీవ్రమైన నీరసం కనిపిస్తే వెంటనే సమీప ప్రాథమిక ఆరోగ్య కేంద్రానికి (PHC) వెళ్ళండి లేదా 108 కి కాల్ చేయండి.`,
  },
  {
    id: 'chunk-malaria-02',
    diseaseOrTopic: 'Malaria',
    category: 'Vector-Borne',
    source: TRUSTED_SOURCES.MOHFW_NVBDCP,
    keywords: ['malaria', 'chills', 'shivering', 'anopheles', 'fever', 'मलेरिया', 'మలేరియా'],
    symptoms: [
      'Cyclical high fever with severe chills and shivering',
      'Profuse sweating as fever breaks',
      'Headache, body aches, and fatigue',
      'Loss of appetite and nausea',
    ],
    prevention: [
      'Sleep under Long-Lasting Insecticidal Nets (LLINs) provided by NVBDCP/Health worker',
      'Allow Indoor Residual Spraying (IRS) by health teams in village homes',
      'Prevent water stagnation in puddles, ditches, and agricultural trenches',
    ],
    warningSigns: [
      'High continuous fever with confusion or altered consciousness (Cerebral Malaria)',
      'Severe yellowing of eyes/skin (Jaundice) and dark urine',
      'Severe anemia causing extreme paleness and breathlessness',
      'Inability to sit, stand, or drink liquids in children',
    ],
    contentEn: `Malaria is caused by Plasmodium parasites spread by bites of infected female Anopheles mosquitoes, which typically bite between dusk and dawn.
Diagnosis & Treatment: A Rapid Diagnostic Test (RDT) or peripheral blood smear is provided FREE at all government Sub-Centres, PHCs, and by ASHA workers. Do not delay testing. Treatment involves Artemisinin-based Combination Therapy (ACT) or Chloroquine based on species. Complete the entire course even if feeling better.`,
    contentHi: `मलेरिया प्लास्मोडियम परजीवी के कारण होता है जो संक्रमित मादा एनाफिलीज (Anopheles) मच्छर के काटने से फैलता है, जो आमतौर पर शाम और रात में काटती है।
लक्षण: कंपकंपी और ठंड के साथ तेज बुखार आना, बुखार उतरने पर पसीना आना, सिरदर्द, थकान।
निदान व उपचार: सभी सरकारी उप-केंद्रों, प्राथमिक स्वास्थ्य केंद्रों और आशा (ASHA) कार्यकर्ताओं द्वारा मुफ्त त्वरित रक्त जांच (RDT) की जाती है। जांच के बाद डॉक्टर या स्वास्थ्य कार्यकर्ता की सलाह से पूरा कोर्स लें। बीच में दवा न छोड़ें। मच्छरदानी (LLIN) का नियमित उपयोग करें।`,
    contentTe: `మలేరియా ప్లాస్మోడియం అనే పరాన్నజీవి వల్ల వస్తుంది, ఇది సోకిన ఆడ అనాఫిలిస్ (Anopheles) దోమ కాటు ద్వారా వ్యాపిస్తుంది. ఈ దోమలు ముఖ్యంగా సాయంత్రం, రాత్రి వేళల్లో కుడతాయి.
లక్షణాలు: చలితో వణుకుతూ వచ్చే తీవ్రమైన జ్వరం, జ్వరం తగ్గేటప్పుడు విపరీతమైన చెమట పట్టడం, తలనొప్పి, నీరసం.
పరీక్ష & చికిత్స: ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రాలు (PHC) మరియు ఆశా (ASHA) కార్యకర్తల వద్ద రక్త పరీక్ష (RDT) ఉచితంగా లభిస్తుంది. పరీక్ష చేయించుకుని ప్రభుత్వం సూచించిన పూర్తి కోర్సు మందులు వాడాలి. మధ్యలో ఆపకూడదు.`,
  },
  {
    id: 'chunk-ors-diarrhea-03',
    diseaseOrTopic: 'Acute Diarrhoea & Cholera Management',
    category: 'Waterborne & Foodborne',
    source: TRUSTED_SOURCES.WHO_CHOLERA,
    keywords: ['diarrhea', 'ors', 'cholera', 'zinc', 'dehydration', 'water', 'दस्त', 'వాంతులు విరేచనాలు'],
    symptoms: [
      'Frequent watery loose stools (rice-water stools in cholera)',
      'Vomiting and stomach cramps',
      'Dry mouth, sunken eyes, decreased urination (Dehydration signs)',
      'Extreme thirst and weakness',
    ],
    prevention: [
      'Drink boiled water or chlorinated safe water',
      'Wash hands with soap before eating and after using the toilet',
      'Eat freshly cooked hot food; avoid exposed roadside cut fruits',
      'Use sanitary latrines; avoid open defecation',
    ],
    warningSigns: [
      'No urine output for more than 6-8 hours',
      'Sunken fontanelle (soft spot) or inability to drink in infants',
      'Blood in stools (Dysentery)',
      'Lethargy, unconsciousness, or rapid weak pulse',
    ],
    contentEn: `Acute diarrhoea causes rapid loss of water and essential salts. Dehydration is the primary danger.
First-line Treatment:
1. Oral Rehydration Salts (ORS): Mix 1 packet of standard WHO-ORS in exactly 1 litre of clean drinking water. Drink small sips continuously after every loose stool. Do not boil prepared ORS solution, and discard after 24 hours.
2. Zinc supplementation: 20mg daily for 14 days for children over 6 months (10mg for under 6 months) to speed recovery and protect against future episodes.
3. Continue regular feeding, including breastfeeding for infants.
Emergency: Seek immediate IV fluid therapy at a PHC if unable to keep fluids down.`,
    contentHi: `दस्त और हैजा (Cholera) में शरीर से पानी और जरूरी लवणों की भारी कमी हो जाती है। निर्जलीकरण (Dehydration) ही सबसे बड़ा खतरा है।
तुरंत किए जाने वाले उपाय:
1. ओआरएस (ORS) का घोल: 1 पैकेट ओआरएस को 1 लीटर साफ पीने के पानी में अच्छी तरह घोलें। हर दस्त के बाद थोड़ा-थोड़ा पिएं। तैयार घोल को 24 घंटे के बाद न पिएं।
2. जिंक की गोली: 6 माह से बड़े बच्चों को 14 दिनों तक 20 मिलीग्राम जिंक दें (6 माह से छोटे को 10 मिलीग्राम)।
3. खाना-पीना और स्तनपान बंद न करें।
खतरे के संकेत: यदि 6-8 घंटे से पेशाब न आया हो, आंखें धंस गई हों, या बच्चा कुछ भी पी न पा रहा हो, तो तुरंत अस्पताल ले जाएं।`,
    contentTe: `తీవ్రమైన విరేచనాలు మరియు కలరా వల్ల శరీరంలో నీరు మరియు ముఖ్యమైన లవణాలు వేగంగా తగ్గిపోతాయి. డీహైడ్రేషన్ (నిర్జలీకరణం) అత్యంత ప్రమాదకరం.
తక్షణ చర్యలు:
1. ఓఆర్ఎస్ (ORS) ద్రావణం: ఒక ప్యాకెట్ ORS ను సరిగ్గా 1 లీటరు స్వచ్ఛమైన తాగునీటిలో కలపాలి. విరేచనం అయిన ప్రతిసారీ కొద్దికొద్దిగా త్రాగాలి. తయారుచేసిన ద్రావణాన్ని 24 గంటల లోపు మాత్రమే వాడాలి.
2. జింక్ మాత్రలు: 6 నెలల పైబడిన పిల్లలకు 14 రోజుల పాటు రోజుకు 20 మి.గ్రా జింక్ ఇవ్వాలి.
3. తల్లిపాలు లేదా ఆహారం ఇవ్వడం ఆపకూడదు.
ప్రమాద సంకేతాలు: 6-8 గంటలుగా మూత్రం రాకపోవడం, కళ్ళు లోతుకు పోవడం, స్పృహ తగ్గడం కనిపిస్తే వెంటనే ఆసుపత్రికి తరలించండి.`,
  },
  {
    id: 'chunk-typhoid-04',
    diseaseOrTopic: 'Typhoid (Enteric Fever)',
    category: 'Waterborne & Foodborne',
    source: TRUSTED_SOURCES.ICMR_TYPHOID,
    keywords: ['typhoid', 'salmonella', 'step-ladder fever', 'stomach ache', 'contaminated food', 'टाइफाइड', 'టైఫాయిడ్'],
    symptoms: [
      'Prolonged step-ladder fever rising gradually over days',
      'Stomach pain, constipation or diarrhoea',
      'Coated white tongue and loss of appetite',
      'Rose-colored spots on chest or abdomen (rare)',
      'Severe headache and general body malaise',
    ],
    prevention: [
      'Drink filtered or boiled water',
      'Ensure strict food hygiene; peel raw vegetables and fruits',
      'Typhoid Conjugate Vaccine (TCV) for children above 6 months',
      'Avoid unpasteurized milk and untreated water sources',
    ],
    warningSigns: [
      'Intense sharp sudden abdominal pain with rigidity (Intestinal Perforation risk)',
      'Confusion, delirium, or high persistent spike in fever',
      'Severe black stools indicative of internal bleeding',
    ],
    contentEn: `Typhoid is a bacterial infection caused by Salmonella Typhi, spread through food or water contaminated with feces.
Management: Requires blood culture or Widal test confirmation. Must be treated with prescription antibiotics prescribed by a registered MBBS/PHC medical officer. Complete the full antibiotic course (usually 7-14 days) even if fever resolves, to prevent relapse and carrier state. Maintain hydration and soft nutritious meals.`,
    contentHi: `टाइफाइड (मियादी बुखार) साल्मोनेला टाइफी जीवाणु के कारण होता है, जो दूषित पानी या संक्रमित भोजन से फैलता है।
लक्षण: लगातार कई दिनों तक सीढ़ीदार रूप से बढ़ता तेज बुखार, पेट दर्द, सिरदर्द, भूख न लगना, जीभ पर सफेद परत।
उपचार: डॉक्टर से जांच (Widal या ब्लड कल्चर) कराकर ही उचित एंटीबायोटिक लें। बिना डॉक्टर के पूछे एंटीबायोटिक न लें और दवा का पूरा कोर्स खत्म करें। उबला पानी पिएं और हल्का, सुपाच्य भोजन लें।`,
    contentTe: `టైఫాయిడ్ అనేది సాల్మొనెల్లా టైఫీ అనే బ్యాక్టీరియా వల్ల కలుషితమైన నీరు లేదా ఆహారం ద్వారా వ్యాపించే జ్వరం.
లక్షణాలు: క్రమంగా రోజురోజుకూ పెరిగే తీవ్రమైన జ్వరం, కడుపు నొప్పి, తలనొప్పి, ఆకలి మందగించడం, నాలుకపై తెల్లటి పొర.
నివారణ & చికిత్స: ప్రాథమిక ఆరోగ్య కేంద్రం వైద్యుని సంప్రదించి రక్త పరీక్ష చేయించుకోవాలి. డాక్టర్ రాసిన యాంటీబయాటిక్స్ కోర్సును ఎట్టి పరిస్థితుల్లోనూ మధ్యలో ఆపకూడదు. కాచి చల్లార్చిన నీరు మరియు వేడివేడి ఆహారం తీసుకోవాలి.`,
  },
  {
    id: 'chunk-tb-05',
    diseaseOrTopic: 'Tuberculosis (TB)',
    category: 'Respiratory',
    source: TRUSTED_SOURCES.MOHFW_TB,
    keywords: ['tuberculosis', 'tb', 'cough', 'nikshay', 'dot', 'sputum', 'weight loss', 'टीबी', 'క్షయ'],
    symptoms: [
      'Cough lasting more than 2 weeks',
      'Fever, particularly low-grade fever in the evenings',
      'Night sweats and unexplained weight loss',
      'Chest pain and coughing up blood or blood-tinged sputum',
      'Loss of appetite and progressive weakness',
    ],
    prevention: [
      'BCG vaccination at birth for all infants',
      'Cover mouth and nose with cloth/handkerchief when coughing or sneezing',
      'Ensure well-ventilated living spaces with abundant sunlight',
      'Preventive therapy for close household contacts under NTEP guidance',
    ],
    warningSigns: [
      'Large amounts of blood in sputum (Hemoptysis)',
      'Severe breathlessness and chest tightness',
      'Severe jaundice while taking TB medications (requires urgent drug adjustment)',
    ],
    contentEn: `Tuberculosis is an infectious disease caused by Mycobacterium tuberculosis, spreading through airborne droplets when a person with active pulmonary TB coughs or sneezes.
Government Support under NTEP:
1. Diagnosis (Sputum microscopy and CBNAAT/TrueNat molecular testing) is 100% FREE at all government hospitals and PHCs.
2. Treatment (DOTS - Directly Observed Treatment Short-course) with anti-TB medications is provided completely FREE for 6 months.
3. Ni-kshay Poshan Yojana: Direct Benefit Transfer (DBT) of Rs. 500-1000 per month is provided by the Government of India to TB patients for nutritional support.
Rule: Never stop TB medicines halfway; incomplete treatment can lead to dangerous Multi-Drug Resistant TB (MDR-TB).`,
    contentHi: `टीबी (क्षयरोग) एक संक्रामक फेफड़ों का रोग है।
पहचान: यदि 2 सप्ताह या उससे अधिक समय से लगातार खांसी हो, शाम को हल्का बुखार आता हो, रात में पसीना आता हो या वजन तेजी से घट रहा हो, तो तुरंत बलगम की जांच कराएं।
सरकारी सुविधाएं (NTEP):
1. सभी सरकारी अस्पतालों व प्राथमिक स्वास्थ्य केंद्रों पर बलगम व CBNAAT जांच बिल्कुल मुफ्त है।
2. 6 महीने की दवा (DOTS) पूरी तरह निःशुल्क दी जाती है।
3. निक्षय पोषण योजना (Ni-kshay Poshan Yojana): सरकार द्वारा मरीज को पौष्टिक आहार के लिए 500 से 1000 रुपये प्रति माह बैंक खाते में दिए जाते हैं।
सावधानी: दवा कभी बीच में न छोड़ें, नहीं तो बीमारी बिगड़ सकती है (MDR-TB)।`,
    contentTe: `క్షయవ్యాధి (టీబీ) అనేది బ్యాక్టీరియా వల్ల వచ్చే శ్వాసకోశ వ్యాధి.
లక్షణాలు: 2 వారాలకు మించి ఎడతెగని దగ్గు, సాయంత్రం వేళల్లో వచ్చే జ్వరం, రాత్రి వేళ చెమటలు, బరువు తగ్గడం, కఫంలో రక్తం పడటం.
ప్రభుత్వ సహాయం:
1. అన్ని ప్రాథమిక ఆరోగ్య కేంద్రాలలో కఫం పరీక్ష మరియు చికిత్స ఉచితం.
2. ప్రభుత్వం ఉచితంగా ఇచ్చే పూర్తి కోర్సు మందులను క్రమం తప్పకుండా వేసుకోవాలి.
3. 'నిక్షయ్ పోషణ్ యోజన' కింద పౌష్టికాహారం కోసం ప్రభుత్వం ప్రతి నెలా ఆర్థిక సహాయం అందజేస్తుంది. మందులు మధ్యలో ఆపితే వ్యాధి మరింత ప్రమాదకరంగా మారుతుంది.`,
  },
  {
    id: 'chunk-rabies-06',
    diseaseOrTopic: 'Rabies & Animal Bite Protocol',
    category: 'Emergency Care',
    source: TRUSTED_SOURCES.WHO_RABIES,
    keywords: ['rabies', 'dog bite', 'monkey bite', 'wound wash', 'arv', 'immunoglobulin', 'कुत्ते का काटना', 'కుక్క కాటు'],
    symptoms: [
      'Early: Tingling, burning, or pain at the bite site',
      'Progressive: Hydrophobia (fear of water), agitation, spasms',
      'Advanced: Paralysis, coma, and nearly 100% fatal once clinical symptoms appear',
    ],
    prevention: [
      'Immediate wound washing for 15 full minutes with running water and soap',
      'Vaccinate domestic pet dogs and avoid provoking stray animals',
      'Do not apply lime, chili powder, mud, or turmeric to the bite wound',
    ],
    warningSigns: [
      'Any Category II (minor scratches without bleeding) or Category III (transdermal bites, scratches with blood, saliva contact with broken skin or mucous membrane) bite requires IMMEDIATE Anti-Rabies Vaccination (ARV).',
    ],
    contentEn: `CRITICAL EMERGENCY PROTOCOL: Rabies is 100% fatal once clinical symptoms develop, but 100% preventable with immediate Post-Exposure Prophylaxis (PEP).
Step 1: IMMEDIATELY wash the bite wound vigorously under running tap water with laundry/toilet soap for at least 15 continuous minutes. This eliminates over 80% of the viral load.
Step 2: Apply antiseptic (Betadine/povidone iodine or alcohol) if available. Do NOT suture the wound or apply cow dung, lime, or chillies.
Step 3: Rush to the nearest Community Health Centre (CHC) or Government Hospital for FREE Anti-Rabies Vaccine (ARV) on Days 0, 3, 7, and 28. For severe Category III bites, Rabies Immunoglobulin (RIG) must also be infiltrated into the wound on Day 0.`,
    contentHi: `कुत्ते, बिल्ली या बंदर के काटने पर तत्काल आपातकालीन नियम:
रेबीज बीमारी के लक्षण दिखने के बाद यह 100% जानलेवा है, लेकिन तुरंत सही कदम उठाने पर 100% रोकी जा सकती है।
पहला कदम: काटे हुए स्थान को तुरंत नल के बहते पानी के नीचे साबुन से कम से कम 15 मिनट तक लगातार अच्छी तरह धोएं। इससे 80% से अधिक वायरस खत्म हो जाता है।
दूसरा कदम: घाव पर चूना, मिर्च, मिट्टी या राख बिल्कुल न लगाएं।
तीसरा कदम: तुरंत नजदीकी सरकारी अस्पताल/सीएचसी जाएं। वहां एंटी-रेबीज टीका (ARV) दिन 0, 3, 7 और 28 पर मुफ्त लगाया जाता है। गंभीर घाव होने पर रेबीज इम्युनोग्लोबुलिन (RIG) भी लगवाना आवश्यक है।`,
    contentTe: `కుక్క లేదా జంతువు కాటు వేసినప్పుడు అత్యవసర నియమాలు:
రేబిస్ వ్యాధి లక్షణాలు బయటపడిన తర్వాత అది 100% ప్రాణాంతకం, కానీ వెంటనే సరైన చికిత్స తీసుకుంటే 100% నివారించవచ్చు.
మొదటి పని: గాయాన్ని వెంటనే కారే కొళాయి నీటి కింద సబ్బుతో కనీసం 15 నిమిషాల పాటు రుద్ది కడగాలి.
చేయకూడనివి: గాయంపై సున్నం, కారం, మట్టి, పసుపు పెట్టకూడదు.
తదుపరి చర్య: వెంటనే సమీప ప్రభుత్వ ఆసుపత్రికి వెళ్లి ఉచితంగా యాంటీ-రేబిస్ వ్యాక్సిన్ (ARV) షెడ్యూల్ ప్రకారం (0, 3, 7, 28 రోజులు) వేయించుకోవాలి. తీవ్రమైన గాయాలకు ఇమ్యునోగ్లోబులిన్ కూడా అవసరం.`,
  },
  {
    id: 'chunk-heatstroke-07',
    diseaseOrTopic: 'Heatwave & Heatstroke (Sunstroke)',
    category: 'Emergency Care',
    source: TRUSTED_SOURCES.MOHFW_HEATWAVE,
    keywords: ['heatstroke', 'loo', 'heatwave', 'summer', 'sunstroke', 'hydration', 'लू', 'వడదెబ్బ'],
    symptoms: [
      'Extremely high core body temperature (>104°F/40°C)',
      'Hot, red, dry skin without sweating',
      'Dizziness, throbbing headache, and confusion',
      'Nausea, vomiting, and fainting (loss of consciousness)',
      'Rapid strong pulse',
    ],
    prevention: [
      'Avoid going out in direct sun between 12:00 PM and 3:30 PM',
      'Drink plenty of water even if not thirsty; consume ORS, buttermilk (chaas), coconut water, and aam panna',
      'Wear lightweight, loose-fitting, light-colored cotton clothes and cover head with gamcha/cloth/umbrella',
      'Do not leave children or elderly persons in parked vehicles',
    ],
    warningSigns: [
      'Unconsciousness or altered mental state (delirium, slurred speech)',
      'Seizures or convulsions',
      'Inability to drink fluids',
    ],
    contentEn: `Heatstroke is a medical emergency that occurs when the body can no longer regulate its temperature.
First Aid:
1. Move the person immediately to a cool, shaded area or air-conditioned room.
2. Remove excess clothing.
3. Cool the body rapidly: sponge with cool water, apply ice packs to neck, armpits, and groin, and fan vigorously.
4. If conscious, give cool water or ORS to sip. If unconscious, do NOT force liquids into mouth.
5. Call 108 ambulance immediately for urgent transport to hospital.`,
    contentHi: `गर्मियों में लू (हीटस्ट्रोक) एक जानलेवा स्थिति हो सकती है।
लू के लक्षण: शरीर का तापमान बहुत तेज होना, पसीना आना बंद होकर त्वचा का लाल व सूखा होना, चक्कर आना, तेज सिरदर्द, बेहोशी।
प्राथमिक उपचार:
1. पीड़ित को तुरंत छांव या ठंडी जगह पर लिटाएं।
2. शरीर पर ठंडे पानी की पट्टियां रखें और गर्दन, कांख व जांघों पर ठंडे पानी के कपड़े लगाएं।
3. यदि व्यक्ति होश में है, तो उसे थोड़ा-थोड़ा ठंडा पानी, ओआरएस या छाछ पिलाएं। बेहोश व्यक्ति के मुंह में कुछ न डालें।
4. तुरंत 108 एम्बुलेंस बुलाकर अस्पताल पहुंचाएं। दोपहर 12 से 3 बजे के बीच धूप में निकलने से बचें।`,
    contentTe: `ఎండకాలంలో వడదెబ్బ (Heatstroke) అనేది ప్రాణాంతకమైన అత్యవసర పరిస్థితి.
లక్షణాలు: శరీరం విపరీతంగా వేడెక్కడం (104°F కంటే ఎక్కువ), చెమట పట్టకపోవడం, చర్మం ఎర్రగా పొడిగా మారడం, తలతిరగడం, తీవ్ర తలనొప్పి, స్పృహ కోల్పోవడం.
ప్రథమ చికిత్స:
1. బాధితుడిని వెంటనే నీడ ఉన్న చల్లని ప్రదేశానికి చేర్చాలి.
2. శరీరంపై చల్లటి నీరు చల్లాలి, మెడ, చంకలలో తడి బట్టలు ఉంచి విసరాలి.
3. స్పృహలో ఉంటే మాత్రమే మంచినీరు లేదా ఓఆర్ఎస్ ఇవ్వాలి. స్పృహ లేకపోతే నోటిలో ఏమీ పోయకూడదు.
4. తక్షణమే 108 అంబులెన్స్‌కు కాల్ చేసి ఆసుపత్రికి తరలించాలి.`,
  },
  {
    id: 'chunk-maternal-child-08',
    diseaseOrTopic: 'Maternal Nutrition & Anemia Prevention',
    category: 'Maternal & Child',
    source: TRUSTED_SOURCES.MOHFW_UIP,
    keywords: ['anemia', 'pregnancy', 'ifa', 'iron', 'maternal', 'folic acid', 'गर्भावस्था', 'గర్భిణీ స్త్రీలు'],
    symptoms: [
      'Pale inner eyelids, tongue, palms, and nail beds',
      'Unusual tiredness, fatigue, and breathlessness upon mild exertion',
      'Frequent dizziness and headaches',
      'Swelling in feet or ankles',
    ],
    prevention: [
      'Take 1 Iron Folic Acid (IFA) red tablet daily for at least 180 days starting after the first trimester',
      'Consume green leafy vegetables (palak, methi, drumstick leaves), jaggery (gud), ragi, pulses, and dates',
      'Take Calcium tablets with a gap of 2 hours from IFA tablets (do not take them together)',
      'Ensure at least 4 Antenatal Care (ANC) checkups at the local Sub-Centre / Anganwadi / PHC',
    ],
    warningSigns: [
      'Severe breathlessness while resting',
      'High blood pressure (swollen face, severe headache, blurry vision)',
      'Vaginal bleeding or sudden gush of water',
      'Decreased fetal movements',
    ],
    contentEn: `Under the Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA) and National Health Mission:
Every pregnant woman is entitled to free antenatal care on the 9th of every month at government health facilities.
Key Interventions:
1. Iron & Folic Acid (IFA) supplementation to prevent severe maternal anemia and low birth weight.
2. Deworming with Albendazole (after first trimester).
3. Tetanus and adult Diphtheria (Td) vaccine: 2 doses in pregnancy (at first contact and 4 weeks later).
4. Pradhan Mantri Matru Vandana Yojana (PMMVY): Cash incentive transferred directly to the mother's bank account for nutritional needs.`,
    contentHi: `मातृ स्वास्थ्य एवं एनीमिया (खून की कमी) रोकथाम:
गर्भावस्था के दौरान कम से कम 4 प्रसव पूर्व जांचें (ANC) प्राथमिक स्वास्थ्य केंद्र या आंगनवाड़ी में अवश्य कराएं।
मुख्य बातें:
1. दूसरी तिमाही से प्रतिदिन 1 लाल आयरन-फोलिक एसिड (IFA) की गोली 180 दिनों तक जरूर खाएं।
2. आयरन की गोली को कभी चाय या दूध के साथ न लें, नींबू पानी या सादे पानी के साथ लें। कैल्शियम की गोली अलग समय पर लें।
3. टिटनेस-डिप्थीरिया (Td) के 2 टीके समय पर लगवाएं।
4. प्रधानमंत्री सुरक्षित मातृत्व अभियान (PMSMA) के तहत हर महीने की 9 तारीख को सरकारी अस्पताल में मुफ्त विशेषज्ञ जांच की जाती है।`,
    contentTe: `గర్భిణీ స్త్రీల ఆరోగ్యం & రక్తహీనత (ఎనీమియా) నివారణ:
గర్భధారణ సమయంలో ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రం లేదా అంగన్‌వాడీ కేంద్రంలో కనీసం 4 సార్లు పరీక్షలు చేయించుకోవాలి.
ముఖ్య సూచనలు:
1. రక్తహీనతను నివారించడానికి ప్రతిరోజూ ఐరన్-ఫోలిక్ యాసిడ్ (IFA) మాత్ర తీసుకోవాలి.
2. పాలకూర, తోటకూర, మునగాకు, బెల్లం, రాగులు, వేరుశనగ పప్పులు ఎక్కువగా తినాలి.
3. టీడీ (Td) టీకాలు క్రమం తప్పకుండా వేయించుకోవాలి.
4. ప్రభుత్వ పథకాల ద్వారా గర్భిణీలకు పోషకాహార సహాయం అందుతుంది.`,
  },
];

export const VACCINE_SCHEDULE: VaccineItem[] = [
  {
    id: 'vac-bcg',
    name: 'BCG Vaccine',
    diseaseTarget: 'Tuberculosis (Severe Childhood TB & TB Meningitis)',
    ageSchedule: 'At birth (or as early as possible up to 1 year)',
    ageWeeks: 0,
    doseNumber: 'Single dose (0.1 ml)',
    route: 'Intra-dermal (Left upper arm)',
    benefits: {
      en: 'Protects infants against severe fatal forms of tuberculosis such as tuberculous meningitis.',
      hi: 'शिशुओं को टीबी की गंभीर जानलेवा किस्मों (जैसे दिमागी टीबी) से बचाता है।',
      te: 'శిశువులను ప్రాణాంతక టీబీ వ్యాధుల నుండి కాపాడుతుంది.',
    },
    sideEffects: {
      en: 'A small red nodule appears at 2-3 weeks, turns into a tiny ulcer, and heals into a permanent scar. This is normal.',
      hi: '2-3 सप्ताह बाद इंजेक्शन की जगह पर छोटा दाना बनता है जो बाद में स्थायी निशान छोड़ता है। यह पूरी तरह सामान्य है।',
      te: 'టీకా వేసిన చోట చిన్న పొక్కు ఏర్పడి మచ్చగా మారుతుంది, ఇది సహజమైనది.',
    },
    program: 'Universal Immunization Programme (UIP)',
  },
  {
    id: 'vac-opv-0',
    name: 'OPV (Oral Polio Vaccine) - Zero Dose',
    diseaseTarget: 'Poliomyelitis (Infantile Paralysis)',
    ageSchedule: 'At birth (within the first 15 days)',
    ageWeeks: 0,
    doseNumber: 'Birth dose (2 drops)',
    route: 'Oral',
    benefits: {
      en: 'Provides gut mucosal immunity to protect against paralytic polio.',
      hi: 'पोलियो के कारण होने वाले आजीवन लकवे से सुरक्षा प्रदान करता है।',
      te: 'పోలియో పక్షవాతం రాకుండా నిరోధిస్తుంది.',
    },
    sideEffects: {
      en: 'Extremely safe, virtually no side effects.',
      hi: 'अत्यंत सुरक्षित, कोई दुष्प्रभाव नहीं।',
      te: 'చాలా సురక్షితమైనది, ఎటువంటి సైడ్ ఎఫెక్ట్స్ ఉండవు.',
    },
    program: 'Universal Immunization Programme (UIP)',
  },
  {
    id: 'vac-hep-b',
    name: 'Hepatitis B (Birth Dose)',
    diseaseTarget: 'Hepatitis B Virus (Liver infection & cirrhosis)',
    ageSchedule: 'At birth (strictly within 24 hours of delivery)',
    ageWeeks: 0,
    doseNumber: 'Single dose (0.5 ml)',
    route: 'Intramuscular (Anterolateral mid-thigh)',
    benefits: {
      en: 'Prevents mother-to-child transmission of Hepatitis B virus during birth.',
      hi: 'प्रसव के समय मां से बच्चे में हेपेटाइटिस बी वायरस फैलने से रोकता है।',
      te: 'పుట్టినప్పుడు తల్లి నుండి బిడ్డకు హెపటైటిస్ బి సోకకుండా నిరోధిస్తుంది.',
    },
    sideEffects: {
      en: 'Mild soreness at the injection site.',
      hi: 'टीके के स्थान पर हल्का दर्द।',
      te: 'టీకా వేసిన చోట కొద్దిగా నొప్పి.',
    },
    program: 'Universal Immunization Programme (UIP)',
  },
  {
    id: 'vac-penta-1',
    name: 'Pentavalent Vaccine (Dose 1, 2, 3)',
    diseaseTarget: '5 Diseases: Diphtheria, Pertussis (Whooping Cough), Tetanus, Hepatitis B, Hib Pneumonia/Meningitis',
    ageSchedule: 'At 6 weeks, 10 weeks, and 14 weeks',
    ageWeeks: 6,
    doseNumber: '3 doses (0.5 ml each)',
    route: 'Intramuscular (Left mid-thigh)',
    benefits: {
      en: 'Combines protection against 5 life-threatening childhood diseases into a single injection.',
      hi: 'एक ही इंजेक्शन में 5 जानलेवा बीमारियों (गलघोंटू, काली खांसी, धनुस्तंभ, हेपेटाइटिस बी, हिब निमोनिया) से सुरक्षा।',
      te: 'ఒకే ఇంజెక్షన్‌తో 5 ప్రాణాంతక వ్యాధుల నుండి శిశువుకు రక్షణ లభిస్తుంది.',
    },
    sideEffects: {
      en: 'Mild fever and local swelling/pain for 24-48 hours. Give Paracetamol drops if advised by ANM/doctor.',
      hi: '1-2 दिन हल्का बुखार और दर्द हो सकता है। घबराएं नहीं, एएनएम या डॉक्टर के बताए अनुसार पैरासिटामोल दें।',
      te: 'ఒకటి రెండు రోజులు కొద్దిగా జ్వరం, నొప్పి ఉండవచ్చు. డాక్టర్ సూచించిన చుక్కల మందు వేయండి.',
    },
    program: 'Universal Immunization Programme (UIP)',
  },
  {
    id: 'vac-rota',
    name: 'Rotavirus Vaccine',
    diseaseTarget: 'Rotaviral Diarrhoea & Severe Dehydration',
    ageSchedule: 'At 6 weeks, 10 weeks, and 14 weeks',
    ageWeeks: 6,
    doseNumber: '3 doses (5 drops oral)',
    route: 'Oral',
    benefits: {
      en: 'Protects young children from life-threatening severe watery rotavirus diarrhoea and hospitalizations.',
      hi: 'छोटे बच्चों को रोटावायरस से होने वाले गंभीर दस्त और डिहाइड्रेशन से बचाता है।',
      te: 'చిన్నపిల్లలలో తీవ్రమైన నీళ్ల విరేచనాలను నిరోధిస్తుంది.',
    },
    sideEffects: {
      en: 'Very safe; occasionally mild fussiness or loose stool.',
      hi: 'अत्यधिक सुरक्षित; कभी-कभी हल्का चिड़चिड़ापन।',
      te: 'ఎటువంటి ప్రమాదం లేని సురక్షితమైన నోటి చుక్కల మందు.',
    },
    program: 'Universal Immunization Programme (UIP)',
  },
  {
    id: 'vac-mr-1',
    name: 'Measles-Rubella (MR) - 1st & 2nd Dose',
    diseaseTarget: 'Measles (Khasra) and Congenital Rubella Syndrome',
    ageSchedule: '1st dose at 9-12 months, 2nd dose at 16-24 months',
    ageWeeks: 39,
    doseNumber: '2 doses (0.5 ml each)',
    route: 'Subcutaneous (Right upper arm)',
    benefits: {
      en: 'Prevents deadly measles complications (pneumonia, blindness, encephalitis) and congenital rubella birth defects.',
      hi: 'खसरे की घातक जटिलताओं (निमोनिया, अंधापन) और जन्मजात रूबेला विकारों से बचाता है।',
      te: 'తట్టు (మీజిల్స్) మరియు రుబెల్లా వ్యాధుల నుండి పూర్తి రక్షణ కల్పిస్తుంది.',
    },
    sideEffects: {
      en: 'Mild fever or faint rash may appear 6-11 days after vaccination.',
      hi: 'टीका लगने के 6-11 दिन बाद हल्का बुखार या दाने हो सकते हैं जो स्वयं ठीक हो जाते हैं।',
      te: 'టీకా వేసిన వారం తర్వాత స్వల్ప జ్వరం లేదా దద్దుర్లు రావచ్చు, దానంతట అదే తగ్గుతుంది.',
    },
    program: 'Universal Immunization Programme (UIP)',
  },
  {
    id: 'vac-td-adult',
    name: 'Td (Tetanus & adult Diphtheria)',
    diseaseTarget: 'Tetanus (Lockjaw) and Diphtheria',
    ageSchedule: '10 years, 16 years, and during pregnancy',
    ageWeeks: 520,
    doseNumber: 'Booster doses (0.5 ml)',
    route: 'Intramuscular (Upper arm)',
    benefits: {
      en: 'Maintains long-term protective antitoxin levels against tetanus injuries and maternal/neonatal tetanus.',
      hi: 'चोट लगने पर धनुस्तंभ (टिटनेस) से सुरक्षा बनाए रखता है और नवजात शिशु को भी सुरक्षित करता है।',
      te: 'గాయాల వల్ల వచ్చే ధనుర్వాతం (టెటనస్) నుండి దీర్ఘకాలిక రక్షణ కల్పిస్తుంది.',
    },
    sideEffects: {
      en: 'Temporary muscle tenderness at injection site.',
      hi: 'हाथ में 1-2 दिन हल्का दर्द।',
      te: 'చేతిలో కొద్దిగా నొప్పి.',
    },
    program: 'Adult / Maternal',
  },
];

export const NEARBY_CLINICS: HealthFacility[] = [
  {
    id: 'facility-phc-01',
    name: 'Kothapalli Primary Health Centre (PHC)',
    type: 'Primary Health Centre (PHC)',
    district: 'Warangal Rural',
    state: 'Telangana',
    address: 'Main Road, Near Gram Panchayat Office, Kothapalli',
    distanceKm: 2.4,
    contactNumber: '+91 870 245 8812',
    ambulanceContact: '108',
    timings: '9:00 AM - 4:00 PM (Emergency 24x7)',
    services: ['OPD Consultation', 'UIP Child Vaccination', 'Maternal Antenatal Care', 'Free Lab Testing (Malaria RDT, Dengue NS1)', 'Essential Medicines Dispensing'],
    hasMaternity: true,
    hasEmergency24x7: true,
    hasVaccination: true,
    latitude: 17.9784,
    longitude: 79.5941,
  },
  {
    id: 'facility-chc-02',
    name: 'Narsampet Community Health Centre (CHC)',
    type: 'Community Health Centre (CHC)',
    district: 'Warangal Rural',
    state: 'Telangana',
    address: 'Hospital Road, Opposite Bus Stand, Narsampet',
    distanceKm: 8.6,
    contactNumber: '+91 871 823 4110',
    ambulanceContact: '108',
    timings: '24 Hours Open',
    services: ['30-Bed Inpatient Care', 'Emergency Trauma Room', 'Obstetrics & Labour Room', 'Free Blood Bank/Storage', 'Anti-Rabies Vaccines (ARV/RIG)', 'Sputum CBNAAT Testing'],
    hasMaternity: true,
    hasEmergency24x7: true,
    hasVaccination: true,
    latitude: 17.9254,
    longitude: 79.8972,
  },
  {
    id: 'facility-aam-03',
    name: 'Gopalpur Ayushman Arogya Mandir (Sub-Centre)',
    type: 'Ayushman Arogya Mandir',
    district: 'Warangal Rural',
    state: 'Telangana',
    address: 'Village Center, Next to Primary School, Gopalpur',
    distanceKm: 1.1,
    contactNumber: '+91 949 012 3456',
    ambulanceContact: '104 (Health Advice) / 108',
    timings: '9:00 AM - 1:00 PM (Community Health Officer / ANM)',
    services: ['eSanjeevani Tele-consultation with Doctors', 'Weekly Immunization Session (Wednesday)', 'Hypertension & Diabetes Screening', 'Free ORS & IFA Distribution'],
    hasMaternity: false,
    hasEmergency24x7: false,
    hasVaccination: true,
    latitude: 17.9621,
    longitude: 79.6105,
  },
  {
    id: 'facility-dh-04',
    name: 'Mahabubabad District Headquarters Hospital',
    type: 'District Hospital',
    district: 'Mahabubabad',
    state: 'Telangana',
    address: 'Collectorate Bypass Road, Mahabubabad',
    distanceKm: 21.0,
    contactNumber: '+91 871 925 2100',
    ambulanceContact: '108',
    timings: '24x7 Full Casualty & Specialty Services',
    services: ['ICU & Critical Care', 'Advanced Diagnostic Imaging & Ultrasound', 'Platelet Apheresis & Blood Component Center', 'Pediatric Care Unit (SNCU)', 'Major Surgical Operations'],
    hasMaternity: true,
    hasEmergency24x7: true,
    hasVaccination: true,
    latitude: 17.5982,
    longitude: 80.0031,
  },
  {
    id: 'facility-phc-05',
    name: 'Chandupatla Primary Health Centre',
    type: 'Primary Health Centre (PHC)',
    district: 'Nalgonda',
    state: 'Telangana',
    address: 'Near Old Water Tank, Chandupatla',
    distanceKm: 5.2,
    contactNumber: '+91 868 223 9918',
    ambulanceContact: '108',
    timings: '9:00 AM - 5:00 PM',
    services: ['General OPD', 'Daily Immunization', 'DOTS TB Center', 'Nutrition Counseling for Mothers'],
    hasMaternity: true,
    hasEmergency24x7: true,
    hasVaccination: true,
    latitude: 17.2012,
    longitude: 79.1523,
  },
];

export const OUTBREAK_ALERTS: OutbreakAlert[] = [
  {
    id: 'alert-dengue-monsoon',
    title: {
      en: 'Seasonal Monsoon Advisory: Dengue & Chikungunya Alert',
      hi: 'मौसमी मानसून चेतावनी: डेंगू एवं चिकनगुनिया रोकथाम अलर्ट',
      te: 'వర్షాకాల హెచ్చరిక: డెంగ్యూ మరియు చికెన్‌గున్యా ముందస్తు జాగ్రత్తలు',
    },
    disease: 'Dengue & Vector-Borne Fevers',
    severity: 'High Alert',
    affectedRegion: 'Rural & Peri-Urban Districts (State-wide IDSP Bulletin)',
    dateReported: 'Current Week',
    summary: {
      en: 'Recent intermittent rainfall has led to freshwater collection in open containers, tyres, and air coolers, causing an increase in Aedes mosquito breeding.',
      hi: 'हाल ही में हुई बारिश के कारण खुले बर्तनों, छतों और कूलरों में साफ पानी जमा होने से एडीज मच्छरों का पनपना बढ़ रहा है।',
      te: 'ఇటీవల కురిసిన వర్షాల వల్ల నిల్వ ఉన్న మంచినీటిలో డెంగ్యూ వ్యాప్తి చేసే ఏడిస్ దోమల సంఖ్య పెరుగుతోంది.',
    },
    preventionTips: {
      en: [
        'Observe "Dry Day" every Sunday: completely empty and scrub air coolers and flower pots',
        'Discard discarded tyres, coconut shells, and plastic cups from around the house',
        'Wear full-sleeved shirts and trousers when outdoors',
        'Report sudden high fever with body aches to the village ASHA worker or nearest PHC immediately',
      ],
      hi: [
        'प्रत्येक रविवार को "सूखा दिवस" मनाएं: कूलर, गमले और पानी के बर्तनों को खाली कर सुखाएं',
        'घर के आसपास पुराने टायर, नारियल के खोल व प्लास्टिक कचरे को हटाएं',
        'पूरी आस्तीन के कपड़े पहनें और मच्छरदानी का उपयोग करें',
        'तेज बुखार आने पर तुरंत आशा कार्यकर्ता या नजदीकी प्राथमिक स्वास्थ्य केंद्र से संपर्क करें',
      ],
      te: [
        'ప్రతి ఆదివారం "డ్రై డే" పాటించండి: కూలర్లు, కుండలలోని నీటిని తొలగించి ఎండబెట్టాలి',
        'ఇంటి చుట్టూ కొబ్బరి చిప్పలు, పాత టైర్లు నీరు చేరకుండా పారవేయాలి',
        'పూర్తిగా శరీరాన్ని కప్పే దుస్తులు ధరించాలి మరియు దోమతెరలు వాడాలి',
        'తీవ్రమైన జ్వరం వస్తే వెంటనే ఆశా కార్యకర్త లేదా ప్రాథమిక ఆరోగ్య కేంద్రాన్ని సంప్రదించండి',
      ],
    },
    issuingAuthority: 'Integrated Disease Surveillance Programme (IDSP) & MoHFW',
  },
  {
    id: 'alert-heatwave-advisory',
    title: {
      en: 'Public Health Advisory: Severe Summer Heatwave Precaution',
      hi: 'स्वास्थ्य परामर्श: भीषण ग्रीष्मकालीन लू से बचाव संबंधी चेतावनी',
      te: 'ప్రజా ఆరోగ్య హెచ్చరిక: తీవ్ర ఎండలు మరియు వడదెబ్బ నివారణ సూచనలు',
    },
    disease: 'Heat-Related Illness & Dehydration',
    severity: 'Warning',
    affectedRegion: 'Central & Southern Plains',
    dateReported: 'Seasonal Advisory',
    summary: {
      en: 'Temperatures are forecast to exceed 42°C in several agricultural blocks. Vulnerable groups (outdoor farmers, pregnant women, elderly, and young children) must take strict precautions.',
      hi: 'कई ग्रामीण क्षेत्रों में तापमान 42°C से ऊपर जाने की संभावना है। किसान, गर्भवती महिलाएं, बच्चे और बुजुर्ग विशेष सावधानी बरतें।',
      te: 'పగటి ఉష్ణోగ్రతలు 42 డిగ్రీలు దాటే అవకాశం ఉంది. రైతులు, గర్భిణీలు, వృద్ధులు మరియు చిన్నారులు అప్రమత్తంగా ఉండాలి.',
    },
    preventionTips: {
      en: [
        'Stay hydrated: Drink water, chaas (buttermilk), and ORS frequently before feeling thirsty',
        'Avoid strenuous agricultural and physical field work between 11:30 AM and 3:30 PM',
        'Keep a wet cloth or towel over head and neck when moving outdoors',
        'Never leave infants alone in closed tin-shed rooms or stationary vehicles',
      ],
      hi: [
        'पर्याप्त पानी, छाछ, नारियल पानी और ओआरएस पिएं',
        'सुबह 11:30 से दोपहर 3:30 बजे के बीच तेज धूप में खेतों में काम करने से बचें',
        'धूप में निकलते समय सिर को सूती गमछे या तौलिए से ढकें',
        'यदि किसी को चक्कर या तेज सिरदर्द हो तो तुरंत ठंडी छाया में ले जाएं और 108 पर कॉल करें',
      ],
      te: [
        'దాహం వేయకపోయినా తరచుగా మంచినీరు, మజ్జిగ, కొబ్బరి నీరు త్రాగాలి',
        'ఉదయం 11:30 నుండి మధ్యాహ్నం 3:30 గంటల వరకు ఎండలో పనులు చేయకూడదు',
        'బయటకు వెళ్ళినప్పుడు తలపై తడి గుడ్డ లేదా టోపీ ధరించాలి',
        'వడదెబ్బ తగిలితే వెంటనే చల్లని నీడలోకి చేర్చి 108 కి సమాచారం ఇవ్వాలి',
      ],
    },
    issuingAuthority: 'National Disaster Management Authority (NDMA) & Ministry of Health',
  },
  {
    id: 'alert-safe-drinking-water',
    title: {
      en: 'Safe Drinking Water & Acute Diarrhoeal Disease Advisory',
      hi: 'सुरक्षित पेयजल एवं दस्त रोग रोकथाम परामर्श',
      te: 'సురక్షిత తాగునీరు మరియు విరేచనాల వ్యాధుల నివారణ సూచనలు',
    },
    disease: 'Acute Gastroenteritis & Waterborne Pathogens',
    severity: 'Advisory',
    affectedRegion: 'Flood-prone and Low-lying Village Habitations',
    dateReported: 'Recent Bulletin',
    summary: {
      en: 'Due to rising groundwater turbidity, open well and borehole water must be purified prior to consumption to prevent gastrointestinal infections.',
      hi: 'वर्षा के कारण कुओं और नलों के पानी में गंदगी आने की संभावना को देखते हुए केवल उबला या क्लोरीनीकृत पानी ही पिएं।',
      te: 'వరదలు లేదా వర్షాల వల్ల తాగునీరు కలుషితం కాకుండా కాచి చల్లార్చిన నీటిని మాత్రమే త్రాగాలి.',
    },
    preventionTips: {
      en: [
        'Boil water vigorously for at least 1-2 minutes before drinking or using for infant feed',
        'Wash hands with soap thoroughly before handling food and feeding children',
        'Store free ORS packets at home from the local ASHA worker',
      ],
      hi: [
        'पीने के पानी को कम से कम 1-2 मिनट तक तेज आंच पर उबालें',
        'भोजन करने और बच्चों को खिलाने से पहले साबुन से हाथ अच्छी तरह धोएं',
        'स्थानीय आशा कार्यकर्ता से ओआरएस पैकेट प्राप्त कर घर में अवश्य रखें',
      ],
      te: [
        'నీటిని బాగా మరిగించి చల్లారిన తర్వాతే త్రాగాలి',
        'ఆహారం వండటానికి మరియు పిల్లలకు తినిపించడానికి ముందు సబ్బుతో చేతులు కడుక్కోవాలి',
        'ఆశా కార్యకర్త నుండి ఓఆర్ఎస్ ప్యాకెట్లు తెచ్చి ఇంట్లో సిద్ధంగా ఉంచుకోవాలి',
      ],
    },
    issuingAuthority: 'National Health Mission & Department of Drinking Water and Sanitation',
  },
];
