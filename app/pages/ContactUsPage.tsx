'use client';
import React, { useState } from 'react';

export default function ContactUsPage({ currentLang }: { currentLang: string }) {
  const [submitted, setSubmitted] = useState(false);
  const isHindi = currentLang === 'hi';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans text-slate-800">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 text-center space-y-3">
        <span className="text-4xl">📞</span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-wide">
          {isHindi ? 'संपर्क करें (Contact Us)' : 'Contact Us'}
        </h1>
        <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto">
          {isHindi 
            ? 'यदि आपके पास कोई सुझाव, प्रश्न या सहायता की आवश्यकता है, तो बेझिझक हमसे संपर्क करें।' 
            : 'If you have any queries, feedback, or need support, feel free to reach out to us.'}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <h2 className="text-base font-black text-blue-900 pb-1">
            {isHindi ? 'संदेश भेजें' : 'Send a Message'}
          </h2>
          {submitted && (
            <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl font-bold text-center">
              {isHindi ? '🎉 आपका संदेश सफलतापूर्वक भेज दिया गया है!' : '🎉 Message sent successfully!'}
            </div>
          )}
          <div>
            <label className="block text-slate-700 font-bold mb-1">{isHindi ? 'आपका नाम*' : 'Your Name*'}</label>
            <input type="text" required placeholder={isHindi ? 'पूरा नाम दर्ज करें' : 'Enter full name'} className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50" />
          </div>
          <button type="submit" className="w-full py-3.5 bg-blue-600 text-white font-black rounded-2xl shadow-md cursor-pointer">
            {isHindi ? 'संदेश भेजें' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}