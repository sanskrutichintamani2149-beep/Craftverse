// scripts/generateTerms.cjs
const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../src/data/termsData.ts');

const fileContent = `export interface Flashcard {
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
`;

console.log('Writing terms base...');
