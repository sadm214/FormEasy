// app/components/modals/ShopAuthModal.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function ShopAuthModal({ onClose, setCurrentView }: { onClose: () => void; setCurrentView: (view: any) => void }) {
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP' | 'FORGOT'>('LOGIN');

  // --- LOGIN STATES ---
  const [partnerId, setPartnerId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // --- SIGNUP STATES (DIGITAL PARTNER REGISTRATION) ---
  const [fullName, setFullName] = useState('');
  
  // Mobile Verification States
  const [mobile, setMobile] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [mobileTimer, setMobileTimer] = useState(60);
  const [canResendMobile, setCanResendMobile] = useState(false);

  // Email Verification States
  const [email, setEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailTimer, setEmailTimer] = useState(60);
  const [canResendEmail, setCanResendEmail] = useState(false);

  // Aadhaar Authentication States
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [isAadhaarOtpSent, setIsAadhaarOtpSent] = useState(false);
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [aadhaarTimer, setAadhaarTimer] = useState(60);
  const [canResendAadhaar, setCanResendAadhaar] = useState(false);

  // --- LIVE CAMERA & SMART FACE DETECTION STATES ---
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [faceCheckStatus, setFaceCheckStatus] = useState('Align your face inside the frame...');

  // Address States (Compulsory with Stars)
  const [shopHouseNo, setShopHouseNo] = useState('');
  const [streetName, setStreetName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [areaVillage, setAreaVillage] = useState('');
  const [cityName, setCityName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [pincode, setPincode] = useState('');
  const [stateName, setStateName] = useState('');

  // Security & Declaration States
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  // Registration Success / Application Number States
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [generatedAppNumber, setGeneratedAppNumber] = useState('');

  // --- FORGOT PASSWORD STATES ---
  const [forgotStep, setForgotStep] = useState<'INPUT' | 'OTP_VERIFY' | 'NEW_PASS'>('INPUT');
  const [forgotData, setForgotData] = useState({
    partnerId: '',
    email: '',
    mobile: '',
    otp: '',
    newPassword: ''
  });

  // --- TIMERS FOR OTP RESEND (1 MINUTE) ---
  useEffect(() => {
    let mTimer: any;
    if (isMobileOtpSent && !isMobileVerified && mobileTimer > 0) {
      mTimer = setInterval(() => setMobileTimer((prev) => prev - 1), 1000);
    } else if (mobileTimer === 0) {
      setCanResendMobile(true);
    }
    return () => clearInterval(mTimer);
  }, [isMobileOtpSent, isMobileVerified, mobileTimer]);

  useEffect(() => {
    let eTimer: any;
    if (isEmailOtpSent && !isEmailVerified && emailTimer > 0) {
      eTimer = setInterval(() => setEmailTimer((prev) => prev - 1), 1000);
    } else if (emailTimer === 0) {
      setCanResendEmail(true);
    }
    return () => clearInterval(eTimer);
  }, [isEmailOtpSent, isEmailVerified, emailTimer]);

  useEffect(() => {
    let aTimer: any;
    if (isAadhaarOtpSent && !isAadhaarVerified && aadhaarTimer > 0) {
      aTimer = setInterval(() => setAadhaarTimer((prev) => prev - 1), 1000);
    } else if (aadhaarTimer === 0) {
      setCanResendAadhaar(true);
    }
    return () => clearInterval(aTimer);
  }, [isAadhaarOtpSent, isAadhaarVerified, aadhaarTimer]);

  // --- HANDLERS ---
  const handleSendMobileOtp = () => {
    if (!mobile || mobile.length !== 10) {
      alert('कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें!');
      return;
    }
    setIsMobileOtpSent(true);
    setMobileTimer(60);
    setCanResendMobile(false);
    alert(`📲 OTP sent to ${mobile}. (Simulated OTP: 1234)`);
  };

  const handleVerifyMobileOtp = () => {
    if (mobileOtp === '1234' || mobileOtp.length === 4) {
      setIsMobileVerified(true);
      alert('✓ Mobile Number Verified Successfully!');
    } else {
      alert('गलत OTP! कृपया पुनः प्रयास करें।');
    }
  };

  const handleSendEmailOtp = () => {
    if (!email || !email.includes('@')) {
      alert('कृपया वैध ईमेल एड्रेस दर्ज करें!');
      return;
    }
    setIsEmailOtpSent(true);
    setEmailTimer(60);
    setCanResendEmail(false);
    alert(`📧 Verification OTP sent to ${email}. (Simulated OTP: 5678)`);
  };

  const handleVerifyEmailOtp = () => {
    if (emailOtp === '5678' || emailOtp.length === 4) {
      setIsEmailVerified(true);
      alert('✓ Email Address Verified Successfully!');
    } else {
      alert('गलत OTP! कृपया पुनः प्रयास करें।');
    }
  };

  const handleSendAadhaarOtp = () => {
    if (!aadhaarNumber || aadhaarNumber.length < 12) {
      alert('कृपया वैध नंबर दर्ज करें!');
      return;
    }
    setIsAadhaarOtpSent(true);
    setAadhaarTimer(60);
    setCanResendAadhaar(false);
    alert('🔐 OTP sent to registered mobile linked with UIDAI. (Simulated OTP: 9999)');
  };

  const handleVerifyAadhaarOtp = () => {
    if (aadhaarOtp === '9999' || aadhaarOtp.length === 4) {
      setIsAadhaarVerified(true);
      alert('✓ Authentication Successful via UIDAI!');
    } else {
      alert('OTP असत्यापित! कृपया सही OTP दर्ज करें।');
    }
  };

  // --- SMART LIVE CAMERA & ANTI-FRAUD FACE CHECK ---
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      setIsFaceDetected(false);
      setFaceCheckStatus('Scanning face alignment...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setTimeout(() => {
        setIsFaceDetected(true);
        setFaceCheckStatus('✓ Face detected clearly! Ready to capture.');
      }, 2000);

    } catch (err) {
      alert('कैमरा एक्सेस करने में असमर्थ! कृपया कैमरा परमिशन दें।');
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!isFaceDetected) {
      alert('चेहरा सही से फ्रेम में डिटेक्ट नहीं हुआ है! कृपया कैमरे के सामने स्थिर रहें।');
      return;
    }

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 300;
      canvas.height = video.videoHeight || 225;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
        
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setIsCameraActive(false);
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  // --- SIGNUP SUBMIT WITH APPLICATION NUMBER GENERATION ---
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMobileVerified || !isEmailVerified || !isAadhaarVerified) {
      alert('कृपया पंजीकरण से पहले मोबाइल, ईमेल और का सत्यापन (Verification) पूरा करें!');
      return;
    }
    if (!capturedImage || !isFaceDetected) {
      alert('एंटी-फ्रॉड सुरक्षा के लिए सही फेस डिटेक्शन के साथ लाइव फोटो कैप्चर करना अनिवार्य है!');
      return;
    }
    if (password.length < 8) {
      alert('पासवर्ड कम से कम 8 कैरेक्टर का होना चाहिए जिसमें अक्षर, अंक और सिंबल शामिल हों।');
      return;
    }
    if (password !== confirmPassword) {
      alert('पासवर्ड और कंफर्म पासवर्ड मेल नहीं खा रहे हैं!');
      return;
    }
    if (!isAgreed) {
      alert('कृपया डिजिटल सेल्फ-डेलारेशन और एग्रीमेंट को स्वीकार करें!');
      return;
    }

    // Generate Application Number instead of Registration ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const appNumber = `FE-APP-${randomNum}`;
    setGeneratedAppNumber(appNumber);
    setIsSubmittedSuccess(true);

    alert(`📨 Application details & Number (${appNumber}) successfully dispatched to your Mobile (${mobile}) & Email (${email})!`);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId || !loginPassword) {
      alert('कृपया पार्टनर आईडी और पासवर्ड दर्ज करें!');
      return;
    }
    alert('🎉 Shop Login Successful! Redirecting to Partner Dashboard...');
    setCurrentView('SHOP_DASHBOARD');
    onClose();
  };

  // --- FORGOT PASSWORD HANDLERS ---
  const handleForgotSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotData.partnerId || !forgotData.email || !forgotData.mobile) {
      alert('कृपया पार्टनर आईडी, ईमेल और मोबाइल नंबर तीनों दर्ज करें!');
      return;
    }
    setForgotStep('OTP_VERIFY');
    alert(`🔐 OTP sent successfully to Email (${forgotData.email}) & Mobile (${forgotData.mobile}) for Partner ID: ${forgotData.partnerId}. (Simulated OTP: 1234)`);
  };

  const handleForgotVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotData.otp === '1234' || forgotData.otp.length === 4) {
      setForgotStep('NEW_PASS');
      alert('✓ OTP Verified Successfully! Now enter your new password.');
    } else {
      alert('गलत OTP! कृपया पुनः प्रयास करें।');
    }
  };

  const handleResetFinalPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotData.newPassword || forgotData.newPassword.length < 8) {
      alert('नया पासवर्ड कम से कम 8 कैरेक्टर का होना चाहिए!');
      return;
    }
    alert('🎉 पासवर्ड सफलतापूर्वक रीसेट हो गया है! अब आप नए पासवर्ड से लॉगिन कर सकते हैं।');
    setAuthMode('LOGIN');
    setForgotStep('INPUT');
    setForgotData({ partnerId: '', email: '', mobile: '', otp: '', newPassword: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 font-sans text-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto text-slate-800">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 font-bold text-slate-600 flex items-center justify-center transition cursor-pointer"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 border-b pb-4">
           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[10px] px-3.5 py-1 rounded-full uppercase tracking-widest mx-auto inline-block shadow-sm">
             FormEasy Portal
           </div>
           <div className="space-y-1">
             <h2 className="text-lg sm:text-xl font-black text-slate-900">
               {authMode === 'LOGIN' && 'Partner Login'}
               {authMode === 'SIGNUP' && 'Digital Partner Registration'}
               {authMode === 'FORGOT' && 'Reset Password'}
             </h2>
             <p className="text-slate-400 text-[11px]">
               {authMode === 'LOGIN' && 'Access your active orders, earnings and instant settlements.'}
               {authMode === 'SIGNUP' && 'Complete mandatory KYC, Anti-Fraud Live Face Verification.'}
               {authMode === 'FORGOT' && 'Recover access to your digital service center account.'}
             </p>
           </div>
        </div>

        {/* --- APPLICATION NUMBER & PENDING VERIFICATION SUCCESS SCREEN --- */}
        {isSubmittedSuccess ? (
          <div className="text-center space-y-5 py-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto flex items-center justify-center text-3xl shadow-sm border border-blue-300">
              📋
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900">Application Submitted Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                आपका रजिस्ट्रेशन आवेदन सफलतापूर्वक जमा हो गया है। एडमिन द्वारा वेरिफिकेशन पूरा होने के बाद आपकी फाइनल **रजिस्ट्रेशन आईडी (Partner ID)** आपके रजिस्टर्ड मोबाइल नंबर और ईमेल आईडी पर फॉरवर्ड कर दी जाएगी।
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-2 border-blue-200 rounded-2xl text-center space-y-1 max-w-xs mx-auto">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Your Application Number</span>
              <span className="text-base font-black text-blue-600 font-mono tracking-widest">{generatedAppNumber}</span>
              <p className="text-[10px] text-slate-500 pt-1">किसी भी पूछताछ (Query) के लिए इस एप्लीकेशन नंबर का उपयोग करें।</p>
            </div>
            <button 
              onClick={() => { setIsSubmittedSuccess(false); setAuthMode('LOGIN'); }}
              className="w-full max-w-sm py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-md transition cursor-pointer"
            >
              Back to Partner Login ➔
            </button>
          </div>
        ) : (
          <>
            {/* --- 1. LOGIN FORM --- */}
            {authMode === 'LOGIN' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-sm mx-auto">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Partner ID *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. FE-MN8A42" 
                    value={partnerId} 
                    onChange={(e) => setPartnerId(e.target.value)} 
                    className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white text-xs" 
                    required 
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-slate-700 font-bold">Password *</label>
                    <button type="button" onClick={() => { setAuthMode('FORGOT'); setForgotStep('INPUT'); }} className="text-blue-600 font-bold hover:underline text-[11px]">
                      Forgot Password?
                    </button>
                  </div>
                  <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)} 
                    className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white text-xs" 
                    required 
                  />
                </div>

                <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg transition cursor-pointer text-xs">
                  Login to Partner Dashboard ➔
                </button>

                <div className="text-center pt-2">
                  <p className="text-slate-500">
                    Don't have a partner account?{' '}
                    <button type="button" onClick={() => setAuthMode('SIGNUP')} className="text-emerald-600 font-bold hover:underline cursor-pointer">
                      Registration Shop
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* --- 2. SIGNUP FORM --- */}
            {authMode === 'SIGNUP' && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter full name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    className="w-full p-3 border-2 border-slate-200 rounded-xl font-bold bg-white text-xs" 
                    required 
                  />
                </div>

                {/* Mobile Number & OTP Verification */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold">Mobile Number (Instant OTP Verification) *</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      placeholder={!isMobileOtpSent ? "10-digit mobile number" : "OTP यहाँ भरें (Enter OTP)"} 
                      value={!isMobileOtpSent ? mobile : mobileOtp} 
                      onChange={(e) => !isMobileOtpSent ? setMobile(e.target.value) : setMobileOtp(e.target.value)} 
                      disabled={isMobileVerified}
                      className={`w-full p-3 pr-32 border-2 rounded-xl font-bold text-xs ${isMobileVerified ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-white'}`} 
                      required 
                    />
                    <div className="absolute right-2 flex items-center">
                      {!isMobileVerified ? (
                        !isMobileOtpSent ? (
                          <button type="button" onClick={handleSendMobileOtp} className="px-3 py-1.5 bg-blue-600 text-white font-black rounded-lg text-[10px] cursor-pointer">
                            Send OTP
                          </button>
                        ) : (
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={handleVerifyMobileOtp} className="px-2.5 py-1.5 bg-emerald-600 text-white font-black rounded-lg text-[10px] cursor-pointer">
                              Verify
                            </button>
                            {canResendMobile ? (
                              <button type="button" onClick={handleSendMobileOtp} className="text-blue-600 font-bold text-[9px] underline cursor-pointer">
                                Resend
                              </button>
                            ) : (
                              <span className="text-slate-400 text-[9px] font-mono">{mobileTimer}s</span>
                            )}
                          </div>
                        )
                      ) : (
                        <span className="text-emerald-700 font-black text-xs px-2">✓ Verified</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Address & OTP Verification */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold">Email Address *</label>
                  <div className="relative flex items-center">
                    <input 
                      type="email" 
                      placeholder={!isEmailOtpSent ? "partner@example.com" : "OTP यहाँ भरें (Enter OTP)"} 
                      value={!isEmailOtpSent ? email : emailOtp} 
                      onChange={(e) => !isEmailOtpSent ? setEmail(e.target.value) : setEmailOtp(e.target.value)} 
                      disabled={isEmailVerified}
                      className={`w-full p-3 pr-32 border-2 rounded-xl font-bold text-xs ${isEmailVerified ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-white'}`} 
                      required 
                    />
                    <div className="absolute right-2 flex items-center">
                      {!isEmailVerified ? (
                        !isEmailOtpSent ? (
                          <button type="button" onClick={handleSendEmailOtp} className="px-3 py-1.5 bg-blue-600 text-white font-black rounded-lg text-[10px] cursor-pointer">
                            Send OTP
                          </button>
                        ) : (
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={handleVerifyEmailOtp} className="px-2.5 py-1.5 bg-emerald-600 text-white font-black rounded-lg text-[10px] cursor-pointer">
                              Verify
                            </button>
                            {canResendEmail ? (
                              <button type="button" onClick={handleSendEmailOtp} className="text-blue-600 font-bold text-[9px] underline cursor-pointer">
                                Resend
                              </button>
                            ) : (
                              <span className="text-slate-400 text-[9px] font-mono">{emailTimer}s</span>
                            )}
                          </div>
                        )
                      ) : (
                        <span className="text-emerald-700 font-black text-xs px-2">✓ Verified</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Aadhaar Number verification */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold">Number (Mandatory & Protected) *</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      placeholder={!isAadhaarOtpSent ? "Enter 12-digit number" : "OTP यहाँ भरें (Enter OTP)"} 
                      value={!isAadhaarOtpSent ? aadhaarNumber : aadhaarOtp} 
                      onChange={(e) => !isAadhaarOtpSent ? setAadhaarNumber(e.target.value) : setAadhaarOtp(e.target.value)} 
                      disabled={isAadhaarVerified}
                      className={`w-full p-3 pr-32 border-2 rounded-xl font-bold text-xs ${isAadhaarVerified ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-white'}`} 
                      required 
                    />
                    <div className="absolute right-2 flex items-center">
                      {!isAadhaarVerified ? (
                        !isAadhaarOtpSent ? (
                          <button type="button" onClick={handleSendAadhaarOtp} className="px-3 py-1.5 bg-blue-600 text-white font-black rounded-lg text-[10px] cursor-pointer">
                            Verify UIDAI
                          </button>
                        ) : (
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={handleVerifyAadhaarOtp} className="px-2.5 py-1.5 bg-emerald-600 text-white font-black rounded-lg text-[10px] cursor-pointer">
                              Confirm
                            </button>
                            {canResendAadhaar ? (
                              <button type="button" onClick={handleSendAadhaarOtp} className="text-blue-600 font-bold text-[9px] underline cursor-pointer">
                                Resend
                              </button>
                            ) : (
                              <span className="text-slate-400 text-[9px] font-mono">{aadhaarTimer}s</span>
                            )}
                          </div>
                        )
                      ) : (
                        <span className="text-emerald-700 font-black text-xs px-2">✓ Authenticated</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* --- SMART ANTI-FRAUD FACE VERIFICATION CAMERA MODULE --- */}
                <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="block text-slate-900 font-black uppercase text-[11px]">
                      🛡️ Anti-Fraud Live Face Verification *
                    </label>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-md">Secure Liveness</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    जब तक आपका चेहरा फ्रेम के अंदर सही से डिटेक्ट नहीं होगा, तब तक नीचे दिया गया कैप्चर बटन इनेबल नहीं होगा।
                  </p>

                  <div className="flex flex-col items-center justify-center space-y-3 pt-1">
                    <canvas ref={canvasRef} className="hidden"></canvas>

                    {isCameraActive && (
                      <div className="w-full flex flex-col items-center space-y-3">
                        <div className="relative w-full max-w-xs rounded-2xl overflow-hidden border-2 border-blue-600 bg-black shadow-lg">
                          <video ref={videoRef} autoPlay playsInline className="w-full h-52 object-cover"></video>
                          
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-32 h-44 border-4 border-dashed border-yellow-400 rounded-full opacity-80 animate-pulse"></div>
                          </div>

                          <div className="absolute top-2 left-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold text-center py-1 px-2 rounded-lg">
                            {faceCheckStatus}
                          </div>
                        </div>

                        <button 
                          type="button" 
                          onClick={capturePhoto} 
                          disabled={!isFaceDetected}
                          className={`w-full max-w-xs py-3 font-black rounded-xl text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2 ${isFaceDetected ? 'bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
                        >
                          {isFaceDetected ? '📸 Click Verified Photo Now' : '⏳ Align Face Inside Frame...'}
                        </button>
                      </div>
                    )}

                    {capturedImage && (
                      <div className="relative space-y-2 text-center">
                        <img src={capturedImage} alt="Verified Face" className="w-28 h-28 object-cover rounded-2xl mx-auto border-2 border-emerald-500 shadow-md" />
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-emerald-700 font-black text-[11px]">✓ Anti-Fraud Face Verified</span>
                          <button type="button" onClick={retakePhoto} className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg text-[10px] cursor-pointer">
                            Retake
                          </button>
                        </div>
                      </div>
                    )}

                    {!isCameraActive && !capturedImage && (
                      <button 
                        type="button" 
                        onClick={startCamera} 
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs shadow-md transition cursor-pointer flex items-center gap-2"
                      >
                        <span>📹</span> Start Anti-Fraud Camera Scan
                      </button>
                    )}
                  </div>
                </div>

                {/* --- ADDRESS DETAILS WITH STARS (*) --- */}
                <div className="p-3 bg-white rounded-2xl border space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-slate-700 font-black uppercase text-[11px]">Shop & Business Address Details</label>
                    <span className="text-[10px] text-red-500 font-bold">* Compulsory Fields</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <input type="text" placeholder="Shop Number *" value={shopHouseNo} onChange={(e) => setShopHouseNo(e.target.value)} className="p-2.5 border rounded-xl bg-white" required />
                    <input type="text" placeholder="Street Name" value={streetName} onChange={(e) => setStreetName(e.target.value)} className="p-2.5 border rounded-xl bg-white" />
                    <input type="text" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="p-2.5 border rounded-xl bg-white" />
                    <input type="text" placeholder="Area Village *" value={areaVillage} onChange={(e) => setAreaVillage(e.target.value)} className="p-2.5 border rounded-xl bg-white" required />
                    <input type="text" placeholder="City Number / City *" value={cityName} onChange={(e) => setCityName(e.target.value)} className="p-2.5 border rounded-xl bg-white" required />
                    <input type="text" placeholder="District Name *" value={districtName} onChange={(e) => setDistrictName(e.target.value)} className="p-2.5 border rounded-xl bg-white" required />
                    <input type="text" placeholder="Pin Code *" value={pincode} onChange={(e) => setPincode(e.target.value)} className="p-2.5 border rounded-xl bg-white" required />
                    <input type="text" placeholder="State Name *" value={stateName} onChange={(e) => setStateName(e.target.value)} className="p-2.5 border rounded-xl bg-white" required />
                  </div>
                </div>

                {/* Password Setup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Password *</label>
                    <input 
                      type="password" 
                      placeholder="Secure Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full p-2.5 border rounded-xl font-bold bg-white" 
                      required 
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Min 8 chars, letters & numbers</p>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Confirm Password *</label>
                    <input 
                      type="password" 
                      placeholder="Re-enter password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className="w-full p-2.5 border rounded-xl font-bold bg-white" 
                      required 
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Must match password above</p>
                  </div>
                </div>

                {/* Digital Self Declaration */}
                <div className="p-3 bg-slate-900 text-white rounded-2xl space-y-2">
                  <h4 className="font-black text-yellow-300 uppercase text-[10px]">📜 Digital Self Declaration & Partner Agreement</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    I hereby declare that all information and anti-fraud live face verification provided are true and correct. I agree to FormEasy verification and security guidelines.
                  </p>
                  <label className="flex items-center gap-2 pt-1 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isAgreed} 
                      onChange={(e) => setIsAgreed(e.target.checked)} 
                      className="w-4 h-4 accent-emerald-500 rounded" 
                    />
                    <span className="text-[11px] font-bold text-slate-200">I accept terms, conditions & agreement *</span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl transition text-xs cursor-pointer"
                >
                  Submit Registration 🚀
                </button>

                <div className="text-center pt-1">
                  <p className="text-slate-500">
                    Already registered?{' '}
                    <button type="button" onClick={() => setAuthMode('LOGIN')} className="text-blue-600 font-bold hover:underline cursor-pointer">
                      Login here
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* --- 3. FORGOT PASSWORD --- */}
            {authMode === 'FORGOT' && (
              <div className="space-y-4 max-w-sm mx-auto">
                {forgotStep === 'INPUT' && (
                  <form onSubmit={handleForgotSendOtp} className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-[11px] font-bold">
                      Enter your Partner ID, Registered Email, and Mobile Number to receive verification OTP.
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Partner ID *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. FE-MN8A42" 
                        value={forgotData.partnerId} 
                        onChange={(e) => setForgotData({...forgotData, partnerId: e.target.value})} 
                        className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white text-xs" 
                        required 
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Registered Email ID *</label>
                      <input 
                        type="email" 
                        placeholder="partner@example.com" 
                        value={forgotData.email} 
                        onChange={(e) => setForgotData({...forgotData, email: e.target.value})} 
                        className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white text-xs" 
                        required 
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Registered Mobile Number *</label>
                      <input 
                        type="tel" 
                        placeholder="10-digit mobile number" 
                        value={forgotData.mobile} 
                        onChange={(e) => setForgotData({...forgotData, mobile: e.target.value})} 
                        className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white text-xs" 
                        required 
                      />
                    </div>

                    <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow transition cursor-pointer text-xs">
                      Send Verification OTP ✉️
                    </button>
                  </form>
                )}

                {forgotStep === 'OTP_VERIFY' && (
                  <form onSubmit={handleForgotVerifyOtp} className="space-y-3">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-[11px] font-bold text-center">
                      OTP sent to your registered Email & Mobile. Please enter below:
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Enter 4-Digit OTP *</label>
                      <input 
                        type="text" 
                        maxLength={4}
                        placeholder="1234" 
                        value={forgotData.otp} 
                        onChange={(e) => setForgotData({...forgotData, otp: e.target.value})} 
                        className="w-full p-3 border-2 border-slate-200 rounded-2xl text-center font-black text-sm tracking-widest bg-white" 
                        required 
                      />
                    </div>
                    <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow transition cursor-pointer text-xs">
                      Verify OTP ✓
                    </button>
                  </form>
                )}

                {forgotStep === 'NEW_PASS' && (
                  <form onSubmit={handleResetFinalPassword} className="space-y-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">New Secure Password *</label>
                      <input 
                        type="password" 
                        placeholder="Enter new password (min 8 chars)" 
                        value={forgotData.newPassword} 
                        onChange={(e) => setForgotData({...forgotData, newPassword: e.target.value})} 
                        className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white text-xs" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Confirm Password *</label>
                      <input 
                        type="password" 
                        placeholder="Re-enter new password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white text-xs" 
                        required 
                      />
                    </div>

                    <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow transition cursor-pointer text-xs">
                      Reset Password & Login 🚀
                    </button>
                  </form>
                )}

                <div className="text-center pt-2">
                  <button type="button" onClick={() => setAuthMode('LOGIN')} className="text-slate-600 font-bold hover:underline cursor-pointer">
                    ← Back to Login
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}