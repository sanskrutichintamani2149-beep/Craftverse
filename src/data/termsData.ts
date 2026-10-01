export interface Flashcard {
  front: string;
  back: string;
  frontHi: string;
  backHi: string;
  frontMr: string;
  backMr: string;
}

export interface QuizQuestion {
  question: string;
  questionHi: string;
  questionMr: string;
  options: string[];
  optionsHi: string[];
  optionsMr: string[];
  correctIndex: number;
  explanation: string;
  explanationHi: string;
  explanationMr: string;
}

export interface FinancialTerm {
  slug: string;
  name: string;
  nameHi: string;
  nameMr: string;
  category: 'Tax' | 'Investing' | 'Income' | 'Credit' | 'Business' | 'Basics' | 'Loans';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  readTimeHi: string;
  readTimeMr: string;
  icon: string;
  tagline: string;
  taglineHi: string;
  taglineMr: string;
  simpleExplanation: string;
  simpleExplanationHi: string;
  simpleExplanationMr: string;
  deepDive: string;
  deepDiveHi: string;
  deepDiveMr: string;
  example: {
    scenario: string;
    scenarioHi: string;
    scenarioMr: string;
    math: string;
  };
  rememberThis: string;
  rememberThisHi: string;
  rememberThisMr: string;
  commonMistake: string;
  commonMistakeHi: string;
  commonMistakeMr: string;
  mythVsReality: {
    myth: string;
    reality: string;
    mythHi: string;
    realityHi: string;
    mythMr: string;
    realityMr: string;
  };
  flashcards: Flashcard[];
  quiz: QuizQuestion;
  youtubeVideoId: string;
  learnMoreQuery: string;
  hasCalculator: boolean;
  calculatorType?: 'gst' | 'sip' | 'emi' | 'tds' | 'compounding' | 'inflation';
  relatedSlugs: string[];
}

export interface ProfessionTrack {
  slug: string;
  title: string;
  titleHi: string;
  titleMr: string;
  tagline: string;
  taglineHi: string;
  taglineMr: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  icon: string;
  badge: string;
  badgeHi: string;
  badgeMr: string;
  terms: string[];
}

export const financialCategories = [
  'All',
  'Tax',
  'Investing',
  'Income',
  'Credit',
  'Business',
  'Basics',
] as const;

export const professionTracks: ProfessionTrack[] = [
  {
    slug: 'students',
    title: 'Students & First-Jobbers',
    titleHi: 'विद्यार्थी और पहली नौकरी',
    titleMr: 'विद्यार्थी आणि पहिली नोकरी',
    tagline: 'Build rock-solid financial hygiene before your first pay cheque arrives.',
    taglineHi: 'अपनी पहली तनख्वाह आने से पहले ही वित्तीय अनुशासन की मजबूत नींव बनाएं।',
    taglineMr: 'पहिला पगार येण्यापूर्वीच योग्य आर्थिक नियोजनाची भक्कम पायाभरणी करा.',
    description: 'Learn how to budget pocket money or starter stipends, build an emergency buffer, understand compound interest, launch your very first SIP, and establish a clean credit history from day one.',
    descriptionHi: 'पॉकेट मनी या शुरुआती वजीफे का बजट बनाना सीखें, इमरजेंसी फंड बनाएं, चक्रवृद्धि ब्याज समझें और अपना पहला एसआईपी शुरू करें।',
    descriptionMr: 'पॉकेट मनी किंवा विद्यावेतनाचे बजेट करणे, आणीबाणी निधी उभारणे, चक्रवाढ व्याज समजून घेणे आणि पहिली एसआयपी सुरू करणे शिका.',
    icon: '🎓',
    badge: 'Foundation Track',
    badgeHi: 'बुनियादी ट्रैक',
    badgeMr: 'पायाभूत ट्रॅक',
    terms: ['budgeting', 'compounding', 'emergency-fund', 'sip', 'credit-score'],
  },
  {
    slug: 'salaried',
    title: 'Salaried Employees',
    titleHi: 'वेतनभोगी कर्मचारी',
    titleMr: 'पगारदार कर्मचारी',
    tagline: 'De-mystify pay slips, tax deductions, benefits, and protective insurance.',
    taglineHi: 'सैलरी स्लिप, टैक्स कटौती, भत्ते और सुरक्षा बीमा को गहराई से समझें।',
    taglineMr: 'पगार पावती, कर कपात, भत्ते आणि विमा संरक्षण सोप्या भाषेत समजून घ्या.',
    description: 'Master the breakdown of your CTC, see where gross shrinks into net in-hand, understand how Form 16 and TDS fit together, choose the right tax regime, and protect your family with term and health cover.',
    descriptionHi: 'अपने सीटीसी के प्रत्येक घटक को समझें, ग्रॉस और नेट सैलरी का अंतर जानें, फॉर्म 16 और टीडीएस को समझें तथा टर्म और हेल्थ इंश्योरेंस लें।',
    descriptionMr: 'तुमचा सीटीसी कसा विभागला जातो, ग्रॉस व नेट पगारामधील फरक, फॉर्म १६ आणि टीडीएस चे गणित आणि टर्म व हेल्थ इन्शुरन्सचे महत्त्व जाणून घ्या.',
    icon: '💼',
    badge: 'Career & Tax Track',
    badgeHi: 'करियर व टैक्स ट्रैक',
    badgeMr: 'करिअर आणि कर ट्रॅक',
    terms: ['ctc', 'gross-vs-net', 'form-16', 'tds', 'income-tax', 'term-insurance', 'health-insurance', 'sip'],
  },
  {
    slug: 'founders',
    title: 'Startup Founders & Business',
    titleHi: 'स्टार्टअप संस्थापक और व्यापार',
    titleMr: 'स्टार्टअप संस्थापक आणि व्यवसाय',
    tagline: 'Navigate GST compliance, input tax credit, equity cap tables, and ESOPs.',
    taglineHi: 'जीएसटी अनुपालन, इनपुट टैक्स क्रेडिट, इक्विटी और ईएसओपी को प्रभावी ढंग से संभालें।',
    taglineMr: 'जीएसटी कायदे, इनपुट टॅक्स क्रेडिट, इक्विटी आणि ईएसओपीचे योग्य नियोजन करा.',
    description: 'From invoice GST slabs and claiming Input Tax Credit to rewarding early talent with ESOPs and managing cap table dilution and capital gains on exits, this roadmap keeps your company financially resilient.',
    descriptionHi: 'चालान पर जीएसटी स्लैब, इनपुट टैक्स क्रेडिट का दावा करने से लेकर ईएसओपी द्वारा प्रतिभा को जोड़ने और कैपिटल गेन्स टैक्स को समझने का संपूर्ण रोडमैप।',
    descriptionMr: 'इनव्हॉइसवरील जीएसटी, आयटीसी परतावा, सहकाऱ्यांना ईएसओपी देणे आणि भांडवली नफा कर समजून घेण्याचा संपूर्ण मार्गदर्शक.',
    icon: '🚀',
    badge: 'Enterprise & Equity Track',
    badgeHi: 'उद्यमिता व इक्विटी ट्रैक',
    badgeMr: 'उद्योग आणि इक्विटी ट्रॅक',
    terms: ['gst', 'gst-business-impact', 'tds', 'equity', 'esops', 'capital-gains'],
  },
  {
    slug: 'freelancers',
    title: 'Freelancers & Creators',
    titleHi: 'फ्रीलांसर और क्रिएटर्स',
    titleMr: 'फ्रीलान्सर आणि क्रिएटर्स',
    tagline: 'Conquer lumpy cashflows, advance tax, 194J TDS deductions, and safety nets.',
    taglineHi: 'अनियमित आय, अग्रिम कर, टीडीएस और स्वास्थ्य सुरक्षा जाल का सुनियोजित प्रबंधन।',
    taglineMr: 'अनियमित उत्पन्न, आगाऊ कर, टीडीएस कपात आणि सुरक्षिततेचे योग्य व्यवस्थापन करा.',
    description: 'Freelancers face fluctuating monthly invoices, client TDS deductions under Section 194J, quarterly advance tax calendars, and zero employer benefits. Learn how to construct your own benefits stack.',
    descriptionHi: 'फ्रीलांसरों को होने वाली अनियमित आय, 194J के तहत टीडीएस और बिना नियोक्ता वाली स्वास्थ्य सुरक्षा का समाधान तैयार करें।',
    descriptionMr: 'फ्रीलान्सर्ससाठी अनियमित उत्पन्न, १९४जे अंतर्गत टीडीएस आणि स्वतःचे विमा संरक्षण तयार करण्यासाठी आवश्यक मार्गदर्शन.',
    icon: '🎨',
    badge: 'Independent Pro Track',
    badgeHi: 'स्वतंत्र पेशेवर ट्रैक',
    badgeMr: 'स्वतंत्र व्यावसायिक ट्रॅक',
    terms: ['tds', 'gst', 'emergency-fund', 'income-tax', 'sip', 'health-insurance'],
  },
  {
    slug: 'civil',
    title: 'Civil Aspirants & Govt',
    titleHi: 'सिविल सेवा अभ्यर्थी और सरकारी',
    titleMr: 'नागरी सेवा इच्छुक आणि शासकीय',
    tagline: 'Understand macroeconomic policy, direct vs indirect taxation, and inflation.',
    taglineHi: 'मैक्रोइकॉनॉमिक नीति, प्रत्यक्ष बनाम अप्रत्यक्ष कर और मुद्रास्फीति को समझें।',
    taglineMr: 'स्थूल अर्थशास्त्र, प्रत्यक्ष व अप्रत्यक्ष कर प्रणाली आणि महागाईचे विश्लेषण.',
    description: 'Clear conceptual understanding of Indian fiscal policy, consumer price index movements, GST Council structures, salary grade pays, NPS pensions, and long-term sovereign wealth security.',
    descriptionHi: 'भारतीय राजकोषीय नीति, उपभोक्ता मूल्य सूचकांक, जीएसटी काउंसिल, वेतन आयोग और एनपीएस पेंशन का स्पष्ट अध्ययन।',
    descriptionMr: 'भारतीय वित्तीय धोरणे, ग्राहक किंमत निर्देशांक, जीएसटी परिषद, वेतन आयोग आणि निवृत्ती वेतन पद्धतीचे सखोल ज्ञान.',
    icon: '🏛️',
    badge: 'Macro & Policy Track',
    badgeHi: 'नीति व लोक प्रशासन ट्रैक',
    badgeMr: 'प्रशासकीय आणि धोरण ट्रॅक',
    terms: ['inflation', 'gst', 'income-tax', 'gross-vs-net', 'term-insurance'],
  },
  {
    slug: 'food',
    title: 'Gig & Food Delivery',
    titleHi: 'गिग और डिलीवरी पार्टनर्स',
    titleMr: 'गिग आणि फूड डिलिव्हरी',
    tagline: 'Shield your earnings, build an instant emergency stash, and protect health.',
    taglineHi: 'अपनी कमाई सुरक्षित रखें, त्वरित आपातकालीन फंड बनाएं और स्वास्थ्य सुरक्षित करें।',
    taglineMr: 'दैनिक कमाईचे रक्षण करा, आपत्कालीन निधी तयार करा आणि आरोग्य सुरक्षित ठेवा.',
    description: 'Gig workers and delivery executives operate in high-risk physical environments with dynamic incentive-based pay. Learn how to separate fuel and bike maintenance from personal money and protect against hospitalization.',
    descriptionHi: 'डिलीवरी और गिग कर्मियों के लिए बाइक मेंटेनेंस, ईंधन खर्च अलग रखना, बीमा कवरेज और इमरजेंसी फंड की व्यावहारिक रणनीति।',
    descriptionMr: 'डिलिव्हरी पार्टनर्ससाठी दैनंदिन खर्च नियोजन, अपघात विमा, आरोग्य संरक्षण आणि सुरक्षित बचतीची गुरुकिल्ली.',
    icon: '🛵',
    badge: 'Gig Economy Track',
    badgeHi: 'गिग इकोनॉमी ट्रैक',
    badgeMr: 'गिग इकॉनॉमी ट्रॅक',
    terms: ['budgeting', 'emergency-fund', 'health-insurance', 'tds', 'credit-score'],
  },
];

export const financialTerms: FinancialTerm[] = [
  {
    "slug": "gst",
    "name": "GST (Goods & Services Tax)",
    "nameHi": "जीएसटी (वस्तु एवं सेवा कर)",
    "nameMr": "जीएसटी (वस्तू आणि सेवा कर)",
    "category": "Tax",
    "difficulty": "Beginner",
    "readTime": "4 min read",
    "readTimeHi": "4 मिनट पठन",
    "readTimeMr": "4 मिनिटे वाचन",
    "icon": "🧾",
    "tagline": "One nation, one tax — replacing multiple cascading indirect taxes across India.",
    "taglineHi": "एक राष्ट्र, एक कर — भारत भर में पुराने जटिल अप्रत्यक्ष करों का समाधान।",
    "taglineMr": "एक देश, एक कर — जुन्या अप्रत्यक्ष करांचे एकत्रीकरण.",
    "simpleExplanation": "GST is a single destination-based indirect tax collected at every step of value addition in the supply chain. While businesses collect it along the way, the final burden is paid by the end consumer. Businesses can claim Input Tax Credit (ITC) for GST paid on inputs, avoiding tax-on-tax.",
    "simpleExplanationHi": "जीएसटी एक अप्रत्यक्ष कर है जो आपूर्ति श्रृंखला में मूल्य संवर्धन के प्रत्येक चरण में लगाया जाता है। उपभोक्ता अंतिम रूप से इसका भुगतान करता है, जबकि व्यवसाय इनपुट टैक्स क्रेडिट (ITC) का दावा कर सकते हैं।",
    "simpleExplanationMr": "जीएसटी हा एक अप्रत्यक्ष कर आहे जो ग्राहकाकडून खरेदीच्या वेळी आकारला जातो. व्यावसायिक कच्च्या मालावर भरलेल्या कराचा इनपुट टॅक्स क्रेडिट (ITC) द्वारे परतावा घेऊ शकतात.",
    "deepDive": "Introduced on July 1, 2017, GST subsumed 17 central and state taxes including VAT, Service Tax, Central Excise, and Octroi. It operates on a dual structure: CGST (Central GST) and SGST (State GST) for intra-state transactions, and IGST (Integrated GST) for inter-state supply. Tax slabs are divided into 0%, 5%, 12%, 18%, and 28%. The GST Council, chaired by the Union Finance Minister, governs all rate amendments.",
    "deepDiveHi": "1 जुलाई 2017 को लागू किए गए जीएसटी ने वैट, सेवा कर और उत्पाद शुल्क सहित 17 केंद्रीय और राज्य करों को समाप्त कर दिया। यह सीजीएसटी, एसजीएसटी और आईजीएसटी के रूप में काम करता है। कर की दरें 0%, 5%, 12%, 18% और 28% के स्लैब में विभाजित हैं।",
    "deepDiveMr": "१ जुलै २०१७ रोजी लागू झालेल्या जीएसटीने व्हॅट, सेवा कर आणि उत्पादन शुल्कासह १७ कर एकत्र केले. राज्यांतर्गत व्यवहारांसाठी सीजीएसटी आणि एसजीएसटी, तर आंतरराज्यीय व्यवहारांसाठी आयजीएसटी आकारला जातो. कर दर ०%, ५%, १२%, १८% आणि २८% स्लॅबमध्ये विभागले आहेत.",
    "example": {
      "scenario": "You buy a phone case for ₹1,000 having an 18% GST slab. The shop invoices ₹1,000 + ₹180 GST = ₹1,180 total.",
      "scenarioHi": "आप ₹1,000 का फोन कवर खरीदते हैं जिस पर 18% जीएसटी है। बिल ₹1,000 + ₹180 = ₹1,180 बनता है।",
      "scenarioMr": "तुम्ही ₹1,000 चा फोन कव्हर विकत घेता ज्यावर 18% जीएसटी आहे. एकूण बिल ₹1,000 + ₹180 = ₹1,180 होते.",
      "math": "Base ₹1,000 + 18% GST (9% CGST ₹90 + 9% SGST ₹90) = ₹1,180 Total"
    },
    "rememberThis": "GST collected by retailers is not their revenue; they must deposit it into the Government treasury through monthly GSTR filings.",
    "rememberThisHi": "दुकानदार द्वारा एकत्र किया गया जीएसटी उनका लाभ नहीं है; उन्हें इसे मासिक रिटर्न में सरकार के पास जमा करना होता है।",
    "rememberThisMr": "दुकानदारांनी गोळा केलेला जीएसटी हा त्यांचा नफा नाही; तो सरकारकडे जमा करणे बंधनकारक असते.",
    "commonMistake": "Believing that a higher GST bill means the merchant is overcharging you for extra profit.",
    "commonMistakeHi": "यह सोचना कि जीएसटी दुकानदार की जेब में जा रहा है।",
    "commonMistakeMr": "जीएसटीमुळे दुकानदाराला जास्त नफा मिळतो असा गैरसमज असणे.",
    "mythVsReality": {
      "myth": "GST made every single product and service more expensive in India.",
      "reality": "GST eliminated cascading \"tax on tax\" (like excise + VAT + octroi). For many manufactured goods, the effective tax rate dropped.",
      "mythHi": "जीएसटी ने भारत में हर चीज़ को महंगा कर दिया।",
      "realityHi": "जीएसटी ने पुराने छिपे हुए करों की दोहरी परत हटा दी, जिससे कई आवश्यक वस्तुओं पर कुल कर कम हुआ।",
      "mythMr": "जीएसटीमुळे सर्व गोष्टी महाग झाल्या.",
      "realityMr": "जीएसटीमुळे अनेक छुपे कर नाहीसे झाले आणि पारदर्शकता वाढली."
    },
    "flashcards": [
      {
        "front": "What does GST stand for and when was it launched?",
        "back": "Goods and Services Tax, launched across India on July 1, 2017, replacing 17 older indirect taxes.",
        "frontHi": "जीएसटी का पूरा नाम क्या है और यह कब लागू हुआ?",
        "backHi": "वस्तु एवं सेवा कर (Goods and Services Tax), जो 1 जुलाई 2017 को भारत भर में लागू हुआ।",
        "frontMr": "जीएसटीचे पूर्ण नाव काय आहे आणि तो कधी लागू झाला?",
        "backMr": "वस्तू आणि सेवा कर (Goods and Services Tax), जो १ जुलै २०१७ रोजी भारतात लागू झाला."
      },
      {
        "front": "What is Input Tax Credit (ITC)?",
        "back": "ITC allows businesses to deduct the GST they paid on business inputs from the GST collected from customers.",
        "frontHi": "इनपुट टैक्स क्रेडिट (ITC) क्या है?",
        "backHi": "आईटीसी व्यवसायों को बिक्री पर एकत्र किए गए जीएसटी में से कच्चा माल खरीदने पर भरे गए जीएसटी को घटाने की अनुमति देता है।",
        "frontMr": "इनपुट टॅक्स क्रेडिट (ITC) म्हणजे काय?",
        "backMr": "आयटीसीमुळे व्यावसायिकांना विक्रीवरील जीएसटीमधून कच्च्या मालावरील भरलेला जीएसटी वजा करण्याची सवलत मिळते."
      }
    ],
    "quiz": {
      "question": "Which of the following indirect taxes was NOT replaced by GST in India?",
      "questionHi": "भारत में निम्नलिखित में से कौन सा अप्रत्यक्ष कर जीएसटी द्वारा प्रतिस्थापित नहीं किया गया था?",
      "questionMr": "भारतात खालीलपैकी कोणता अप्रत्यक्ष कर जीएसटीमध्ये समाविष्ट केला गेला नाही?",
      "options": [
        "Value Added Tax (VAT)",
        "Service Tax",
        "Basic Customs Duty on Imports",
        "Central Excise Duty"
      ],
      "optionsHi": [
        "मूल्य वर्धित कर (VAT)",
        "सेवा कर (Service Tax)",
        "आयात पर मूल सीमा शुल्क (Customs Duty)",
        "केंद्रीय उत्पाद शुल्क (Central Excise)"
      ],
      "optionsMr": [
        "मूल्यवर्धित कर (व्हॅट)",
        "सेवा कर (सर्व्हिस टॅक्स)",
        "आयातीवरील मूलभूत सीमा शुल्क (कस्टम्स ड्युटी)",
        "केंद्रीय उत्पादन शुल्क"
      ],
      "correctIndex": 2,
      "explanation": "Basic Customs Duty (BCD) on goods imported from abroad continues to be levied separately alongside Integrated GST (IGST).",
      "explanationHi": "विदेशों से आयातित वस्तुओं पर बेसिक कस्टम्स ड्यूटी (BCD) को जीएसटी में शामिल नहीं किया गया है और यह अलग से ली जाती है।",
      "explanationMr": "परदेशातून आयात केलेल्या वस्तूंवर मूलभूत सीमा शुल्क (कस्टम्स ड्युटी) स्वतंत्रपणे आकारले जाते; ते जीएसटीमध्ये विलीन झाले नाही."
    },
    "youtubeVideoId": "VAfQ8gBrgEs",
    "learnMoreQuery": "what is GST india explained simple",
    "hasCalculator": true,
    "calculatorType": "gst",
    "relatedSlugs": [
      "tds",
      "income-tax",
      "gst-business-impact"
    ]
  },
  {
    "slug": "tds",
    "name": "TDS (Tax Deducted at Source)",
    "nameHi": "टीडीएस (स्रोत पर कर कटौती)",
    "nameMr": "टीडीएस (उत्पन्नाच्या स्रोतावर कर कपात)",
    "category": "Tax",
    "difficulty": "Beginner",
    "readTime": "4 min read",
    "readTimeHi": "4 मिनट पठन",
    "readTimeMr": "4 मिनिटे वाचन",
    "icon": "✂️",
    "tagline": "Tax deducted in advance by the payer before money reaches your bank account.",
    "taglineHi": "पैसा आपके खाते में आने से पहले काटा जाने वाला अग्रिम कर।",
    "taglineMr": "पैसे बँक खात्यात येण्यापूर्वी कापून घेतलेला आगाऊ कर.",
    "simpleExplanation": "TDS is government revenue collection at the very point where income originates. When your employer pays salary, a client pays an invoice, or a bank credits interest above the annual threshold, they deduct a fixed tax percentage and deposit it directly into the Income Tax Department under your PAN.",
    "simpleExplanationHi": "टीडीएस वह कर है जो आपके नियोक्ता या ग्राहक द्वारा आपको भुगतान करने से पहले ही काटकर सीधे आयकर विभाग में आपके पैन नंबर पर जमा कर दिया जाता है।",
    "simpleExplanationMr": "टीडीएस म्हणजे मिळकतीवर उत्पन्न देणाऱ्याकडून आधीच कापून घेतलेला कर, जो थेट तुमच्या पॅन कार्डवर आयकर विभागाकडे जमा होतो.",
    "deepDive": "TDS ensures continuous cash flow for the government and curbs tax evasion. Key sections include Sec 192 (Salary), Sec 194A (Bank FD interest above ₹40,000/₹50,000 for seniors), Sec 194C (Contractors), and Sec 194J (Professional and technical fees at 10% or 2%). All deducted TDS reflects in your Form 26AS and AIS (Annual Information Statement). If your total tax liability for the financial year is lower than the TDS deducted, you receive a full refund upon filing your ITR.",
    "deepDiveHi": "टीडीएस धारा 192 (वेतन), धारा 194A (एफडी ब्याज), और धारा 194J (प्रोफेशनल फीस) के तहत काटा जाता है। यह राशि आपके फॉर्म 26AS और एआईएस में दिखती है। यदि आपका वास्तविक टैक्स कम बनता है तो आईटीआर भरने पर अतिरिक्त पैसा रिफंड मिल जाता है।",
    "deepDiveMr": "टीडीएस कलम १९२ (पगार), १९४ए (बँक व्याज) आणि १९४जे (व्यावसायिक फी) अन्वये कापला जातो. हा कर फॉर्म २६एएस मध्ये दिसतो आणि प्रत्यक्ष कर कमी असल्यास आयटीआर दाखल करून परतावा (रिफंड) मिळवता येतो.",
    "example": {
      "scenario": "You do freelance UX design for ₹50,000. Under Sec 194J, the client deducts 10% TDS (₹5,000) and transfers ₹45,000 to your bank.",
      "scenarioHi": "आपने ₹50,000 का फ्रीलांस काम किया। ग्राहक ने 10% टीडीएस (₹5,000) काटकर आपके बैंक में ₹45,000 भेजे।",
      "scenarioMr": "तुम्ही ₹50,000 चे फ्रीलान्स काम केले. ग्राहकाने १०% टीडीएस (₹5,000) कापून तुम्हाला ₹45,000 दिले.",
      "math": "Invoice: ₹50,000 - 10% TDS (₹5,000) = ₹45,000 Net Payout. ₹5,000 is credited to your PAN in Form 26AS."
    },
    "rememberThis": "TDS is not an additional tax penalty; it is simply your advance income tax credited against your PAN. File your ITR to adjust or claim it back.",
    "rememberThisHi": "टीडीएस कोई अतिरिक्त कर नहीं है; यह आपके पैन में जमा किया गया अग्रिम कर है। रिफंड पाने के लिए आईटीआर जरूर भरें।",
    "rememberThisMr": "टीडीएस हा वाढीव कर नसून आगाऊ भरलेला कर आहे; तो परत मिळवण्यासाठी आयटीआर दाखल करणे आवश्यक आहे.",
    "commonMistake": "Assuming that because TDS was deducted by your employer or bank, you no longer need to file an Income Tax Return (ITR).",
    "commonMistakeHi": "यह मान लेना कि टीडीएस कट गया तो अब इनकम टैक्स रिटर्न (ITR) भरने की कोई जरूरत नहीं है।",
    "commonMistakeMr": "टीडीएस कापला गेला म्हणून आता आयटीआर भरण्याची गरज नाही असा विचार करणे ही मोठी चूक आहे.",
    "mythVsReality": {
      "myth": "TDS deducted by clients or banks is gone forever and cannot be recovered.",
      "reality": "If your annual total income falls below the taxable threshold, the entire deducted TDS is refunded directly into your bank account with interest.",
      "mythHi": "टीडीएस में कटा हुआ पैसा डूब जाता है और वापस नहीं मिलता।",
      "realityHi": "यदि आपकी कुल वार्षिक आय कर योग्य सीमा से कम है, तो पूरा टीडीएस आपके बैंक खाते में ब्याज सहित वापस आ जाता है।",
      "mythMr": "कापून घेतलेला टीडीएस कधीही परत मिळत नाही.",
      "realityMr": "जर तुमचे एकूण उत्पन्न करपात्र मर्यादेपेक्षा कमी असेल तर सर्व टीडीएस व्याजासह परत मिळतो."
    },
    "flashcards": [
      {
        "front": "Where can you verify all TDS deducted against your name?",
        "back": "In Form 26AS and your AIS (Annual Information Statement) on the official Income Tax portal.",
        "frontHi": "आप अपने नाम पर काटा गया टीडीएस कहाँ देख सकते हैं?",
        "backHi": "आयकर विभाग के पोर्टल पर फॉर्म 26AS और एआईएस (AIS) में।",
        "frontMr": "तुमच्या नावावर कापलेला टीडीएस कुठे तपासता येतो?",
        "backMr": "आयकर पोर्टलवरील फॉर्म २६एएस (Form 26AS) आणि एआयएस (AIS) मध्ये."
      },
      {
        "front": "What happens if your total tax liability is zero but ₹15,000 TDS was cut?",
        "back": "You file your ITR, and the Income Tax Department refunds the full ₹15,000 directly to your validated bank account.",
        "frontHi": "यदि आपकी टैक्स देनदारी शून्य है लेकिन ₹15,000 टीडीएस कट गया तो क्या होगा?",
        "backHi": "आप आईटीआर फाइल करेंगे और आयकर विभाग पूरे ₹15,000 आपके बैंक खाते में रिफंड कर देगा।",
        "frontMr": "जर तुमचा कर शून्य असेल पण ₹१५,००० टीडीएस कापला गेला तर काय होईल?",
        "backMr": "तुम्ही आयटीआर दाखल केल्यावर आयकर विभाग संपूर्ण ₹१५,००० तुमच्या बँक खात्यात परत जमा करेल."
      }
    ],
    "quiz": {
      "question": "What is the standard TDS deduction rate on professional fees under Section 194J for non-technical contracts?",
      "questionHi": "धारा 194J के तहत गैर-तकनीकी पेशेवर अनुबंधों पर मानक टीडीएस दर क्या है?",
      "questionMr": "कलम १९४जे अंतर्गत व्यावसायिक शुल्कावर मानक टीडीएस दर किती असतो?",
      "options": [
        "1%",
        "2%",
        "5%",
        "10%"
      ],
      "optionsHi": [
        "1%",
        "2%",
        "5%",
        "10%"
      ],
      "optionsMr": [
        "१%",
        "२%",
        "५%",
        "१०%"
      ],
      "correctIndex": 3,
      "explanation": "Under Section 194J, standard professional fees are subject to 10% TDS, while technical services are subject to 2%.",
      "explanationHi": "धारा 194J के तहत पेशेवर फीस पर 10% टीडीएस काटा जाता है, जबकि तकनीकी सेवाओं पर 2% की दर है।",
      "explanationMr": "कलम १९४जे अंतर्गत व्यावसायिक शुल्कावर १०% टीडीएस कापला जातो, तर तांत्रिक सेवांसाठी २% दर आहे."
    },
    "youtubeVideoId": "8fOcl4zR7-w",
    "learnMoreQuery": "TDS in india explained how to claim refund 26AS",
    "hasCalculator": true,
    "calculatorType": "tds",
    "relatedSlugs": [
      "gst",
      "income-tax",
      "form-16"
    ]
  },
  {
    "slug": "sip",
    "name": "SIP (Systematic Investment Plan)",
    "nameHi": "एसआईपी (सिस्टमैटिक इन्वेस्टमेंट प्लान)",
    "nameMr": "एसआयपी (सिस्टिमॅटिक इन्व्हेस्टमेंट प्लॅन)",
    "category": "Investing",
    "difficulty": "Beginner",
    "readTime": "3 min read",
    "readTimeHi": "3 मिनट पठन",
    "readTimeMr": "3 मिनिटे वाचन",
    "icon": "🌱",
    "tagline": "Automate wealth creation through disciplined, recurring monthly micro-investments.",
    "taglineHi": "अनुशासित, मासिक छोटी किश्तों के माध्यम से नियमित संपत्ति निर्माण।",
    "taglineMr": "दरमहा लहान रकमेची नियमित बचत करून संपत्ती निर्माण करण्याची पद्धत.",
    "simpleExplanation": "An SIP is a systematic method of investing a predetermined fixed sum of money into mutual funds at regular intervals (usually monthly). Instead of trying to guess market highs and lows, you automatically buy units across market cycles.",
    "simpleExplanationHi": "एसआईपी म्यूचुअल फंड में नियमित रूप से (आमतौर पर हर महीने) एक निश्चित राशि निवेश करने का तरीका है। इससे बाजार के उतार-चढ़ाव का तनाव नहीं रहता।",
    "simpleExplanationMr": "एसआयपी म्हणजे दरमहा ठरलेली रक्कम म्युच्युअल फंडामध्ये नियमितपणे गुंतवण्याची एक शिस्तबद्ध पद्धत आहे.",
    "deepDive": "SIP harnesses Rupee Cost Averaging: when stock markets dip, your fixed monthly allocation buys more fund units; when markets rally, you buy fewer units. Over a 5 to 15-year horizon, this lowers your average acquisition price without requiring you to time market crashes. Step-Up SIPs allow you to increase monthly installments by 10% every year as your salary expands.",
    "deepDiveHi": "एसआईपी रुपया लागत औसत (Rupee Cost Averaging) पर काम करता है। मंदी में आपको ज्यादा यूनिट्स मिलती हैं और तेजी में कम, जिससे औसत खरीद लागत घटती है। स्टेप-अप एसआईपी से हर साल निवेश 10% बढ़ा सकते हैं।",
    "deepDiveMr": "एसआयपी रुपया कॉस्ट ॲव्हरेजिंगच्या तत्त्वावर चालते. मंदीच्या काळात जास्त युनिट्स आणि तेजीच्या काळात कमी युनिट्स मिळून सरासरी खरेदी किंमत कमी होते. पगार वाढेल तशी स्टेप-अप एसआयपी वाढवता येते.",
    "example": {
      "scenario": "Investing ₹5,000 monthly for 15 years at an expected 12% annualized return.",
      "scenarioHi": "15 वर्षों तक हर महीने ₹5,000 का निवेश, 12% वार्षिक अनुमानित रिटर्न पर।",
      "scenarioMr": "दरमहा ₹5,000 चा १५ वर्षे १२% वार्षिक अपेक्षीत परताव्यावर केलेला नियमित संचय.",
      "math": "Invested Amount: ₹9,00,000 | Estimated Wealth: ₹25,22,880 | Compounded Gain: ₹16,22,880"
    },
    "rememberThis": "SIP is not a separate financial product; it is an automated payment route into mutual funds. The fund you pick determines your portfolio risk and return.",
    "rememberThisHi": "एसआईपी कोई अलग वित्तीय उत्पाद नहीं है; यह म्यूचुअल फंड में निवेश करने का एक स्वचालित तरीका मात्र है।",
    "rememberThisMr": "एसआयपी हा स्वतंत्र उत्पादन प्रकार नसून म्युच्युअल फंडात गुंतवणूक करण्याचा एक स्वयंचलित मार्ग आहे.",
    "commonMistake": "Stopping your SIP installments in panic when stock market indices experience a temporary correction.",
    "commonMistakeHi": "बाजार में गिरावट आने पर घबराकर अपनी एसआईपी बंद कर देना।",
    "commonMistakeMr": "शेअर बाजारात घसरण झाल्यावर घाबरून चालू असलेली एसआयपी बंद करणे.",
    "mythVsReality": {
      "myth": "SIP guarantees positive returns every single month without market fluctuations.",
      "reality": "Equity SIP values will fluctuate in the short run. Real wealth compounds over multi-year cycles exceeding 5 to 7 years.",
      "mythHi": "एसआईपी में हर महीने गारंटीड मुनाफा मिलता है।",
      "realityHi": "शॉर्ट-टर्म में इक्विटी एसआईपी में भी उतार-चढ़ाव होता है; वास्तविक धन 5 से 7 वर्षों से अधिक समय में बनता है।",
      "mythMr": "एसआयपीमध्ये दर महिन्याला खात्रीशीर नफा मिळतो.",
      "realityMr": "अल्पकाळात एसआयपीचे मूल्य कमी-जास्त होऊ शकते; ५ ते ७ वर्षांनंतरच चक्रवाढ वाढीचा खरा फायदा मिळतो."
    },
    "flashcards": [
      {
        "front": "What is Rupee Cost Averaging in SIP?",
        "back": "Buying more units when market prices drop and fewer units when prices rise, reducing your average cost per unit over time.",
        "frontHi": "एसआईपी में रुपया लागत औसत (Rupee Cost Averaging) क्या है?",
        "backHi": "बाजार गिरने पर अधिक यूनिट और बढ़ने पर कम यूनिट खरीदना, जिससे प्रति यूनिट औसत खरीद लागत कम हो जाती है।",
        "frontMr": "एसआयपीमध्ये रुपया कॉस्ट ॲव्हरेजिंग म्हणजे काय?",
        "backMr": "बाजार खाली असताना जास्त युनिट्स आणि वर असताना कमी युनिट्स खरेदी होऊन सरासरी किंमत संतुलित होणे."
      },
      {
        "front": "What is a Step-Up SIP?",
        "back": "A feature that automatically increases your monthly investment amount (e.g. by 10%) each year as your salary increases.",
        "frontHi": "स्टेप-अप एसआईपी क्या है?",
        "backHi": "एक ऐसी सुविधा जो हर साल आपके वेतन वृद्धि के साथ आपकी मासिक निवेश राशि (उदा. 10%) अपने आप बढ़ा देती है।",
        "frontMr": "स्टेप-अप एसआयपी म्हणजे काय?",
        "backMr": "दरवर्षी पगार वाढल्यानुसार गुंतवणुकीची रक्कम आपोआप (उदा. १०%) वाढवणारी सुविधा."
      }
    ],
    "quiz": {
      "question": "What is the primary benefit of staying invested in an equity SIP during a severe market downturn?",
      "questionHi": "गंभीर बाजार मंदी के दौरान इक्विटी एसआईपी जारी रखने का मुख्य लाभ क्या है?",
      "questionMr": "बाजार मंदीच्या काळात इक्विटी एसआयपी सुरू ठेवण्याचा मुख्य फायदा काय आहे?",
      "options": [
        "You avoid paying GST on capital gains",
        "You acquire more mutual fund units at lower NAVs",
        "The fund house doubles your monthly dividend",
        "Your capital is insured by DICGC"
      ],
      "optionsHi": [
        "पूंजीगत लाभ पर जीएसटी नहीं लगता",
        "कम एनएवी पर अधिक म्यूचुअल फंड यूनिट प्राप्त होती हैं",
        "फंड हाउस मासिक लाभांश दोगुना कर देता है",
        "आपकी पूंजी डीआईसीजीसी द्वारा बीमित होती है"
      ],
      "optionsMr": [
        "भांडवली नफ्यावर जीएसटी भरावा लागत नाही",
        "कमी एनएव्ही (NAV) वर जास्त युनिट्स मिळतात",
        "फंड कंपनी लाभांश दुप्पट करते",
        "ठेवींचा डीआयसीजीसी विमा असतो"
      ],
      "correctIndex": 1,
      "explanation": "Market dips allow your fixed SIP contribution to purchase more units at discounted NAVs, which supercharges compounding when markets recover.",
      "explanationHi": "मंदी में एनएवी कम होने से आपको ज्यादा यूनिट्स मिलती हैं, जो बाजार सुधरने पर तेजी से मुनाफा बनाती हैं।",
      "explanationMr": "मंदीत एनएव्ही कमी झाल्याने तेवढ्याच पैशांत जास्त युनिट्स मिळतात, ज्याचा फायदा बाजार वाढल्यावर मिळतो."
    },
    "youtubeVideoId": "fF7c-qKq6z4",
    "learnMoreQuery": "how SIP works mutual funds compounding power",
    "hasCalculator": true,
    "calculatorType": "sip",
    "relatedSlugs": [
      "compounding",
      "mutual-funds",
      "index-funds"
    ]
  },
  {
    "slug": "compounding",
    "name": "Compound Interest",
    "nameHi": "चक्रवृद्धि ब्याज (कंपाउंडिंग)",
    "nameMr": "चक्रवाढ व्याज (कंपाउंडिंग)",
    "category": "Investing",
    "difficulty": "Beginner",
    "readTime": "3 min read",
    "readTimeHi": "3 मिनट पठन",
    "readTimeMr": "3 मिनिटे वाचन",
    "icon": "🔄",
    "tagline": "Earning interest on your interest — exponential financial acceleration over time.",
    "taglineHi": "ब्याज पर भी ब्याज कमाना — समय के साथ पैसे की घातीय वृद्धि।",
    "taglineMr": "व्याजावरही व्याज मिळवणे — कालावधीनुसार पैशांची अफाट वाढ.",
    "simpleExplanation": "Unlike simple interest where earnings are calculated purely on your starting deposit, compound interest reinvests your past returns so that future growth is calculated on a continuously expanding principal.",
    "simpleExplanationHi": "साधारण ब्याज के विपरीत जहाँ केवल मूलधन पर ब्याज मिलता है, चक्रवृद्धि ब्याज में आपका अर्जित ब्याज भी मूलधन में जुड़ता जाता है।",
    "simpleExplanationMr": "सरळव्याजाप्रमाणे केवळ मूळ रकमेवर नव्हे, तर मिळालेल्या व्याजावरही व्याज मिळून रक्कम वेगाने वाढते.",
    "deepDive": "Albert Einstein famously called compound interest the eighth wonder of the world. The mathematical formula is A = P(1 + r/n)^(nt). In early years, compounding feels painfully slow because the base is small. After year 10, the curve inflects vertically: the interest generated in a single year often exceeds your entire original principal.",
    "deepDiveHi": "चक्रवृद्धि ब्याज का सूत्र A = P(1 + r/n)^(nt) है। शुरुआती वर्षों में यह धीमा लगता है, लेकिन 10 साल बाद घातीय वृद्धि तेजी से बढ़ती है।",
    "deepDiveMr": "चक्रवाढ व्याजाचे सूत्र A = P(1 + r/n)^(nt) असे आहे. सुरुवातीला संथ वाटणारी ही वाढ १० वर्षांनंतर प्रचंड वेगाने होते.",
    "example": {
      "scenario": "Starting early: Person A invests ₹5,000/mo from age 22 to 32 (10 years) vs Person B investing ₹5,000/mo from age 32 to 60 (28 years) at 12%.",
      "scenarioHi": "22 साल की उम्र में 10 साल तक ₹5,000/माह बनाम 32 की उम्र में 28 साल तक निवेश।",
      "scenarioMr": "वयाच्या २२ व्या वर्षी १० वर्षे ₹५,०००/महिना विरूद्ध ३२ व्या वर्षी २८ वर्षे गुंतवणूक.",
      "math": "Person A invests ₹6 Lakhs → reaches ₹2.25 Crores at 60. Person B invests ₹16.8 Lakhs → reaches ₹1.7 Crores. Early start wins!"
    },
    "rememberThis": "Time in the market matters far more than the exact timing of the market. Starting 5 years earlier can double your retirement nest egg.",
    "rememberThisHi": "मार्केट को टाइम करने से ज्यादा महत्वपूर्ण मार्केट में समय देना है। 5 साल पहले शुरू करना आपके रिटायरमेंट फंड को दोगुना कर सकता है।",
    "rememberThisMr": "बाजाराची वेळ साधण्यापेक्षा बाजारात जास्त काळ टिकून राहणे महत्त्वाचे आहे.",
    "commonMistake": "Delaying investing until your 30s under the belief that \"my salary is too small to make a difference right now.\"",
    "commonMistakeHi": "यह सोचकर निवेश टालना कि जब बड़ी सैलरी होगी तब 30 की उम्र के बाद शुरू करेंगे।",
    "commonMistakeMr": "पगार कमी आहे म्हणून वयाच्या ३० नंतर गुंतवणूक सुरू करू असा विचार करणे.",
    "mythVsReality": {
      "myth": "Higher initial capital is necessary to experience the power of compounding.",
      "reality": "Time is the primary exponent in the compounding equation, not principal. Small amounts over decades beat large lump sums invested late.",
      "mythHi": "कंपाउंडिंग का लाभ उठाने के लिए लाखों रुपये का मूलधन होना जरूरी है।",
      "realityHi": "कंपाउंडिंग में सबसे बड़ी भूमिका समय की होती है। दशकों तक छोटी बचत भी बड़ा फंड बना देती है।",
      "mythMr": "कंपाउंडिंगचा फायदा मिळण्यासाठी लाखो रुपयांचे भांडवल हवे असते.",
      "realityMr": "कंपाउंडिंगमध्ये मुख्य ताकद वेळेची असते. दरमहा छोटी गुंतवणूकही दीर्घकाळात करोडो रुपये बनवू शकते."
    },
    "flashcards": [
      {
        "front": "What is the Rule of 72?",
        "back": "A quick formula to estimate when money doubles: divide 72 by the annual interest rate (e.g., 72 / 12% = 6 years).",
        "frontHi": "72 का नियम (Rule of 72) क्या है?",
        "backHi": "पैसा दोगुना होने का समय जानने का सूत्र: 72 को वार्षिक रिटर्न से भाग दें (उदा. 72 / 12% = 6 वर्ष)।",
        "frontMr": "७२ चा नियम (Rule of 72) काय आहे?",
        "backMr": "रक्कम दुप्पट होण्याचा काळ काढण्याचे सूत्र: ७२ ला वार्षिक परताव्याने भागा (उदा. ७२ / १२% = ६ वर्षे)."
      },
      {
        "front": "Why does starting 10 years earlier have such an immense impact?",
        "back": "Because compounding is exponential: the final decades produce multi-fold growth on an already massive accumulated base.",
        "frontHi": "10 साल पहले शुरुआत करने का इतना बड़ा प्रभाव क्यों होता है?",
        "backHi": "क्योंकि कंपाउंडिंग घातीय होती है; अंतिम वर्षों में बहुत बड़े बेस पर ब्याज मिलता है।",
        "frontMr": "१० वर्षे आधी सुरुवात केल्यास एवढा मोठा फरक का पडतो?",
        "backMr": "कारण चक्रवाढ वाढ भौमितिक असते; शेवटच्या टप्प्यात मोठ्या रकमेवर प्रचंड व्याज मिळते."
      }
    ],
    "quiz": {
      "question": "At an annualized return rate of 12%, approximately how many years will it take for your investment to double using the Rule of 72?",
      "questionHi": "12% वार्षिक रिटर्न पर, 72 के नियम का उपयोग करके आपके निवेश को दोगुना होने में लगभग कितने वर्ष लगेंगे?",
      "questionMr": "१२% वार्षिक परतावा असल्यास, ७२ च्या नियमानुसार तुमची गुंतवणूक दुप्पट होण्यासाठी किती वर्षे लागतील?",
      "options": [
        "4 years",
        "6 years",
        "8 years",
        "10 years"
      ],
      "optionsHi": [
        "4 वर्ष",
        "6 वर्ष",
        "8 वर्ष",
        "10 वर्ष"
      ],
      "optionsMr": [
        "४ वर्षे",
        "६ वर्षे",
        "८ वर्षे",
        "१० वर्षे"
      ],
      "correctIndex": 1,
      "explanation": "72 divided by 12 equals 6 years. With compounding, your principal doubles roughly every 6 years at 12%.",
      "explanationHi": "72 को 12 से भाग देने पर 6 आता है। 12% की दर पर हर 6 साल में पैसा दोगुना हो जाता है।",
      "explanationMr": "७२ भागिले १२ बरोबर ६ वर्षे. १२% दराने दर ६ वर्षांनी रक्कम दुप्पट होते."
    },
    "youtubeVideoId": "wf91rEGw88Q",
    "learnMoreQuery": "power of compound interest explained rule of 72",
    "hasCalculator": true,
    "calculatorType": "compounding",
    "relatedSlugs": [
      "sip",
      "inflation",
      "index-funds"
    ]
  },
  {
    "slug": "inflation",
    "name": "Inflation",
    "nameHi": "मुद्रास्फीति (महंगाई दर)",
    "nameMr": "महागाई दर (इन्फ्लेशन)",
    "category": "Basics",
    "difficulty": "Beginner",
    "readTime": "3 min read",
    "readTimeHi": "3 मिनट पठन",
    "readTimeMr": "3 मिनिटे वाचन",
    "icon": "📉",
    "tagline": "The silent purchasing-power thief that makes identical goods costlier year after year.",
    "taglineHi": "क्रय शक्ति का अदृश्य चोर जो समय के साथ आपकी बचत का मूल्य कम कर देता है।",
    "taglineMr": "खरेदी क्षमता कमी करणारा असा घटक, ज्यामुळे दरवर्षी वस्तू महाग होतात.",
    "simpleExplanation": "Inflation measures the rate at which the general price of goods and services rises, eroding what a single rupee can purchase. If inflation is 6% per annum, an item priced at ₹100 today will cost ₹106 next year.",
    "simpleExplanationHi": "मुद्रास्फीति वह दर है जिससे वस्तुओं और सेवाओं के दाम बढ़ते हैं। 6% महंगाई दर का अर्थ है कि आज की ₹100 की वस्तु अगले साल ₹106 की होगी।",
    "simpleExplanationMr": "महागाई दर म्हणजे वस्तू व सेवांचे भाव वाढण्याचा वेग. ६% महागाई असल्यास आज १०० रुपयांना मिळणारी वस्तू पुढच्या वर्षी १०६ रुपयांना मिळेल.",
    "deepDive": "In India, the Reserve Bank of India (RBI) tracks the Consumer Price Index (CPI) with an official target band of 4% (+/- 2%). Keeping savings locked in zero-interest cash or sub-inflation fixed deposits guarantees real capital destruction over decades.",
    "deepDiveHi": "भारतीय रिज़र्व बैंक (RBI) 4% (+/- 2%) के दायरे में उपभोक्ता मूल्य सूचकांक (CPI) को लक्षित करता है। बैंक बचत खाते में नकद रखने से वास्तविक मूल्य घटता है।",
    "deepDiveMr": "रिझर्व्ह बँक ग्राहक किंमत निर्देशांक (CPI) ४% (+/- २%) च्या मर्यादेत ठेवण्याचा प्रयत्न करते. साध्या बचत खात्यात पैसे ठेवल्यास महागाईमुळे त्यांचे मूल्य कमी होते.",
    "example": {
      "scenario": "You keep ₹10 Lakhs in cash under your mattress for 20 years with an average annual inflation of 6%.",
      "scenarioHi": "₹10 लाख नकद घर में 20 साल तक 6% वार्षिक महंगाई के दौर में रखना।",
      "scenarioMr": "₹१० लाख रोकड घरात २० वर्षे ६% महागाई दर असताना तशीच ठेवणे.",
      "math": "Nominal Cash: ₹10,00,000 | Purchasing Power in today’s value after 20 yrs: only ~₹3,11,800 (-69% real loss)."
    },
    "rememberThis": "Any investment yielding less than the inflation rate after taxes is actively destroying your hard-earned wealth.",
    "rememberThisHi": "टैक्स के बाद महंगाई दर से कम रिटर्न देने वाला कोई भी निवेश वास्तव में आपकी संपत्ति को नष्ट कर रहा है।",
    "rememberThisMr": "करांनंतर महागाई दरापेक्षा कमी परतावा देणारी कोणतीही गुंतवणूक तुमची संपत्ती कमी करत असते.",
    "commonMistake": "Storing substantial long-term wealth in traditional bank savings accounts earning 2.7% to 3.5% interest while inflation averages 6%.",
    "commonMistakeHi": "लंबी अवधि के लिए बहुत सारा पैसा 3% ब्याज वाले बचत खाते में छोड़ देना जबकि महंगाई 6% है।",
    "commonMistakeMr": "दीर्घकालीन मोठी रक्कम ३% व्याज देणाऱ्या साध्या बँक खात्यात पडून ठेवणे.",
    "mythVsReality": {
      "myth": "Fixed deposits (FDs) are 100% risk-free investments.",
      "reality": "While FDs carry low default risk, they carry severe Inflation Risk: after paying income tax on FD interest, real net returns often turn negative.",
      "mythHi": "फिक्स्ड डिपॉजिट (FD) पूरी तरह जोखिम-मुक्त निवेश हैं।",
      "realityHi": "एफडी में डिफ़ॉल्ट का जोखिम नहीं होता लेकिन महंगाई का जोखिम होता है; टैक्स काटने के बाद वास्तविक रिटर्न शून्य या नकारात्मक हो सकता है।",
      "mythMr": "फिक्स डिपॉझिट (FD) ही १००% सुरक्षित गुंतवणूक आहे.",
      "realityMr": "एफडीमध्ये भांडवल बुडत नसले तरी करांनंतर मिळणारा परतावा महागाईपेक्षा कमी असल्याने तो तोट्याचा ठरू शकतो."
    },
    "flashcards": [
      {
        "front": "What is Real Return on an investment?",
        "back": "Real Return = Nominal Return minus Inflation minus Taxes. Only positive real returns grow your buying power.",
        "frontHi": "वास्तविक रिटर्न (Real Return) क्या होता है?",
        "backHi": "वास्तविक रिटर्न = नाममात्र रिटर्न - महंगाई दर - टैक्स। केवल सकारात्मक वास्तविक रिटर्न ही क्रय शक्ति बढ़ाता है।",
        "frontMr": "गुंतवणुकीवरील खरा परतावा (Real Return) म्हणजे काय?",
        "backMr": "खरा परतावा = मिळालेला परतावा - महागाई दर - कर. हा धन असल्यास संपत्ती वाढते."
      },
      {
        "front": "What is India’s official CPI inflation target band managed by the RBI?",
        "back": "4% with a tolerance band of +/- 2% (i.e. 2% to 6%).",
        "frontHi": "आरबीआई द्वारा प्रबंधित भारत का आधिकारिक सीपीआई महंगाई लक्ष्य क्या है?",
        "backHi": "4% (जिसमें +/- 2% की सीमा है, यानी 2% से 6% के बीच)।",
        "frontMr": "आरबीआयचे महागाई नियंत्रणाचे अधिकृत उद्दिष्ट काय आहे?",
        "backMr": "४% (+/- २% म्हणजेच २% ते ६% दरम्यान)."
      }
    ],
    "quiz": {
      "question": "If an FD offers 7% interest and your tax bracket is 30%, while inflation is 6%, what is your approximate real return?",
      "questionHi": "यदि एफडी 7% ब्याज देती है, आपका टैक्स स्लैब 30% है और महंगाई 6% है, तो आपका वास्तविक रिटर्न क्या होगा?",
      "questionMr": "जर एफडीवर ७% व्याज असेल, कर दर ३०% असेल आणि महागाई ६% असेल, तर खरा परतावा किती असेल?",
      "options": [
        "+1.0%",
        "+4.9%",
        "-1.1%",
        "+0.0%"
      ],
      "optionsHi": [
        "+1.0%",
        "+4.9%",
        "-1.1%",
        "+0.0%"
      ],
      "optionsMr": [
        "+१.०%",
        "+४.९%",
        "-१.१%",
        "+०.०%"
      ],
      "correctIndex": 2,
      "explanation": "Post-tax return = 7% * (1 - 0.30) = 4.9%. Real Return = 4.9% - 6% inflation = -1.1% (purchasing power loss).",
      "explanationHi": "टैक्स बाद रिटर्न = 7% * 0.70 = 4.9%। वास्तविक रिटर्न = 4.9% - 6% महंगाई = -1.1% (घाटा)।",
      "explanationMr": "करानंतर परतावा = ७% * ०.७० = ४.९%. खरा परतावा = ४.९% - ६% = -१.१% (खरेदी क्षमतेत घट)."
    },
    "youtubeVideoId": "UMAELCrJfd0",
    "learnMoreQuery": "how inflation affects your savings purchasing power india",
    "hasCalculator": true,
    "calculatorType": "inflation",
    "relatedSlugs": [
      "compounding",
      "sip",
      "index-funds"
    ]
  },
  {
    "slug": "emergency-fund",
    "name": "Emergency Fund",
    "nameHi": "आपातकालीन निधि (इमरजेंसी फंड)",
    "nameMr": "आपत्कालीन निधी (इमर्जन्सी फंड)",
    "category": "Basics",
    "difficulty": "Beginner",
    "readTime": "3 min read",
    "readTimeHi": "3 मिनट पठन",
    "readTimeMr": "3 मिनिटे वाचन",
    "icon": "🛡️",
    "tagline": "Your non-negotiable financial airbag against layoffs, medical crises, and emergencies.",
    "taglineHi": "नौकरी जाने, बीमारी या आकस्मिक संकट के विरुद्ध आपकी वित्तीय सुरक्षा ढाल।",
    "taglineMr": "नोकरी सुटणे किंवा वैद्यकीय संकट आल्यास तुमची आर्थिक ढाल.",
    "simpleExplanation": "An emergency fund is 3 to 6 months of mandatory living expenses stashed away in safe, highly liquid avenues (high-yield savings or sweep-in FDs). Its goal is capital preservation and instant accessibility, not aggressive growth.",
    "simpleExplanationHi": "इमरजेंसी फंड 3 से 6 महीने के अनिवार्य खर्चों की बचत है जिसे सुरक्षित और तुरंत निकालने योग्य खाते (स्वीप-इन एफडी या बचत खाते) में रखा जाता है।",
    "simpleExplanationMr": "इमर्जन्सी फंड म्हणजे ३ ते ६ महिन्यांच्या घरखर्चाएवढी रक्कम, जी सुरक्षित आणि तत्काळ काढता येईल अशा बँक खात्यात किंवा एफडीत ठेवली जाते.",
    "deepDive": "Without an emergency fund, unexpected events like medical emergencies, automotive repairs, or sudden layoffs force individuals to borrow via personal loans at 14% to 24% or break compounding investments at steep market lows. Keep it separate from daily spending accounts.",
    "deepDiveHi": "बिना इमरजेंसी फंड के किसी भी संकट के समय लोग 14% से 24% वाले महंगे पर्सनल लोन लेने या घाटे में शेयर बेचने को मजबूर हो जाते हैं।",
    "deepDiveMr": "आपत्कालीन निधी नसल्यास लोक महागडी कर्जे घेतात किंवा तोट्यात शेअर्स विकतात. त्यामुळे हा निधी वेगळ्या खात्यात ठेवणे आवश्यक आहे.",
    "example": {
      "scenario": "Monthly mandatory expenses = ₹35,000 (rent ₹18,000, groceries ₹9,000, utilities ₹4,000, loan EMI ₹4,000).",
      "scenarioHi": "अनिवार्य मासिक खर्च = ₹35,000। 6 महीने का बैकअप तैयार करना।",
      "scenarioMr": "मासिक अनिवार्य खर्च = ₹३५,०००. ६ महिन्यांचा निधी तयार करणे.",
      "math": "Target 6-Month Emergency Fund = ₹35,000 * 6 = ₹2,10,000 kept in a sweep-in liquid FD."
    },
    "rememberThis": "An emergency fund is insurance, not an investment. Do not chase high yields in volatile stock markets with your survival money.",
    "rememberThisHi": "इमरजेंसी फंड बीमा की तरह सुरक्षा के लिए है, मुनाफे के लिए नहीं। इस पैसे को कभी भी जोखिम भरे शेयर बाजार में न लगाएं।",
    "rememberThisMr": "आपत्कालीन निधी हा सुरक्षेसाठी असतो, नफ्यासाठी नाही. हा पैसा कधीही शेअर बाजारात गुंतवू नका.",
    "commonMistake": "Treating the fund as a vacation budget or upgrading to a flagship smartphone because \"the cash is just sitting there.\"",
    "commonMistakeHi": "इमरजेंसी फंड के पैसे को वेकेशन या नया स्मार्टफोन खरीदने में खर्च कर देना।",
    "commonMistakeMr": "पैसे पडून आहेत म्हणून आपत्कालीन निधीतून सुट्टीवर जाणे किंवा महागडा फोन घेणे.",
    "mythVsReality": {
      "myth": "A credit card with a high credit limit qualifies as a sufficient emergency fund.",
      "reality": "Credit cards are high-interest debt instruments with up to 42% APR. Borrowing on credit during a job loss compounds financial distress.",
      "mythHi": "क्रेडिट कार्ड की बड़ी लिमिट होना इमरजेंसी फंड का विकल्प है।",
      "realityHi": "क्रेडिट कार्ड पर 42% तक सालाना ब्याज लगता है। संकट में कर्ज लेना वित्तीय संकट को और बढ़ा देता है।",
      "mythMr": "क्रेडिट कार्डची मोठी मर्यादा हाच माझा आपत्कालीन निधी आहे.",
      "realityMr": "क्रेडिट कार्ड म्हणजे कर्ज; नोकरी नसताना क्रेडिट कार्ड वापरल्यास कर्जाचा डोंगर उभा राहतो."
    },
    "flashcards": [
      {
        "front": "How many months of mandatory expenses should an emergency fund cover?",
        "back": "Typically 3 to 6 months for salaried employees, and 9 to 12 months for freelancers and commission earners.",
        "frontHi": "इमरजेंसी फंड में कितने महीने का खर्च होना चाहिए?",
        "backHi": "नौकरीपेशा लोगों के लिए 3 से 6 महीने और फ्रीलांसरों के लिए 9 से 12 महीने का खर्च।",
        "frontMr": "आपत्कालीन निधीमध्ये किती महिन्यांचा खर्च असावा?",
        "backMr": "पगारदारांसाठी ३ ते ६ महिने आणि फ्रीलान्सर्ससाठी ९ ते १२ महिन्यांचा खर्च असावा."
      },
      {
        "front": "Where should you park your emergency fund?",
        "back": "In high-liquidity, low-risk instruments: a separate savings account, sweep-in bank FDs, or liquid debt funds.",
        "frontHi": "इमरजेंसी फंड का पैसा कहाँ रखना चाहिए?",
        "backHi": "अति-सुरक्षित और तुरंत निकलने वाले साधनों में: अलग बचत खाता, स्वीप-इन एफडी या लिक्विड फंड।",
        "frontMr": "आपत्कालीन निधी कुठे ठेवावा?",
        "backMr": "सुरक्षित आणि त्वरित उपलब्ध होणाऱ्या पर्यायांमध्ये: वेगळे बचत खाते, स्वीप-इन एफडी किंवा लिक्विड फंड."
      }
    ],
    "quiz": {
      "question": "Which of the following is considered a legitimate use of an Emergency Fund?",
      "questionHi": "इमरजेंसी फंड का सही और वैध उपयोग निम्नलिखित में से कौन सा है?",
      "questionMr": "खालीलपैकी कोणता आपत्कालीन निधीचा योग्य वापर मानला जाईल?",
      "options": [
        "Buying festive gifts during Diwali",
        "Covering essential rent and food during unexpected job loss",
        "Investing in an exciting new tech IPO",
        "Upgrading to a new bike on sale"
      ],
      "optionsHi": [
        "दिवाली पर उपहार खरीदना",
        "अचानक नौकरी छूटने पर आवश्यक किराया और भोजन का खर्च चलाना",
        "नए टेक आईपीओ में निवेश करना",
        "सेल में नई बाइक खरीदना"
      ],
      "optionsMr": [
        "दिवाळीच्या खरेदीसाठी",
        "अचानक नोकरी गेल्यास घरभाडे व अन्नधान्याचा खर्च चालवणे",
        "नवीन शेअर बाजारातील आयपीओमध्ये पैसे लावण्यासाठी",
        "सवलतीत नवीन बाईक घेण्यासाठी"
      ],
      "correctIndex": 1,
      "explanation": "Emergency funds exist purely to cover essential survival needs during sudden catastrophic life disruptions.",
      "explanationHi": "इमरजेंसी फंड केवल गंभीर संकट और नौकरी छूटने जैसी स्थिति में मूलभूत जरूरतों के लिए है।",
      "explanationMr": "आपत्कालीन निधी केवळ संकटाच्या काळात मूलभूत गरजा भागवण्यासाठीच वापरला पाहिजे."
    },
    "youtubeVideoId": "cRj_smZqWzE",
    "learnMoreQuery": "how to build emergency fund india where to keep",
    "hasCalculator": false,
    "relatedSlugs": [
      "budgeting",
      "health-insurance",
      "credit-score"
    ]
  },
  {
    "slug": "credit-score",
    "name": "Credit Score (CIBIL)",
    "nameHi": "क्रेडिट स्कोर (सिबिल स्कोर)",
    "nameMr": "क्रेडिट स्कोअर (सिबिल स्कोअर)",
    "category": "Credit",
    "difficulty": "Beginner",
    "readTime": "4 min read",
    "readTimeHi": "4 मिनट पठन",
    "readTimeMr": "4 मिनिटे वाचन",
    "icon": "📊",
    "tagline": "The three-digit financial reputation report card that governs loan approvals and interest rates.",
    "taglineHi": "तीन अंकों का वित्तीय रिपोर्ट कार्ड जो आपके लोन अप्रूवल और ब्याज दर को तय करता है।",
    "taglineMr": "कर्ज मिळणे आणि त्याचा व्याजदर ठरवणारे तुमचे ३ अंकी आर्थिक चारित्र्य प्रमाणपत्र.",
    "simpleExplanation": "A credit score is a 3-digit numerical summary (ranging from 300 to 900) calculated by credit bureaus like CIBIL, Experian, CRIF, and Equifax based on your loan repayment and credit card history. A score of 750+ qualifies you for the best interest rates.",
    "simpleExplanationHi": "क्रेडिट स्कोर 300 से 900 के बीच का 3 अंकों का नंबर है जो यह दर्शाता है कि आप कर्ज चुकाने में कितने जिम्मेदार हैं। 750+ का स्कोर उत्कृष्ट माना जाता है।",
    "simpleExplanationMr": "क्रेडिट स्कोअर हा ३०० ते ९०० दरम्यानचा ३ अंकी क्रमांक असतो, जो तुम्ही कर्जाची वेळेवर परतफेड करता की नाही हे दाखवतो. ७५०+ स्कोअर उत्तम मानला जातो.",
    "deepDive": "The score is driven by five factors: Payment History (35% - zero late payments), Credit Utilization Ratio (30% - keep spending under 30% of card limit), Credit Age (15% - keep old cards active), Credit Mix (10% - balance of secured vs unsecured loans), and Recent Inquiries (10% - avoid spamming multiple loan applications).",
    "deepDiveHi": "स्कोर में 35% वजन समय पर भुगतान का और 30% क्रेडिट कार्ड लिमिट के उपयोग (30% से कम रखें) का होता है। ज्यादा बार लोन के लिए अप्लाई करने से स्कोर गिरता है।",
    "deepDiveMr": "वेळेवर हप्ते भरणे (३५%) आणि क्रेडिट मर्यादेचा वापर ३०% पेक्षा कमी ठेवणे (३०%) हे स्कोअर चांगला ठेवण्यासाठी सर्वात महत्त्वाचे आहे.",
    "example": {
      "scenario": "Home loan of ₹50 Lakhs for 20 years. Borrower A has a 780 CIBIL (8.4% interest); Borrower B has a 660 CIBIL (9.6% interest).",
      "scenarioHi": "₹50 लाख के होम लोन पर 780 सिबिल (8.4%) बनाम 660 सिबिल (9.6%)।",
      "scenarioMr": "₹५० लाख गृहकर्ज: ७८० सिबिल (८.४%) विरूद्ध ६६० सिबिल (९.६%).",
      "math": "Borrower A pays ₹43,075/mo (Total Int: ₹53.38L) vs Borrower B paying ₹46,930/mo (Total Int: ₹62.63L). Score difference saves ₹9.25 Lakhs!"
    },
    "rememberThis": "Closing your oldest credit card reduces your average credit history age and shrinks total credit limits, which can temporarily hurt your score.",
    "rememberThisHi": "अपना सबसे पुराना क्रेडिट कार्ड बंद करने से आपकी क्रेडिट हिस्ट्री छोटी हो जाती है और स्कोर गिर सकता है।",
    "rememberThisMr": "जुने क्रेडिट कार्ड बंद केल्यास क्रेडिट इतिहास कमी होतो आणि स्कोअरवर नकारात्मक परिणाम होऊ शकतो.",
    "commonMistake": "Paying only the \"Minimum Amount Due\" on credit card statements, incurring 42% APR interest on remaining balance.",
    "commonMistakeHi": "क्रेडिट कार्ड के बिल में केवल \"मिनिमम अमाउंट ड्यू\" भरना और बाकी पर 42% ब्याज चुकाना।",
    "commonMistakeMr": "क्रेडिट कार्ड बिलाची संपूर्ण रक्कम न भरता केवळ किमान रक्कम (Minimum Due) भरणे.",
    "mythVsReality": {
      "myth": "Checking your own credit score lowers your CIBIL rating.",
      "reality": "Checking your own score is a Soft Inquiry and causes ZERO impact. Only hard inquiries initiated by banks during loan applications cause small temporary dips.",
      "mythHi": "खुद अपना क्रेडिट स्कोर चेक करने से सिबिल स्कोर घट जाता है।",
      "realityHi": "खुद स्कोर चेक करना \"सॉफ्ट इन्क्वायरी\" है जिससे स्कोर पर कोई असर नहीं पड़ता। केवल बैंक जब जांचते हैं तब हार्ड इन्क्वायरी होती है।",
      "mythMr": "स्वतःचा सिबिल स्कोअर वारंवार तपासल्यास तो कमी होतो.",
      "realityMr": "स्वतः स्कोअर तपासणे ही सॉफ्ट इन्क्वायरी असते, त्याचा स्कोअरवर शून्य परिणाम होतो."
    },
    "flashcards": [
      {
        "front": "What is the ideal Credit Utilization Ratio (CUR)?",
        "back": "Under 30% of your total credit limit. E.g., spend under ₹30,000 if your limit is ₹1,00,000.",
        "frontHi": "आदर्श क्रेडिट यूटिलाइज़ेशन रेशियो (CUR) कितना होना चाहिए?",
        "backHi": "कुल क्रेडिट कार्ड लिमिट के 30% से कम। यदि लिमिट ₹1,00,000 है तो ₹30,000 से कम खर्च करें।",
        "frontMr": "क्रेडिट युटिलायझेशन रेशिओ (CUR) किती असावा?",
        "backMr": "एकूण मर्यादेच्या ३०% पेक्षा कमी. उदा. ₹१ लाखाची मर्यादा असल्यास ₹३०,००० पेक्षा कमी खर्च करावा."
      },
      {
        "front": "What is the benchmark CIBIL score for prime interest rates on home and auto loans?",
        "back": "750 and above (out of 900).",
        "frontHi": "सस्ते ब्याज दर पर लोन पाने के लिए बेहतरीन सिबिल स्कोर क्या है?",
        "backHi": "750 या उससे अधिक (900 में से)।",
        "frontMr": "कमी व्याजदराने कर्ज मिळण्यासाठी उत्तम सिबिल स्कोअर किती असावा?",
        "backMr": "७५० किंवा त्याहून अधिक (९०० पैकी)."
      }
    ],
    "quiz": {
      "question": "Which action will damage your credit score the most severely?",
      "questionHi": "निम्नलिखित में से किस गतिविधि से आपका क्रेडिट स्कोर सबसे तेजी से गिरेगा?",
      "questionMr": "खालीलपैकी कोणत्या कृतीमुळे तुमचा क्रेडिट स्कोअर सर्वात जास्त खराब होईल?",
      "options": [
        "Checking your score on the CIBIL portal",
        "Defaulting on a loan EMI past 90 days",
        "Using 15% of your available credit card limit",
        "Having both a home loan and a credit card"
      ],
      "optionsHi": [
        "सिबिल पोर्टल पर अपना स्कोर चेक करना",
        "लोन की ईएमआई 90 दिनों से अधिक डिफ़ॉल्ट करना",
        "क्रेडिट कार्ड लिमिट का केवल 15% उपयोग करना",
        "होम लोन और क्रेडिट कार्ड दोनों होना"
      ],
      "optionsMr": [
        "सिबिल पोर्टलवर स्वतःचा स्कोअर तपासणे",
        "कर्जाचा हप्ता ९० दिवसांपेक्षा जास्त काळ न भरणे",
        "क्रेडिट मर्यादेचा केवळ १५% वापर करणे",
        "गृहकर्ज आणि क्रेडिट कार्ड दोन्ही असणे"
      ],
      "correctIndex": 1,
      "explanation": "Payment default beyond 90 days classifies the account as an NPA/written-off status, severely harming your rating for up to 7 years.",
      "explanationHi": "90 दिन से ज्यादा ईएमआई न भरने पर खाता एनपीए हो जाता है और सिबिल स्कोर 7 साल के लिए खराब हो जाता है।",
      "explanationMr": "९० दिवसांपेक्षा जास्त काळ कर्जाचा हप्ता न भरल्यास खाते एनपीए होते आणि स्कोअर गंभीरपणे घसरतो."
    },
    "youtubeVideoId": "O9kS5-vXzWw",
    "learnMoreQuery": "how to improve CIBIL score fast india rules",
    "hasCalculator": false,
    "relatedSlugs": [
      "emi",
      "emergency-fund",
      "budgeting"
    ]
  },
  {
    "slug": "mutual-funds",
    "name": "Mutual Funds",
    "nameHi": "म्यूचुअल फंड",
    "nameMr": "म्युच्युअल फंड",
    "category": "Investing",
    "difficulty": "Beginner",
    "readTime": "4 min read",
    "readTimeHi": "4 मिनट पठन",
    "readTimeMr": "4 मिनिटे वाचन",
    "icon": "🧺",
    "tagline": "Pooled money managed by professional fund managers across diversified baskets of securities.",
    "taglineHi": "लाखों निवेशकों का एकत्रित धन जिसे पेशेवर फंड मैनेजर विभिन्न कंपनियों में निवेश करते हैं।",
    "taglineMr": "अनेक गुंतवणूकदारांचे पैसे एकत्र करून तज्ज्ञ व्यवस्थापकाद्वारे शेअर्समध्ये गुंतवणे.",
    "simpleExplanation": "A mutual fund pools money from thousands of retail investors to purchase a diversified portfolio of stocks, bonds, or money market instruments. An asset management company (AMC) appoints professional fund managers to monitor and optimize the portfolio.",
    "simpleExplanationHi": "म्यूचुअल फंड कई निवेशकों से पैसा जुटाकर शेयरों या बॉन्ड्स का एक विविध पोर्टफोलियो बनाता है। इसे पेशेवर फंड मैनेजर संभालते हैं।",
    "simpleExplanationMr": "म्युच्युअल फंडामध्ये अनेक लोकांचे पैसे एकत्र करून शेअर्स किंवा सरकारी रोख्यांमध्ये विभागून गुंतवले जातात.",
    "deepDive": "Mutual funds in India are strictly regulated by SEBI. Key categories include Equity Funds (Large Cap, Mid Cap, Small Cap, Flexi Cap), Debt Funds (Liquid, Corporate Bond, Gilt), and Hybrid Funds. Investors pay an annual Expense Ratio (typically 0.5% to 2.2%) for fund management and administration. Always opt for Direct Plans over Regular Plans to save on distributor commissions.",
    "deepDiveHi": "भारत में म्यूचुअल फंड सेबी (SEBI) द्वारा नियंत्रित होते हैं। इक्विटी, डेट और हाइब्रिड इसके प्रमुख प्रकार हैं। हमेशा \"डायरेक्ट प्लान\" चुनें ताकि एजेंट कमीशन न कटे।",
    "deepDiveMr": "म्युच्युअल फंडांवर सेबीचे कडक नियंत्रण असते. इक्विटी, डेट आणि हायब्रिड हे याचे प्रकार आहेत. नेहमी डायरेक्ट प्लॅन निवडून एजंट कमिशन वाचवावे.",
    "example": {
      "scenario": "Direct Plan vs Regular Plan over 20 years with ₹10,000 monthly SIP earning 13% gross returns (1% extra expense in Regular).",
      "scenarioHi": "डायरेक्ट बनाम रेगुलर प्लान: 20 साल में 1% अतिरिक्त खर्च का प्रभाव।",
      "scenarioMr": "डायरेक्ट विरूद्ध रेग्युलर प्लॅन: २० वर्षांत १% जादा खर्चाचा परिणाम.",
      "math": "Direct Plan (13% net) = ~₹1.15 Crores | Regular Plan (12% net) = ~₹99.9 Lakhs. Choosing Direct saves ₹15+ Lakhs in commissions!"
    },
    "rememberThis": "Always select \"Direct-Growth\" mutual funds rather than \"Regular\" plans to avoid paying up to 1% annual recurring commissions to brokers.",
    "rememberThisHi": "हमेशा \"डायरेक्ट-ग्रोथ\" प्लान चुनें ताकि हर साल एजेंट को जाने वाला 1% कमीशन बच सके।",
    "rememberThisMr": "नेहमी \"डायरेक्ट-ग्रोथ\" पर्याय निवडा, जेणेकरून दलालांचे कमिशन वाचून जास्त परतावा मिळेल.",
    "commonMistake": "Investing heavily in high-risk Small Cap funds during euphoric bull market peaks without understanding downside volatility.",
    "commonMistakeHi": "बाजार के चरम पर बिना सोचे-समझे केवल स्मॉल कैप फंड में सारा पैसा लगा देना।",
    "commonMistakeMr": "तेजीच्या काळात जोखीम न समजता सर्व पैसा केवळ स्मॉल कॅप फंडात गुंतवणे.",
    "mythVsReality": {
      "myth": "Mutual funds are only for rich people with large bank balances.",
      "reality": "You can start investing in top mutual funds with as little as ₹100 or ₹500 per month via an automated SIP.",
      "mythHi": "म्यूचुअल फंड केवल अमीर लोगों के लिए होते हैं।",
      "realityHi": "आप मात्र ₹100 या ₹500 प्रति माह से भी भारत के बेहतरीन म्यूचुअल फंडों में एसआईपी शुरू कर सकते हैं।",
      "mythMr": "म्युच्युअल फंड फक्त श्रीमंत लोकांसाठी असतात.",
      "realityMr": "तुम्ही दरमहा अवघ्या ₹१०० किंवा ₹५०० पासूनही म्युच्युअल फंडात गुंतवणूक करू शकता."
    },
    "flashcards": [
      {
        "front": "What is the Net Asset Value (NAV)?",
        "back": "The market value of one unit of a mutual fund scheme, calculated daily after trading hours.",
        "frontHi": "नेट एसेट वैल्यू (NAV) क्या है?",
        "backHi": "म्यूचुअल फंड की एक यूनिट का दैनिक बाजार मूल्य, जो हर शाम बाजार बंद होने के बाद तय होता है।",
        "frontMr": "नेट ॲसेट व्हॅल्यू (NAV) म्हणजे काय?",
        "backMr": "म्युच्युअल फंड योजनेच्या एका युनिटची बाजार किंमत, जी दररोज संध्याकाळी जाहीर होते."
      },
      {
        "front": "Why are Direct Plans always superior to Regular Plans for long-term wealth?",
        "back": "Direct plans have lower expense ratios because no distributor commissions are deducted, compounding to huge savings over 10-20 years.",
        "frontHi": "डायरेक्ट प्लान रेगुलर प्लान से बेहतर क्यों होते हैं?",
        "backHi": "क्योंकि इनमें एजेंट को कमीशन नहीं देना पड़ता, जिससे हर साल 1% तक अतिरिक्त रिटर्न बचता है।",
        "frontMr": "डायरेक्ट प्लॅन रेग्युलर प्लॅनपेक्षा चांगले का असतात?",
        "backMr": "कारण त्यात मध्यस्थांचे कमिशन नसते, ज्यामुळे दरवर्षी १% जास्त परतावा मिळून मोठा फायदा होतो."
      }
    ],
    "quiz": {
      "question": "Which regulatory authority oversees and regulates all mutual funds and AMCs in India?",
      "questionHi": "भारत में सभी म्यूचुअल फंड और एएमसी की निगरानी कौन सा नियामक प्राधिकरण करता है?",
      "questionMr": "भारतातील सर्व म्युच्युअल फंडांवर कोणत्या नियामक संस्थेचे नियंत्रण असते?",
      "options": [
        "Reserve Bank of India (RBI)",
        "Securities and Exchange Board of India (SEBI)",
        "Insurance Regulatory and Development Authority (IRDAI)",
        "PFRDA"
      ],
      "optionsHi": [
        "भारतीय रिज़र्व बैंक (RBI)",
        "भारतीय प्रतिभूति और विनिमय बोर्ड (SEBI)",
        "आईआरडीएआई (IRDAI)",
        "पीएफआरडीए (PFRDA)"
      ],
      "optionsMr": [
        "रिझर्व्ह बँक ऑफ इंडिया (RBI)",
        "सिक्युरिटीज अँड एक्स्चेंज बोर्ड ऑफ इंडिया (SEBI)",
        "इरडा (IRDAI)",
        "पीएफआरडीए"
      ],
      "correctIndex": 1,
      "explanation": "SEBI is the statutory market regulator that safeguards investor interests and governs mutual funds.",
      "explanationHi": "सेबी (SEBI) भारत में सभी म्यूचुअल फंडों और शेयर बाजार का शीर्ष नियामक है।",
      "explanationMr": "सेबी (SEBI) ही भारतातील म्युच्युअल फंड आणि शेअर बाजाराचे नियमन करणारी अधिकृत संस्था आहे."
    },
    "youtubeVideoId": "yv_2c3C88z4",
    "learnMoreQuery": "how mutual funds work in india direct vs regular plans",
    "hasCalculator": false,
    "relatedSlugs": [
      "sip",
      "index-funds",
      "compounding"
    ]
  },
  {
    "slug": "index-funds",
    "name": "Index Funds",
    "nameHi": "इंडेक्स फंड (पैसिव्ह इन्वेस्टिंग)",
    "nameMr": "इंडेक्स फंड (पॅसिव्ह इन्व्हेस्टिंग)",
    "category": "Investing",
    "difficulty": "Beginner",
    "readTime": "3 min read",
    "readTimeHi": "3 मिनट पठन",
    "readTimeMr": "3 मिनिटे वाचन",
    "icon": "📈",
    "tagline": "Passive, ultra-low-cost investing that mirrors the performance of market benchmarks like Nifty 50.",
    "taglineHi": "निफ्टी 50 जैसे बेंचमार्क की नकल करने वाला कम लागत वाला सुरक्षित पैसिव निवेश।",
    "taglineMr": "निफ्टी ५० सारख्या बाजारातील आघाडीच्या निर्देशांकावर आधारित कमी खर्चाची गुंतवणूक.",
    "simpleExplanation": "An index fund is a passive mutual fund designed to replicate a specific stock market benchmark, such as the Nifty 50 or Sensex. Instead of paying expensive fund managers to pick individual stocks, it buys the exact companies in the index in the exact same proportions.",
    "simpleExplanationHi": "इंडेक्स फंड एक पैसिव म्यूचुअल फंड है जो निफ्टी 50 या सेंसेक्स जैसे इंडेक्स की कंपनियों में हूबहू उसी अनुपात में निवेश करता है। इसका खर्च बहुत कम होता है।",
    "simpleExplanationMr": "इंडेक्स फंड म्हणजे बाजारातील आघाडीच्या ५० कंपन्यांच्या निफ्टी निर्देशांकाची हुबेहूब प्रतिकृती असणारा फंड, ज्याचा खर्च अतिशय नगण्य असतो.",
    "deepDive": "Over 80% of actively managed large-cap mutual funds fail to beat the Nifty 50 TRI index over 10-year periods, according to SPIVA reports. Index funds boast rock-bottom total expense ratios (often 0.1% to 0.2% vs 1.5% to 2.0% for active funds) and completely eliminate fund-manager bias and human stock-picking blunders.",
    "deepDiveHi": "लंबी अवधि में 80% से अधिक एक्टिव फंड निफ्टी इंडेक्स को पछाड़ने में असमर्थ रहते हैं। इंडेक्स फंड का व्यय अनुपात (Expense Ratio) मात्र 0.1% से 0.2% होता है।",
    "deepDiveMr": "दीर्घकाळात बहुतांश ॲक्टिव्ह फंड निफ्टीपेक्षा कमी परतावा देतात. इंडेक्स फंडाचा खर्च केवळ ०.१% ते ०.२% इतका कमी असल्याने नफा वाढतो.",
    "example": {
      "scenario": "You invest ₹5,000 monthly in a Nifty 50 Index Fund having a 0.15% expense ratio.",
      "scenarioHi": "निफ्टी 50 इंडेक्स फंड में 0.15% खर्च पर मासिक ₹5,000 निवेश करना।",
      "scenarioMr": "निफ्टी ५० इंडेक्स फंडामध्ये ०.१५% खर्चावर दरमहा ₹५,००० गुंतवणे.",
      "math": "You automatically own fractional shares of India’s top 50 giants (Reliance, TCS, HDFC Bank, Infosys, etc.) at minimal fees."
    },
    "rememberThis": "Index funds match the market return — they will not beat the market, but more importantly, they will never underperform the broader market.",
    "rememberThisHi": "इंडेक्स फंड बाजार के बराबर रिटर्न देते हैं; ये बाजार को मात नहीं देते लेकिन बाजार से पीछे भी नहीं छूटते।",
    "rememberThisMr": "इंडेक्स फंड बाजाराएवढाच परतावा देतात; ते बाजारापेक्षा कमी पडत नाहीत आणि खर्चही वाचवतात.",
    "commonMistake": "Paying a high 2% expense ratio on an active large-cap mutual fund that holds virtually the exact same 50 stocks as a low-cost index fund.",
    "commonMistakeHi": "ऐसे एक्टिव लार्ज कैप फंड में 2% फीस भरना जो वास्तव में निफ्टी 50 की ही नकल कर रहा हो।",
    "commonMistakeMr": "निफ्टीच्याच कंपन्या असणाऱ्या ॲक्टिव्ह फंडाला २% जास्त व्यवस्थापन खर्च देणे.",
    "mythVsReality": {
      "myth": "Professional active fund managers always generate higher returns than simple passive index funds.",
      "reality": "Over decades, high management fees drag down active fund returns. Index funds frequently beat active large-cap peers after costs.",
      "mythHi": "पेशेवर फंड मैनेजर हमेशा साधारण इंडेक्स फंड से ज्यादा रिटर्न देते हैं।",
      "realityHi": "दशकों में अधिक फीस के कारण एक्टिव फंड पिछड़ जाते हैं; इंडेक्स फंड अक्सर एक्टिव फंडों से आगे निकल जाते हैं।",
      "mythMr": "तज्ज्ञ व्यवस्थापक नेहमी इंडेक्स फंडापेक्षा जास्त नफा मिळवून देतात.",
      "realityMr": "जास्त शुल्कामुळे दीर्घकाळात बहुतांश ॲक्टिव्ह फंड इंडेक्स फंडापेक्षा मागे पडतात."
    },
    "flashcards": [
      {
        "front": "What is Tracking Error in an Index Fund?",
        "back": "The difference between the index fund’s return and the actual benchmark index’s return, caused by cash reserves and expense fees.",
        "frontHi": "इंडेक्स फंड में ट्रैकिंग एरर क्या है?",
        "backHi": "फंड के रिटर्न और वास्तविक इंडेक्स के रिटर्न के बीच का अंतर; यह जितना कम हो फंड उतना बेहतर है।",
        "frontMr": "इंडेक्स फंडामध्ये ट्रॅकिंग एरर म्हणजे काय?",
        "backMr": "फंडाचा परतावा आणि प्रत्यक्ष निर्देशांकाचा परतावा यातील सूक्ष्म फरक; हा जितका कमी तितका फंड उत्तम."
      },
      {
        "front": "What companies make up the Nifty 50 Index?",
        "back": "The 50 largest, most liquid Indian publicly traded companies across key economic sectors listed on the NSE.",
        "frontHi": "निफ्टी 50 इंडेक्स में कौन सी कंपनियाँ शामिल होती हैं?",
        "backHi": "एनएसई पर लिस्टेड भारत की 50 सबसे बड़ी और आर्थिक रूप से मजबूत कंपनियाँ।",
        "frontMr": "निफ्टी ५० निर्देशांकात कोणत्या कंपन्या असतात?",
        "backMr": "भारतातील अर्थव्यवस्थेचे नेतृत्व करणाऱ्या राष्ट्रीय शेअर बाजारातील (NSE) आघाडीच्या ५० कंपन्या."
      }
    ],
    "quiz": {
      "question": "Why do index funds have significantly lower Expense Ratios than actively managed funds?",
      "questionHi": "इंडेक्स फंडों का व्यय अनुपात (Expense Ratio) एक्टिव फंडों की तुलना में काफी कम क्यों होता है?",
      "questionMr": "इंडेक्स फंडाचा व्यवस्थापन खर्च (Expense Ratio) इतर फंडांपेक्षा खूप कमी का असतो?",
      "options": [
        "They are subsidized by the Reserve Bank of India",
        "They do not require costly research teams to pick and time individual stocks",
        "They only trade during market holidays",
        "They are exempt from SEBI regulations"
      ],
      "optionsHi": [
        "उन्हें आरबीआई से सब्सिडी मिलती है",
        "उन्हें शेयरों के विश्लेषण और शोध के लिए महंगी टीम की आवश्यकता नहीं होती",
        "वे केवल छुट्टियों में ट्रेड करते हैं",
        "उन्हें सेबी के नियमों से छूट है"
      ],
      "optionsMr": [
        "त्यांना रिझर्व्ह बँकेचे अनुदान मिळते",
        "त्यांना शेअर्स निवडण्यासाठी महागड्या संशोधन पथकाची गरज नसते",
        "ते फक्त सुट्टीच्या दिवशी चालतात",
        "त्यांना सेबीचे नियम लागू नसतात"
      ],
      "correctIndex": 1,
      "explanation": "Passive indexing simply mirrors a published mathematical index formula, slashing research, management, and turnover overheads.",
      "explanationHi": "इंडेक्स फंड केवल पूर्व-निर्धारित इंडेक्स की नकल करते हैं, जिससे शोध और प्रबंधन का भारी खर्च बच जाता है।",
      "explanationMr": "इंडेक्स फंड केवळ निर्देशांकाची प्रतिकृती करत असल्याने संशोधन आणि व्यवस्थापनाचा मोठा खर्च वाचतो."
    },
    "youtubeVideoId": "w_aOh8Uq8yY",
    "learnMoreQuery": "what is index fund nifty 50 passive investing india",
    "hasCalculator": false,
    "relatedSlugs": [
      "mutual-funds",
      "sip",
      "compounding"
    ]
  },
  {
    "slug": "term-insurance",
    "name": "Term Insurance",
    "nameHi": "टर्म इंश्योरेंस (शुद्ध जीवन बीमा)",
    "nameMr": "टर्म इन्शुरन्स (शुद्ध जीवन विमा)",
    "category": "Basics",
    "difficulty": "Beginner",
    "readTime": "4 min read",
    "readTimeHi": "4 मिनट पठन",
    "readTimeMr": "4 मिनिटे वाचन",
    "icon": "☂️",
    "tagline": "Pure, high-coverage life insurance designed to secure your dependents without mixing investment.",
    "taglineHi": "बिना निवेश मिलाए, आपके आश्रितों के लिए शुद्ध और किफायती जीवन सुरक्षा।",
    "taglineMr": "गुंतवणूक न मिसळता केवळ कुटुंबाच्या सुरक्षेसाठी घेतलेले शुद्ध जीवन विमा संरक्षण.",
    "simpleExplanation": "Term insurance is pure life protection. You pay a small annual premium for a fixed term (e.g. up to age 60 or 65). If you pass away during the policy term, your nominees receive the entire tax-free sum assured (e.g. ₹1 Crore). If you survive, no money is returned.",
    "simpleExplanationHi": "टर्म इंश्योरेंस शुद्ध जीवन बीमा है। यदि पॉलिसी अवधि के दौरान पॉलिसीधारक की मृत्यु हो जाती है तो नॉमिनी को पूरी बीमा राशि (उदा. ₹1 करोड़) मिलती है।",
    "simpleExplanationMr": "टर्म इन्शुरन्स हा शुद्ध विमा आहे. पॉलिसीच्या मुदतीत दुर्दैवाने मृत्यू झाल्यास वारसाला संपूर्ण विम्याची रक्कम (उदा. ₹१ कोटी) मिळते.",
    "deepDive": "Never mix insurance with investment. Traditional endowment or money-back policies charge ₹50,000/yr for a measly ₹5 Lakh cover with sub-inflation returns. A pure term plan provides ₹1 Crore cover for a 25-year-old non-smoker at just ₹8,000 to ₹10,000 annually. As a rule of thumb, secure a cover equal to 10 to 15 times your annual income. Check Claim Settlement Ratio (CSR > 98%) before buying.",
    "deepDiveHi": "कभी भी बीमा और निवेश को न मिलाएं। एंडोमेंट पॉलिसी केवल 4-5% रिटर्न देती हैं जबकि टर्म प्लान मात्र ₹8,000-₹10,000 सालाना में ₹1 करोड़ का बड़ा सुरक्षा कवच देता है।",
    "deepDiveMr": "विमा आणि गुंतवणूक कधीही एकत्र करू नका. पारंपारिक विमा योजनांमध्ये कमी संरक्षण मिळते, तर टर्म इन्शुरन्समध्ये वार्षिक ₹१०,००० मध्ये ₹१ कोटीचे संरक्षण मिळते.",
    "example": {
      "scenario": "A 26-year-old earning ₹8 LPA buys a ₹1 Crore term plan up to age 60.",
      "scenarioHi": "26 वर्ष का युवा ₹8 लाख सालाना कमाई पर ₹1 करोड़ का 60 वर्ष तक का टर्म प्लान लेता है।",
      "scenarioMr": "२६ वर्षांचा तरुण ₹८ लाख पगारावर वयाच्या ६० वर्षांपर्यंत ₹१ कोटीचा टर्म प्लॅन घेतो.",
      "math": "Annual Premium: ~₹9,500/year (₹790/month). Total financial security of ₹1,00,00,000 for family dependents."
    },
    "rememberThis": "Do not opt for \"Return of Premium\" (TROP) plans. They charge 2-3x higher premiums just to refund your depreciated money decades later.",
    "rememberThisHi": "प्रीमियम वापसी (Return of Premium) वाले महंगे प्लान न लें; साधारण शुद्ध टर्म प्लान सबसे बेहतरीन होता है।",
    "rememberThisMr": "प्रीमियम परत मिळण्याच्या (TROP) नादात तिप्पट महाग पॉलिसी घेऊ नका; शुद्ध टर्म प्लॅनच नेहमी फायदेशीर असतो.",
    "commonMistake": "Buying a life insurance policy when you have zero financial dependents (like college students with no loans).",
    "commonMistakeHi": "बिना किसी आश्रित के कॉलेज के दिनों में ही जीवन बीमा खरीद लेना।",
    "commonMistakeMr": "कुटुंबात कोणीही अवलंबून नसताना अनावश्यक जीवन विमा पॉलिसी खरेदी करणे.",
    "mythVsReality": {
      "myth": "Traditional LIC endowment policies that return bonus money are superior to term plans.",
      "reality": "Endowment policies offer negligible life cover and pathetic 4% to 5% returns. Pure term insurance plus mutual fund SIP beats them by miles.",
      "mythHi": "पैसा वापस देने वाली एंडोमेंट या मनी-बैक पॉलिसी टर्म प्लान से बेहतर हैं।",
      "realityHi": "एंडोमेंट पॉलिसी केवल 5% रिटर्न देती हैं। शुद्ध टर्म प्लान + म्यूचुअल फंड एसआईपी इनसे कई गुना अधिक संपत्ति बनाते हैं।",
      "mythMr": "पैसे परत मिळणाऱ्या पारंपारिक विमा योजना टर्म प्लॅनपेक्षा चांगल्या असतात.",
      "realityMr": "पारंपारिक योजनांमध्ये महागाईपेक्षा कमी परतावा मिळतो. टर्म प्लॅन घेऊन उरलेले पैसे एसआयपीत गुंतवणे हा सर्वोत्तम मार्ग आहे."
    },
    "flashcards": [
      {
        "front": "How much term insurance cover should you buy?",
        "back": "At least 10 to 15 times your annual gross salary plus any outstanding home or education loans.",
        "frontHi": "आपको कितना टर्म इंश्योरेंस कवर लेना चाहिए?",
        "backHi": "अपनी वार्षिक आय का कम से कम 10 से 15 गुना, साथ ही बकाया लोन राशि जोड़कर।",
        "frontMr": "टर्म इन्शुरन्सचे संरक्षण किती रकमेचे असावे?",
        "backMr": "तुमच्या वार्षिक उत्पन्नाच्या किमान १० ते १५ पट अधिक चालू असणारी कर्जे."
      },
      {
        "front": "What is Claim Settlement Ratio (CSR)?",
        "back": "The percentage of insurance death claims an insurer successfully pays out compared to total claims received in a financial year (aim for >98%).",
        "frontHi": "क्लेम सेटलमेंट रेशियो (CSR) क्या है?",
        "backHi": "बीमा कंपनी द्वारा कुल प्राप्त दावों में से स्वीकृत और भुगतान किए गए दावों का प्रतिशत (98% से अधिक होना चाहिए)।",
        "frontMr": "क्लेम सेटलमेंट रेशिओ (CSR) म्हणजे काय?",
        "backMr": "कंपनीकडे आलेल्या एकूण दाव्यांपैकी मंजूर केलेल्या दाव्यांचे प्रमाण (हे ९८% पेक्षा जास्त असावे)."
      }
    ],
    "quiz": {
      "question": "Under Section 80C and Section 10(10D) of the Income Tax Act, how are term insurance premiums and claim payouts treated?",
      "questionHi": "आयकर अधिनियम की धारा 80C और 10(10D) के तहत, टर्म इंश्योरेंस प्रीमियम और मृत्यु लाभ पर क्या टैक्स नियम हैं?",
      "questionMr": "कलम ८०सी आणि १०(१०डी) अंतर्गत टर्म इन्शुरन्स प्रीमियम व दाव्याच्या रकमेवर काय कर सवलत मिळते?",
      "options": [
        "Premiums are taxable, but claim payouts are 18% GST deductible",
        "Premiums qualify for 80C deduction, and death claim payouts are completely tax-free under 10(10D)",
        "Death claims are taxed as salary income",
        "Term insurance has zero tax benefits in India"
      ],
      "optionsHi": [
        "प्रीमियम पर टैक्स लगता है लेकिन क्लेम पर जीएसटी कटता है",
        "प्रीमियम 80C में छूट दिलाता है और डेथ क्लेम 10(10D) के तहत पूरी तरह टैक्स-फ्री होता है",
        "डेथ क्लेम पर सैलरी जैसा टैक्स लगता है",
        "भारत में टर्म इंश्योरेंस पर कोई टैक्स छूट नहीं है"
      ],
      "optionsMr": [
        "प्रीमियमवर कर भरावा लागतो",
        "प्रीमियमवर ८०सी मध्ये सवलत मिळते आणि वारसाला मिळणारी क्लेमची रक्कम १०(१०डी) अन्वये पूर्णपणे करमुक्त असते",
        "क्लेमच्या रकमेवर पगारानुसार कर लागतो",
        "विम्यावर कोणतीही कर सवलत नसते"
      ],
      "correctIndex": 1,
      "explanation": "Annual premiums paid are deductible under Section 80C (Old Regime), and death claim payouts to nominees are 100% exempt from income tax under Sec 10(10D).",
      "explanationHi": "80C के तहत प्रीमियम में छूट मिलती है और नॉमिनी को मिलने वाली क्लेम राशि 10(10D) के तहत शत-प्रतिशत कर-मुक्त होती है।",
      "explanationMr": "८०सी मध्ये प्रीमियमवर कर सवलत मिळते आणि क्लेमची रक्कम १०(१०डी) अन्वये पूर्णपणे करमुक्त असते."
    },
    "youtubeVideoId": "f0g7h9j1r_g",
    "learnMoreQuery": "how to choose best term insurance plan india CSR",
    "hasCalculator": false,
    "relatedSlugs": [
      "health-insurance",
      "emergency-fund",
      "ctc"
    ]
  },
  {
    "slug": "health-insurance",
    "name": "Health Insurance",
    "nameHi": "स्वास्थ्य बीमा (मेडिक्लेम)",
    "nameMr": "आरोग्य विमा (हेल्थ इन्शुरन्स)",
    "category": "Basics",
    "difficulty": "Beginner",
    "readTime": "4 min read",
    "readTimeHi": "4 मिनट पठन",
    "readTimeMr": "4 मिनिटे वाचन",
    "icon": "🏥",
    "tagline": "Shielding your life savings from runaway medical inflation and hospitalization costs.",
    "taglineHi": "अस्पताल के भारी खर्चों और चिकित्सा महंगाई से अपनी जीवनभर की बचत की सुरक्षा।",
    "taglineMr": "हॉस्पिटलच्या प्रचंड बिलांपासून आणि महागाईपासून आपल्या बचतीचे रक्षण करणारी ढाल.",
    "simpleExplanation": "Health insurance covers medical, surgical, and hospitalization expenses incurred due to illness, accidents, or daycare treatments. Instead of wiping out your savings for an ICU stay or surgery, the insurer pays the hospital directly through cashless settlement.",
    "simpleExplanationHi": "स्वास्थ्य बीमा बीमारी या दुर्घटना की स्थिति में अस्पताल में भर्ती होने और इलाज के खर्च को कवर करता है। कैशलेस सुविधा से बीमा कंपनी सीधे अस्पताल को भुगतान करती है।",
    "simpleExplanationMr": "आरोग्य विमा आजारपण किंवा अपघातात दवाखान्याचा खर्च उचलतो. कॅशलेस सुविधेमुळे कंपनी थेट हॉस्पिटलचे बिल भरते.",
    "deepDive": "Medical inflation in India runs at 14% per year. Relying solely on corporate employer health insurance is dangerous: coverage ceases immediately upon job switch or resignation, and employer plans rarely cover parent pre-existing ailments adequately. Take an independent personal base cover of ₹10-15 Lakhs and enhance it to ₹1 Crore with an inexpensive Super Top-Up plan.",
    "deepDiveHi": "भारत में चिकित्सा महंगाई 14% की दर से बढ़ रही है। केवल ऑफिस के बीमा पर निर्भर न रहें; नौकरी बदलते ही यह खत्म हो जाता है। हमेशा अपना व्यक्तिगत बेस प्लान और सुपर टॉप-अप रखें।",
    "deepDiveMr": "भारतात उपचारांचा खर्च दरवर्षी १४% नी वाढतो आहे. फक्त कंपनीच्या विम्यावर अवलंबून राहू नका; नोकरी सोडताच तो बंद होतो. स्वतःचा स्वतंत्र वैयक्तिक आरोग्य विमा नक्की घ्या.",
    "example": {
      "scenario": "Sudden emergency cardiac procedure costing ₹6,50,000 at a private multispecialty hospital.",
      "scenarioHi": "निजी अस्पताल में आपातकालीन हृदय उपचार जिसका खर्च ₹6,50,000 आया।",
      "scenarioMr": "खाजगी हॉस्पिटलमध्ये आकस्मिक उपचारांचा ₹६,५०,००० खर्च आला.",
      "math": "With ₹10 Lakhs Cashless Health Cover: Insurer pays ₹6,38,000 directly. Patient pays only non-medical consumables (~₹12,000)."
    },
    "rememberThis": "Always declare all pre-existing medical conditions (like diabetes, hypertension, asthma) honestly. Concealing them causes claim rejection when you need it most.",
    "rememberThisHi": "बीपी, शुगर या पहले से मौजूद किसी भी बीमारी को कभी न छिपाएं; अन्यथा दावे के समय क्लेम रिजेक्ट हो जाएगा।",
    "rememberThisMr": "विमा घेताना जुने आजार (उदा. मधुमेह, बीपी) कधीही लपवू नका; अन्यथा क्लेम नामंजूर होतो.",
    "commonMistake": "Buying a health plan with high co-payment clauses (e.g. you pay 20% of every hospital bill) or strict room-rent capping limits.",
    "commonMistakeHi": "कम प्रीमियम के चक्कर में को-पेमेंट (Co-pay) और रूम रेंट कैपिंग वाली पॉलिसी ले लेना।",
    "commonMistakeMr": "कमी प्रीमियमच्या मोहात रूम रेंट मर्यादा किंवा को-पेमेंट (Co-pay) असणारी पॉलिसी घेणे.",
    "mythVsReality": {
      "myth": "My company provides a ₹3 Lakh group health cover, so I do not need a personal health insurance policy.",
      "reality": "Employer covers terminate the moment you resign, get laid off, or retire. In between jobs, a single health crisis can drain family finances.",
      "mythHi": "मेरी कंपनी ₹3 लाख का मेडिकल कवर देती है, इसलिए मुझे अलग से बीमा लेने की जरूरत नहीं है।",
      "realityHi": "नौकरी छूटते या बदलते ही कंपनी का कवर तुरंत खत्म हो जाता है। व्यक्तिगत पॉलिसी जीवनभर सुरक्षा देती है।",
      "mythMr": "माझ्या कंपनीचा ₹३ लाखांचा विमा आहे, त्यामुळे मला वेगळ्या विम्याची गरज नाही.",
      "realityMr": "नोकरी सुटल्यास किंवा बदलल्यास कंपनीचा विमा तात्काळ रद्द होतो; म्हणून स्वतःचा स्वतंत्र विमा असणे अनिवार्य आहे."
    },
    "flashcards": [
      {
        "front": "What is a Super Top-Up health plan?",
        "back": "A cost-effective policy that triggers after a deductible threshold is crossed (e.g. ₹90 Lakh cover for just ₹3,000/yr above a ₹10 Lakh base).",
        "frontHi": "सुपर टॉप-अप हेल्थ प्लान क्या है?",
        "backHi": "एक किफायती पॉलिसी जो बेस डिडक्टिबल खत्म होने के बाद बड़े खर्चों (उदा. ₹1 करोड़ तक) को बहुत कम प्रीमियम में कवर करती है।",
        "frontMr": "सुपर टॉप-अप हेल्थ प्लॅन काय असतो?",
        "backMr": "मूळ विम्याची मर्यादा संपल्यावर मोठ्या आजारपणाचा खर्च अतिशय माफक दरात उचलणारा पूरक विमा."
      },
      {
        "front": "What is the standard Waiting Period for pre-existing diseases (PED)?",
        "back": "Typically 1 to 3 years from policy inception before claims for existing illnesses are honored.",
        "frontHi": "पहले से मौजूद बीमारियों (PED) के लिए सामान्य वेटिंग पीरियड कितना होता है?",
        "backHi": "आमतौर पर पॉलिसी शुरू होने से 1 से 3 साल तक।",
        "frontMr": "आधीपासून असलेल्या आजारांसाठी वेटिंग पिरियड किती असतो?",
        "backMr": "साधारणपणे पॉलिसी सुरू झाल्यापासून १ ते ३ वर्षे."
      }
    ],
    "quiz": {
      "question": "Which clause in a health insurance policy should you strictly avoid because it artificially caps total claim reimbursements?",
      "questionHi": "स्वास्थ्य बीमा पॉलिसी में किस शर्त से सख्ती से बचना चाहिए क्योंकि यह आपके कुल क्लेम को सीमित कर देती है?",
      "questionMr": "आरोग्य विमा पॉलिसीमध्ये कोणत्या अटीमुळे हॉस्पिटलचे क्लेम कमी मंजूर होतात आणि ती टाळली पाहिजे?",
      "options": [
        "Cashless Hospitalization Network",
        "No Claim Bonus (NCB)",
        "Room Rent Capping (e.g. 1% of Sum Insured limit)",
        "Free Annual Health Checkup"
      ],
      "optionsHi": [
        "कैशलेस हॉस्पिटलाइजेशन नेटवर्क",
        "नो क्लेम बोनस (NCB)",
        "रूम रेंट कैपिंग (कमरे के किराए पर 1% सीमा)",
        "वार्षिक स्वास्थ्य जांच"
      ],
      "optionsMr": [
        "कॅशलेस सुविधा",
        "नो क्लेम बोनस",
        "रूम रेंट कॅपिंग (खोलीच्या भाड्यावर कमाल मर्यादा)",
        "मोफत आरोग्य तपासणी"
      ],
      "correctIndex": 2,
      "explanation": "Room rent capping ties doctor fees, nursing, and surgery costs to the room category, causing proportionate deductions across the entire bill.",
      "explanationHi": "रूम रेंट कैपिंग होने पर अस्पताल के सभी खर्चे उसी अनुपात में काट लिए जाते हैं जिससे जेब से भारी भुगतान करना पड़ता है।",
      "explanationMr": "रूम रेंटवर मर्यादा असल्यास संपूर्ण हॉस्पिटल बिलातून प्रमाणबद्ध कपात केली जाते आणि मोठा भुर्दंड पडतो."
    },
    "youtubeVideoId": "k4_eN8wK9_0",
    "learnMoreQuery": "how to choose health insurance india cashless network room rent",
    "hasCalculator": false,
    "relatedSlugs": [
      "term-insurance",
      "emergency-fund",
      "budgeting"
    ]
  },
  {
    "slug": "capital-gains",
    "name": "Capital Gains Tax",
    "nameHi": "पूंजीगत लाभ कर (कैपिटल गेन्स)",
    "nameMr": "भांडवली नफा कर (कॅपिटल गेन्स)",
    "category": "Tax",
    "difficulty": "Intermediate",
    "readTime": "4 min read",
    "readTimeHi": "4 मिनट पठन",
    "readTimeMr": "4 मिनिटे वाचन",
    "icon": "⚖️",
    "tagline": "Taxation on the profits realized from selling stocks, mutual funds, gold, or real estate.",
    "taglineHi": "शेयर, म्यूचुअल फंड, सोना या संपत्ति बेचने पर अर्जित लाभ पर लगने वाला कर।",
    "taglineMr": "शेअर्स, म्युच्युअल फंड, सोने किंवा मालमत्ता विकल्यावर झालेल्या नफ्यावरील कर.",
    "simpleExplanation": "When you sell a capital asset (like listed equity shares, mutual fund units, or a house) for more than what you paid to acquire it, the net profit is a \"Capital Gain\". The Indian Income Tax Department divides this into Short-Term (STCG) and Long-Term (LTCG) based on holding period.",
    "simpleExplanationHi": "जब आप किसी शेयर, म्यूचुअल फंड या प्रॉपर्टी को खरीद मूल्य से अधिक दाम पर बेचते हैं, तो हुए मुनाफे पर कैपिटल गेन्स टैक्स लगता है। इसे शॉर्ट-टर्म (STCG) और लॉन्ग-टर्म (LTCG) में बांटा गया है।",
    "simpleExplanationMr": "जेव्हा तुम्ही शेअर्स, सोने किंवा मालमत्ता खरेदी किंमतीपेक्षा जास्त भावात विकता, तेव्हा त्या नफ्यावर कॅपिटल गेन्स टॅक्स लागतो.",
    "deepDive": "Following Budget 2024 revisions: Listed equity shares and equity mutual funds held for under 12 months incur Short-Term Capital Gains (STCG) taxed at 20%. If held for more than 12 months, Long-Term Capital Gains (LTCG) is taxed at 12.5% for cumulative profits exceeding ₹1.25 Lakhs per financial year. Unlisted equity and real estate hold different holding thresholds.",
    "deepDiveHi": "बजट 2024 के नए नियमों के तहत: 12 महीने से कम रखे गए शेयरों पर शॉर्ट-टर्म टैक्स (STCG) 20% है। 12 महीने से अधिक रखे गए शेयरों पर सालाना ₹1.25 लाख से अधिक के लॉन्ग-टर्म मुनाफे (LTCG) पर 12.5% टैक्स लगता है।",
    "deepDiveMr": "२०२४ च्या अर्थसंकल्पानुसार: १२ महिन्यांच्या आत शेअर्स विकल्यास २०% अल्पकालीन कर (STCG) लागतो. १२ महिन्यांनंतर वर्षाला ₹१.२५ लाखांपेक्षा जास्त झालेल्या दीर्घकालीन नफ्यावर (LTCG) १२.५% कर लागतो.",
    "example": {
      "scenario": "You bought equity mutual fund units for ₹3,00,000 and sold them after 3 years for ₹5,00,000 (total profit = ₹2,00,000).",
      "scenarioHi": "₹3 लाख के म्यूचुअल फंड 3 साल बाद ₹5 लाख में बेचे (कुल मुनाफा ₹2,00,000)।",
      "scenarioMr": "३ लाख रुपयांचे म्युच्युअल फंड ३ वर्षांनंतर ५ लाख रुपयांना विकले (एकूण नफा ₹२,००,०००).",
      "math": "Total Gain: ₹2,00,000. Exempt quota: ₹1,25,000. Taxable LTCG = ₹75,000 @ 12.5% = ₹9,375 tax."
    },
    "rememberThis": "Capital losses can be set off against capital gains! Long-term capital losses can only be adjusted against long-term gains, but short-term losses can offset both.",
    "rememberThisHi": "शेयरों में हुए नुकसान (कैपिटल लॉस) को मुनाफे के सामने सेट-ऑफ किया जा सकता है जिससे आपका टैक्स बचता है।",
    "rememberThisMr": "शेअर बाजारातील तोटा नफ्यासमोर वजा करून कर वाचवता येतो.",
    "commonMistake": "Failing to report stock market gains in your ITR because you reinvested the proceeds immediately into other stocks.",
    "commonMistakeHi": "यह सोचना कि अगर शेयर बेचकर तुरंत दूसरा शेयर खरीद लिया तो कोई टैक्स नहीं देना पड़ेगा।",
    "commonMistakeMr": "शेअर्स विकून लगेच दुसरे शेअर्स घेतले म्हणून नफ्यावर कर लागणार नाही असा गैरसमज असणे.",
    "mythVsReality": {
      "myth": "You only pay capital gains tax if you withdraw money from your stock broker to your bank account.",
      "reality": "Tax liability is triggered the exact moment a sell order executes on the stock exchange, regardless of whether funds stay in the broker wallet.",
      "mythHi": "जब तक शेयर ब्रोकर से पैसा बैंक खाते में ट्रांसफर न करें, तब तक कोई टैक्स नहीं लगता।",
      "realityHi": "जैसे ही शेयर बिकता है उसी क्षण टैक्स की देनदारी बन जाती है, भले ही पैसा ब्रोकर के वॉलेट में ही क्यों न रहे।",
      "mythMr": "ब्रोकरकडून पैसे बँकेत काढल्याशिवाय कर लागत नाही.",
      "realityMr": "शेअर्स विकल्याच्या क्षणीच नफ्यावर कर लागू होतो, पैसे खात्यात आणले की नाही याने फरक पडत नाही."
    },
    "flashcards": [
      {
        "front": "What is the annual LTCG tax exemption limit on listed equities under Budget 2024?",
        "back": "₹1,25,000 per financial year (increased from ₹1,00,000). Any LTCG up to this limit is completely tax-free.",
        "frontHi": "बजट 2024 के तहत लिस्टेड शेयरों पर वार्षिक एलटीसीजी (LTCG) कर छूट की सीमा क्या है?",
        "backHi": "प्रति वित्तीय वर्ष ₹1,25,000। इस सीमा तक का लॉन्ग-टर्म मुनाफा पूरी तरह टैक्स-फ्री है।",
        "frontMr": "२०२४ च्या नियमांनुसार शेअर्सवरील वार्षिक LTCG करमुक्त मर्यादा किती आहे?",
        "backMr": "दर आर्थिक वर्षाला ₹१,२५,००० पर्यंतचा दीर्घकालीन नफा पूर्णपणे करमुक्त आहे."
      },
      {
        "front": "What is the holding period threshold distinguishing STCG from LTCG for listed equities?",
        "back": "12 months (1 year). Under 12 months = STCG (20%); Over 12 months = LTCG (12.5% above ₹1.25L).",
        "frontHi": "लिस्टेड शेयरों के लिए एसटीसीजी और एलटीसीजी के बीच समय सीमा क्या है?",
        "backHi": "12 महीने (1 साल)। 12 महीने से कम = 20% टैक्स; 12 महीने से अधिक = 12.5% टैक्स।",
        "frontMr": "शेअर्ससाठी अल्पकालीन आणि दीर्घकालीन नफ्याची मुदत किती आहे?",
        "backMr": "१२ महिने (१ वर्ष). १२ महिन्यांच्या आत २०% कर आणि १२ महिन्यांनंतर १२.५% कर."
      }
    ],
    "quiz": {
      "question": "Under the revised Budget 2024 tax framework, what is the tax rate on Short-Term Capital Gains (STCG) for listed equity shares?",
      "questionHi": "संशोधित बजट 2024 नियमों के तहत, लिस्टेड इक्विटी शेयरों पर शॉर्ट-टर्म कैपिटल गेन्स (STCG) की टैक्स दर क्या है?",
      "questionMr": "२०२४ च्या अर्थसंकल्पानुसार लिस्टेड शेअर्सवरील अल्पकालीन भांडवली नफ्याचा (STCG) कर दर किती आहे?",
      "options": [
        "10%",
        "15%",
        "20%",
        "Slab rate"
      ],
      "optionsHi": [
        "10%",
        "15%",
        "20%",
        "स्लैब दर"
      ],
      "optionsMr": [
        "१०%",
        "१५%",
        "२०%",
        "उत्पन्न स्लॅबनुसार"
      ],
      "correctIndex": 2,
      "explanation": "Budget 2024 increased the STCG tax rate on listed equity shares and equity mutual funds from 15% to 20%.",
      "explanationHi": "बजट 2024 में लिस्टेड शेयरों पर शॉर्ट-टर्म टैक्स की दर 15% से बढ़ाकर 20% कर दी गई है।",
      "explanationMr": "२०२४ च्या अर्थसंकल्पात शेअर्सवरील अल्पकालीन नफा कर १५% वरून २०% करण्यात आला आहे."
    },
    "youtubeVideoId": "mO4hN5p7y9g",
    "learnMoreQuery": "capital gains tax budget 2024 LTCG STCG equity mutual funds",
    "hasCalculator": false,
    "relatedSlugs": [
      "equity",
      "mutual-funds",
      "income-tax"
    ]
  },
  {
    "slug": "form-16",
    "name": "Form 16",
    "nameHi": "फॉर्म 16 (वेतन कर प्रमाणपत्र)",
    "nameMr": "फॉर्म १६ (पगार कर प्रमाणपत्र)",
    "category": "Tax",
    "difficulty": "Beginner",
    "readTime": "3 min read",
    "readTimeHi": "3 मिनट पठन",
    "readTimeMr": "3 मिनिटे वाचन",
    "icon": "📄",
    "tagline": "Your employer’s annual certificate detailing total salary paid and TDS deposited with the IT Department.",
    "taglineHi": "आपके नियोक्ता द्वारा जारी वार्षिक प्रमाण पत्र जो आपके वेतन और काटे गए टीडीएस का विवरण देता है।",
    "taglineMr": "कंपनीने दिलेल्या वेतनाचा आणि कापलेल्या टीडीएसचा अधिकृत वार्षिक दाखला.",
    "simpleExplanation": "Form 16 is a certificate issued annually by your employer under Section 203 of the Income Tax Act. It acts as conclusive proof that the tax deducted from your monthly salary was deposited into the Central Government’s account under your PAN.",
    "simpleExplanationHi": "फॉर्म 16 आपके नियोक्ता द्वारा दिया जाने वाला प्रमाण पत्र है जो यह प्रमाणित करता है कि आपकी सैलरी से काटा गया टीडीएस सरकार के खाते में जमा हो चुका है।",
    "simpleExplanationMr": "फॉर्म १६ हे कंपनीने दिलेले प्रमाणपत्र आहे, ज्यामध्ये तुमच्या पगारातून कापलेला कर सरकारकडे जमा झाल्याचा पुरावा असतो.",
    "deepDive": "Form 16 consists of two components: Part A (generated through the TRACES portal, showing quarterly employer TAN deposits against your PAN) and Part B (annexure detailing your gross salary, standard deduction of ₹75,000 under New Regime, Section 80C exemptions if Old Regime, and final net tax computation). Employers are mandated to issue it by June 15 every year.",
    "deepDiveHi": "फॉर्म 16 के दो भाग होते हैं: पार्ट A (टीडीएस का चालान विवरण) और पार्ट B (सैलरी ब्रेकअप, स्टैंडर्ड डिडक्शन और टैक्स कैलकुलेशन)। कंपनी को यह हर साल 15 जून तक जारी करना होता है।",
    "deepDiveMr": "फॉर्म १६ चे दोन भाग असतात: भाग अ (TRACES पोर्टलवरून आलेला टीडीएस भरल्याचा तपशील) आणि भाग ब (पगाराची विभागणी व वजावटी). कंपन्यांनी दरवर्षी १५ जूनपर्यंत हा देणे बंधनकारक आहे.",
    "example": {
      "scenario": "You receive Form 16 from your company in June showing Gross Salary of ₹9,00,000 and ₹45,000 TDS deposited.",
      "scenarioHi": "कंपनी से मिले फॉर्म 16 में ग्रॉस सैलरी ₹9,00,000 और ₹45,000 टीडीएस जमा दिखता है।",
      "scenarioMr": "कंपनीकडून मिळालेल्या फॉर्म १६ मध्ये ₹९,००,००० पगार आणि ₹४५,००० टीडीएस जमा असल्याचे दिसते.",
      "math": "Use the numbers from Part B to pre-fill your ITR-1 (Sahaj) on the Income Tax portal in under 10 minutes."
    },
    "rememberThis": "Form 16 is not the tax return itself! It is simply an input certificate you utilize to file your official Income Tax Return (ITR).",
    "rememberThisHi": "फॉर्म 16 खुद इनकम टैक्स रिटर्न नहीं है! यह केवल एक इनपुट सर्टिफिकेट है जिसकी मदद से आप अपना आईटीआर भरते हैं।",
    "rememberThisMr": "फॉर्म १६ म्हणजे आयटीआर नाही; हा केवळ एक दाखला आहे ज्याच्या आधारे तुम्हाला आयकर विवरणपत्र (ITR) दाखल करावे लागते.",
    "commonMistake": "Failing to collect Form 16 from both employers if you switched jobs mid-year, resulting in under-reported salary and a surprise tax notice.",
    "commonMistakeHi": "साल के बीच में नौकरी बदलने पर दोनों कंपनियों से फॉर्म 16 न लेना और टैक्स का गलत हिसाब बैठना।",
    "commonMistakeMr": "वर्षभरात नोकरी बदलल्यास दोन्ही कंपन्यांचे फॉर्म १६ न गोळा केल्याने चुकीचा आयटीआर भरला जाणे.",
    "mythVsReality": {
      "myth": "If my employer did not deduct any TDS because my income was below the tax limit, they cannot issue Form 16.",
      "reality": "Even if zero TDS is deducted, employers can and often issue Part B to certify your official annual earnings breakdown.",
      "mythHi": "अगर टीडीएस नहीं कटा तो कंपनी फॉर्म 16 जारी नहीं कर सकती।",
      "realityHi": "टीडीएस शून्य होने पर भी कंपनी आपकी सैलरी और भत्तों को प्रमाणित करने के लिए फॉर्म 16 का पार्ट B दे सकती है।",
      "mythMr": "टीडीएस कापला नसेल तर कंपनी फॉर्म १६ देऊ शकत नाही.",
      "realityMr": "टीडीएस कापला नसला तरी कंपनी पगाराचा तपशील प्रमाणित करण्यासाठी फॉर्म १६ देऊ शकते."
    },
    "flashcards": [
      {
        "front": "What is the legal deadline for employers to issue Form 16 to employees?",
        "back": "June 15 of the assessment year following the close of the financial year.",
        "frontHi": "नियोक्ता के लिए कर्मचारियों को फॉर्म 16 जारी करने की कानूनी समय सीमा क्या है?",
        "backHi": "वित्तीय वर्ष समाप्त होने के बाद 15 जून तक।",
        "frontMr": "कंपन्यांसाठी कर्मचाऱ्यांना फॉर्म १६ देण्याची अंतिम मुदत काय असते?",
        "backMr": "आर्थिक वर्ष संपल्यानंतर १५ जूनपर्यंत."
      },
      {
        "front": "What is the difference between Part A and Part B of Form 16?",
        "back": "Part A contains official government tax credits and employer TAN details; Part B contains salary breakdown and deductions.",
        "frontHi": "फॉर्म 16 के पार्ट A और पार्ट B में क्या अंतर है?",
        "backHi": "पार्ट A में टीडीएस कटौती का सरकारी रिकॉर्ड होता है; पार्ट B में वेतन, भत्ते और छूट का विस्तृत हिसाब होता है।",
        "frontMr": "फॉर्म १६ च्या भाग अ आणि भाग ब मध्ये काय फरक असतो?",
        "backMr": "भाग अ मध्ये सरकारी टीडीएस नोंदी असतात, तर भाग ब मध्ये पगार, भत्ते आणि वजावटींचा तपशील असतो."
      }
    ],
    "quiz": {
      "question": "Which portal generates the cryptographically signed Part A of Form 16?",
      "questionHi": "फॉर्म 16 का डिजिटल रूप से हस्ताक्षरित पार्ट A किस सरकारी पोर्टल द्वारा जनरेट किया जाता है?",
      "questionMr": "फॉर्म १६ चा डिजिटल स्वाक्षरी असलेला भाग अ कोणत्या सरकारी पोर्टलवरून तयार होतो?",
      "options": [
        "EPFO Portal",
        "TRACES (TDS Reconciliation Analysis and Correction Enabling System)",
        "MCA21",
        "GSTN Portal"
      ],
      "optionsHi": [
        "ईपीएफओ पोर्टल",
        "ट्रेसेस (TRACES) पोर्टल",
        "एमसीए21 (MCA21)",
        "जीएसटीएन पोर्टल"
      ],
      "optionsMr": [
        "ईपीएफओ पोर्टल",
        "ट्रेसेस (TRACES) पोर्टल",
        "कंपनी व्यवहार मंत्रालय",
        "जीएसटी पोर्टल"
      ],
      "correctIndex": 1,
      "explanation": "TRACES is the Income Tax Department’s official portal used by deductors to generate validated TDS certificates.",
      "explanationHi": "ट्रेसेस (TRACES) आयकर विभाग का आधिकारिक टीडीएस पोर्टल है जहाँ से पार्ट A जारी होता है।",
      "explanationMr": "ट्रेसेस (TRACES) हे आयकर विभागाचे अधिकृत पोर्टल आहे जिथून भाग अ अधिकृतपणे डाऊनलोड होतो."
    },
    "youtubeVideoId": "w5o9eY2hG6E",
    "learnMoreQuery": "how to read Form 16 Part A and Part B for filing ITR",
    "hasCalculator": false,
    "relatedSlugs": [
      "tds",
      "income-tax",
      "gross-vs-net"
    ]
  },
  {
    "slug": "gst-business-impact",
    "name": "GST Business Impact",
    "nameHi": "जीएसटी का व्यापार पर प्रभाव",
    "nameMr": "जीएसटीचा व्यवसायावरील परिणाम",
    "category": "Business",
    "difficulty": "Intermediate",
    "readTime": "4 min read",
    "readTimeHi": "4 मिनट पठन",
    "readTimeMr": "4 मिनिटे वाचन",
    "icon": "🏭",
    "tagline": "How input tax credit, reverse charge, and multi-state compliance reshape business margins.",
    "taglineHi": "इनपुट टैक्स क्रेडिट, रिवर्स चार्ज और अंतर-राज्यीय अनुपालन कैसे व्यापार के मुनाफे को प्रभावित करते हैं।",
    "taglineMr": "इनपुट टॅक्स क्रेडिट आणि जीएसटी नियमांमुळे व्यवसायाच्या नफ्यावर होणारा थेट परिणाम.",
    "simpleExplanation": "For startups, small businesses, and freelancers, GST transforms working capital management. Registering for GST is mandatory if turnover exceeds ₹20 Lakhs (services) or ₹40 Lakhs (goods), and it enables businesses to claim Input Tax Credit on software, laptops, and operational expenses.",
    "simpleExplanationHi": "स्टार्टअप्स और व्यवसायों के लिए जीएसटी वर्किंग कैपिटल को प्रभावित करता है। ₹20 लाख (सेवाएं) या ₹40 लाख (सामान) से अधिक टर्नओवर पर रजिस्ट्रेशन अनिवार्य है।",
    "simpleExplanationMr": "स्टार्टअप्स आणि व्यावसायिकांसाठी जीएसटी थेट खेळत्या भांडवलावर परिणाम करतो. सेवांसाठी ₹२० लाख आणि वस्तूंसाठी ₹४० लाखांवर नोंदणी बंधनकारक आहे.",
    "deepDive": "Without GST registration, B2B clients cannot claim Input Tax Credit on invoices you issue, putting un-registered vendors at a competitive disadvantage. Businesses must file monthly or quarterly GSTR-1 (outward supplies) and GSTR-3B (summary return). Reverse Charge Mechanism (RCM) applies when registered businesses purchase from unregistered suppliers.",
    "deepDiveHi": "जीएसटी नंबर न होने पर आपके बी2बी ग्राहक आपके बिलों पर आईटीसी का दावा नहीं कर सकते। व्यवसायों को समय पर GSTR-1 और GSTR-3B रिटर्न भरना होता है।",
    "deepDiveMr": "जीएसटी नोंदणी नसल्यास कॉर्पोरेट ग्राहक तुमच्याकडून खरेदी टाळतात कारण त्यांना आयटीसी सवलत मिळत नाही. GSTR-1 आणि GSTR-3B वेळेवर भरणे आवश्यक असते.",
    "example": {
      "scenario": "A design agency invoices ₹1,00,000 + 18% GST (₹18,000). They bought office laptops with ₹8,000 GST paid.",
      "scenarioHi": "डिजाइन एजेंसी ने ₹1 लाख का बिल बनाया (+₹18,000 जीएसटी)। उन्होंने लैपटॉप पर ₹8,000 जीएसटी भरा था।",
      "scenarioMr": "एजन्सीने ग्राहकाला ₹१,००,००० + १८% जीएसटी (₹१८,०००) बिल दिले. लॅपटॉपवर ₹८,००० जीएसटी भरला होता.",
      "math": "Output GST: ₹18,000 - Input Tax Credit: ₹8,000 = Only ₹10,000 net GST paid to the Government."
    },
    "rememberThis": "Input Tax Credit is not free money; you can only claim it if your vendor has filed their GSTR-1 and the tax reflects in your GSTR-2B statement.",
    "rememberThisHi": "आईटीसी तभी मिलता है जब आपके सप्लायर ने समय पर जीएसटी जमा किया हो और वह आपके GSTR-2B में दिख रहा हो।",
    "rememberThisMr": "आयटीसी परतावा तेव्हाच मिळतो जेव्हा तुमच्या विक्रेत्याने जीएसटी भरून तो तुमच्या GSTR-2B मध्ये दिसेल.",
    "commonMistake": "Treating the GST collected from clients as company revenue and spending it on salaries before tax filing deadlines.",
    "commonMistakeHi": "ग्राहकों से मिले जीएसटी को कंपनी की कमाई समझकर खर्च कर देना और महीने के अंत में टैक्स भरने में असमर्थ होना।",
    "commonMistakeMr": "ग्राहकाकडून घेतलेला जीएसटी कंपनीचा नफा समजून खर्च करणे आणि रिटर्न भरताना पैशांची अडचण होणे.",
    "mythVsReality": {
      "myth": "Small freelance consultants earning under ₹20 Lakhs should never register for voluntary GST.",
      "reality": "Voluntary GST registration allows consultants to work with corporate MNC clients who require GST invoices to claim input tax credit.",
      "mythHi": "₹20 लाख से कम कमाई वाले फ्रीलांसरों को कभी जीएसटी नंबर नहीं लेना चाहिए।",
      "realityHi": "स्वैच्छिक जीएसटी लेने से आप बड़ी कॉर्पोरेट कंपनियों के साथ काम कर सकते हैं जिन्हें इनपुट टैक्स क्रेडिट के लिए जीएसटी बिल चाहिए होता है।",
      "mythMr": "२० लाखांपेक्षा कमी उत्पन्न असणाऱ्यांनी कधीही जीएसटी नोंदणी करू नये.",
      "realityMr": "ऐच्छिक जीएसटी नोंदणी केल्यास मोठ्या कंपन्यांशी काम करणे सोपे होते ज्यांना आयटीसी बिलांची गरज असते."
    },
    "flashcards": [
      {
        "front": "What is GSTR-2B?",
        "back": "An auto-drafted, static input tax credit statement generated on the 14th of every month confirming eligible ITC for businesses.",
        "frontHi": "GSTR-2B क्या है?",
        "backHi": "एक ऑटो-ड्राफ्टेड मासिक स्टेटमेंट जो यह प्रमाणित करता है कि आपके सप्लायरों ने जीएसटी भर दिया है और आप कितना आईटीसी ले सकते हैं।",
        "frontMr": "GSTR-2B म्हणजे काय?",
        "backMr": "दर महिन्याला आपोआप तयार होणारा असा दाखला, ज्यावरून तुम्हाला किती इनपुट टॅक्स क्रेडिट मिळेल हे निश्चित होते."
      },
      {
        "front": "What is the mandatory threshold for GST registration for service providers in India?",
        "back": "₹20 Lakhs annual turnover (₹10 Lakhs for Special Category and North-Eastern States).",
        "frontHi": "भारत में सेवा प्रदाताओं के लिए अनिवार्य जीएसटी पंजीकरण की टर्नओवर सीमा क्या है?",
        "backHi": "वार्षिक टर्नओवर ₹20 लाख (विशेष श्रेणी और पूर्वोत्तर राज्यों के लिए ₹10 लाख)।",
        "frontMr": "सेवा पुरवठादारांसाठी जीएसटी नोंदणीची मर्यादा किती आहे?",
        "backMr": "वार्षिक उलाढाल ₹२० लाख (विशेष आणि ईशान्येकडील राज्यांसाठी ₹१० लाख)."
      }
    ],
    "quiz": {
      "question": "Under what condition can a business claim Input Tax Credit (ITC) on commercial goods or services purchased?",
      "questionHi": "कोई व्यवसाय खरीदी गई वस्तुओं या सेवाओं पर इनपुट टैक्स क्रेडिट (ITC) का दावा किस शर्त पर कर सकता है?",
      "questionMr": "कोणत्या अटीवर व्यावसायिक इनपुट टॅक्स क्रेडिटचा (ITC) दावा करू शकतात?",
      "options": [
        "The purchase was made in cash without an invoice",
        "The purchase is used for furtherance of business and reflects in GSTR-2B",
        "The purchase is personal home groceries",
        "The business turnover is below ₹5 Lakhs"
      ],
      "optionsHi": [
        "खरीद बिना बिल के नकद में की गई हो",
        "खरीद का उपयोग व्यापार के लिए हुआ हो और वह GSTR-2B में दिख रहा हो",
        "खरीद घरेलू राशन के लिए हो",
        "व्यापार टर्नओवर ₹5 लाख से कम हो"
      ],
      "optionsMr": [
        "खरेदी बिलाशिवाय रोखीने केली असल्यास",
        "खरेदीचा वापर व्यवसायासाठी झाला असावा आणि ती GSTR-2B मध्ये नोंदलेली असावी",
        "घरातील किराणा सामानासाठी",
        "उलाढाल ५ लाखांपेक्षा कमी असल्यास"
      ],
      "correctIndex": 1,
      "explanation": "ITC is only legally admissible if purchases are strictly for business purposes, backed by a tax invoice, and populated in GSTR-2B.",
      "explanationHi": "आईटीसी केवल तभी मिलता है जब सामान व्यापार के लिए खरीदा गया हो और वह सरकारी पोर्टल के GSTR-2B में दिखाई दे।",
      "explanationMr": "आयटीसी केवळ व्यावसायिक खर्चावर आणि GSTR-2B मध्ये नोंदणीकृत असल्यासच वैध मानला जातो."
    },
    "youtubeVideoId": "uJv5F8_79h4",
    "learnMoreQuery": "GST business impact input tax credit ITC GSTR 2B",
    "hasCalculator": true,
    "calculatorType": "gst",
    "relatedSlugs": [
      "gst",
      "tds",
      "capital-gains"
    ]
  },
  {
    "slug": "ctc",
    "name": "CTC (Cost to Company)",
    "nameHi": "सीटीसी (कंपनी की कुल लागत)",
    "nameMr": "सीटीसी (कंपनीचा एकूण खर्च)",
    "category": "Income",
    "difficulty": "Beginner",
    "readTime": "3 min read",
    "readTimeHi": "3 मिनट पठन",
    "readTimeMr": "3 मिनिटे वाचन",
    "icon": "💼",
    "tagline": "The total financial expense an employer incurs to employ you — not your take-home pay.",
    "taglineHi": "आपको नौकरी पर रखने के लिए कंपनी द्वारा किया जाने वाला कुल वार्षिक खर्च — इन-हैंड सैलरी नहीं।",
    "taglineMr": "तुम्हाला नोकरीवर ठेवण्यासाठी कंपनीचा एकूण वार्षिक खर्च — हातात येणारा पगार नव्हे.",
    "simpleExplanation": "CTC represents the total amount of money the employer spends on an employee over a year. It bundles direct salary, statutory employer contributions (like EPF and Gratuity), health insurance premiums, performance bonuses, and office perks.",
    "simpleExplanationHi": "सीटीसी वह कुल रकम है जो कंपनी एक कर्मचारी पर एक साल में खर्च करती है। इसमें सैलरी के साथ पीएफ, ग्रेच्युटी, बीमा और अन्य भत्ते शामिल होते हैं।",
    "simpleExplanationMr": "सीटीसी म्हणजे कंपनी कर्मचाऱ्यावर वर्षभरात करत असलेला संपूर्ण खर्च. यात मूळ पगार, पीएफ, ग्रॅच्युइटी आणि विम्याचा समावेश असतो.",
    "deepDive": "CTC is heavily padded with non-cash or deferred components. Employer EPF contribution (12% of basic up to ₹1,800/mo cap or actual basic), Gratuity (4.81% of basic payable only after 5 continuous years), group insurance, and variable performance bonuses are all deducted before arriving at your monthly in-hand cheque.",
    "deepDiveHi": "सीटीसी में कई ऐसे घटक होते हैं जो तुरंत हाथ में नहीं आते, जैसे कंपनी का पीएफ हिस्सा, 5 साल बाद मिलने वाली ग्रेच्युटी और वेरिएबल बोनस।",
    "deepDiveMr": "सीटीसीमध्ये अनेक अप्रत्यक्ष घटक असतात, जसे की कंपनीचा पीएफ हिस्सा आणि ५ वर्षांनंतर मिळणारी ग्रॅच्युइटी. त्यामुळे प्रत्यक्ष पगार कमी येतो.",
    "example": {
      "scenario": "An engineering fresher accepts a job offer of ₹12,00,000 CTC (₹12 LPA).",
      "scenarioHi": "₹12 लाख सीटीसी का जॉब ऑफर स्वीकार करना।",
      "scenarioMr": "₹१२ लाख सीटीसीची नोकरी स्वीकारणे.",
      "math": "Base: ₹6L | HRA: ₹2.4L | Allowances: ₹1.6L | Employer PF & Gratuity: ₹80k | Variable Bonus: ₹1.2L → Actual In-Hand: ~₹76,000/mo (not ₹1,00,000/mo)."
    },
    "rememberThis": "Always ask for the exact \"Fixed Monthly Gross\" and \"Take-Home Pay\" before celebrating a headline CTC figure.",
    "rememberThisHi": "सीटीसी का बड़ा आंकड़ा देखकर खुश होने से पहले यह जरूर पूछें कि हर महीने हाथ में (In-Hand) कितना आएगा।",
    "rememberThisMr": "सीटीसीचा मोठा आकडा पाहण्यापेक्षा दरमहा हातात किती पगार येईल (In-Hand) हे आधी तपासा.",
    "commonMistake": "Committing to a high monthly apartment rent or luxury car EMI assuming that monthly in-hand is simply CTC divided by 12.",
    "commonMistakeHi": "सीटीसी को 12 से भाग देकर मासिक सैलरी मान लेना और महंगा फ्लैट किराए पर ले लेना।",
    "commonMistakeMr": "सीटीसीला १२ ने भागून तोच मासिक पगार समजणे आणि महागड्या घरात भाड्याने राहणे.",
    "mythVsReality": {
      "myth": "A ₹15 LPA CTC means ₹1.25 Lakh will be credited to my bank account every month.",
      "reality": "After PF deductions, Gratuity withholding, variable performance buffers, and Income Tax, take-home will hover between ₹85,000 and ₹95,000.",
      "mythHi": "₹15 लाख सीटीसी का मतलब है कि हर महीने बैंक में ₹1.25 लाख आएंगे।",
      "realityHi": "टैक्स, पीएफ और भत्तों की कटौती के बाद इन-हैंड सैलरी ₹85,000 से ₹95,000 के आसपास ही होगी।",
      "mythMr": "₹१५ लाख सीटीसी म्हणजे दरमहा बँक खात्यात ₹१.२५ लाख जमा होणार.",
      "realityMr": "कर, पीएफ आणि ग्रॅच्युइटी कापून हातात दरमहा सुमारे ₹८५,००० ते ₹९५,००० च मिळतील."
    },
    "flashcards": [
      {
        "front": "What is Gratuity in a CTC breakdown?",
        "back": "A statutory terminal benefit equal to 15 days of last drawn basic salary for every year worked, payable only after 5 continuous years of service.",
        "frontHi": "सीटीसी में ग्रेच्युटी क्या होती है?",
        "backHi": "एक वैधानिक लाभ जो किसी कंपनी में 5 साल लगातार सेवा पूरी करने के बाद ही मिलता है।",
        "frontMr": "सीटीसीमधील ग्रॅच्युइटी म्हणजे काय?",
        "backMr": "एकाच कंपनीत सलग ५ वर्षे काम पूर्ण केल्यानंतर मिळणारा वैधानिक उपदान लाभ."
      },
      {
        "front": "Why is Take-Home pay always significantly lower than CTC / 12?",
        "back": "Because CTC includes employer PF, employee PF, professional tax, gratuity, medical insurance premiums, and TDS income tax.",
        "frontHi": "इन-हैंड सैलरी सीटीसी/12 से कम क्यों होती है?",
        "backHi": "क्योंकि सीटीसी में दोनों तरफ का पीएफ, ग्रेच्युटी, प्रोफेशनल टैक्स और इनकम टैक्स शामिल होता है।",
        "frontMr": "हातात येणारा पगार सीटीसी/१२ पेक्षा कमी का असतो?",
        "backMr": "कारण त्यात पीएफ, व्यावसायिक कर, ग्रॅच्युइटी आणि इन्कम टॅक्सच्या कपाती समाविष्ट असतात."
      }
    ],
    "quiz": {
      "question": "Which of the following CTC components is deferred and only legally payable after completing 5 years of continuous service with an employer?",
      "questionHi": "निम्नलिखित में से कौन सा सीटीसी घटक 5 साल की निरंतर सेवा पूरी करने के बाद ही मिलता है?",
      "questionMr": "कंपनीमध्ये सलग ५ वर्षे सेवा पूर्ण केल्यानंतरच मिळणारा सीटीसीमधील घटक कोणता?",
      "options": [
        "House Rent Allowance (HRA)",
        "Gratuity",
        "Special Allowance",
        "Leave Travel Concession (LTC)"
      ],
      "optionsHi": [
        "हाउस रेंट अलाउंस (HRA)",
        "ग्रेच्युटी (Gratuity)",
        "स्पेशल अलाउंस",
        "लीव ट्रैवल अलाउंस"
      ],
      "optionsMr": [
        "घरभाडे भत्ता (HRA)",
        "ग्रॅच्युइटी (Gratuity)",
        "विशेष भत्ता",
        "प्रवास सवलत"
      ],
      "correctIndex": 1,
      "explanation": "Under the Payment of Gratuity Act 1972, gratuity becomes legally payable only after an employee completes 5 years of continuous service.",
      "explanationHi": "पेमेंट ऑफ ग्रेच्युटी एक्ट 1972 के तहत 5 साल पूरे होने पर ही ग्रेच्युटी का पैसा मिलता है।",
      "explanationMr": "ग्रॅच्युइटी कायद्यानुसार ५ वर्षे अखंड सेवा पूर्ण झाल्यावरच ही रक्कम मिळण्यास पात्र ठरते."
    },
    "youtubeVideoId": "dD8u8eI07z8",
    "learnMoreQuery": "CTC vs in hand salary breakdown india components",
    "hasCalculator": false,
    "relatedSlugs": [
      "gross-vs-net",
      "income-tax",
      "form-16"
    ]
  },
  {
    "slug": "gross-vs-net",
    "name": "Gross vs Net Salary",
    "nameHi": "ग्रॉस बनाम नेट सैलरी (इन-हैंड)",
    "nameMr": "ग्रॉस विरूद्ध नेट पगार (हातात येणारा)",
    "category": "Income",
    "difficulty": "Beginner",
    "readTime": "3 min read",
    "readTimeHi": "3 मिनट पठन",
    "readTimeMr": "3 मिनिटे वाचन",
    "icon": "💵",
    "tagline": "The crucial difference between what you earn on paper and what actually lands in your bank.",
    "taglineHi": "कागजों पर दिखने वाली सैलरी और महीने के अंत में बैंक खाते में आने वाले पैसे का वास्तविक अंतर।",
    "taglineMr": "पगार पावतीवरील रक्कम आणि प्रत्यक्ष बँक खात्यात जमा होणारी रक्कम यातील स्पष्ट फरक.",
    "simpleExplanation": "Gross Salary is your total earnings before any deductions (Basic Pay + HRA + Special Allowance + Bonuses). Net Salary (Take-Home) is the final amount deposited into your bank account after subtracting Employee EPF, Professional Tax, and TDS income tax.",
    "simpleExplanationHi": "ग्रॉस सैलरी वह कुल राशि है जो कटौती से पहले बनती है। नेट सैलरी वह वास्तविक पैसा है जो पीएफ, टैक्स और अन्य कटौतियों के बाद बैंक में आता है।",
    "simpleExplanationMr": "ग्रॉस पगार म्हणजे कपातीपूर्वीचा एकूण पगार. नेट पगार म्हणजे पीएफ, व्यवसाय कर आणि इन्कम टॅक्स वजा करून हातात मिळणारा प्रत्यक्ष पगार.",
    "deepDive": "The standard deduction equation is: Net Salary = Gross Salary - (Employee EPF @ 12% + Professional Tax ~₹200 + TDS Income Tax). In your monthly salary slip, check Earnings on the left column and Deductions on the right column.",
    "deepDiveHi": "नेट सैलरी = ग्रॉस सैलरी - (कर्मचारी पीएफ + प्रोफेशनल टैक्स + टीडीएस)। सैलरी स्लिप में बाईं ओर कमाई और दाईं ओर कटौतियां दर्ज होती हैं।",
    "deepDiveMr": "नेट पगार = ग्रॉस पगार - (कर्मचारी पीएफ + व्यवसाय कर + टीडीएस). पगार पावतीमध्ये डाव्या बाजूला कमाई आणि उजव्या बाजूला कपात दिसते.",
    "example": {
      "scenario": "Monthly Gross Salary = ₹70,000.",
      "scenarioHi": "मासिक ग्रॉस सैलरी = ₹70,000।",
      "scenarioMr": "मासिक ग्रॉस पगार = ₹७०,०००.",
      "math": "Gross ₹70,000 - PF (₹3,600) - PT (₹200) - TDS (₹4,200) = Net In-Hand Salary: ₹62,000."
    },
    "rememberThis": "Your Employee EPF deduction is not a lost cost; it is forced retirement savings accumulating compound interest at ~8.25% backed by the sovereign guarantee of India.",
    "rememberThisHi": "पीएफ में कटी हुई राशि डूबी नहीं है; यह 8.25% ब्याज के साथ आपकी सुरक्षित रिटायरमेंट पूंजी बन रही है।",
    "rememberThisMr": "पीएफ कपात वाया जात नाही; त्यावर सरकारकडून सुमारे ८.२५% व्याज मिळून तुमचे सुरक्षित भविष्य घडते.",
    "commonMistake": "Budgeting for house EMI or wedding expenses using your Gross Salary rather than your actual Net Take-Home.",
    "commonMistakeHi": "ग्रॉस सैलरी के आधार पर होम लोन की ईएमआई प्लान कर लेना।",
    "commonMistakeMr": "हातात येणाऱ्या नेट पगाराऐवजी ग्रॉस पगारावर अवलंबून राहून कर्जाचे नियोजन करणे.",
    "mythVsReality": {
      "myth": "Professional Tax is a massive federal tax charged by the Income Tax Department.",
      "reality": "Professional Tax is a modest state-level tax capped at a maximum of ₹2,500 per year by Article 276 of the Indian Constitution.",
      "mythHi": "प्रोफेशनल टैक्स केंद्र सरकार का बहुत बड़ा टैक्स है।",
      "realityHi": "प्रोफेशनल टैक्स राज्य सरकार का छोटा कर है जो साल भर में अधिकतम ₹2,500 ही हो सकता है।",
      "mythMr": "प्रोफेशनल टॅक्स हा केंद्र सरकारचा खूप मोठा कर असतो.",
      "realityMr": "प्रोफेशनल टॅक्स हा राज्य सरकारचा कर असून वर्षाला जास्तीत जास्त ₹२,५०० च असतो."
    },
    "flashcards": [
      {
        "front": "What is the formula for Net Take-Home Salary?",
        "back": "Net Salary = Gross Salary minus (Employee EPF + Professional Tax + TDS Income Tax).",
        "frontHi": "नेट इन-हैंड सैलरी का सूत्र क्या है?",
        "backHi": "नेट सैलरी = ग्रॉस सैलरी - (कर्मचारी पीएफ + प्रोफेशनल टैक्स + टीडीएस)।",
        "frontMr": "नेट पगाराचे सूत्र काय आहे?",
        "backMr": "नेट पगार = ग्रॉस पगार वजा (कर्मचारी पीएफ + व्यवसाय कर + टीडीएस)."
      },
      {
        "front": "What is the maximum annual limit for Professional Tax in India?",
        "back": "₹2,500 per financial year, legally capped by the Constitution of India.",
        "frontHi": "भारत में प्रोफेशनल टैक्स की अधिकतम वार्षिक सीमा क्या है?",
        "backHi": "संविधान द्वारा निर्धारित अधिकतम ₹2,500 प्रति वर्ष।",
        "frontMr": "भारतात व्यावसायिक कराची कमाल वार्षिक मर्यादा किती आहे?",
        "backMr": "भारतीय संविधानानुसार दरवर्षी जास्तीत जास्त ₹२,५००."
      }
    ],
    "quiz": {
      "question": "Which of the following is deducted from your Gross Salary to calculate your monthly Take-Home pay?",
      "questionHi": "मासिक इन-हैंड वेतन की गणना के लिए आपकी ग्रॉस सैलरी से क्या घटाया जाता है?",
      "questionMr": "हातात येणारा पगार काढण्यासाठी ग्रॉस पगारातून काय वजा केले जाते?",
      "options": [
        "Gratuity paid after 5 years",
        "Employee EPF contribution and TDS",
        "Employer office electricity bill",
        "Company laptop depreciation"
      ],
      "optionsHi": [
        "5 साल बाद मिलने वाली ग्रेच्युटी",
        "कर्मचारी पीएफ अंशदान और टीडीएस",
        "कंपनी का बिजली बिल",
        "लैपटॉप मूल्यह्रास"
      ],
      "optionsMr": [
        "५ वर्षांनंतर मिळणारी ग्रॅच्युइटी",
        "कर्मचारी पीएफ आणि टीडीएस कर",
        "कंपनीचे वीज बिल",
        "लॅपटॉपची झीज"
      ],
      "correctIndex": 1,
      "explanation": "Employee EPF (12% of basic) and monthly TDS income tax are direct deductions that reduce Gross to Net Pay.",
      "explanationHi": "कर्मचारी का पीएफ और टीडीएस सीधे ग्रॉस सैलरी से कटकर नेट सैलरी बनाते हैं।",
      "explanationMr": "कर्मचारी पीएफ आणि टीडीएस थेट ग्रॉस पगारातून वजा होऊन उरलेली रक्कम हातात मिळते."
    },
    "youtubeVideoId": "gR9_wG2p8Yw",
    "learnMoreQuery": "gross salary vs net salary payslip components explained",
    "hasCalculator": false,
    "relatedSlugs": [
      "ctc",
      "income-tax",
      "form-16"
    ]
  },
  {
    "slug": "income-tax",
    "name": "Income Tax & Slabs",
    "nameHi": "आयकर और टैक्स स्लैब (नया बनाम पुराना)",
    "nameMr": "उत्पन्न कर आणि स्लॅब (नवीन विरूद्ध जुनी पद्धत)",
    "category": "Tax",
    "difficulty": "Intermediate",
    "readTime": "5 min read",
    "readTimeHi": "5 मिनट पठन",
    "readTimeMr": "5 मिनिटे वाचन",
    "icon": "🏛️",
    "tagline": "Navigating progressive tax slabs, standard deductions, and the New vs Old tax regime.",
    "taglineHi": "प्रगतिशील टैक्स स्लैब, स्टैंडर्ड डिडक्शन और नई बनाम पुरानी कर व्यवस्था का सरल विश्लेषण।",
    "taglineMr": "इन्कम टॅक्स स्लॅब, स्टँडर्ड डिडक्शन आणि नवीन विरूद्ध जुनी कर रचना सोप्या भाषेत.",
    "simpleExplanation": "Income tax is a direct tax levied by the Central Government on your annual taxable income. India currently operates two parallel systems: the New Tax Regime (default, with lower tax rates but zero investment deductions) and the Old Tax Regime (higher tax rates, but allows exemptions like 80C, HRA, and 80D).",
    "simpleExplanationHi": "आयकर केंद्र सरकार द्वारा वार्षिक आय पर लगाया जाने वाला प्रत्यक्ष कर है। भारत में नई व्यवस्था (कम टैक्स दरें, कोई छूट नहीं) और पुरानी व्यवस्था (छूट सहित) दोनों उपलब्ध हैं।",
    "simpleExplanationMr": "इन्कम टॅक्स हा केंद्र सरकारला दिला जाणारा प्रत्यक्ष कर आहे. सध्या नवीन कर पद्धत (कमी कर, वजावटी नाहीत) आणि जुनी पद्धत (८०सी, घरभाडे सवलतींसह) अशा दोन पद्धती आहेत.",
    "deepDive": "Under Budget 2024 New Tax Regime: Income up to ₹3,00,000 has 0% tax; ₹3L-₹7L has 5%; ₹7L-₹10L has 10%; ₹10L-₹12L has 15%; ₹12L-₹15L has 20%; and above ₹15L has 30%. With the enhanced Standard Deduction of ₹75,000 and Section 87A rebate, salaried employees earning up to ₹7.75 Lakhs pay ZERO tax under the New Regime.",
    "deepDiveHi": "बजट 2024 की नई कर व्यवस्था में ₹75,000 की स्टैंडर्ड डिडक्शन और धारा 87A रिबेट के कारण ₹7.75 लाख तक वेतन पाने वालों को शून्य टैक्स देना पड़ता है।",
    "deepDiveMr": "नवीन पद्धतीनुसार ₹७५,००० स्टँडर्ड डिडक्शन आणि ८७ए रिबेटमुळे ₹७.७५ लाखांपर्यंत पगार असणाऱ्यांना एक रुपयाही कर भरावा लागत नाही.",
    "example": {
      "scenario": "A salaried employee with ₹7,50,000 annual CTC opts for the New Tax Regime.",
      "scenarioHi": "₹7.5 लाख सालाना वेतन पर नई कर व्यवस्था चुनना।",
      "scenarioMr": "वार्षिक ₹७.५ लाख पगारावर नवीन कर पद्धतीची निवड करणे.",
      "math": "Gross: ₹7,50,000 - Standard Deduction: ₹75,000 = Taxable Income ₹6,75,000. Full tax rebate under Sec 87A → Total Tax = ₹0."
    },
    "rememberThis": "If your total investments and deductions (80C ₹1.5L + HRA + 80D health ₹25k) exceed ~₹3.75 Lakhs, only then does the Old Tax Regime usually beat the New Regime.",
    "rememberThisHi": "यदि आपकी कुल छूट (80C, HRA, 80D) ₹3.75 लाख से अधिक है, तभी पुरानी कर व्यवस्था फायदेमंद होती है।",
    "rememberThisMr": "जर तुमच्याकडे ८०सी, घरभाडे आणि आरोग्य विम्याची मिळून ₹३.७५ लाखांपेक्षा जास्त वजावट असेल, तरच जुनी पद्धत फायद्याची ठरते.",
    "commonMistake": "Locking away ₹1.5 Lakhs into 5-year illiquid tax-saving instruments purely for 80C under the New Regime where 80C is completely invalid.",
    "commonMistakeHi": "नई कर व्यवस्था चुनकर भी 80C की छूट पाने के चक्कर में पैसे 5 साल के लिए लॉक कर देना।",
    "commonMistakeMr": "नवीन कर पद्धत निवडलेली असतानाही ८०सी खाली विनाकारण ५ वर्षांसाठी पैसे गुंतवून ठेवणे.",
    "mythVsReality": {
      "myth": "Entering a higher tax slab (e.g. from 10% to 15%) means your entire income is now taxed at 15%.",
      "reality": "India uses progressive marginal taxation. Only the incremental income above each slab threshold is taxed at the higher rate.",
      "mythHi": "ऊपरी स्लैब में जाने पर आपकी पूरी कमाई पर उच्च दर से टैक्स लगता है।",
      "realityHi": "भारत में प्रोग्रेसिव टैक्स है; केवल स्लैब से ऊपर वाली अतिरिक्त राशि पर ही उच्च दर से टैक्स लगता है।",
      "mythMr": "पुढच्या स्लॅबमध्ये गेल्यावर संपूर्ण उत्पन्नावर जास्त दराने कर लागतो.",
      "realityMr": "भारतात टप्प्याटप्प्याने कर लागतो; केवळ मर्यादेच्या वर गेलेल्या रकमेवरच जास्त दराने कर द्यावा लागतो."
    },
    "flashcards": [
      {
        "front": "What is the Standard Deduction for salaried taxpayers under the New Tax Regime in Budget 2024?",
        "back": "₹75,000 per financial year (increased from ₹50,000).",
        "frontHi": "बजट 2024 में नई कर व्यवस्था के तहत वेतनभोगियों के लिए स्टैंडर्ड डिडक्शन कितनी है?",
        "backHi": "₹75,000 प्रति वित्तीय वर्ष (पहले यह ₹50,000 थी)।",
        "frontMr": "२०२४ च्या अर्थसंकल्पात नवीन कर पद्धतीखाली स्टँडर्ड डिडक्शन किती झाली आहे?",
        "backMr": "दरवर्षी ₹७५,००० (पूर्वी ही ₹५०,००० होती)."
      },
      {
        "front": "What is the effective tax-free income limit for salaried employees under the New Regime?",
        "back": "₹7.75 Lakhs (₹75,000 standard deduction + ₹7,00,000 rebate under Section 87A).",
        "frontHi": "नई कर व्यवस्था में नौकरीपेशा लोगों के लिए कर-मुक्त आय की प्रभावी सीमा क्या है?",
        "backHi": "₹7.75 लाख (₹75,000 स्टैंडर्ड डिडक्शन + धारा 87A के तहत ₹7 लाख पर शून्य टैक्स)।",
        "frontMr": "नवीन पद्धतीत पगारदारांसाठी करमुक्त उत्पन्नाची खरी मर्यादा किती आहे?",
        "backMr": "₹७.७५ लाख (₹७५,००० डिडक्शन + ८७ए रिबेट मिळून)."
      }
    ],
    "quiz": {
      "question": "Which of the following deductions is permissible under the New Tax Regime?",
      "questionHi": "नई कर व्यवस्था (New Tax Regime) के तहत निम्नलिखित में से किस कटौती की अनुमति है?",
      "questionMr": "नवीन कर पद्धतीमध्ये खालीलपैकी कोणत्या वजावटीचा लाभ घेता येतो?",
      "options": [
        "Section 80C (PPF, ELSS, Life Insurance up to ₹1.5L)",
        "Section 80D (Health Insurance Premium)",
        "Standard Deduction for Salaried Employees (₹75,000)",
        "House Rent Allowance (HRA) exemption"
      ],
      "optionsHi": [
        "धारा 80C (पीपीएफ, ईएलएसएस)",
        "धारा 80D (स्वास्थ्य बीमा)",
        "वेतनभोगियों के लिए ₹75,000 स्टैंडर्ड डिडक्शन",
        "हाउस रेंट अलाउंस (HRA) छूट"
      ],
      "optionsMr": [
        "कलम ८०सी (पीपीएफ, शेअर्स)",
        "कलम ८०डी (आरोग्य विमा)",
        "पगारदारांसाठी ₹७५,००० स्टँडर्ड डिडक्शन",
        "घरभाडे भत्ता सवलत (HRA)"
      ],
      "correctIndex": 2,
      "explanation": "The New Tax Regime disallows 80C, 80D, and HRA, but permits the flat ₹75,000 Standard Deduction for salaried employees.",
      "explanationHi": "नई व्यवस्था में 80C, 80D और HRA बंद हैं, लेकिन ₹75,000 की फ्लैट स्टैंडर्ड डिडक्शन मिलती है।",
      "explanationMr": "नवीन कर पद्धतीत ८०सी आणि घरभाडे भत्ता नसतो, परंतु ₹७५,००० ची सरसकट स्टँडर्ड डिडक्शन मिळते."
    },
    "youtubeVideoId": "f0g7h9j1r_g",
    "learnMoreQuery": "new vs old tax regime calculation budget 2024 india slabs",
    "hasCalculator": false,
    "relatedSlugs": [
      "form-16",
      "tds",
      "ctc"
    ]
  },
  {
    "slug": "emi",
    "name": "EMI (Equated Monthly Installment)",
    "nameHi": "ईएमआई (समान मासिक किश्त)",
    "nameMr": "ईएमआय (समान मासिक हप्ता)",
    "category": "Credit",
    "difficulty": "Beginner",
    "readTime": "3 min read",
    "readTimeHi": "3 मिनट पठन",
    "readTimeMr": "3 मिनिटे वाचन",
    "icon": "💳",
    "tagline": "The fixed monthly payment combining principal and interest that retires debt over time.",
    "taglineHi": "मूलधन और ब्याज को मिलाकर चुकाई जाने वाली तय मासिक किश्त।",
    "taglineMr": "मुद्दल आणि व्याज मिळून दरमहा फेडावा लागणारा कर्जाचा ठरलेला हप्ता.",
    "simpleExplanation": "An EMI is a fixed monetary amount paid by a borrower to a bank or financial institution on a specific date each month until a loan is paid off. Each payment covers both interest and a portion of the principal.",
    "simpleExplanationHi": "ईएमआई वह निश्चित मासिक राशि है जो कर्जदार द्वारा हर महीने बैंक को लोन चुकाने के लिए दी जाती है। इसमें मूलधन और ब्याज दोनों शामिल होते हैं।",
    "simpleExplanationMr": "ईएमआय म्हणजे कर्जाची परतफेड करण्यासाठी दरमहा बँकेला दिली जाणारी ठरलेली रक्कम, ज्यात मुद्दल आणि व्याज दोन्ही असते.",
    "deepDive": "In reducing-balance loan amortization schedules, your early monthly EMIs are dominated by interest charges (up to 70-80% in 20-year home loans), while principal repayment is minuscule. Only in later years does the ratio reverse. Making small additional principal prepayments in the first 5 years drastically cuts loan tenure and saves lakhs in interest.",
    "deepDiveHi": "होम लोन के शुरुआती सालों में आपकी ईएमआई का 70-80% हिस्सा केवल ब्याज में जाता है। शुरुआती 5 सालों में थोड़ा सा अतिरिक्त मूलधन चुकाने से लाखों का ब्याज बचता है।",
    "deepDiveMr": "गृहकर्जाच्या सुरुवातीच्या वर्षांत ईएमआयमधील ७०-८०% रक्कम केवळ व्याजात जाते. सुरुवातीच्या काळात जादा मुद्दल फेडल्यास लाखोंचे व्याज वाचते.",
    "example": {
      "scenario": "Personal loan of ₹5,00,000 for 3 years at 14% annual interest.",
      "scenarioHi": "₹5 लाख का पर्सनल लोन 3 साल के लिए 14% ब्याज पर।",
      "scenarioMr": "₹५ लाख वैयक्तिक कर्ज ३ वर्षांसाठी १४% व्याजाने.",
      "math": "Monthly EMI: ₹17,089 | Total Paid: ₹6,15,190 | Total Interest Cost: ₹1,15,190 (23% extra over principal)."
    },
    "rememberThis": "Zero-cost EMIs are never truly zero cost. Retailers bake interest costs into the upfront product price or charge non-refundable processing fees and 18% GST.",
    "rememberThisHi": "नो-कॉस्ट ईएमआई कभी पूरी तरह मुफ्त नहीं होती; इसका ब्याज या प्रोसेसिंग फीस पहले से उत्पाद की कीमत में जोड़ दी जाती है।",
    "rememberThisMr": "नो-कॉस्ट ईएमआय कधीही मोफत नसतो; त्याचा खर्च वस्तूच्या किंमतीत किंवा १८% जीएसटी व प्रोसेसिंग फीमध्ये लपवलेला असतो.",
    "commonMistake": "Taking on multiple gadget and lifestyle EMIs that exceed 40% of your net monthly in-hand salary.",
    "commonMistakeHi": "गैजेट्स और लाइफस्टाइल पर इतनी ईएमआई ले लेना जो सैलरी के 40% से ज्यादा हो जाए।",
    "commonMistakeMr": "पगाराच्या ४०% पेक्षा जास्त रक्कम केवळ मोबाईल व इतर वस्तूंच्या हप्त्यांमध्ये अडकवणे.",
    "mythVsReality": {
      "myth": "Zero-Cost EMI means the bank is lending money out of charity without interest.",
      "reality": "The merchant offers a discount equal to the interest charge, but the bank levies 18% GST on that interest component which you pay out of pocket.",
      "mythHi": "नो-कॉस्ट ईएमआई का मतलब बैंक बिना किसी ब्याज के दान कर रहा है।",
      "realityHi": "दुकानदार ब्याज के बराबर डिस्काउंट देता है लेकिन बैंक उस ब्याज पर 18% जीएसटी अलग से वसूलता है।",
      "mythMr": "नो-कॉस्ट ईएमआय म्हणजे बँक शून्य नफ्यावर कर्ज देते.",
      "realityMr": "विक्रेता व्याजाएवढी सवलत देतो, परंतु बँक त्या व्याजावर १८% जीएसटी ग्राहकाकडूनच वसूल करते."
    },
    "flashcards": [
      {
        "front": "What happens to the interest-to-principal ratio as a loan matures?",
        "back": "Early EMIs consist mostly of interest; as the principal balance reduces over the years, later EMIs consist mostly of principal repayment.",
        "frontHi": "लोन के शुरुआती वर्षों में ईएमआई में ब्याज और मूलधन का क्या अनुपात होता है?",
        "backHi": "शुरुआती किश्तों में अधिकांश हिस्सा ब्याज होता है; अंतिम वर्षों में अधिकांश हिस्सा मूलधन होता है।",
        "frontMr": "कर्जाच्या सुरुवातीला ईएमआयमध्ये व्याजाचे प्रमाण कसे असते?",
        "backMr": "सुरुवातीच्या हप्त्यांमध्ये व्याजाचा वाटा जास्त असतो, तर नंतरच्या हप्त्यांमध्ये मुद्दलाचा वाटा वाढतो."
      },
      {
        "front": "What is the safe Debt-to-Income (DTI) ratio limit recommended by financial planners?",
        "back": "Total monthly EMIs across all loans should not exceed 35% to 40% of your net take-home salary.",
        "frontHi": "वित्तीय सलाहकारों के अनुसार कुल ईएमआई सैलरी के कितने प्रतिशत से अधिक नहीं होनी चाहिए?",
        "backHi": "नेट इन-हैंड सैलरी के 35% से 40% से अधिक नहीं।",
        "frontMr": "पगाराच्या किती टक्क्यांपेक्षा जास्त कर्जाचे हप्ते नसावेत?",
        "backMr": "हातात येणाऱ्या निव्वळ पगाराच्या ३५% ते ४०% पेक्षा जास्त हप्ते असू नयेत."
      }
    ],
    "quiz": {
      "question": "What is the most effective mathematical strategy to drastically reduce the total interest paid on a 20-year home loan?",
      "questionHi": "20 साल के होम लोन पर कुल ब्याज को भारी मात्रा में कम करने की सबसे प्रभावी रणनीति क्या है?",
      "questionMr": "२० वर्षांच्या गृहकर्जावरील व्याज वाचवण्याचा सर्वात प्रभावी मार्ग कोणता?",
      "options": [
        "Delaying loan EMI payments by 15 days",
        "Making small periodic principal prepayments in the first 5 years",
        "Increasing your credit card spending",
        "Opting for a personal loan to pay EMIs"
      ],
      "optionsHi": [
        "ईएमआई 15 दिन देरी से भरना",
        "शुरुआती 5 वर्षों में नियमित रूप से थोड़ा अतिरिक्त मूलधन चुकाना",
        "क्रेडिट कार्ड का खर्च बढ़ाना",
        "ईएमआई भरने के लिए नया पर्सनल लोन लेना"
      ],
      "optionsMr": [
        "हप्ता १५ दिवस उशिरा भरणे",
        "सुरुवातीच्या ५ वर्षांत वेळोवेळी अतिरिक्त मुद्दल परतफेड करणे",
        "क्रेडिट कार्डचा वापर वाढवणे",
        "हप्ता भरण्यासाठी दुसरे कर्ज काढणे"
      ],
      "correctIndex": 1,
      "explanation": "Prepaying principal in the early years reduces the compounding base on which future interest is calculated, saving years of tenure and lakhs in cash.",
      "explanationHi": "शुरुआती वर्षों में थोड़ा भी अतिरिक्त मूलधन चुकाने से लोन का समय कई साल घट जाता है और लाखों का ब्याज बचता है।",
      "explanationMr": "सुरुवातीच्या वर्षांत मुद्दल कमी केल्यास पुढील संपूर्ण व्याजाचा भार कमी होऊन कर्जाची मुदत बरीच वर्षे घटते."
    },
    "youtubeVideoId": "HjW0Uq7a8qY",
    "learnMoreQuery": "EMI calculation reducing balance method amortization",
    "hasCalculator": true,
    "calculatorType": "emi",
    "relatedSlugs": [
      "credit-score",
      "emergency-fund",
      "budgeting"
    ]
  },
  {
    "slug": "equity",
    "name": "Direct Equity & Stocks",
    "nameHi": "इक्विटी और शेयर (स्टॉक्स)",
    "nameMr": "इक्विटी आणि शेअर्स (स्टॉक मार्केट)",
    "category": "Investing",
    "difficulty": "Intermediate",
    "readTime": "4 min read",
    "readTimeHi": "4 मिनट पठन",
    "readTimeMr": "4 मिनिटे वाचन",
    "icon": "📊",
    "tagline": "Owning fractional ownership stakes in publicly traded corporations to build long-term wealth.",
    "taglineHi": "कंपनियों में आंशिक स्वामित्व खरीदना और उनके विकास का सीधा भागीदार बनना।",
    "taglineMr": "कंपन्यांमध्ये थेट भागीदारी घेऊन त्यांच्या वाढीसोबत संपत्ती निर्माण करणे.",
    "simpleExplanation": "Buying a company’s stock means purchasing fractional legal ownership in that corporation. As the business expands revenues and profits, your equity appreciates in value, and you may receive periodic dividend payouts directly into your bank.",
    "simpleExplanationHi": "शेयर खरीदने का अर्थ है उस कंपनी में आंशिक मालिक बनना। जब कंपनी मुनाफा कमाती है तो शेयर का भाव बढ़ता है और डिविडेंड भी मिलता है।",
    "simpleExplanationMr": "शेअर्स खरेदी करणे म्हणजे त्या कंपनीमध्ये कायदेशीर मालकी मिळवणे. कंपनीचा नफा वाढल्यास शेअर्सची किंमत वाढते आणि लाभांश मिळतो.",
    "deepDive": "Direct equity investing requires a Demat account (held via CDSL or NSDL) and a Trading account linked to a SEBI-registered broker. Unlike mutual funds where professionals manage risk, direct stock picking demands thorough fundamental analysis (reading annual reports, P/E ratios, ROE, cash flows, and competitive moats). Avoid intraday trading and F&O derivatives where 93% of retail traders lose money.",
    "deepDiveHi": "शेयर खरीदने के लिए डीमैट और ट्रेडिंग खाते की आवश्यकता होती है। सीधे शेयर खरीदने के लिए कंपनी की बैलेंस शीट, पी/ई रेशियो और मुनाफे का विश्लेषण जरूरी है। इंट्राडे और एफएंडओ से बचें।",
    "deepDiveMr": "थेट शेअर्स घेण्यासाठी डिमॅट आणि ट्रेडिंग खाते लागते. यासाठी कंपनीचा बॅलन्स शीट, नफा आणि कारभाराचा अभ्यास लागतो. ९३% लोक इंट्राडे व फ्युचर्समध्ये पैसे गमावतात.",
    "example": {
      "scenario": "Buying 100 shares of an FMCG giant at ₹2,000 per share with a 10-year horizon.",
      "scenarioHi": "₹2,000 की दर से किसी बड़ी कंपनी के 100 शेयर 10 साल के लिए खरीदना।",
      "scenarioMr": "एका चांगल्या कंपनीचे १०० शेअर्स ₹२,००० भावाने १० वर्षांसाठी खरेदी करणे.",
      "math": "Investment: ₹2,00,000. If business compounds at 15% CAGR, portfolio value in 10 years reaches ~₹8,09,000 + accumulated dividends."
    },
    "rememberThis": "In the short run, the stock market is a voting machine (driven by sentiment); in the long run, it is a weighing machine (driven by business earnings).",
    "rememberThisHi": "शॉर्ट-टर्म में शेयर बाजार भावनाओं पर चलता है, लेकिन लंबी अवधि में यह केवल कंपनी के वास्तविक मुनाफे और मजबूती पर चलता है।",
    "rememberThisMr": "अल्पकाळात बाजार अफवांवर चालतो, पण दीर्घकाळात तो कंपनीच्या प्रत्यक्ष नफ्यावरच चालतो.",
    "commonMistake": "Chasing anonymous Telegram, WhatsApp, or YouTube \"multibagger penny stock tips\" promising 500% returns in 3 months.",
    "commonMistakeHi": "टेलीग्राम या यूट्यूब के अनजान \"मल्टीबैगर पेनी स्टॉक\" के चक्कर में फंसकर पूंजी गंवा देना।",
    "commonMistakeMr": "टेलिग्राम किंवा व्हॉट्सॲपवरील संशयास्पद टिप्सवर विश्वास ठेवून कष्टाचे पैसे गमावणे.",
    "mythVsReality": {
      "myth": "Stock market investing is pure gambling and speculative luck.",
      "reality": "Speculative day trading is gambling; long-term investing in high-quality, cash-flow-generating businesses backed by thorough research is disciplined capitalism.",
      "mythHi": "शेयर बाजार पूरी तरह जुआ और सट्टेबाजी है।",
      "realityHi": "बिना सोचे ट्रेडिंग करना जुआ है, लेकिन मजबूत और मुनाफे वाली कंपनियों में लंबे समय के लिए निवेश करना वास्तविक संपत्ति निर्माण है।",
      "mythMr": "शेअर बाजार म्हणजे निव्वळ जुगार आहे.",
      "realityMr": "अफवांवर ट्रेडिंग करणे जुगार आहे, पण चांगल्या कंपन्यांचा अभ्यास करून दीर्घकालीन गुंतवणूक करणे हा संपत्ती वाढवण्याचा उत्तम मार्ग आहे."
    },
    "flashcards": [
      {
        "front": "What is the SEBI warning statistic regarding retail Futures & Options (F&O) traders in India?",
        "back": "Over 93% of individual retail traders in F&O incurred average net losses of ₹2 Lakhs each over FY22-FY24.",
        "frontHi": "सेबी की रिपोर्ट के अनुसार एफएंडओ (F&O) में कितने प्रतिशत छोटे निवेशकों को नुकसान होता है?",
        "backHi": "93% से अधिक छोटे ट्रेडर्स को भारी नुकसान होता है।",
        "frontMr": "सेबीच्या अहवालानुसार फ्युचर्स अँड ऑप्शन्स (F&O) मध्ये किती लोकांना तोटा होतो?",
        "backMr": "९३% पेक्षा जास्त सामान्य लोकांना F&O मध्ये सरासरी २ लाखांपेक्षा जास्त तोटा होतो."
      },
      {
        "front": "What is a Demat Account?",
        "back": "A dematerialized electronic repository that holds your shares and bonds safely under your PAN, operated by CDSL or NSDL.",
        "frontHi": "डीमैट खाता (Demat Account) क्या है?",
        "backHi": "एक इलेक्ट्रॉनिक खाता जिसमें आपके शेयर और बॉन्ड सुरक्षित रूप से डिजिटल रूप में रखे जाते हैं।",
        "frontMr": "डिमॅट खाते म्हणजे काय?",
        "backMr": "शेअर्स आणि रोखे सुरक्षितपणे इलेक्ट्रॉनिक स्वरूपात साठवणारे अधिकृत खाते."
      }
    ],
    "quiz": {
      "question": "What financial metric compares a company’s current share price to its per-share annual earnings?",
      "questionHi": "कौन सा वित्तीय अनुपात कंपनी के शेयर मूल्य की तुलना उसकी प्रति-शेयर वार्षिक कमाई से करता है?",
      "questionMr": "कंपनीच्या शेअर भावाची तिच्या प्रति-शेअर नफ्याशी तुलना करणारा गुणोत्तर कोणता?",
      "options": [
        "Debt to Equity Ratio",
        "Price-to-Earnings (P/E) Ratio",
        "Current Ratio",
        "Gross Profit Margin"
      ],
      "optionsHi": [
        "ऋण से इक्विटी अनुपात",
        "प्राइस-टू-अर्निंग (P/E) रेशियो",
        "करंट रेशियो",
        "सकल लाभ मार्जिन"
      ],
      "optionsMr": [
        "कर्ज-इक्विटी प्रमाण",
        "किंमत-नफा गुणोत्तर (P/E Ratio)",
        "चालू प्रमाण",
        "एकूण नफा मार्जिन"
      ],
      "correctIndex": 1,
      "explanation": "The P/E ratio measures how much investors are willing to pay for each ₹1 of annual earnings generated by the company.",
      "explanationHi": "पी/ई रेशियो यह दर्शाता है कि निवेशक कंपनी के ₹1 के मुनाफे के लिए कितना मूल्य चुकाने को तैयार हैं।",
      "explanationMr": "पी/ई (P/E) गुणोत्तर कंपनीच्या १ रुपयाच्या नफ्यासाठी बाजारात किती किंमत मोजली जात आहे हे दाखवते."
    },
    "youtubeVideoId": "D3hP6L8tZ-g",
    "learnMoreQuery": "how stock market works equity investing india basics",
    "hasCalculator": false,
    "relatedSlugs": [
      "mutual-funds",
      "sip",
      "capital-gains"
    ]
  },
  {
    "slug": "esops",
    "name": "ESOPs (Employee Stock Options)",
    "nameHi": "ईएसओपी (कर्मचारी स्टॉक विकल्प)",
    "nameMr": "ईएसओपी (कर्मचाऱ्यांसाठी शेअर्सचा पर्याय)",
    "category": "Income",
    "difficulty": "Intermediate",
    "readTime": "4 min read",
    "readTimeHi": "4 मिनट पठन",
    "readTimeMr": "4 मिनिटे वाचन",
    "icon": "🏢",
    "tagline": "The contractual right to purchase your company’s shares at a discounted exercise price.",
    "taglineHi": "कंपनी के शेयर पूर्व-निर्धारित रियायती मूल्य पर खरीदने का वैधानिक अधिकार।",
    "taglineMr": "कंपनीचे शेअर्स ठरलेल्या सवलतीच्या दरात खरेदी करण्याचा कायदेशीर अधिकार.",
    "simpleExplanation": "ESOPs give employees the option to buy company shares after fulfilling a vesting schedule (typically 4 years with a 1-year cliff). When startup companies undergo an IPO or acquisition, ESOPs can yield life-changing wealth, but unlisted shares carry liquidity risk.",
    "simpleExplanationHi": "ईएसओपी कर्मचारियों को एक निश्चित समय (वेस्टिंग पीरियड) के बाद कंपनी के शेयर रियायती दर पर खरीदने का अधिकार देते हैं।",
    "simpleExplanationMr": "ईएसओपी द्वारे कर्मचाऱ्यांना कंपनीमध्ये विशिष्ट कालावधीनंतर सवलतीच्या दरात शेअर्स मिळतात.",
    "deepDive": "ESOP lifecycle has 4 stages: Grant (initial grant letter), Vesting (earning the right over time, e.g. 25% each year), Exercise (converting options to shares by paying the strike price), and Sale (liquidating during a buyback, secondary sale, or IPO). Taxation occurs at two points: Perquisite Tax at Exercise (FMV minus strike price added to salary) and Capital Gains Tax at Sale.",
    "deepDiveHi": "ईएसओपी के 4 चरण होते हैं: ग्रांट, वेस्टिंग, एक्सरसाइज और सेल। भारत में इस पर दो बार टैक्स लगता है: एक्सरसाइज करते समय परक्विजिट टैक्स और शेयर बेचते समय कैपिटल गेन्स टैक्स।",
    "deepDiveMr": "ईएसओपीचे ४ टप्पे असतात: ग्रांट, वेस्टिंग, खरेदी (Exercise) आणि विक्री. यावर खरेदी करताना पगारानुसार आणि विक्री करताना कॅपिटल गेन्स टॅक्स लागतो.",
    "example": {
      "scenario": "Granted 1,000 options at ₹50 exercise price. After 4 years, company lists on NSE at ₹650 per share.",
      "scenarioHi": "₹50 की दर पर 1,000 विकल्प मिले। 4 साल बाद कंपनी ₹650 पर लिस्ट होती है।",
      "scenarioMr": "₹५० दराने १,००० शेअर्सचा पर्याय मिळाला. ४ वर्षांनंतर कंपनी शेअर बाजारात ₹६५० ला लिस्ट झाली.",
      "math": "Cost to Exercise: ₹50,000 → Value at Listing: ₹6,50,000 → Pre-tax Gain: ₹6,00,000."
    },
    "rememberThis": "Options are not shares until you \"exercise\" them. Exercising triggers perquisite income tax in India even before you sell the stock.",
    "rememberThisHi": "ईएसओपी तब तक शेयर नहीं बनते जब तक आप उन्हें एक्सरसाइज न करें। एक्सरसाइज करते ही टैक्स देनदारी बनती है।",
    "rememberThisMr": "शेअर्स खरेदी करेपर्यंत (Exercise) तो केवळ एक पर्याय असतो; खरेदी केल्यावर कर लागू होतो.",
    "commonMistake": "Accepting a massive 50% salary reduction in exchange for early-stage startup ESOPs without auditing valuation or dilution clauses.",
    "commonMistakeHi": "शुरुआती स्टार्टअप में बिना सोचे-समझे बहुत कम वेतन पर ईएसओपी स्वीकार कर लेना।",
    "commonMistakeMr": "स्टार्टअपच्या अटी व मूल्य न तपासता केवळ ईएसओपीसाठी कमी पगारावर काम करणे.",
    "mythVsReality": {
      "myth": "All startup ESOPs make employees millionaires.",
      "reality": "Over 85% of startups fail or never create a liquidity event. Treat ESOPs as high-upside bonuses, not guaranteed cash.",
      "mythHi": "सभी स्टार्टअप ईएसओपी कर्मचारियों को करोड़पति बना देते हैं।",
      "realityHi": "अधिकांश स्टार्टअप लिक्विडिटी इवेंट तक नहीं पहुंच पाते, इसलिए इसे बोनस समझें, तय वेतन नहीं।",
      "mythMr": "सर्व ईएसओपी कर्मचाऱ्यांना करोडपती बनवतात.",
      "realityMr": "अनेक स्टार्टअप्सचे शेअर्स विकता येत नाहीत; त्यामुळे हा एक संभाव्य बोनस मानला पाहिजे."
    },
    "flashcards": [
      {
        "front": "What is a \"Cliff\" period in ESOP vesting?",
        "back": "The minimum duration (typically 1 full year) an employee must remain with the company before any stock options vest.",
        "frontHi": "ईएसओपी में \"क्लिफ पीरियड\" (Cliff Period) क्या है?",
        "backHi": "वह न्यूनतम समय (आमतौर पर 1 साल) जिसके पूरा होने से पहले कोई भी शेयर विकल्प नहीं मिलता।",
        "frontMr": "ईएसओपीमध्ये \"क्लिफ पिरियड\" म्हणजे काय?",
        "backMr": "किमान कालावधी (साधारण १ वर्ष) ज्यानंतरच कर्मचाऱ्याला शेअर्स मिळण्याचा अधिकार सुरू होतो."
      },
      {
        "front": "At what two stages are ESOPs taxed in India?",
        "back": "1. At Exercise (as perquisite income tax on FMV minus strike price); 2. At Sale (as Capital Gains tax on profit).",
        "frontHi": "भारत में ईएसओपी पर किन दो चरणों में टैक्स लगता है?",
        "backHi": "1. शेयर एक्सरसाइज करते समय (परक्विजिट टैक्स); 2. शेयर बेचते समय (कैपिटल गेन्स टैक्स)।",
        "frontMr": "भारतात ईएसओपीवर कोणत्या दोन टप्प्यांत कर लागतो?",
        "backMr": "१. शेअर्स खरेदी करताना (परक्विझिट टॅक्स); २. शेअर्स विकून नफा मिळवताना (कॅपिटल गेन्स टॅक्स)."
      }
    ],
    "quiz": {
      "question": "What is the \"Exercise Price\" (or Strike Price) of an ESOP?",
      "questionHi": "ईएसओपी का \"एक्सरसाइज प्राइस\" (स्ट्राइक प्राइस) क्या होता है?",
      "questionMr": "ईएसओपीमध्ये \"स्ट्राइक प्राईस\" (Exercise Price) म्हणजे काय?",
      "options": [
        "The price at which the company sells shares in an IPO",
        "The predetermined fixed price at which the employee buys the shares regardless of current valuation",
        "The tax deducted by the Income Tax Department",
        "The annual dividend payout rate"
      ],
      "optionsHi": [
        "आईपीओ में शेयर का मूल्य",
        "वह पूर्व-निर्धारित तय मूल्य जिस पर कर्मचारी को शेयर खरीदने का अधिकार मिलता है",
        "आयकर विभाग द्वारा काटा गया टैक्स",
        "वार्षिक लाभांश की दर"
      ],
      "optionsMr": [
        "आयपीओ मधील शेअरची किंमत",
        "कर्मचाऱ्याला ठरवून दिलेली सवलतीची पूर्वनिर्धारित खरेदी किंमत",
        "आयकर विभागाने कापलेला कर",
        "वार्षिक लाभांशाचा दर"
      ],
      "correctIndex": 1,
      "explanation": "The strike price is fixed upfront in the grant agreement, allowing employees to purchase shares at a steep discount to future market values.",
      "explanationHi": "स्ट्राइक प्राइस वह तय मूल्य है जिस पर कर्मचारी भविष्य में कंपनी के शेयर खरीद सकता है।",
      "explanationMr": "स्ट्राइक प्राईस ही पूर्वनिर्धारित किंमत असते ज्या भावात कर्मचाऱ्याला शेअर्स खरेदी करण्याचा हक्क असतो."
    },
    "youtubeVideoId": "P2v7_6zM9_g",
    "learnMoreQuery": "ESOPs explained vesting exercise taxation india",
    "hasCalculator": false,
    "relatedSlugs": [
      "equity",
      "ctc",
      "capital-gains"
    ]
  },
  {
    "slug": "budgeting",
    "name": "Budgeting & The 50-30-20 Rule",
    "nameHi": "बजट और 50-30-20 नियम",
    "nameMr": "बजेट आणि 50-30-20 चा नियम",
    "category": "Basics",
    "difficulty": "Beginner",
    "readTime": "3 min read",
    "readTimeHi": "3 मिनट पठन",
    "readTimeMr": "3 मिनिटे वाचन",
    "icon": "📒",
    "tagline": "Telling your money where to go before wondering where it mysteriously disappeared.",
    "taglineHi": "अपने पैसे को पहले से दिशा देना ताकि बाद में यह न सोचना पड़े कि वह कहाँ चला गया।",
    "taglineMr": "पैसे कुठे खर्च झाले हे शोधण्यापेक्षा ते कुठे खर्च करायचे हे आधीच ठरवणे.",
    "simpleExplanation": "The 50-30-20 rule is a practical budgeting framework: 50% of monthly net income goes to Needs (rent, groceries, basic bills), 30% goes to Wants (dining out, travel, entertainment), and 20% is strictly allocated to Savings & Investments.",
    "simpleExplanationHi": "50-30-20 का नियम बजट बनाने का आसान तरीका है: 50% आवश्यक जरूरतों पर, 30% इच्छाओं पर, और 20% अनिवार्य बचत और निवेश में जाना चाहिए।",
    "simpleExplanationMr": "50-30-20 नियम: 50% गरजेच्या गोष्टींवर, 30% मनोरंजनावर आणि 20% थेट बचतीमध्ये गेले पाहिजेत.",
    "deepDive": "Elizabeth Warren popularized the 50-30-20 rule in \"All Your Worth\". The core behavioral insight is \"Pay Yourself First\": automate your 20% transfer to mutual funds and emergency deposits on the 1st of the month, so you can spend the remaining 80% guilt-free without micro-managing ₹10 tea receipts.",
    "deepDiveHi": "इस नियम की सबसे बड़ी खूबी है \"पहले खुद को भुगतान करें\"। सैलरी के पहले दिन ही 20% बचत खाते या एसआईपी में ट्रांसफर कर दें, फिर बाकी पैसे शांति से खर्च करें।",
    "deepDiveMr": "या नियमाचे मूळ तत्त्व म्हणजे \"आधी स्वतःला द्या\". पगार होताच २०% रक्कम एसआयपी व बचतीत वळवा, मग उरलेले पैसे हक्काने खर्च करा.",
    "example": {
      "scenario": "With a net monthly take-home salary of ₹50,000.",
      "scenarioHi": "मासिक नेट इन-हैंड वेतन ₹50,000 होने पर।",
      "scenarioMr": "मासिक ₹50,000 पगार असल्यास.",
      "math": "Needs (50%): ₹25,000 | Wants (30%): ₹15,000 | Investments/Savings (20%): ₹10,000."
    },
    "rememberThis": "Save first, spend what is left — never spend first and hope to save whatever scraps remain at month-end.",
    "rememberThisHi": "पहले बचत करें, फिर बचे हुए पैसे खर्च करें; महीने के अंत में बचत की उम्मीद न रखें।",
    "rememberThisMr": "पगार झाल्यावर आधी बचत बाजूला काढा, नंतर उरलेले पैसे खर्च करा.",
    "commonMistake": "Treating food delivery subscriptions and high-end smartphone EMIs as mandatory \"Needs\" instead of discretionary \"Wants\".",
    "commonMistakeHi": "ऑनलाइन शॉपिंग और महंगे फोन की ईएमआई को जरूरी \"नीड्स\" मान लेना।",
    "commonMistakeMr": "मौजमजेच्या आणि ऑनलाइन खरेदीच्या खर्चाला मूलभूत गरज मानणे.",
    "mythVsReality": {
      "myth": "Budgeting requires tracking every single ₹10 tea expense on tedious spreadsheets.",
      "reality": "Automating your 20% savings on salary day leaves the remaining 80% free to spend without anxiety.",
      "mythHi": "बजट बनाने के लिए हर 10 रुपये की चाय का हिसाब रखना पड़ता है।",
      "realityHi": "सैलरी आते ही 20% ऑटोमैटिक निवेश कर दें, फिर बाकी पैसे शांति से खर्च करें।",
      "mythMr": "बजेट म्हणजे चहाच्या प्रत्येक १० रुपयांचा हिशोब ठेवणे.",
      "realityMr": "पगार होताच सुरुवातीलाच २०% बचत वेगळी केल्यास बाकी पैसे मोकळेपणाने खर्च करता येतात."
    },
    "flashcards": [
      {
        "front": "What are the three pillars of the 50-30-20 budgeting framework?",
        "back": "50% for Needs (survival), 30% for Wants (lifestyle), 20% for Savings & Debt repayment.",
        "frontHi": "50-30-20 बजट नियम के तीन स्तंभ क्या हैं?",
        "backHi": "50% जरूरतें (Needs), 30% इच्छाएं (Wants), और 20% बचत व निवेश (Savings)।",
        "frontMr": "५०-३०-२० बजेट नियमाचे तीन मुख्य भाग कोणते?",
        "backMr": "५०% गरजा (अन्न, घर), ३०% आवडीनिवडी (मनोरंजन) आणि २०% बचत व गुंतवणूक."
      },
      {
        "front": "What does \"Pay Yourself First\" mean?",
        "back": "Directing money to savings and investments the moment your salary arrives, rather than saving what is left at month-end.",
        "frontHi": "\"पहले खुद को भुगतान करें\" (Pay Yourself First) का क्या अर्थ है?",
        "backHi": "वेतन आते ही सबसे पहले बचत और निवेश की राशि अलग करना, न कि महीने के अंत में बचे पैसों की उम्मीद करना।",
        "frontMr": "\"आधी स्वतःला द्या\" या नियमाचा काय अर्थ आहे?",
        "backMr": "पगार जमा होताच आधी बचतीची रक्कम बाजूला काढणे, उरलेल्या पैशांतून नंतर खर्च करणे."
      }
    ],
    "quiz": {
      "question": "Under the 50-30-20 rule, which category does a luxury smartphone upgrade EMI belong to?",
      "questionHi": "50-30-20 नियम के तहत, एक महंगे स्मार्टफोन की ईएमआई किस श्रेणी में आती है?",
      "questionMr": "५०-३०-२० नियमानुसार नवीन महागड्या स्मार्टफोनचा हप्ता कोणत्या वर्गवारीत मोडतो?",
      "options": [
        "Needs (50%)",
        "Wants (30%)",
        "Savings (20%)",
        "Tax Exemptions"
      ],
      "optionsHi": [
        "जरूरतें / Needs (50%)",
        "इच्छाएं / Wants (30%)",
        "बचत / Savings (20%)",
        "टैक्स छूट"
      ],
      "optionsMr": [
        "मूलभूत गरजा (५०%)",
        "इच्छा व मनोरंजन (३०%)",
        "बचत (२०%)",
        "कर सवलत"
      ],
      "correctIndex": 1,
      "explanation": "A basic phone is a utility need, but upgrading to an expensive luxury smartphone is a discretionary lifestyle Want (30%).",
      "explanationHi": "साधारण फोन जरूरत हो सकता है, लेकिन महंगा फ्लैगशिप स्मार्टफोन लाइफस्टाइल की इच्छा (Wants 30%) है।",
      "explanationMr": "फोन असणे ही गरज असू शकते, परंतु महागडा फोन घेणे ही चैनीची इच्छा (Wants ३०%) मानली जाते."
    },
    "youtubeVideoId": "9C3z6gV2bF4",
    "learnMoreQuery": "50 30 20 budget rule for young earners india",
    "hasCalculator": false,
    "relatedSlugs": [
      "emergency-fund",
      "gross-vs-net",
      "sip"
    ]
  }
];
