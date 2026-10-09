// app/pages/LatestJobsPage.tsx
'use client';
import React, { useState } from 'react';
import { LangKey } from '../data/portalData';

interface LatestJobsPageProps {
  currentLang: LangKey;
  setCurrentView: (view: string) => void;
  setSelectedJob: (job: any) => void;
  onOpenCafeRadar: () => void;
  t: any;
}

export default function LatestJobsPage({ 
  currentLang, 
  setCurrentView, 
  setSelectedJob, 
  onOpenCafeRadar,
  t 
}: LatestJobsPageProps) {

  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // 18 Categories List
  const filterCategories = [
    { id: 'ALL', labelEn: 'All Jobs', labelHi: 'सभी नौकरियां' },
    { id: '10TH_12TH', labelEn: '10th/12th Pass', labelHi: '10वीं/12वीं पास' },
    { id: 'GRADUATE', labelEn: 'Graduates', labelHi: 'ग्रेजुएट' },
    { id: 'BANKING', labelEn: 'Banking & PSU', labelHi: 'बैंकिंग/पीएसयू' },
    { id: 'DEFENCE', labelEn: 'Defence & Police', labelHi: 'रक्षा व पुलिस' },
    { id: 'ENGINEERING', labelEn: 'Engineering/Tech', labelHi: 'इंजीनियरिंग/तकनीकी' },
    { id: 'MEDICAL', labelEn: 'Medical & Health', labelHi: 'चिकित्सा/स्वास्थ्य' },
    { id: 'TEACHING', labelEn: 'Teaching/Academic', labelHi: 'शिक्षण/अकादमिक' },
    { id: 'RAILWAY', labelEn: 'Railway Jobs', labelHi: 'रेलवे नौकरियां' },
    { id: 'UPSC', labelEn: 'UPSC & Civil Services', labelHi: 'यूपीएससी/सिविल सेवा' },
    { id: 'STATE_PSC', labelEn: 'State PSC', labelHi: 'राज्य पीएससी' },
    { id: 'ITI_DIPLOMA', labelEn: 'ITI & Diploma', labelHi: 'आईटीआई/डिप्लोमा' },
    { id: 'LEGAL', labelEn: 'Legal & Judiciary', labelHi: 'कानूनी/न्यायिक' },
    { id: 'SCIENTIFIC', labelEn: 'Scientific/Research', labelHi: 'वैज्ञानिक/अनुसंधान' },
    { id: 'ACCOUNTING', labelEn: 'Accounting/Mgmt', labelHi: 'लेखा/प्रबंधन' },
    { id: 'SPORTS', labelEn: 'Sports Quota', labelHi: 'खेल कोटा' },
    { id: 'CLERICAL', labelEn: 'Clerical/Secretariat', labelHi: 'क्लर्क/सचिवालय' },
    { id: 'RALLY', labelEn: 'Open Rally', labelHi: 'खुली भर्ती रैली' },
  ];

  // Dummy jobs data mapped with categories for testing filters
  const allCategoryJobs = [
    { title: 'SSC CGL 2026 Online Application Form', titleHi: 'एसएससी सीजीएल 2026 ऑनलाइन फॉर्म', department: 'Staff Selection Commission', category: 'GRADUATE', lastDate: '15 Oct 2026', officialLink: '#' },
    { title: 'UP Police Constable Recruitment 2026', titleHi: 'यूपी पुलिस कांस्टेबल भर्ती 2026', department: 'UPPRPB', category: 'DEFENCE', lastDate: '28 Sep 2026', officialLink: '#' },
    { title: 'Railway RRB NTPC Graduate & Under-Graduate Posts', titleHi: 'रेलवे आरआरबी एनटीपीसी भर्ती 2026', department: 'Ministry of Railways', category: 'RAILWAY', lastDate: '10 Nov 2026', officialLink: '#' },
    { title: 'IBPS PO XIV Online Exam Form 2026', titleHi: 'आईबीपीएस पीओ ऑनलाइन फॉर्म 2026', department: 'Institute of Banking Personnel', category: 'BANKING', lastDate: '05 Oct 2026', officialLink: '#' },
    { title: 'UPSC Civil Services IAS / IFS Prelims 2026', titleHi: 'यूपीएससी सिविल सेवा आईएएस / आईएफएस 2026', department: 'Union Public Service Commission', category: 'UPSC', lastDate: '20 Mar 2026', officialLink: '#' },
    { title: 'Indian Army Agniveer General Duty Rally 2026', titleHi: 'भारतीय सेना अग्निवीर जनरल ड्यूटी रैली 2026', department: 'Join Indian Army', category: 'RALLY', lastDate: '12 Oct 2026', officialLink: '#' },
    { title: 'AIIMS Nursing Officer Exam (NORCET) 2026', titleHi: 'एम्स नर्सिंग ऑफिसर परीक्षा 2026', department: 'AIIMS New Delhi', category: 'MEDICAL', lastDate: '30 Sep 2026', officialLink: '#' },
    { title: 'UPSSSC Junior Engineer (JE) Civil / Mechanical 2026', titleHi: 'यूपीएसएसएससी जूनियर इंजीनियर भर्ती 2026', department: 'UPSSSC', category: 'ENGINEERING', lastDate: '05 Nov 2026', officialLink: '#' },
    { title: 'CTET December Examination Form 2026', titleHi: 'सीटेट दिसंबर परीक्षा फॉर्म 2026', department: 'CBSE', category: 'TEACHING', lastDate: '18 Oct 2026', officialLink: '#' },
    { title: 'DRDO CEPTAM Technical Assistant Posts 2026', titleHi: 'डीआरडीओ सेप्टम तकनीकी सहायक 2026', department: 'DRDO', category: 'ITI_DIPLOMA', lastDate: '25 Oct 2026', officialLink: '#' },
  ];

  // Filter logic based on search and selected category button
  const filteredJobs = allCategoryJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedFilter === 'ALL' || job.category === selectedFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full space-y-5 font-sans animate-fadeIn py-2">
      
      {/* ================= 1. HERO BANNER & THOUGHT ================= */}
      <div className="relative bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 rounded-2xl p-6 shadow-md overflow-hidden border border-blue-800/50 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-2 text-center md:text-left z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-blue-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            <span>🔥</span> {currentLang === 'hi' ? 'लाइव सरकारी भर्तियां' : 'Active Govt Vacancies'}
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
            {currentLang === 'hi' ? 'लेटेस्ट जॉब्स और आवेदन पोर्टल' : 'Latest Government Jobs Portal'}
          </h1>
          <p className="text-slate-300 text-xs font-medium leading-relaxed italic">
            {currentLang === 'hi' 
              ? '"सही समय पर सटीक जानकारी ही सफलता की पहली सीढ़ी है। अपनी योग्यता के अनुसार सही सरकारी नौकरी चुनें और बिना किसी कतार के तुरंत आवेदन करें।"' 
              : '"Right information at the right time is the first step to success. Choose the right government job according to your eligibility."'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 z-10">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">🔍</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLang === 'hi' ? 'जॉब या विभाग खोजें...' : 'Search jobs or department...'} 
              className="w-full pl-9 pr-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* ================= 2. 18 CATEGORY FILTER BUTTONS (Mobile Grid Alignment Fixed) ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm space-y-2">
        <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-1">
          {currentLang === 'hi' ? 'नौकरी की श्रेणियां (Categories)' : 'Filter by Categories'}
        </div>
        
        {/* Responsive Grid: मोबाइल पर 2 कॉलम और बड़े स्क्रीन पर अधिक कॉलम */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3 py-2 rounded-xl text-[11px] font-bold transition cursor-pointer shadow-sm border text-center truncate ${
                selectedFilter === cat.id 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-blue-600/20' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
              }`}
              title={currentLang === 'hi' ? cat.labelHi : cat.labelEn}
            >
              {currentLang === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* ================= 3. COMPACT JOB LINKS BOX ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between text-[11px] font-black text-slate-500 uppercase tracking-wider">
          <span>{currentLang === 'hi' ? 'भर्ती का नाम और विभाग' : 'Recruitment Name & Dept'}</span>
          <span className="hidden sm:block">{currentLang === 'hi' ? 'एक्शन लिंक्स' : 'Action Links'}</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-5 gap-4 hover:bg-blue-50/30 transition group">
                
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                      <span>⏳</span> Last Date: {job.lastDate}
                    </span>
                  </div>
                  <h3 
                    onClick={() => setSelectedJob(job)}
                    className="font-black text-slate-800 text-sm cursor-pointer group-hover:text-blue-600 transition"
                  >
                    {currentLang === 'hi' ? job.titleHi : job.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a 
                    href={job.officialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-[11px] transition text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>🌐</span> {currentLang === 'hi' ? 'खुद भरें' : 'Apply Self'}
                  </a>

                  <button 
                    onClick={() => {
                      setSelectedJob(job);
                      onOpenCafeRadar();
                    }}
                    className="flex-1 sm:flex-none px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition text-center flex items-center justify-center gap-1.5 shadow-sm cursor-pointer border border-emerald-700"
                  >
                    <span>🏪</span> {currentLang === 'hi' ? 'कैफे हायर करें' : 'Hire Cafe'}
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs font-bold">
              {currentLang === 'hi' ? 'इस श्रेणी में कोई भर्ती नहीं मिली।' : 'No active jobs found in this category.'}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}