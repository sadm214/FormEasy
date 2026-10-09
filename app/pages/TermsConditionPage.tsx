'use client';
import React from 'react';

export default function TermsConditionPage({ currentLang }: { currentLang: string }) {
  const isHindi = currentLang === 'hi';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans text-slate-800">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 text-center space-y-3">
        <span className="text-4xl">📜</span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
          {isHindi ? 'नियम और शर्तें (Terms & Conditions)' : 'Terms & Conditions'}
        </h1>
        <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto">
          {isHindi ? 'कृपया हमारी वेबसाइट का उपयोग करने से पहले इन नियमों और शर्तों को ध्यान से पढ़ें।' : 'Please read these terms and conditions carefully.'}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-base font-black text-blue-900">
            1. {isHindi ? 'सूचना की सटीकता और डिस्क्लेमर' : 'Accuracy of Information'}
          </h2>
          <p className="text-slate-600">
            {isHindi ? 'इस वेबसाइट पर दी जाने वाली सभी जानकारी विभिन्न आधिकारिक स्रोतों से एकत्र की जाती है।' : 'All information provided is collected from official sources.'}
          </p>
        </div>
      </div>
    </div>
  );
}
export { TermsConditionPage };