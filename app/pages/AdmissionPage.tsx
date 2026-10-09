// app/components/AdmissionPage.tsx
'use client';
import React, { useState } from 'react';

// Admission data with specific concise categories and sub-categories
const admissionData = [
  {
    id: 1,
    dept: 'NTA / JEE MAIN',
    title: 'JEE Main 2027 Session-1 Online Application Form',
    lastDate: '15 Oct 2026',
    category: 'Engineering / Tech',
    subCategory: 'B.Tech / M.Tech',
    applyUrl: 'https://jeemain.nta.nic.in',
    hireUrl: 'https://hirecafe.com',
  },
  {
    id: 2,
    dept: 'NTA / NEET UG',
    title: 'NEET UG Medical Entrance Admission Notification 2026',
    lastDate: '20 Oct 2026',
    category: 'Medical & Health',
    subCategory: 'MBBS / BDS / MD',
    applyUrl: 'https://neet.nta.nic.in',
    hireUrl: 'https://hirecafe.com',
  },
  {
    id: 3,
    dept: 'DU / DELHI UNIVERSITY',
    title: 'DU UG & PG Centralized Admission Portal 2026',
    lastDate: '30 Sep 2026',
    category: 'Central Universities',
    subCategory: 'Graduation / Post Graduation',
    applyUrl: 'https://du.ac.in',
    hireUrl: 'https://hirecafe.com',
  },
  {
    id: 4,
    dept: 'IGNOU',
    title: 'IGNOU July Session Distance Learning Admission Form 2026',
    lastDate: '10 Oct 2026',
    category: 'Distance Learning',
    subCategory: 'Certificate / Diploma / Degree',
    applyUrl: 'https://ignou.ac.in',
    hireUrl: 'https://hirecafe.com',
  },
  {
    id: 5,
    dept: 'UPES / STATE BOARD',
    title: 'State University Professional Diploma & Management Admission',
    lastDate: '25 Sep 2026',
    category: 'State Universities',
    subCategory: 'MBA / Management',
    applyUrl: 'https://upes.co.in',
    hireUrl: 'https://hirecafe.com',
  },
];

// Refined and concise categories list
const categories = [
  'All Admissions', 
  'Engineering / Tech', 
  'Medical & Health', 
  'Management', 
  'Law & Judiciary', 
  'State Universities', 
  'Central Universities', 
  'Diploma / ITI', 
  'Distance Learning', 
  'Sports Quota', 
  'Research & Ph.D'
];

export default function AdmissionPage() {
  const [activeCategory, setActiveCategory] = useState('All Admissions');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering based on category and search query
  const filteredData = admissionData.filter((item) => {
    const matchesCategory = activeCategory === 'All Admissions' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* 1. Hero Banner (Standard fixed size, dark-blue gradient and exact styling) */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-[20px] p-5 sm:p-6 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-800/60">
        <div className="space-y-1.5 max-w-xl">
          {/* Yellow background tag */}
          <span className="inline-block bg-amber-400 text-slate-950 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            Active Admission
          </span>
          {/* Main heading */}
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            Online Admission and <span className="text-amber-400">Application Form</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
            "Explore top universities, entrance exams, and professional courses. Apply for admissions before deadlines easily."
          </p>
        </div>

        {/* Compact search bar */}
        <div className="w-full md:w-auto shrink-0">
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 shadow-inner">
            <span className="text-slate-300 text-xs">🔍</span>
            <input 
              type="text" 
              placeholder="Search admission, course..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white placeholder-slate-300 text-xs focus:outline-none w-full md:w-44 font-medium"
            />
          </div>
        </div>
      </div>

      {/* 2. Filter by Categories Grid (Refined & Shortened) */}
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

      {/* 3. Admission List (Row-wise layout with Apply Self and Hire Cafe buttons) */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Table Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-[11px] font-black text-slate-500 uppercase tracking-wider">
          <span>COURSE & UNIVERSITY NAME</span>
          <span>ACTION LINKS</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
                
                {/* Left Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider border border-blue-100">
                      {item.dept}
                    </span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      📂 {item.subCategory}
                    </span>
                    <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                      🕒 Last Date: {item.lastDate}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight hover:text-blue-600 transition cursor-pointer">
                    {item.title}
                  </h4>
                </div>

                {/* Right Action Buttons (Apply Self & Hire Cafe) */}
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  <a 
                    href={item.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition cursor-pointer flex items-center gap-1"
                  >
                    <span>🌐</span> Apply Self
                  </a>
                  
                  <a 
                    href={item.hireUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer flex items-center gap-1"
                  >
                    <span>💼</span> Hire Cafe
                  </a>
                </div>

              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-slate-400 text-xs font-bold">
              No admissions found matching your filter.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}