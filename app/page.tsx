// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  translations, 
  liveJobs, 
  liveAdmitCards, 
  liveResults, 
  LangKey 
} from './data/portalData';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import HomeSection from './components/sections/HomeSection';
import CategoryPage from './components/sections/CategoryPage';

import LatestJobsPage from './pages/LatestJobsPage';
import AdmitCardPage from './pages/AdmitCardPage';
import ResultPage from './pages/ResultPage';
import AdmissionPage from './pages/AdmissionPage';

import CscEDistrictPage from './pages/CscEDistrictPage';
import DefencePolicePage from './pages/DefensePolicePage';

import ImportantLinks from './pages/ImportantLinks';
import AboutUsPage from './pages/AboutUsPage';
import TermsConditionPage from './pages/TermsConditionPage';
import ContactUsPage from './pages/ContactUsPage';
import SyllabusPage from './pages/SyllabusPage';
import AnswerKeyPage from './pages/AnswerKeyPage';
import ScholarshipPage from './pages/ScholarshipPage';
import CertificatePage from './pages/CertificatePage';

import UserDashboard from './components/Dashboards/UserDashboard';
import ShopDashboard from './components/Dashboards/ShopDashboard';
import AuthModal from './components/modals/AuthModal';
import ShopAuthModal from './components/modals/ShopAuthModal';
import SummaryModal from './components/modals/SummaryModal';
import CafeRadarModal from './components/modals/CafeRadarModal';

import PdfStudio from './components/tools/PdfStudio';
import PhotoResizer from './components/tools/PhotoResizer';
import BgRemover from './components/tools/BgRemover';
import AgeCalculator from './components/tools/AgeCalculator';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<LangKey>('en');
  const t = translations[currentLang];
  
  const [currentView, setCurrentView] = useState<string>('HOME');
  const [activeCategoryData, setActiveCategoryData] = useState<{ title: string; items: any[] } | null>(null);
  
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP' | 'FORGOT'>('LOGIN');
  const [showShopAuthModal, setShowShopAuthModal] = useState(false);
  const [showRadar, setShowRadar] = useState(false);
  const [activeTool, setActiveTool] = useState<string>('NONE');

  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('form_easy_welcome_seen');
    if (!hasSeenPopup) {
      setShowWelcomePopup(true);
    }
  }, []);

  const closeWelcomePopup = () => {
    setShowWelcomePopup(false);
    sessionStorage.setItem('form_easy_welcome_seen', 'true');
  };

  const latestUpdates = [...liveJobs, ...liveAdmitCards, ...liveResults];

  const [userWalletBalance] = useState(450);
  const [userFilledForms, setUserFilledForms] = useState([
    { id: 'FORM-101', name: 'SSC CGL 2026 Online Form', date: '10 Aug 2026', status: 'Submitted Successfully' }
  ]);
  const [userPendingForms] = useState([]);
  const [userAdmitCards] = useState([]);
  const [userReceipts] = useState([]);
  const [userPayments] = useState([]);
  const [candidateVault, setCandidateVault] = useState({
    fullName: 'R. H. Khan', fatherName: 'Mr. Khan', motherName: 'Mrs. Khan', dob: '2001-05-15', gender: 'Male', category: 'OBC', maritalStatus: 'Unmarried', phone: '9876543210', email: 'khan@example.com', district: 'Kushinagar', pincode: '274304', highSchoolMarks: '82.4%', interMarks: '78.2%'
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col justify-between">
      
      {/* हेडर */}
      <Header 
        t={t} currentLang={currentLang} setCurrentLang={setCurrentLang}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        setCurrentView={setCurrentView} currentView={currentView}
        setShowAuthModal={setShowAuthModal} setShowShopAuthModal={setShowShopAuthModal}
        setAuthMode={setAuthMode} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* नेवबार */}
      <Navbar 
        t={t} 
        currentLang={currentLang}
        currentView={currentView} 
        setCurrentView={setCurrentView}
        activeCategoryData={activeCategoryData} 
        setActiveCategoryData={setActiveCategoryData}
        liveJobs={liveJobs} 
        liveAdmitCards={liveAdmitCards} 
        liveResults={liveResults}
        liveCompAdmissions={liveJobs} 
        liveAcadAdmissions={liveJobs} 
        liveEdistrictServices={liveJobs}
        liveUtilities={liveJobs} 
        liveWelfare={liveJobs} 
        liveFinance={liveJobs} 
        liveAgri={liveJobs}
        liveDefence={liveJobs} 
        liveScholarships={liveJobs} 
        liveTaxes={liveJobs} 
        liveTransport={liveJobs}
        liveHousing={liveJobs} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* लाइव अपडेट्स टिकर */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-b border-amber-200 flex items-center px-4 py-2 text-xs sm:text-sm overflow-hidden shadow-inner">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-black px-3 py-1.5 shadow-sm shrink-0 z-10 flex items-center gap-1 text-[10px] uppercase tracking-wider">
          <span className="animate-pulse">⚡</span> Live Alerts
        </div>
        <div className="flex-1 overflow-hidden relative flex items-center ml-3">
          <div className="marquee-single-line whitespace-nowrap flex items-center gap-12 hover:[animation-play-state:paused]">
            {latestUpdates.map((item, idx) => (
              <span 
                key={idx} 
                onClick={() => setSelectedJob(item)} 
                className="cursor-pointer font-bold text-slate-800 hover:text-blue-700 hover:underline transition inline-flex items-center gap-1.5"
              >
                <span className="text-amber-600 font-black">•</span> {currentLang === 'hi' ? item.titleHi : item.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* मुख्य बॉडी और साइडबार ग्रिड लेआउट */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 w-full flex-grow flex flex-col lg:flex-row items-start gap-6">
        
        <main className="flex-grow w-full overflow-hidden">
          
          {currentView === 'HOME' && (
            <HomeSection 
              currentLang={currentLang} setCurrentView={setCurrentView}
              setSelectedJob={setSelectedJob} setActiveTool={setActiveTool}
              setShowAuthModal={setShowAuthModal} setShowShopAuthModal={setShowShopAuthModal}
              setAuthMode={setAuthMode} t={t} setActiveCategoryData={setActiveCategoryData}
            />
          )}

          {currentView === 'LATEST_JOBS' && (
            <LatestJobsPage currentLang={currentLang} setCurrentView={setCurrentView} setSelectedJob={setSelectedJob} onOpenCafeRadar={() => setShowRadar(true)} t={t} />
          )}

          {currentView === 'ADMIT_CARD' && (
            <AdmitCardPage currentLang={currentLang} setCurrentView={setCurrentView} setSelectedJob={setSelectedJob} onOpenCafeRadar={() => setShowRadar(true)} t={t} />
          )}

          {currentView === 'RESULT' && (
            <ResultPage currentLang={currentLang} setCurrentView={setCurrentView} setSelectedJob={setSelectedJob} onOpenCafeRadar={() => setShowRadar(true)} t={t} />
          )}

          {currentView === 'ADMISSION' && (
            <AdmissionPage />
          )}

          {currentView === 'CSC_EDISTRICT' && (
            <CscEDistrictPage />
          )}

          {currentView === 'DEFENCE_POLICE' && (
            <DefencePolicePage />
          )}

          {currentView === 'IMPORTANT_LINKS' && (
            <ImportantLinks currentLang={currentLang} />
          )}

          {currentView === 'ABOUT' && (
            <AboutUsPage currentLang={currentLang} />
          )}

          {currentView === 'TERMS' && (
            <TermsConditionPage currentLang={currentLang} />
          )}

          {currentView === 'CONTACT' && (
            <ContactUsPage currentLang={currentLang} />
          )}

          {currentView === 'SYLLABUS' && (
            <SyllabusPage currentLang={currentLang} setCurrentView={setCurrentView} setSelectedJob={setSelectedJob} onOpenCafeRadar={() => setShowRadar(true)} t={t} />
          )}

          {currentView === 'ANSWER_KEY' && (
            <AnswerKeyPage currentLang={currentLang} setCurrentView={setCurrentView} setSelectedJob={setSelectedJob} onOpenCafeRadar={() => setShowRadar(true)} t={t} />
          )}

          {currentView === 'SCHOLARSHIP' && (
            <ScholarshipPage currentLang={currentLang} setCurrentView={setCurrentView} setSelectedJob={setSelectedJob} onOpenCafeRadar={() => setShowRadar(true)} t={t} />
          )}

          {currentView === 'CERTIFICATE' && (
            <CertificatePage currentLang={currentLang} setCurrentView={setCurrentView} setSelectedJob={setSelectedJob} onOpenCafeRadar={() => setShowRadar(true)} t={t} />
          )}

          {currentView === 'CATEGORY_PAGE' && (
            <CategoryPage 
              currentView={currentView} activeCategoryData={activeCategoryData}
              currentLang={currentLang} setCurrentView={setCurrentView}
              setSelectedJob={setSelectedJob} setActiveTool={setActiveTool}
              setShowAuthModal={setShowAuthModal} setShowShopAuthModal={setShowShopAuthModal}
              setAuthMode={setAuthMode} liveJobs={liveJobs} t={t}
            />
          )}

          {currentView === 'USER_DASHBOARD' && (
            <UserDashboard 
              candidateVault={candidateVault} setCandidateVault={setCandidateVault}
              userWalletBalance={userWalletBalance} setUserWalletBalance={()=>{}}
              userFilledForms={userFilledForms} setUserFilledForms={setUserFilledForms}
              userPendingForms={userPendingForms} setUserPendingForms={()=>{}}
              userAdmitCards={userAdmitCards} setUserAdmitCards={()=>{}}
              userReceipts={userReceipts} setUserReceipts={()=>{}}
              userPayments={userPayments} setUserPayments={()=>{}}
              setCurrentView={setCurrentView} setShowProfileModal={()=>{}}
              currentLang={currentLang}
            />
          )}

          {currentView === 'SHOP_DASHBOARD' && (
            <ShopDashboard partnerId="FE-MN-1029" partnerName="R. H. Khan" shopName="Real Teach Information Center" onLogout={() => setCurrentView('HOME')} />
          )}

        </main>

        <aside className="w-full lg:w-80 flex-shrink-0">
          <Sidebar 
            currentLang={currentLang} 
            setCurrentView={setCurrentView} 
            setActiveTool={setActiveTool}
            setShowAuthModal={setShowAuthModal}
            setShowShopAuthModal={setShowShopAuthModal}
            setAuthMode={setAuthMode}
            t={t}
          />
        </aside>

      </div>

      {showWelcomePopup && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn font-sans">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 sm:p-8 shadow-2xl relative space-y-6 border border-blue-100 text-slate-800 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500"></div>
            <button 
              onClick={closeWelcomePopup} 
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center font-bold text-sm transition cursor-pointer"
            >
              ✕
            </button>
            <div className="space-y-2 pt-1 text-left">
              <span className="text-[10px] font-black tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200 px-3 py-1 rounded-full shadow-sm">
                🌟 Official Digital Hub
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug pt-1">
                {currentLang === 'hi' ? 'स्मार्ट डिजिटल सेवा पोर्टल में आपका स्वागत है' : 'Welcome to Smart Digital Service Portal'}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                {currentLang === 'hi' 
                  ? 'बिना किसी कतार के, घर बैठे अपने सभी सरकारी फॉर्म्स और दस्तावेज सुरक्षित तरीके से तैयार करवाएं।' 
                  : 'Skip the lines. Get all your government forms and documents processed securely from home.'}
              </p>
            </div>
            <button 
              onClick={closeWelcomePopup}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/20 text-xs sm:text-sm transition-all duration-200 cursor-pointer tracking-wider uppercase"
            >
              {currentLang === 'hi' ? 'पोर्टल का उपयोग शुरू करें ➔' : 'Explore Portal Now ➔'}
            </button>
          </div>
        </div>
      )}

      {showAuthModal && <AuthModal authMode={authMode} setAuthMode={setAuthMode} currentLang={currentLang} onClose={() => setShowAuthModal(false)} setCurrentView={setCurrentView} />}
      {showShopAuthModal && <ShopAuthModal onClose={() => setShowShopAuthModal(false)} setCurrentView={setCurrentView} />}
      {selectedJob && <SummaryModal job={selectedJob} t={t} onClose={() => setSelectedJob(null)} onOpenCafeRadar={() => setShowRadar(true)} />}
      {showRadar && <CafeRadarModal onClose={() => setShowRadar(false)} onPaymentSuccess={() => setShowRadar(false)} />}

      {activeTool === 'ALL_IN_ONE_PDF' && <PdfStudio onClose={() => setActiveTool('NONE')} currentLang={currentLang} />}
      {activeTool === 'PHOTO_RESIZER' && <PhotoResizer onClose={() => setActiveTool('NONE')} currentLang={currentLang} />}
      {activeTool === 'BG_CHANGER' && <BgRemover onClose={() => setActiveTool('NONE')} currentLang={currentLang} />}
      {activeTool === 'AGE_CALC' && <AgeCalculator onClose={() => setActiveTool('NONE')} currentLang={currentLang} />}

      <style dangerouslySetInnerHTML={{__html: `
        .marquee-single-line {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee-scroll 40s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />

      <Footer t={t} currentLang={currentLang} setCurrentView={setCurrentView} setActiveTool={setActiveTool} />
    </div>
  );
}