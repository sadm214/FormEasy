// app/components/AboutUsPage.tsx
'use client';
import React from 'react';

export default function AboutUsPage({ currentLang }: { currentLang: string }) {
  const isHindi = currentLang === 'hi';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans text-slate-800">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 text-center space-y-3">
        <span className="text-4xl">🏛️</span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
          {isHindi ? 'हमारे बारे में (About Us)' : 'About Sarkari Portal'}
        </h1>
        <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto">
          {isHindi 
            ? 'भारत का सबसे तेज, विश्वसनीय और छात्र-हितैषी डिजिटल पब्लिक पोर्टल।' 
            : 'India’s fastest, most reliable, and student-friendly digital public portal.'}
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed">
        
        <div className="space-y-2">
          <h2 className="text-lg font-black text-blue-900">
            {isHindi ? 'हमारा विजन और उद्देश्य' : 'Our Vision & Purpose'}
          </h2>
          <p className="text-slate-600">
            {isHindi 
              ? 'सरकारी पोर्टल (Sarkari Portal) का मुख्य उद्देश्य देश के युवाओं, छात्रों और नौकरी चाहने वालों तक सही समय पर सटीक सरकारी अपडेट, रिजल्ट, एडमिट कार्ड और डिजिटल सेवाएं बिना किसी भ्रामक विज्ञापन के पहुंचाना है। हम शिक्षा और सूचना को हर नागरिक के लिए आसान बनाना चाहते हैं।' 
              : 'The primary objective of Sarkari Portal is to provide timely, accurate government updates, job notifications, results, admit cards, and digital services to the youth, students, and job seekers of the country without any misleading distractions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">⚡</span>
            <h3 className="font-bold text-slate-900">{isHindi ? 'तेज़ और सटीक अपडेट' : 'Fast & Accurate Updates'}</h3>
            <p className="text-[11px] text-slate-600">
              {isHindi ? 'हर छोटी-बड़ी भर्ती और रिजल्ट की सबसे पहले जानकारी।' : 'Instant alerts on every recruitment and result.'}
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🛡️</span>
            <h3 className="font-bold text-slate-900">{isHindi ? '100% विज्ञापन-मुक्त अनुभव' : 'Ad-Free Experience'}</h3>
            <p className="text-[11px] text-slate-600">
              {isHindi ? 'बिना किसी फर्जी विज्ञापनों के साफ-सुथरा इंटरफेस।' : 'Clean interface without annoying popups or fake ads.'}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🛠️</span>
            <h3 className="font-bold text-slate-900">{isHindi ? 'स्मार्ट स्टूडेंट टूल्स' : 'Smart Student Tools'}</h3>
            <p className="text-[11px] text-slate-600">
              {isHindi ? 'फोटो रिसाइज, पीडीएफ स्टूडियो और एज कैलकुलेटर जैसी सुविधाएं।' : 'Tools like Photo Resizer, PDF Studio, and Age Calculator.'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}