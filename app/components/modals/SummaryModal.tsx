// app/components/modals/SummaryModal.tsx
'use client';
import React, { useState, useEffect } from 'react';

export default function SummaryModal({ job, t, onClose, onOpenCafeRadar, isUserLoggedIn = true, onRequireLogin, currentLang = 'en' }: any) {
  const [step, setStep] = useState<'SUMMARY' | 'WAITING' | 'BID_RECEIVED' | 'PAYMENT' | 'SUCCESS'>('SUMMARY');
  const [showFullDetails, setShowFullDetails] = useState(false); 
  const [timer, setTimer] = useState(600); // 10 मिनट का टाइमर
  const [biddingData, setBiddingData] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('UPI');
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    let interval: any;
    if (step === 'WAITING' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const nextTime = prev - 1;
          if (nextTime === 585) { 
            setBiddingData({
              cafeName: 'Real Teach Info Center',
              operator: 'R. H. Khan',
              address: 'Khadda, Kushinagar',
              price: '₹50 Service Fee',
              distance: '0.8 km away',
              rating: '4.9 (120+ Reviews)',
              ownerPhoto: '👨‍💻'
            });
            setStep('BID_RECEIVED');
          }
          return nextTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleHireCafeClick = () => {
    if (!isUserLoggedIn) {
      if (onRequireLogin) onRequireLogin();
      return;
    }
    setTimer(600);
    setStep('WAITING');
  };

  const handlePaymentConfirm = () => {
    const generatedId = 'FE-ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setStep('SUCCESS');
  };

  if (!job) return null;

  // सेवा के प्रकार की पहचान (JOB, ADMIT, RESULT आदि)
  const itemType = job.itemType || 'JOB';

  const content = {
    en: {
      tagJob: "Quick Summary & Full Notification Details",
      tagAdmit: "Admit Card Download Portal",
      tagResult: "Exam Result & Scorecard Portal",
      requiredHeader: "Required Credentials / Details for Download:",
      selfDownload: "Download / Check Self",
      hireCafeDownload: "Hire Cyber Cafe to Download",
      selfFill: "Apply Self (Direct Link)",
      hireCafe: "Hire Cyber Cafe Expert",
      readFullDetails: "📜 Read Full Notification & Category-wise Details",
      hideDetails: "Hide Details ⬆️",
      importantDates: "⏳ Important Dates & Schedule:",
      eligibilityHeader: "🎓 Eligibility & Qualification Details:",
      categoryTable: "👥 Category-wise Seat Distribution:",
      howToFill: "✍️ How to Fill Application Form:",
      searchingTitle: "Finding Best Cyber Cafe Near You...",
      searchingSub: "Broadcasting your request via signal tower to nearby verified experts...",
      cafeFoundTitle: "Cyber Cafe Bid Received!",
      cafeFoundSub: "A verified cyber cafe near you has reviewed your request and sent a service quote.",
      cafeName: "Shop Name:",
      operator: "Owner:",
      location: "Location:",
      rating: "Rating:",
      serviceFee: "Service Quote:",
      decline: "Deny / Decline",
      proceedPay: "Accept & Proceed to Pay ➔",
      paymentTitle: "Secure Payment Checkout",
      paymentSub: "Complete the payment to assign your task securely.",
      payBtn: "✓ Pay ₹50 & Confirm Order",
      successTitle: "Order Placed Successfully!",
      successSub: "Your task has been successfully assigned to the cyber cafe partner.",
      orderIdLabel: "Order ID:",
      assignedCafe: "Assigned Cafe:",
      status: "Status:",
      statusValue: "In Progress (Processing)",
      doneClose: "Done / Close Window"
    },
    hi: {
      tagJob: "त्वरित सारांश और संपूर्ण नोटिफिकेशन विवरण",
      tagAdmit: "प्रवेश पत्र (Admit Card) डाउनलोड पोर्टल",
      tagResult: "परीक्षा परिणाम और स्कोरकार्ड पोर्टल",
      requiredHeader: "डाउनलोड करने के लिए आवश्यक विवरण / क्रेडेंशियल्स:",
      selfDownload: "स्वयं डाउनलोड करें (Download Self)",
      hireCafeDownload: "साइबर कैफे से डाउनलोड करवाएं",
      selfFill: "स्वयं भरें (Apply Self)",
      hireCafe: "साइबर कैफे एक्सपर्ट से भरवाएं",
      readFullDetails: "📜 संपूर्ण अधिसूचना और श्रेणी-वार रिक्तियों की डिटेल पढ़ें",
      hideDetails: "डिटेल छुपाएं ⬆️",
      importantDates: "⏳ महत्वपूर्ण तिथियां व शेड्यूल:",
      eligibilityHeader: "🎓 पात्रता और शैक्षणिक योग्यता:",
      categoryTable: "👥 श्रेणी-वार सीटों का वितरण:",
      howToFill: "✍️ ऑनलाइन फॉर्म कैसे भरें:",
      searchingTitle: "रडार और सिग्नल टॉवर के जरिए कैफे खोजे जा रहे हैं...",
      searchingSub: "हम सिग्नल ब्रॉडकास्ट के माध्यम से आपके आसपास के वेरिफाइड कैफे पार्टर्स को रिक्वेस्ट भेज रहे हैं...",
      cafeFoundTitle: "साइबर कैफे बिड प्राप्त हुई!",
      cafeFoundSub: "एक नजदीकी वेरिफाइड साइबर कैफे ने आपका कार्य करने के लिए बिड और अपनी डिटेल भेजी है।",
      cafeName: "दुकान का नाम:",
      operator: "संचालक:",
      location: "पता:",
      rating: "रेटिंग:",
      serviceFee: "सर्विस फीस:",
      decline: "अस्वीकार करें (Deny)",
      proceedPay: "स्वीकार करें और पेमेंट करें ➔",
      paymentTitle: "सुरक्षित भुगतान चेकआउट",
      paymentSub: "कार्य पक्का करने के लिए सुरक्षित भुगतान पूरा करें।",
      payBtn: "✓ ₹50 भुगतान करें और ऑर्डर पक्का करें",
      successTitle: "ऑर्डर सफलतापूर्वक दर्ज हो गया!",
      successSub: "आपका कार्य सफलतापूर्वक साइबर कैफे पार्टनर को सौंप दिया गया है।",
      orderIdLabel: "ऑर्डर आईडी:",
      assignedCafe: "असाइन किया गया कैफे:",
      status: "स्थिति:",
      statusValue: "प्रगति पर है (Processing)",
      doneClose: "समाप्त / बंद करें"
    }
  };

  const tLang = currentLang === 'hi' ? content.hi : content.en;
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timer / 600) * circumference;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-3 animate-fadeIn font-sans">
      <div className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl relative space-y-3.5 sm:space-y-4 border border-slate-100 text-slate-800 max-h-[90vh] overflow-y-auto google-scrollbar">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center font-bold text-xs transition cursor-pointer z-10"
        >
          ✕
        </button>

        {/* ================= STEP 1: DYNAMIC SUMMARY (JOB / ADMIT / RESULT) ================= */}
        {step === 'SUMMARY' && (
          <div className="space-y-3.5 sm:space-y-4">
            
            {/* Header Tag & Title */}
            <div className="space-y-1 pr-5">
              <span className="text-[9px] font-black tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full shadow-sm">
                📋 {itemType === 'ADMIT' ? tLang.tagAdmit : itemType === 'RESULT' ? tLang.tagResult : tLang.tagJob}
              </span>
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug pt-0.5">
                {currentLang === 'hi' ? (job.titleHi || job.title) : job.title}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium line-clamp-2">
                {job.description || 'Official portal notification and service details.'}
              </p>
            </div>

            {/* CASE A: ADMIT CARD or RESULT (आवश्यक क्रेडेंशियल्स दिखाएं) */}
            {(itemType === 'ADMIT' || itemType === 'RESULT') && (
              <div className="space-y-2">
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-2 text-xs">
                  <p className="font-black text-amber-900 uppercase tracking-wide text-[11px]">🔑 {tLang.requiredHeader}</p>
                  <ul className="list-disc list-inside space-y-1 text-amber-950 font-medium">
                    {job.requiredDetails ? (
                      job.requiredDetails.map((req: string, idx: number) => (
                        <li key={idx}>{req}</li>
                      ))
                    ) : (
                      <>
                        <li>Registration / Roll Number</li>
                        <li>Date of Birth / Password</li>
                        <li>Captcha Verification Code</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Admit/Result Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <a 
                    href={job.downloadUrl || job.applyLink || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-md text-xs transition text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>📥</span> {tLang.selfDownload}
                  </a>
                  <button 
                    onClick={handleHireCafeClick}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black rounded-xl shadow-md text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>🏪</span> {tLang.hireCafeDownload}
                  </button>
                </div>
              </div>
            )}

            {/* CASE B: LATEST JOBS / ADMISSIONS / SCHOLARSHIP (पूर्ण समरी और सीट टेबल) */}
            {itemType === 'JOB' && (
              <>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[9px] uppercase">Issue Date</span>
                    <span className="font-bold text-slate-800 text-[11px]">{job.startDate || '16 Sep 2026'}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[9px] uppercase">Last Date</span>
                    <span className="font-bold text-red-600 text-[11px]">{job.lastDate || 'As per notice'}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[9px] uppercase">Application Fee</span>
                    <span className="font-bold text-slate-800 text-[11px]">{job.fee || '₹100'}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[9px] uppercase">Qualification</span>
                    <span className="font-bold text-slate-800 text-[11px]">{job.qualification || 'Graduate / 10+2'}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[9px] uppercase">Age Limit</span>
                    <span className="font-bold text-slate-800 text-[11px]">{job.ageLimit || 'As per rules'}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-slate-400 font-bold block text-[9px] uppercase">Total Posts</span>
                    <span className="font-bold text-blue-700 text-[11px]">{job.totalPosts || 'Available in Notice'}</span>
                  </div>
                </div>

                {/* Required Documents List */}
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-wide">Required Documents & Uploads:</h4>
                  <ul className="grid grid-cols-2 gap-1 text-[10px] sm:text-[11px] text-slate-600 font-medium bg-blue-50/40 p-2.5 rounded-2xl border border-blue-100">
                    <li className="flex items-center gap-1">✓ Scanned Photograph</li>
                    <li className="flex items-center gap-1">✓ Signature & Thumb</li>
                    <li className="flex items-center gap-1">✓ Educational Certificates</li>
                    <li className="flex items-center gap-1">✓ ID Proof / Aadhaar</li>
                  </ul>
                </div>

                {/* Sarkari Result Style Toggle Details Button */}
                {!showFullDetails ? (
                  <button 
                    onClick={() => setShowFullDetails(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-black rounded-xl shadow-sm text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{tLang.readFullDetails}</span>
                    <span>⬇️</span>
                  </button>
                ) : (
                  <div className="space-y-3.5 pt-2 border-t border-slate-200 animate-fadeIn text-xs">
                    
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 uppercase">📋 Complete Examination Details</span>
                      <button 
                        onClick={() => setShowFullDetails(false)}
                        className="font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        {tLang.hideDetails}
                      </button>
                    </div>

                    {/* Important Dates Box */}
                    <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 space-y-1">
                      <p className="font-black text-amber-900 uppercase text-[10px]">{tLang.importantDates}</p>
                      <ul className="list-disc list-inside space-y-0.5 text-amber-950 font-medium">
                        <li>Application Begin: <strong>{job.startDate || 'As notified'}</strong></li>
                        <li>Last Date for Apply Online: <strong className="text-red-600">{job.lastDate}</strong></li>
                        <li>Exam Date: <strong>{job.examDate || 'As per schedule'}</strong></li>
                      </ul>
                    </div>

                    {/* Category-wise Seat Breakdown Table */}
                    {job.categoryBreakdown && (
                      <div className="space-y-1.5">
                        <p className="font-black text-slate-900 uppercase text-[10px]">{tLang.categoryTable}</p>
                        <div className="overflow-hidden border border-slate-200 rounded-xl">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-100 text-slate-700 font-black border-b border-slate-200 text-[10px]">
                                <th className="p-2">Category</th>
                                <th className="p-2 text-right">Available Seats</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-800 text-[11px]">
                              <tr><td className="p-2">General / Unreserved</td><td className="p-2 text-right font-bold">{job.categoryBreakdown.gen || '-'}</td></tr>
                              <tr><td className="p-2">OBC / BC / EBC</td><td className="p-2 text-right font-bold">{job.categoryBreakdown.obc || '-'}</td></tr>
                              <tr><td className="p-2">EWS</td><td className="p-2 text-right font-bold">{job.categoryBreakdown.ews || '-'}</td></tr>
                              <tr><td className="p-2">SC</td><td className="p-2 text-right font-bold">{job.categoryBreakdown.sc || '-'}</td></tr>
                              <tr><td className="p-2">ST</td><td className="p-2 text-right font-bold">{job.categoryBreakdown.st || '-'}</td></tr>
                              <tr className="bg-blue-50/60 font-black text-blue-900"><td className="p-2">Total Posts</td><td className="p-2 text-right">{job.categoryBreakdown.total || '-'}</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* How to Fill Instructions */}
                    {job.howToFill && job.howToFill.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="font-black text-slate-900 uppercase text-[10px]">{tLang.howToFill}</p>
                        <ol className="list-decimal list-inside space-y-1 text-slate-700 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          {job.howToFill.map((step: string, idx: number) => (
                            <li key={idx} className="leading-snug">{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                  </div>
                )}

                {/* Job Action Buttons: Apply Self & Hire Cyber Cafe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <a 
                    href={job.applyLink || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl shadow-md text-xs transition text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>🌐</span> {tLang.selfFill}
                  </a>
                  <button 
                    onClick={handleHireCafeClick}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black rounded-xl shadow-md text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>🏪</span> {tLang.hireCafe}
                  </button>
                </div>
              </>
            )}

          </div>
        )}

        {/* ================= STEP 2: WAITING & RADAR ================= */}
        {step === 'WAITING' && (
          <div className="text-center space-y-3.5 py-1">
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-900 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-md flex items-center justify-center animate-pulse">
              <div className="absolute w-12 h-12 rounded-full border border-blue-400/40 animate-ping"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-2xl animate-bounce">🗼</div>
                <div className="flex gap-1 mt-0.5">
                  <span className="w-1 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                  <span className="w-1 h-3 bg-emerald-400 rounded-full animate-ping delay-150"></span>
                  <span className="w-1 h-2.5 bg-emerald-400 rounded-full animate-ping delay-300"></span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900">{tLang.searchingTitle}</h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">{tLang.searchingSub}</p>
            </div>
            
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" className="text-slate-100" fill="transparent" />
                <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" className="text-blue-600 transition-all duration-1000 ease-linear" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono font-black text-slate-800 text-[11px]">
                {formatTime(timer)}
              </div>
            </div>

            <div>
              <button onClick={() => setStep('SUMMARY')} className="text-[11px] text-slate-500 hover:text-slate-800 underline font-bold cursor-pointer">
                ← Cancel & Back
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CAFE BID RECEIVED ================= */}
        {step === 'BID_RECEIVED' && biddingData && (
          <div className="space-y-3.5">
            <div className="text-center space-y-1">
              <div className="inline-block p-2 bg-emerald-100 text-emerald-700 rounded-xl text-lg mb-0.5 shadow-sm">🏷️</div>
              <h3 className="text-sm font-black text-slate-900">{tLang.cafeFoundTitle}</h3>
              <p className="text-[11px] text-slate-500">{tLang.cafeFoundSub}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3.5 space-y-2.5 shadow-sm text-xs">
              <div className="flex items-center gap-3 border-b border-emerald-200/80 pb-2">
                <div className="w-10 h-10 bg-white rounded-xl border border-emerald-300 shadow-sm flex items-center justify-center text-xl shrink-0">
                  {biddingData.ownerPhoto}
                </div>
                <div>
                  <h4 className="font-black text-emerald-950 text-xs">{biddingData.cafeName}</h4>
                  <p className="text-slate-600 font-semibold text-[10px]">{tLang.operator} {biddingData.operator} • <span className="text-amber-600 font-bold">⭐ {biddingData.rating}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-700 font-medium">
                <div>
                  <span className="text-slate-400 text-[9px] block uppercase font-bold">{tLang.location}</span>
                  <span className="font-bold text-slate-800 text-[11px]">{biddingData.address} ({biddingData.distance})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] block uppercase font-bold">{tLang.serviceFee}</span>
                  <span className="font-black text-emerald-700 text-xs bg-white px-2 py-0.5 rounded-lg border border-emerald-300 shadow-sm inline-block mt-0.5">{biddingData.price}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={() => setStep('SUMMARY')} className="w-1/2 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200 rounded-xl text-xs transition cursor-pointer">
                {tLang.decline}
              </button>
              <button onClick={() => setStep('PAYMENT')} className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs transition shadow-md cursor-pointer">
                {tLang.proceedPay}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: PAYMENT ================= */}
        {step === 'PAYMENT' && (
          <div className="space-y-3.5">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-black text-slate-900">{tLang.paymentTitle}</h3>
              <p className="text-[11px] text-slate-500">{tLang.paymentSub}</p>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-slate-700 block text-[10px]">Select Payment Mode:</label>
              <div className="grid grid-cols-3 gap-1.5">
                <button onClick={() => setSelectedPayment('UPI')} className={`p-2 rounded-xl border font-bold text-center text-[11px] transition cursor-pointer ${selectedPayment === 'UPI' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>📱 UPI</button>
                <button onClick={() => setSelectedPayment('NETBANKING')} className={`p-2 rounded-xl border font-bold text-center text-[11px] transition cursor-pointer ${selectedPayment === 'NETBANKING' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>🏦 NetBank</button>
                <button onClick={() => setSelectedPayment('WALLET')} className={`p-2 rounded-xl border font-bold text-center text-[11px] transition cursor-pointer ${selectedPayment === 'WALLET' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>💰 Wallet</button>
              </div>
            </div>

            <button onClick={handlePaymentConfirm} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-md text-xs transition cursor-pointer">
              {tLang.payBtn}
            </button>
          </div>
        )}

        {/* ================= STEP 5: SUCCESS ================= */}
        {step === 'SUCCESS' && (
          <div className="text-center space-y-3.5 py-1">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full mx-auto flex items-center justify-center text-xl shadow-md">✓</div>
            <div className="space-y-0.5">
              <h3 className="text-base font-black text-slate-900">{tLang.successTitle}</h3>
              <p className="text-[11px] text-slate-500">{tLang.successSub}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-1">
                <span className="font-bold text-slate-400 text-[10px]">{tLang.orderIdLabel}</span>
                <span className="font-mono font-black text-blue-600 text-xs">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1 pt-0.5">
                <span className="font-bold text-slate-400 text-[10px]">{tLang.assignedCafe}</span>
                <span className="font-bold text-slate-800 text-[10px]">Real Teach Info Center</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="font-bold text-slate-400 text-[10px]">{tLang.status}</span>
                <span className="font-bold text-emerald-600 text-[10px]">{tLang.statusValue}</span>
              </div>
            </div>

            <div className="pt-1">
              <button onClick={onClose} className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl shadow-md text-xs transition cursor-pointer">
                {tLang.doneClose}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}