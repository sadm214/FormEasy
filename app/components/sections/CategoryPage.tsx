// app/components/CategoryPage.tsx
'use client';
import React from 'react';

export default function CategoryPage({ categoryData, setCurrentView, setSelectedJob, currentLang = 'en' }: any) {
  
  // यदि डेटा नहीं मिला, तो एरर दिखाने के बजाय सुरक्षित फॉलबैक डेटा सेट करें
  const safeData = categoryData || {
    title: currentLang === 'hi' ? 'सभी सरकारी सेवाएं और फॉर्म' : 'All Government Services & Forms',
    items: [
      { id: 'job-1', title: 'UPSC Civil Services (IAS) Exam 2026', dept: 'UPSC', date: '16 Sep 2026', lastDate: '10 Oct 2026', fees: '₹100' },
      { id: 'job-2', title: 'SSC CGL 2026 Online Application', dept: 'SSC', date: '15 Sep 2026', lastDate: '05 Oct 2026', fees: '₹100' }
    ]
  };

  return (
    <div className="space-y-6 pb-16 font-sans">
      
      {/* हीरो बैनर */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <button 
            onClick={() => setCurrentView('HOME')} 
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-bold transition flex items-center gap-1 w-max"
          >
            ← {currentLang === 'hi' ? 'होम पेज पर वापस जाएँ' : 'Back to Home'}
          </button>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {safeData.title}
          </h1>
          <p className="text-slate-200 text-xs max-w-xl">
            {currentLang === 'hi' 
              ? 'इस कैटेगरी के सभी सत्यापित सरकारी फॉर्म और लिंक यहाँ उपलब्ध हैं।' 
              : 'Browse all verified government forms and links under this category.'}
          </p>
        </div>
        <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md text-right">
          <p className="text-[10px] text-slate-300 uppercase font-bold">Total Items</p>
          <p className="text-2xl font-black text-yellow-300">{safeData.items?.length || 0}</p>
        </div>
      </div>

      {/* लिस्टिंग एरिया */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="font-black text-slate-900 text-base border-b pb-3">
          Available Listings & Applications
        </h3>

        <div className="space-y-3">
          {safeData.items && safeData.items.map((item: any) => (
            <div 
              key={item.id || Math.random()} 
              className="p-4 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 rounded-2xl transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
            >
              <div className="space-y-1">
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                  {item.dept || 'Govt Portal'}
                </span>
                <h4 className="font-black text-slate-900 text-sm group-hover:text-blue-600 transition">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-[11px]">
                  Last Date: <span className="font-bold text-slate-700">{item.lastDate || 'N/A'}</span> | Fee: <span className="font-black text-emerald-600">{item.fees || 'Free'}</span>
                </p>
              </div>

              <button 
                onClick={() => setSelectedJob && setSelectedJob(item)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs transition shadow shrink-0"
              >
                Apply / View Details ➔
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}