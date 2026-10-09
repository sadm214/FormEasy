// app/components/Sidebar.tsx
'use client';
import React from 'react';

export default function Sidebar({ t, currentLang, setCurrentView, setActiveTool, setShowAuthModal, setShowShopAuthModal, setAuthMode }: any) {
  return (
    <aside className="w-full space-y-5 font-sans pb-6">
      
      {/* Box 1: Quick Access Portal */}
      <div className="bg-gradient-to-b from-white to-blue-50/50 rounded-2xl border border-blue-100 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-blue-100 pb-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-md">🔐</div>
          <div>
            <h3 className="font-black text-slate-900 text-sm">Quick Access Portal</h3>
            <span className="text-[10px] text-blue-600 font-bold">Secure User & Partner Hub</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          {currentLang === 'hi' 
            ? 'अपने फॉर्म्स, पेमेंट्स और एप्लीकेशन स्टेटस को मैनेज करने के लिए लॉगिन करें।' 
            : 'Login securely to manage your applications, payments, and document vault.'}
        </p>
        <div className="space-y-2.5 pt-1">
          <button 
            onClick={() => { setAuthMode('LOGIN'); setShowAuthModal(true); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition cursor-pointer flex justify-center items-center gap-2"
          >
            👤 {t?.userLoginBtn || 'User Login & Registration'}
          </button>
          <button 
            onClick={() => setShowShopAuthModal(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition cursor-pointer flex justify-center items-center gap-2"
          >
            🏪 {t?.shopkeeperBtn || 'Partner & Cafe Login'}
          </button>
        </div>
      </div>

      {/* Box 2: Quick Tools */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg p-5 space-y-4 text-white">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold text-base shadow-md">🛠️</div>
          <div>
            <h3 className="font-black text-yellow-400 text-sm">Quick Tools</h3>
            <span className="text-[10px] text-slate-400 font-semibold">Utility Suite</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button onClick={() => setActiveTool('AGE_CALC')} className="bg-slate-800/90 hover:bg-blue-600 border border-slate-700 rounded-xl p-3 flex flex-col items-center text-center gap-2 transition cursor-pointer group shadow-sm">
            <span className="text-xl group-hover:scale-110 transition">📅</span>
            <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">Age Calculator</span>
          </button>
          <button onClick={() => setActiveTool('PHOTO_RESIZER')} className="bg-slate-800/90 hover:bg-blue-600 border border-slate-700 rounded-xl p-3 flex flex-col items-center text-center gap-2 transition cursor-pointer group shadow-sm">
            <span className="text-xl group-hover:scale-110 transition">🖼️</span>
            <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">Photo Resizer</span>
          </button>
          <button onClick={() => setActiveTool('BG_CHANGER')} className="bg-slate-800/90 hover:bg-blue-600 border border-slate-700 rounded-xl p-3 flex flex-col items-center text-center gap-2 transition cursor-pointer group shadow-sm">
            <span className="text-xl group-hover:scale-110 transition">✂️</span>
            <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">BG Remover</span>
          </button>
          <button onClick={() => setActiveTool('ALL_IN_ONE_PDF')} className="bg-slate-800/90 hover:bg-blue-600 border border-slate-700 rounded-xl p-3 flex flex-col items-center text-center gap-2 transition cursor-pointer group shadow-sm">
            <span className="text-xl group-hover:scale-110 transition">📄</span>
            <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">PDF Studio</span>
          </button>
        </div>
      </div>

      {/* Box 3: Sponsored / Cafe Partner Area */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-yellow-200 shadow-sm p-4 text-center space-y-2 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500"></div>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Sponsored AD</span>
        <h4 className="font-black text-slate-900 text-sm">Real Teach Info Center</h4>
        <p className="text-xs text-slate-600 font-medium pb-1">Best Cyber Cafe in Khadda. Get your forms filled securely!</p>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-[10px] px-4 py-1.5 rounded-full shadow-sm transition cursor-pointer">
          Contact Now
        </button>
      </div>

    </aside>
  );
}