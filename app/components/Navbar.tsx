// app/components/Navbar.tsx
'use client';
import React, { useState } from 'react';

export default function Navbar({ 
  t, 
  currentLang, 
  currentView, 
  setCurrentView, 
  setActiveCategoryData, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: any) {
  
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber || whatsappNumber.length < 10) {
      alert(currentLang === 'hi' ? 'कृपया सही व्हाट्सएप नंबर दर्ज करें!' : 'Please enter a valid WhatsApp number!');
      return;
    }
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setShowNotificationModal(false);
      setWhatsappNumber('');
      alert(currentLang === 'hi' ? '🎉 आपके व्हाट्सएप नंबर पर अलर्ट सफलतापूर्वक सेट हो गए हैं!' : '🎉 WhatsApp notifications activated successfully!');
    }, 1500);
  };

  const checkActive = (targetView: string) => {
    return currentView === targetView;
  };

  return (
    <>
      {/* Horizontal Desktop Navbar Container */}
      <nav className="w-full bg-white border-b border-slate-200 sticky top-[57px] z-30 font-sans shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold overflow-x-auto py-1 scrollbar-none">
            
            {/* 1. Home */}
            <button 
              onClick={() => { setCurrentView('HOME'); setActiveCategoryData(null); }} 
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${checkActive('HOME') ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              {t?.homeNav || 'Home'}
            </button>

            {/* 2. Latest Jobs */}
            <button 
              onClick={() => { setCurrentView('LATEST_JOBS'); setActiveCategoryData(null); }} 
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${checkActive('LATEST_JOBS') ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              {t?.jobsNav || 'Latest Jobs'}
            </button>

            {/* 3. Admit Card */}
            <button 
              onClick={() => { setCurrentView('ADMIT_CARD'); setActiveCategoryData(null); }} 
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${checkActive('ADMIT_CARD') ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              {t?.admitNav || 'Admit Card'}
            </button>

            {/* 4. Result */}
            <button 
              onClick={() => { setCurrentView('RESULT'); setActiveCategoryData(null); }} 
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${checkActive('RESULT') ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              {t?.resultsNav || 'Result'}
            </button>

            {/* 5. Admission */}
            <button 
              onClick={() => { setCurrentView('ADMISSION'); setActiveCategoryData(null); }} 
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${checkActive('ADMISSION') ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              {t?.compAdmNav || 'Admission'}
            </button>

            {/* 6. Syllabus */}
            <button 
              onClick={() => { setCurrentView('SYLLABUS'); setActiveCategoryData(null); }} 
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${checkActive('SYLLABUS') ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Syllabus
            </button>

            {/* 7. Answer Key */}
            <button 
              onClick={() => { setCurrentView('ANSWER_KEY'); setActiveCategoryData(null); }} 
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${checkActive('ANSWER_KEY') ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Answer Key
            </button>

            {/* 8. Scholarships (फिक्स किया गया: SCHOLARSHIP) */}
            <button 
              onClick={() => { setCurrentView('SCHOLARSHIP'); setActiveCategoryData(null); }} 
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${checkActive('SCHOLARSHIP') ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Scholarships
            </button>

            {/* 9. CSC & e-District Service */}
            <button 
              onClick={() => { setCurrentView('CSC_EDISTRICT'); setActiveCategoryData(null); }} 
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${checkActive('CSC_EDISTRICT') ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              CSC & e-District
            </button>

            {/* 10. Certificates (फिक्स किया गया: CERTIFICATE) */}
            <button 
              onClick={() => { setCurrentView('CERTIFICATE'); setActiveCategoryData(null); }} 
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${checkActive('CERTIFICATE') ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Certificates
            </button>

          </div>

          {/* Right Side: Get Notification Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => setShowNotificationModal(true)} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-1.5 rounded-xl shadow-sm transition transform hover:scale-105 flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap cursor-pointer"
            >
              <span>💬</span>
              <span>{currentLang === 'hi' ? 'नोटिफिकेशन पाएं' : 'Get Notification'}</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-4 space-y-2 text-xs font-medium text-slate-800 shadow-2xl animate-fadeIn z-30">
          <button onClick={() => { setCurrentView('HOME'); setActiveCategoryData(null); setMobileMenuOpen(false); }} className="block w-full text-left p-2.5 rounded-xl hover:bg-slate-100">{t?.homeNav || 'Home'}</button>
          <button onClick={() => { setCurrentView('LATEST_JOBS'); setActiveCategoryData(null); setMobileMenuOpen(false); }} className="block w-full text-left p-2.5 rounded-xl hover:bg-slate-100">{t?.jobsNav || 'Latest Jobs'}</button>
          <button onClick={() => { setCurrentView('ADMIT_CARD'); setActiveCategoryData(null); setMobileMenuOpen(false); }} className="block w-full text-left p-2.5 rounded-xl hover:bg-slate-100">{t?.admitNav || 'Admit Card'}</button>
          <button onClick={() => { setCurrentView('RESULT'); setActiveCategoryData(null); setMobileMenuOpen(false); }} className="block w-full text-left p-2.5 rounded-xl hover:bg-slate-100">{t?.resultsNav || 'Result'}</button>
          <button onClick={() => { setCurrentView('ADMISSION'); setActiveCategoryData(null); setMobileMenuOpen(false); }} className="block w-full text-left p-2.5 rounded-xl hover:bg-slate-100">Admission</button>
          <button onClick={() => { setCurrentView('SYLLABUS'); setActiveCategoryData(null); setMobileMenuOpen(false); }} className="block w-full text-left p-2.5 rounded-xl hover:bg-slate-100">Syllabus</button>
          <button onClick={() => { setCurrentView('ANSWER_KEY'); setActiveCategoryData(null); setMobileMenuOpen(false); }} className="block w-full text-left p-2.5 rounded-xl hover:bg-slate-100">Answer Key</button>
          <button onClick={() => { setCurrentView('SCHOLARSHIP'); setActiveCategoryData(null); setMobileMenuOpen(false); }} className="block w-full text-left p-2.5 rounded-xl hover:bg-slate-100">Scholarships</button>
          <button onClick={() => { setCurrentView('CSC_EDISTRICT'); setActiveCategoryData(null); setMobileMenuOpen(false); }} className="block w-full text-left p-2.5 rounded-xl hover:bg-slate-100">CSC & e-District</button>
          <button onClick={() => { setCurrentView('CERTIFICATE'); setActiveCategoryData(null); setMobileMenuOpen(false); }} className="block w-full text-left p-2.5 rounded-xl hover:bg-slate-100">Certificates</button>
          
          <div className="border-t border-slate-100 pt-2 space-y-2">
            <button onClick={() => { setShowNotificationModal(true); setMobileMenuOpen(false); }} className="block w-full text-center p-2.5 rounded-xl bg-blue-600 text-white font-bold shadow-sm">💬 Get WhatsApp Notification</button>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-xs sm:text-sm space-y-4 border border-slate-100 animate-fadeIn font-sans text-slate-800">
            <button onClick={() => setShowNotificationModal(false)} className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 font-bold text-slate-600 flex items-center justify-center transition cursor-pointer">✕</button>
            
            <div className="text-center space-y-1">
              <span className="text-3xl">💬</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">{currentLang === 'hi' ? 'व्हाट्सएप नोटिफिकेशन अलर्ट' : 'WhatsApp Notification Alerts'}</h3>
              <p className="text-slate-500 text-[11px] sm:text-xs">{currentLang === 'hi' ? 'अपनी पसंदीदा श्रेणियों का चयन करें और सीधे व्हाट्सएप पर अपडेट पाएं।' : 'Select your favorite categories and get updates directly on WhatsApp.'}</p>
            </div>

            <form onSubmit={handleNotificationSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-slate-700 font-bold mb-1 text-xs">{currentLang === 'hi' ? 'व्हाट्सएप मोबाइल नंबर*' : 'WhatsApp Mobile Number*'}</label>
                <input 
                  type="tel" 
                  value={whatsappNumber} 
                  onChange={(e) => setWhatsappNumber(e.target.value)} 
                  placeholder="9876543210" 
                  className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 text-xs focus:outline-none focus:border-blue-600 transition bg-white" 
                  required 
                />
              </div>

              <button type="submit" disabled={isSubscribed} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-md text-sm transition cursor-pointer">
                {isSubscribed ? (currentLang === 'hi' ? 'सब्स्क्राइब हो रहा है...' : 'Subscribing...') : (currentLang === 'hi' ? '✓ व्हाट्सएप अलर्ट एक्टिवेट करें' : '✓ Activate WhatsApp Alerts')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}