// app/pages/CertificatePage.tsx
'use client';
import React, { useState, useEffect } from 'react';

// फॉलबैक सर्टिफिकेट (Certificate) डेटा
const fallbackCertificateData = [
  {
    id: 1,
    dept: 'UP E-DISTRICT',
    title: 'Income, Caste & Domicile Certificate Verification & Download 2026',
    releaseDate: '02 Oct 2026',
    category: '10th/12th Pass',
    downloadUrl: 'https://edistrict.up.gov.in',
  },
  {
    id: 2,
    dept: 'DIGILOCKER / GOI',
    title: 'Download Verified Academic Marksheets & Digital Certificates 2026',
    releaseDate: '28 Sep 2026',
    category: 'Graduates',
    downloadUrl: 'https://www.digilocker.gov.in',
  },
  {
    id: 3,
    dept: 'MINISTRY OF HOME AFFAIRS',
    title: 'Birth & Death Registration & Certificate Portal (CRS) 2026',
    releaseDate: '22 Sep 2026',
    category: 'Open Rally',
    downloadUrl: 'https://crsorgi.gov.in',
  },
  {
    id: 4,
    dept: 'MINISTRY OF ROAD TRANSPORT',
    title: 'Driving License (DL) & Vehicle Registration Certificate (RC) 2026',
    releaseDate: '15 Sep 2026',
    category: 'Defence & Police',
    downloadUrl: 'https://parivahan.gov.in',
  },
  {
    id: 5,
    dept: 'NSDC / SKILL INDIA',
    title: 'Skill India Digital Certificate Download & Verification 2026',
    releaseDate: '10 Sep 2026',
    category: 'IT & Diploma',
    downloadUrl: 'https://www.skillindiadigital.gov.in',
  },
];

// पूरी 18 कैटेगरीज (डिजाइन कंसिस्टेंसी के लिए)
const categories = [
  'All Certificates', '10th/12th Pass', 'Graduates', 'Banking & PSU', 
  'Defence & Police', 'Engineering/Tech', 'Medical & Health', 
  'Teaching/Academic', 'Railway Jobs', 'UPSC & Civil Services', 
  'State PSC', 'IT & Diploma', 'Legal & Judiciary', 'Scientific/Research', 
  'Accounting/Mgmt', 'Sports Quota', 'Clerical/Secretarial', 'Open Rally'
];

export default function CertificatePage({ currentLang, setCurrentView, setSelectedJob, onOpenCafeRadar, t }: any) {
  const [activeCategory, setActiveCategory] = useState('All Certificates');
  const [searchQuery, setSearchQuery] = useState('');
  const [certificateData, setCertificateData] = useState(fallbackCertificateData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const filteredData = certificateData.filter((item) => {
    const matchesCategory = activeCategory === 'All Certificates' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.dept.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* 1. Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-[20px] p-5 sm:p-6 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-800/60">
        <div className="space-y-1.5 max-w-xl">
          <span className="inline-block bg-amber-400 text-slate-950 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            Official Certificate & Document Hub
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            Digital Certificate and <span className="text-amber-400">Verification Portal</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
            "Apply, download, and verify official digital certificates including income, caste, domicile, driving license, and marksheets."
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full md:w-auto shrink-0">
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 shadow-inner">
            <span className="text-slate-300 text-xs">🔍</span>
            <input 
              type="text" 
              placeholder="Search certificate..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder-slate-300 text-xs focus:outline-none w-full md:w-44 font-medium"
            />
          </div>
        </div>
      </div>

      {/* 2. Filter by Categories Grid */}
      <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-sm border border-slate-200 space-y-3">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
          FILTER BY CATEGORIES
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition text-center truncate border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Certificate List */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
        
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-[11px] font-black text-slate-500 uppercase tracking-wider">
          <span>CERTIFICATE & ISSUING AUTHORITY</span>
          <span>ACTION LINKS</span>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="px-6 py-12 text-center text-slate-500 text-xs font-bold animate-pulse">
              🔄 सर्टिफिकेट विवरण लोड हो रहा है...
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider border border-blue-100">
                      {item.dept}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                      📅 Updated: {item.releaseDate}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight hover:text-blue-600 transition cursor-pointer">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
                  <a 
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>📜</span> Get Certificate
                  </a>
                </div>

              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-slate-400 text-xs font-bold">
              No certificate found matching your filter.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

// दोहरी सुरक्षा के लिए नेम्ड एक्सपोर्ट भी जोड़ा गया है
export { CertificatePage };