// app/pages/SyllabusPage.tsx
'use client';
import React, { useState, useEffect } from 'react';

// फॉलबैक सिलेबस डेटा
const fallbackSyllabusData = [
  {
    id: 1,
    dept: 'UPSC',
    title: 'UPSC Civil Services Prelims & Mains Detailed Syllabus 2026',
    releaseDate: '10 Sep 2026',
    category: 'UPSC & Civil Services',
    downloadUrl: 'https://upsc.gov.in',
  },
  {
    id: 2,
    dept: 'STAFF SELECTION COMMISSION',
    title: 'SSC CGL Tier-I & Tier-II Exam Syllabus & Pattern 2026',
    releaseDate: '05 Sep 2026',
    category: 'Graduates',
    downloadUrl: 'https://ssc.nic.in',
  },
  {
    id: 3,
    dept: 'UPPBPB',
    title: 'UP Police Constable Written Exam Syllabus & Topics 2026',
    releaseDate: '30 Aug 2026',
    category: 'Defence & Police',
    downloadUrl: 'https://uppbpb.gov.in',
  },
  {
    id: 4,
    dept: 'MINISTRY OF RAILWAYS',
    title: 'Railway RRB NTPC CBT-1 & CBT-2 Exam Syllabus 2026',
    releaseDate: '22 Aug 2026',
    category: 'Railway Jobs',
    downloadUrl: 'https://rrbcdg.gov.in',
  },
  {
    id: 5,
    dept: 'IBPS',
    title: 'IBPS PO & Clerk Prelims & Mains Syllabus 2026',
    releaseDate: '18 Aug 2026',
    category: 'Banking & PSU',
    downloadUrl: 'https://ibps.in',
  },
];

export default function SyllabusPage({ currentLang, setCurrentView, setSelectedJob, onOpenCafeRadar, t }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [syllabusData, setSyllabusData] = useState(fallbackSyllabusData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const filteredData = syllabusData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.dept.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* 1. Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-[20px] p-5 sm:p-6 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-800/60">
        <div className="space-y-1.5 max-w-xl">
          <span className="inline-block bg-amber-400 text-slate-950 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            Official Exam Syllabus & Pattern
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            Exam Syllabus and <span className="text-amber-400">Pattern Hub</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
            "Download official exam syllabi, topic-wise weightage, and marking schemes for all competitive examinations."
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full md:w-auto shrink-0">
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 shadow-inner">
            <span className="text-slate-300 text-xs">🔍</span>
            <input 
              type="text" 
              placeholder="Search syllabus..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder-slate-300 text-xs focus:outline-none w-full md:w-44 font-medium"
            />
          </div>
        </div>
      </div>

      {/* 3. Syllabus List (Filter box removed as requested) */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
        
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-[11px] font-black text-slate-500 uppercase tracking-wider">
          <span>EXAM & SYLLABUS NAME</span>
          <span>ACTION LINKS</span>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="px-6 py-12 text-center text-slate-500 text-xs font-bold animate-pulse">
              🔄 सिलेबस विवरण लोड हो रहा है...
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
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>📥</span> Download Syllabus
                  </a>
                </div>

              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-slate-400 text-xs font-bold">
              No syllabus found matching your search.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

// दोहरी सुरक्षा के लिए नेम्ड एक्सपोर्ट भी जोड़ा गया है
export { SyllabusPage };