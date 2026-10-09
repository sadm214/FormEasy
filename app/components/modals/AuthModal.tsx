// app/components/modals/AuthModal.tsx
'use client';
import React, { useState } from 'react';

export default function AuthModal({ authMode, setAuthMode, currentLang, onClose, setCurrentView }: any) {
  // --- LOGIN STATES ---
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // --- SIGNUP STATES ---
  const [signupData, setSignupData] = useState({ fullName: '', phone: '', email: '', password: '' });

  // --- FORGOT PASSWORD STATES (3-Step OTP Flow) ---
  const [forgotStep, setForgotStep] = useState<'INPUT' | 'OTP_VERIFY' | 'NEW_PASS'>('INPUT');
  const [forgotInput, setForgotInput] = useState(''); // Mobile or Email
  const [otpValue, setOtpValue] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('🎉 User Login Successful! Redirecting to User Dashboard...');
    setCurrentView('USER_DASHBOARD');
    onClose();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('🎉 User Registration Successful! Welcome to FormEasy.');
    setCurrentView('USER_DASHBOARD');
    onClose();
  };

  // Step 1: Send OTP to Mobile or Email
  const handleSendForgotOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotInput.trim()) {
      alert('कृपया अपनी रजिस्टर्ड ईमेल आईडी या मोबाइल नंबर दर्ज करें!');
      return;
    }
    setForgotStep('OTP_VERIFY');
    alert(`📲 Verification OTP sent successfully to ${forgotInput}. (Simulated OTP: 1234)`);
  };

  // Step 2: Verify OTP
  const handleVerifyForgotOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue === '1234' || otpValue.length === 4) {
      setForgotStep('NEW_PASS');
      alert('✓ OTP Verified Successfully! Now enter your new password.');
    } else {
      alert('गलत OTP! कृपया पुनः प्रयास करें। (डिफ़ॉल्ट: 1234)');
    }
  };

  // Step 3: Save New Password
  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert('नया पासवर्ड कम से कम 6 कैरेक्टर का होना चाहिए!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('पासवर्ड और कंफर्म पासवर्ड मेल नहीं खा रहे हैं!');
      return;
    }
    alert('🎉 पासवर्ड सफलतापूर्वक रीसेट हो गया है! अब आप नए पासवर्ड से लॉगिन कर सकते हैं।');
    setAuthMode('LOGIN');
    setForgotStep('INPUT');
    setForgotInput('');
    setOtpValue('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6 text-slate-800 font-sans text-xs">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 font-bold text-slate-600 flex items-center justify-center transition"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-3 border-b pb-5">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest mx-auto inline-block shadow-md">
            FormEasy Portal
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900">
              {authMode === 'LOGIN' && 'User Login'}
              {authMode === 'SIGNUP' && 'Candidate Registration'}
              {authMode === 'FORGOT' && 'Reset Password'}
            </h2>
            <p className="text-slate-400 text-[11px]">
              {authMode === 'LOGIN' && 'Access your profile vault, applications and active orders.'}
              {authMode === 'SIGNUP' && 'Create your FormEasy account to manage online forms.'}
              {authMode === 'FORGOT' && 'Securely recover your account via Mobile or Email OTP.'}
            </p>
          </div>
        </div>

        {/* --- 1. LOGIN VIEW --- */}
        {authMode === 'LOGIN' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Mobile Number or Email ID *</label>
              <input 
                type="text" 
                placeholder="Enter mobile or email" 
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)} 
                className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white" 
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
                placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white" 
                required 
              />
            </div>

            <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg transition">
              Sign In ➔
            </button>

            <div className="text-center pt-2">
              <p className="text-slate-500">
                Don't have an account?{' '}
                <button type="button" onClick={() => setAuthMode('SIGNUP')} className="text-blue-600 font-bold hover:underline">
                  Register here
                </button>
              </p>
            </div>
          </form>
        )}

        {/* --- 2. SIGNUP VIEW --- */}
        {authMode === 'SIGNUP' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                value={signupData.fullName} 
                onChange={(e) => setSignupData({...signupData, fullName: e.target.value})} 
                className="w-full p-2.5 border rounded-xl font-bold bg-white" 
                required 
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Mobile Number *</label>
              <input 
                type="tel" 
                placeholder="10-digit mobile number" 
                value={signupData.phone} 
                onChange={(e) => setSignupData({...signupData, phone: e.target.value})} 
                className="w-full p-2.5 border rounded-xl font-bold bg-white" 
                required 
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Email ID *</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={signupData.email} 
                onChange={(e) => setSignupData({...signupData, email: e.target.value})} 
                className="w-full p-2.5 border rounded-xl font-bold bg-white" 
                required 
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Password *</label>
              <input 
                type="password" 
                placeholder="Create secure password" 
                value={signupData.password} 
                onChange={(e) => setSignupData({...signupData, password: e.target.value})} 
                className="w-full p-2.5 border rounded-xl font-bold bg-white" 
                required 
              />
            </div>

            <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow transition mt-2">
              Register Account ✓
            </button>

            <div className="text-center pt-2">
              <p className="text-slate-500">
                Already registered?{' '}
                <button type="button" onClick={() => setAuthMode('LOGIN')} className="text-blue-600 font-bold hover:underline">
                  Login here
                </button>
              </p>
            </div>
          </form>
        )}

        {/* --- 3. FORGOT PASSWORD VIEW (3-STEP OTP FLOW) --- */}
        {authMode === 'FORGOT' && (
          <div className="space-y-4">
            
            {/* Step 1: Input Mobile or Email */}
            {forgotStep === 'INPUT' && (
              <form onSubmit={handleSendForgotOtp} className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-[11px] font-bold">
                  Enter your registered mobile number or email address to receive verification OTP.
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Mobile Number or Email ID *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 9876543210 or name@example.com" 
                    value={forgotInput} 
                    onChange={(e) => setForgotInput(e.target.value)} 
                    className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white" 
                    required 
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow transition">
                  Send OTP ✉️
                </button>
              </form>
            )}

            {/* Step 2: Verify OTP */}
            {forgotStep === 'OTP_VERIFY' && (
              <form onSubmit={handleVerifyForgotOtp} className="space-y-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-[11px] font-bold text-center">
                  OTP sent to <strong>{forgotInput}</strong>. Please enter the 4-digit code:
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Enter OTP *</label>
                  <input 
                    type="text" 
                    maxLength={4}
                    placeholder="1234" 
                    value={otpValue} 
                    onChange={(e) => setOtpValue(e.target.value)} 
                    className="w-full p-3 border-2 border-slate-200 rounded-2xl text-center font-black text-sm tracking-widest bg-white" 
                    required 
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow transition">
                  Verify OTP ✓
                </button>
              </form>
            )}

            {/* Step 3: New Password & Confirm Password */}
            {forgotStep === 'NEW_PASS' && (
              <form onSubmit={handleSaveNewPassword} className="space-y-3">
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-indigo-900 text-[11px] font-bold text-center">
                  OTP Verified! Now create your new password.
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">New Password *</label>
                  <input 
                    type="password" 
                    placeholder="Enter new password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white" 
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
                    className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold bg-white" 
                    required 
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow transition">
                  Reset Password & Login 🚀
                </button>
              </form>
            )}

            <div className="text-center pt-2">
              <button type="button" onClick={() => { setAuthMode('LOGIN'); setForgotStep('INPUT'); }} className="text-slate-600 font-bold hover:underline">
                ← Back to Login
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}