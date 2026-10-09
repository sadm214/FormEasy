// app/data/portalData.ts

export type LangKey = 'en' | 'hi';

export interface PortalItem {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  itemType: 'JOB' | 'ADMIT' | 'RESULT' | 'DIRECT' | 'CERTIFICATE'; // सेवा का प्रकार ताकि समरी उसी हिसाब से खुले
  lastDate?: string;
  fee?: string;
  qualification?: string;
  applyLink?: string;
  notificationLink?: string;
  downloadUrl?: string; // डायरेक्ट डाउनलोड या एडमिट कार्ड/रिजल्ट लिंक के लिए
  description?: string;
  
  // फॉर्म/जॉब के लिए विस्तृत जानकारी
  startDate?: string;
  examDate?: string;
  ageLimit?: string;
  totalPosts?: string | number;
  eligibilityDetails?: string;
  categoryBreakdown?: {
    gen?: string | number;
    obc?: string | number;
    ews?: string | number;
    sc?: string | number;
    st?: string | number;
    total?: string | number;
  };
  howToFill?: string[];

  // एडमिट कार्ड या रिजल्ट के लिए आवश्यक क्रेडेंशियल्स की सूची
  requiredDetails?: string[];
}

export const translations = {
  en: {
    homeNav: "Home",
    jobsNav: "Latest Jobs",
    admitNav: "Admit Card",
    resultsNav: "Result",
    compAdmNav: "Admission",
    edistrictNav: "e-District",
    defenceNav: "Defence",
    transportNav: "Transport",
    acadAdmNav: "Academic",
    scholarshipNav: "Scholarships",
    searchPlaceholder: "Search jobs, admit cards, exams, certificates...",
    userLoginBtn: "Login / Register",
    shopkeeperBtn: "Partner Login",
    jobsHeader: "Latest Govt Jobs & Form Fillings",
    admitCardsHeader: "Admit Cards & Hall Tickets",
    resultsHeader: "Exam Results & Scorecards",
    compAdmHeader: "Competitive Exam Admissions",
    acadAdmHeader: "Academic College Admissions",
    edistrictHeader: "e-District Certificate Services",
    utilityHeader: "Power, Water & Solar Utilities",
    welfareHeader: "Social Welfare & Pension Schemes",
    financeHeader: "Health, Labor & Banking Services",
    agriHeader: "Agriculture & Skill India",
    defenceHeader: "Defence, Police & Paramilitary",
    scholarshipHeader: "National & State Scholarships",
    taxHeader: "Tax, PAN & GST Services",
    housingHeader: "Housing & Urban Development Schemes",
    legalHeader: "Legal, Affidavit & Name Change",
    insuranceHeader: "Insurance & Financial Loans",
    railwayHeader: "Railways & Travel Bookings",
  },
  hi: {
    homeNav: "होम",
    jobsNav: "लेटेस्ट जॉब्स",
    admitNav: "एडमिट कार्ड",
    resultsNav: "रिजल्ट",
    compAdmNav: "प्रवेश परीक्षा",
    edistrictNav: "ई-डिस्ट्रिक्ट",
    defenceNav: "रक्षा व पुलिस",
    transportNav: "परिवहन",
    acadAdmNav: "एकेडमिक",
    scholarshipNav: "स्कॉलरशिप",
    searchPlaceholder: "सरकारी नौकरियां, एडमिट कार्ड, फॉर्म खोजें...",
    userLoginBtn: "लॉगिन / रजिस्टर",
    shopkeeperBtn: "पार्टनर लॉगिन",
    jobsHeader: "नवीनतम सरकारी नौकरियां और फॉर्म",
    admitCardsHeader: "प्रवेश पत्र (Admit Cards)",
    resultsHeader: "परीक्षा परिणाम (Results)",
    compAdmHeader: "प्रतिकोर्गी प्रवेश परीक्षाएं",
    acadAdmHeader: "शैक्षणिक कॉलेज दाखिले",
    edistrictHeader: "ई-डिस्ट्रिक्ट प्रमाण पत्र सेवाएं",
    utilityHeader: "बिजली, पानी और सोलर सेवाएं",
    welfareHeader: "समाज कल्याण और पेंशन योजनाएं",
    financeHeader: "स्वास्थ्य, श्रम और बैंकिंग सेवाएं",
    agriHeader: "कृषि और कौशल विकास योजनाएं",
    defenceHeader: "सेना, पुलिस और अर्धसैनिक बल",
    scholarshipHeader: "राष्ट्रीय और राज्य छात्रवृत्तियां",
    taxHeader: "टैक्स, पैन और जीएसटी सेवाएं",
    housingHeader: "आवास और शहरी विकास योजनाएं",
    legalHeader: "कानूनी, शपथ पत्र और नाम परिवर्तन",
    insuranceHeader: "बीमा और वित्तीय ऋण सेवाएं",
    railwayHeader: "रेलवे और यात्रा बुकिंग सेवाएं",
  }
};

export const categoriesList = [
  { id: 'jobs', title: 'Latest Jobs / Form Fillings', titleHi: 'नवीनतम सरकारी भर्तियाँ', icon: '💼', count: '45+ Active' },
  { id: 'admit', title: 'Admit Cards & Hall Tickets', titleHi: 'प्रवेश पत्र व हॉल टिकट', icon: '🎫', count: '12 Available' },
  { id: 'results', title: 'Results & Scorecards', titleHi: 'परीक्षा परिणाम व स्कोरकार्ड', icon: '📊', count: '18 Declared' },
  { id: 'comp_adm', title: 'Competitive Admissions', titleHi: 'प्रवेश परीक्षाएँ (NEET/JEE)', icon: '📝', count: '8 Open' },
  { id: 'acad_adm', title: 'Academic Admissions', titleHi: 'स्कूल व कॉलेज दाखिले', icon: '🎓', count: '15 Active' },
  { id: 'edistrict', title: 'e-District Services', titleHi: 'आय, जाति व निवास प्रमाण पत्र', icon: '📜', count: '20+ Services' },
  { id: 'utility', title: 'Power & Solar Utilities', titleHi: 'बिजली बिल व सोलर कनेक्शन', icon: '⚡', count: 'Online Bill/App' },
  { id: 'welfare', title: 'Social Welfare & Pension', titleHi: 'वृद्धा/विधवा पेंशन योजनाएं', icon: '👵', count: 'Schemes Open' },
  { id: 'health', title: 'Health & Banking', titleHi: 'आयुष्मान कार्ड व ई-श्रम', icon: '🏦', count: 'Instant Service' },
  { id: 'agri', title: 'Agriculture & Skill India', titleHi: 'पीएम किसान व कौशल विकास', icon: '🌾', count: 'Farmer Portals' },
  { id: 'defence', title: 'Defence & Police', titleHi: 'सेना, पुलिस व अग्निवीर', icon: '🛡️', count: 'Recruitments' },
  { id: 'scholarship', title: 'National Scholarships', titleHi: 'छात्रवृत्ति ऑनलाइन फॉर्म', icon: '🏆', count: 'Pre/Post Matric' },
  { id: 'transport', title: 'Transport & Driving License', titleHi: 'ड्राइविंग लाइसेंस व वाहन सेवा', icon: '🚗', count: 'RTO Services' },
  { id: 'tax', title: 'Tax & GST Portals', titleHi: 'आईटीआर, पैन कार्ड व जीएसटी', icon: '📑', count: 'Financial' },
  { id: 'housing', title: 'Housing & Urban Schemes', titleHi: 'प्रधानमंत्री आवास योजना', icon: '🏠', count: 'Urban/Gramin' },
  { id: 'legal', title: 'Legal & Affidavit Services', titleHi: 'नाम परिवर्तन व मैरिज रजिस्ट्रेशन', icon: '⚖️', count: 'Affidavits' },
  { id: 'insurance', title: 'Insurance & Financial Loans', titleHi: 'प्रधानमंत्री बीमा व लोन योजना', icon: '💼', count: 'Schemes' },
  { id: 'railway', title: 'Railways & Travel Bookings', titleHi: 'पासपोर्ट सेवा व यात्रा बुकिंग', icon: '🚆', count: 'Travel Hub' },
];

export const liveJobs: PortalItem[] = [
  {
    id: 'job-1',
    title: 'BPSC TRE 4.0 Online Form 2026 for 33,320 Teacher Posts',
    titleHi: 'बिहार शिक्षक भर्ती (BPSC TRE 4.0) ऑनलाइन फॉर्म 2026 - 33,320 पद',
    category: 'Latest Jobs',
    itemType: 'JOB',
    startDate: '12 September 2026',
    lastDate: '10 October 2026',
    examDate: 'November 2026',
    fee: '₹750 (Gen/OBC) | ₹200 (SC/ST/Female)',
    ageLimit: '18 - 37 Years',
    totalPosts: '33,320 Posts',
    qualification: 'Bachelor/Master Degree with B.Ed & CTET/STET',
    applyLink: 'https://www.bpsc.bih.nic.in',
    notificationLink: 'https://www.bpsc.bih.nic.in',
    description: 'Bihar Public Service Commission teacher recruitment notification.',
    eligibilityDetails: 'Candidates must possess requisite professional qualifications along with passing marks in CTET/STET.',
    categoryBreakdown: {
      gen: '13,500',
      obc: '8,200',
      ews: '3,330',
      sc: '6,500',
      st: '1,790',
      total: '33,320'
    },
    howToFill: [
      'Complete One-Time Registration (OTR) on BPSC portal.',
      'Fill educational qualifications and category details.',
      'Pay application fee online and submit final form.'
    ]
  }
];

export const liveAdmitCards: PortalItem[] = [
  {
    id: 'admit-1',
    title: 'UPSC Civil Services Prelims Admit Card 2026',
    titleHi: 'यूपीएससी सिविल सेवा प्रीलिम्स एडमिट कार्ड 2026',
    category: 'Admit Cards',
    itemType: 'ADMIT',
    lastDate: 'Exam Date: May 2026',
    downloadUrl: 'https://upsc.gov.in',
    description: 'Download civil services prelims exam hall ticket.',
    requiredDetails: [
      'Registration ID / Roll Number',
      'Date of Birth (DD/MM/YYYY)',
      'Registered Mobile Number / Email OTP'
    ]
  }
];

export const liveResults: PortalItem[] = [
  {
    id: 'res-1',
    title: 'SSC CGL Tier-I Final Result & Marks 2026',
    titleHi: 'एसएससी सीजीएल टियर-I अंतिम परिणाम और अंक 2026',
    category: 'Results',
    itemType: 'RESULT',
    lastDate: 'Declared On: March 2026',
    downloadUrl: 'https://ssc.nic.in',
    description: 'Check final scores and scorecard declared by SSC.',
    requiredDetails: [
      'Roll Number / Registration Number',
      'Password / Date of Birth',
      'Captcha Verification Code'
    ]
  }
];

export const liveCompAdmissions = liveJobs;
export const liveAcadAdmissions = liveJobs;
export const liveEdistrictServices = liveJobs;
export const liveUtilities = liveJobs;
export const liveWelfare = liveJobs;
export const liveFinance = liveJobs;
export const liveAgri = liveJobs;
export const liveDefence = liveJobs;
export const liveScholarships = liveJobs;
export const liveTaxes = liveJobs;
export const liveTransport = liveJobs;
export const liveHousing = liveJobs;

export interface CafeItem {
  id: number;
  name: string;
  address: string;
  dist: string;
  rating?: string;
}

export const topRatedCafes: CafeItem[] = [
  { id: 1, name: 'Digital Cyber Hub', address: 'Main Road, Khadda', dist: 'Kushinagar', rating: '4.9 ★' },
  { id: 2, name: 'Real Teach Info Center', address: 'Siswa Bypass', dist: 'Kushinagar', rating: '4.8 ★' },
  { id: 3, name: 'Smart Online Services', address: 'Market Chowk', dist: 'Kushinagar', rating: '4.9 ★' }
];

export const topNearestCafes: CafeItem[] = [
  { id: 1, name: 'Quick Form Point', address: 'Station Road, Khadda', dist: '0.5 km' },
  { id: 2, name: 'Jan Seva Kendra', address: 'Bus Stand', dist: '1.2 km' },
  { id: 3, name: 'Khadda Digital Point', address: 'Near Railway Station', dist: '2.0 km' }
];