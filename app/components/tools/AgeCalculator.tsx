// app/components/tools/AgeCalculator.tsx
'use client';
import React, { useState } from 'react';

export default function AgeCalculator({ onClose, currentLang }: { onClose: () => void; currentLang: string }) {
  const [birthDate, setBirthDate] = useState('2001-05-15');
  const [ageAsOn, setAgeAsOn] = useState('2026-08-01');
  const [calculatedAge, setCalculatedAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAgeExact = () => {
    const birth = new Date(birthDate);
    const cutoff = new Date(ageAsOn);
    let years = cutoff.getFullYear() - birth.getFullYear();
    let months = cutoff.getMonth() - birth.getMonth();
    let days = cutoff.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += 30;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setCalculatedAge({ years, months, days });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn font-sans">
      <div className="bg-white rounded-[28px] max-w-sm w-full p-6 sm:p-7 shadow-2xl relative border border-slate-100 space-y-5 transform transition-all scale-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs transition cursor-pointer"
        >
          ✕
        </button>

        {/* Header Section */}
        <div className="flex items-center gap-3.5 pr-6">
          
          <div>
            
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-0.5">
              {currentLang === 'hi' ? 'आयु कैलकुलेटर' : 'Age Calculator'}
            </h3>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {currentLang === 'hi' ? 'जन्म तिथि (DOB):' : 'Date of Birth (DOB):'}
            </label>
            <input 
              type="date" 
              value={birthDate} 
              onChange={(e) => setBirthDate(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-inner" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {currentLang === 'hi' ? 'इस तारीख तक आयु (As on Date):' : 'Calculate Age As on Date:'}
            </label>
            <input 
              type="date" 
              value={ageAsOn} 
              onChange={(e) => setAgeAsOn(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-inner" 
            />
          </div>

          <button 
            onClick={calculateAgeExact} 
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black rounded-xl shadow-lg shadow-emerald-600/25 transition-all text-xs tracking-wider uppercase cursor-pointer"
          >
            {currentLang === 'hi' ? 'सटीक आयु कैलकुलेट करें ➔' : 'Calculate Your Age ➔'}
          </button>

          {/* Result Card */}
          {calculatedAge && (
            <div className="p-4 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-200/80 rounded-2xl text-center shadow-sm space-y-1 animate-fadeIn">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block">
                {currentLang === 'hi' ? 'आपकी सटीक आयु (Exact Age):' : 'Your Exact Age Result:'}
              </span>
              <div className="text-emerald-950 font-black text-sm sm:text-base tracking-tight">
                {calculatedAge.years} {currentLang === 'hi' ? 'वर्ष' : 'Years'}, {calculatedAge.months} {currentLang === 'hi' ? 'महीने' : 'Months'}, {calculatedAge.days} {currentLang === 'hi' ? 'दिन' : 'Days'}
              </div>
              <span className="inline-block mt-1 text-[9px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                ✓ {currentLang === 'hi' ? 'आवेदन के लिए पात्र' : 'Eligible for Application'}
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}