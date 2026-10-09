// app/components/ImportantLinks.tsx
'use client';
import React, { useState } from 'react';

export default function ImportantLinks({ currentLang }: { currentLang: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const isHindi = currentLang === 'hi';

  const linkCategories = [
    {
      titleHi: 'पहचान और डिजिटल दस्तावेज़ सेवाएँ',
      titleEn: 'Identity & Digital Document Services',
      icon: '🆔',
      links: [
        { nameHi: 'आधार कार्ड पोर्टल (UIDAI)', nameEn: 'Aadhaar Card Portal (UIDAI)', url: 'https://uidai.gov.in/' },
        { nameHi: 'पैन कार्ड ऑनलाइन आवेदन (NSDL/UTIITSL)', nameEn: 'PAN Card Online Application', url: 'https://www.onlineservices.nsdl.com/' },
        { nameHi: 'वोटर आईडी कार्ड पोर्टल (ECI)', nameEn: 'Voter ID Card Portal (ECI)', url: 'https://voters.eci.gov.in/' },
        { nameHi: 'डिजीलॉकर - सरकारी दस्तावेज़', nameEn: 'DigiLocker - Official Documents', url: 'https://www.digilocker.gov.in/' }
      ]
    },
    {
      titleHi: 'भूमि अभिलेख एवं राजस्व सेवाएँ',
      titleEn: 'Land Records & Revenue Services',
      icon: '🏡',
      links: [
        { nameHi: 'यूपी भूलेख - खतौनी नकल देखें', nameEn: 'UP Bhulekh - Check Khatauni', url: 'https://upbhulekh.gov.in/' },
        { nameHi: 'ई-डिस्ट्रिक्ट उत्तर प्रदेश (आय/जाति/निवास)', nameEn: 'UP e-District (Income/Caste/Domicile)', url: 'https://edistrict.up.gov.in/' },
        { nameHi: 'उत्तरी प्रदेश राजस्व परिषद', nameEn: 'Board of Revenue Uttar Pradesh', url: 'https://bor.up.gov.in/' }
      ]
    },
    {
      titleHi: 'शिक्षा एवं प्रमाण पत्र',
      titleEn: 'Education & Certificates',
      icon: '🎓',
      links: [
        { nameHi: 'ट्रिपल-सी (NIELIT CCC) परीक्षा पोर्टल', nameEn: 'NIELIT CCC Exam Portal', url: 'https://student.nielit.gov.in/' },
        { nameHi: 'नेशनल स्कॉलरशिप पोर्टल (NSP)', nameEn: 'National Scholarship Portal (NSP)', url: 'https://scholarships.gov.in/' },
        { nameHi: 'पासपोर्ट सेवा पोर्टल', nameEn: 'Passport Seva Portal', url: 'https://www.passportindia.gov.in/' }
      ]
    },
    {
      titleHi: 'वाहन एवं परिवहन सेवाएँ',
      titleEn: 'Transport & Vehicle Services',
      icon: '🚗',
      links: [
        { nameHi: 'सारथी परिवहन - ड्राइविंग लाइसेंस', nameEn: 'Sarathi Parivahan - Driving License', url: 'https://sarathi.parivahan.gov.in/' },
        { nameHi: 'वाहन पोर्टल - वाहन पंजीकरण विवरण', nameEn: 'Vahan Portal - Vehicle Registration', url: 'https://vahan.parivahan.gov.in/' }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 text-center space-y-3">
        <span className="text-4xl">🔗</span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
          {isHindi ? 'महत्वपूर्ण लिंक्स हब' : 'Important Links Hub'}
        </h1>
        <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto">
          {isHindi 
            ? 'यहाँ सभी सरकारी, डिजिटल, और शैक्षिक सेवाओं के आधिकारिक और सीधे लिंक्स उपलब्ध हैं।' 
            : 'Find direct and official links to essential government, digital, and educational services.'}
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-md mx-auto">
          <input 
            type="text"
            placeholder={isHindi ? '🔍 लिंक खोजें (जैसे: Aadhaar, PAN, Khatauni)...' : '🔍 Search links (e.g., Aadhaar, PAN)...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-300 text-xs sm:text-sm focus:outline-none focus:bg-white/20 transition"
          />
        </div>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {linkCategories.map((category, idx) => {
          const filteredLinks = category.links.filter(link => 
            link.nameHi.toLowerCase().includes(searchTerm.toLowerCase()) || 
            link.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredLinks.length === 0) return null;

          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="text-2xl bg-blue-50 p-2 rounded-2xl">{category.icon}</span>
                <h3 className="font-black text-sm sm:text-base text-slate-900">
                  {isHindi ? category.titleHi : category.titleEn}
                </h3>
              </div>

              <ul className="space-y-2.5">
                {filteredLinks.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium text-xs sm:text-sm transition group border border-slate-100"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-125 transition"></span>
                        {isHindi ? link.nameHi : link.nameEn}
                      </span>
                      <span className="text-slate-400 group-hover:translate-x-1 transition text-xs">🔗 Visit</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

    </div>
  );
}