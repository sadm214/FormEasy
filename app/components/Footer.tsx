// app/components/Footer.tsx
'use client';
import React from 'react';

export default function Footer({ t, currentLang, setCurrentView, setActiveTool }: any) {
  
  const handleNavClick = (viewName: string) => {
    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHindi = currentLang === 'hi';

  return (
    <footer className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-slate-300 pt-10 sm:pt-12 pb-8 border-t-4 border-yellow-400 mt-16 shadow-2xl font-sans">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        
        {/* Column 1: Brand & Soul */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-yellow-400 text-blue-950 font-black text-xl px-3 py-1.5 rounded-xl shadow-lg">SP</div>
            <span className="text-xl font-black text-yellow-400 tracking-wider">
              {isHindi ? 'सरकारी पोर्टल' : 'SARKARI PORTAL'}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isHindi 
              ? 'भारत का सबसे तेज और विश्वसनीय प्लेटफॉर्म जहाँ मिलती हैं सभी लेटेस्ट जॉब्स, एडमिट कार्ड, रिजल्ट और डिजिटल सेवाएं।' 
              : 'India’s fastest and most reliable platform for Latest Jobs, Admit Cards, Results, and Digital Services.'}
          </p>
          <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full">
            {isHindi ? '100% फ्री और सत्यापित अपडेट्स' : '100% Free & Verified Updates'}
          </span>
        </div>

        {/* Column 2: Explore Portals */}
        <div className="space-y-3">
          <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            {isHindi ? 'त्वरित पोर्टल और लिंक्स' : 'Explore Portals'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => handleNavClick('HOME')} className="hover:text-yellow-400 transition cursor-pointer">
                {isHindi ? 'सरकारी रिजल्ट और जॉब्स' : 'Sarkari Result & Jobs'}
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('CSC_EDISTRICT')} className="hover:text-yellow-400 transition cursor-pointer">
                {isHindi ? 'यूपी ई-डिस्ट्रिक्ट और खतौनी' : 'UP e-District & Khatauni'}
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('CERTIFICATES')} className="hover:text-yellow-400 transition cursor-pointer">
                {isHindi ? 'सर्टिफिकेट डाउनलोड' : 'Certificates Download'}
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('NATIONAL_SCHOLARSHIP')} className="hover:text-yellow-400 transition cursor-pointer">
                {isHindi ? 'नेशनल स्कॉलरशिप पोर्टल' : 'National Scholarship Portal'}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Student Tools */}
        <div className="space-y-3">
          <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            {isHindi ? 'स्टूडेंट टूल्स' : 'Student Tools'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTool && setActiveTool('ALL_IN_ONE_PDF')} className="hover:text-yellow-400 transition cursor-pointer text-left">
                {isHindi ? 'पीडीएफ स्टूडियो' : 'PDF Studio'}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTool && setActiveTool('PHOTO_RESIZER')} className="hover:text-yellow-400 transition cursor-pointer text-left">
                {isHindi ? 'फोटो रिसाइज' : 'Photo Resizer'}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTool && setActiveTool('BG_CHANGER')} className="hover:text-yellow-400 transition cursor-pointer text-left">
                {isHindi ? 'बैकग्राउंड रिमूवर' : 'Background Remover'}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTool && setActiveTool('AGE_CALC')} className="hover:text-yellow-400 transition cursor-pointer text-left">
                {isHindi ? 'एज कैलकुलेटर' : 'Age Calculator'}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Important Pages */}
        <div className="space-y-3">
          <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            {isHindi ? 'महत्वपूर्ण पेजेस' : 'Important Pages'}
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button onClick={() => handleNavClick('IMPORTANT_LINKS')} className="hover:text-yellow-400 transition cursor-pointer text-yellow-300 font-bold flex items-center gap-1">
                <span>🔗</span> {isHindi ? 'महत्वपूर्ण लिंक्स' : 'Important Links'}
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('ABOUT')} className="hover:text-yellow-400 transition cursor-pointer">
                {isHindi ? 'हमारे बारे में' : 'About Us'}
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('CONTACT')} className="hover:text-yellow-400 transition cursor-pointer">
                {isHindi ? 'संपर्क करें' : 'Contact Us'}
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('TERMS')} className="hover:text-yellow-400 transition cursor-pointer">
                {isHindi ? 'नियम और शर्तें' : 'Terms & Conditions'}
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3 text-center sm:text-left">
        <p>© {new Date().getFullYear()} Sarkari Portal. {isHindi ? 'सर्वाधिकार सुरक्षित।' : 'All Rights Reserved.'}</p>
        <p className="text-[11px] text-slate-400 max-w-md">
          {isHindi 
            ? 'डिस्क्लेमर: यह वेबसाइट केवल शैक्षिक और सूचना के उद्देश्य से है।' 
            : 'Disclaimer: This website is for educational and informational purposes only.'}
        </p>
      </div>
    </footer>
  );
}