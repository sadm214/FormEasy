// app/components/Header.tsx
'use client';
import React from 'react';

export default function Header({ 
  t, 
  currentLang, 
  setCurrentLang, 
  searchQuery, 
  setSearchQuery, 
  setCurrentView, 
  currentView, 
  setShowAuthModal, 
  setShowShopAuthModal, 
  setAuthMode, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  isLoggedIn = false,
  onOpenProfileDashboard
}: any) {
  return (
    <header className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white shadow-xl sticky top-0 z-40 border-b-2 border-yellow-400 font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
        
        {/* ================= DESKTOP VIEW ================= */}
        <div className="hidden sm:flex items-center justify-between gap-2">
          
          {/* Logo & Brand */}
          <div className="w-[30%] flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => setCurrentView('HOME')}>
            <div className="bg-yellow-400 text-blue-950 font-black text-sm sm:text-lg px-2 sm:px-2.5 py-1 rounded-xl shadow-lg transform hover:scale-105 transition">FE</div>
            <div>
              <span className="text-sm sm:text-xl font-black tracking-wider text-yellow-400 drop-shadow block leading-tight">FormEasy</span>
              <span className="text-[8px] text-slate-300 uppercase font-semibold block">Speed Meets Trust</span>
            </div>
          </div>
          
          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t?.searchPlaceholder || 'Search...'}
                className="w-full px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur text-slate-900 text-xs font-medium focus:outline-none focus:ring-4 focus:ring-yellow-400/50 shadow-inner transition"
              />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2 text-xs font-bold text-slate-400 hover:text-slate-700">✕</button>}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center justify-end gap-2 shrink-0">
            
            {/* Partner Login Button (Login ki purani jagah par) */}
            {currentView === 'SHOP_DASHBOARD' ? (
              <button onClick={() => setCurrentView('HOME')} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md transition cursor-pointer">
                {currentLang === 'hi' ? 'होम' : 'Home'}
              </button>
            ) : (
              <button 
                onClick={() => setShowShopAuthModal(true)} 
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md whitespace-nowrap transition cursor-pointer"
              >
                {t?.shopkeeperBtn || 'Partner Login'}
              </button>
            )}

            {/* My Account Button (Bilkul right side me, Login ki jagah replace kiya gaya hai) */}
            <button 
              onClick={() => { setAuthMode('LOGIN'); setShowAuthModal(true); }} 
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-md whitespace-nowrap transition cursor-pointer border border-blue-500/50"
            >
              {currentLang === 'hi' ? 'माई अकाउंट' : 'My Account'}
            </button>

            {/* Language Switcher */}
            <div className="flex bg-blue-900/80 border border-blue-700 rounded-xl p-0.5 text-xs font-bold shadow-inner">
              <button onClick={() => setCurrentLang('en')} className={`px-2 py-1 rounded-lg transition cursor-pointer ${currentLang === 'en' ? 'bg-yellow-400 text-blue-950 font-black shadow' : 'text-slate-200 hover:text-white'}`}>EN</button>
              <button onClick={() => setCurrentLang('hi')} className={`px-2 py-1 rounded-lg transition cursor-pointer ${currentLang === 'hi' ? 'bg-yellow-400 text-blue-950 font-black shadow' : 'text-slate-200 hover:text-white'}`}>HI</button>
            </div>
          </div>

        </div>


        {/* ================= PHONE / MOBILE VIEW ================= */}
        <div className="flex sm:hidden flex-col gap-2.5">
          
          {/* Top Row: Logo, Language Switcher & Menu Toggle */}
          <div className="w-full flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setCurrentView('HOME')}>
              <div className="bg-yellow-400 text-blue-950 font-black text-sm px-2 py-1 rounded-xl shadow-md">FE</div>
              <div>
                <span className="text-sm font-black tracking-wider text-yellow-400 block leading-tight">FormEasy</span>
              </div>
            </div>

            {/* Language Switcher in Center */}
            <div className="flex bg-blue-950/90 border border-blue-700/80 rounded-xl p-0.5 text-[11px] font-bold shadow-inner">
              <button onClick={() => setCurrentLang('en')} className={`px-2 py-1 rounded-lg transition ${currentLang === 'en' ? 'bg-yellow-400 text-blue-950 font-black shadow' : 'text-slate-200 hover:text-white'}`}>EN</button>
              <button onClick={() => setCurrentLang('hi')} className={`px-2 py-1 rounded-lg transition ${currentLang === 'hi' ? 'bg-yellow-400 text-blue-950 font-black shadow' : 'text-slate-200 hover:text-white'}`}>HI</button>
            </div>

            {/* Menu Toggle on Right */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="bg-blue-900 border border-blue-700 text-yellow-400 px-3 py-1.5 rounded-xl text-xs font-black shadow cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? '✕ Close' : '☰ Menu'}
            </button>
          </div>

          {/* Search Engine for Mobile */}
          <div className="w-full">
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t?.searchPlaceholder || '🔍 Search jobs, admit cards, exams...'}
                className="w-full px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur text-slate-900 text-xs font-medium focus:outline-none focus:ring-4 focus:ring-yellow-400/50 shadow-inner transition placeholder:text-slate-500"
              />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2 text-xs font-bold text-slate-400 hover:text-slate-700">✕</button>}
            </div>
          </div>

          {/* Partner & My Account Buttons for Mobile */}
          <div className="w-full flex items-center justify-center gap-2">
            {currentView === 'SHOP_DASHBOARD' ? (
              <button onClick={() => setCurrentView('HOME')} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded-xl shadow-md transition text-center cursor-pointer">
                {currentLang === 'hi' ? '🏠 होम पेज' : '🏠 Home'}
              </button>
            ) : (
              <button 
                onClick={() => setShowShopAuthModal(true)} 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl shadow-md transition text-center cursor-pointer border border-emerald-500/40"
              >
                🏪 {t?.shopkeeperBtn || 'Partner Login'}
              </button>
            )}

            <button 
              onClick={() => { setAuthMode('LOGIN'); setShowAuthModal(true); }} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold py-2 rounded-xl shadow-md transition text-center cursor-pointer border border-blue-500/40"
            >
              👤 {currentLang === 'hi' ? 'माई अकाउंट' : 'My Account'}
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}