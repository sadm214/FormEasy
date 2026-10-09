// app/components/Dashboards/UserDashboard.tsx
'use client';
import React, { useState } from 'react';
import MasterVaultModal from './MasterVaultModal';

export default function UserDashboard({
  candidateVault,
  setCandidateVault,
  userWalletBalance,
  setUserWalletBalance,
  userFilledForms,
  setUserFilledForms,
  userPendingForms,
  setUserPendingForms,
  userAdmitCards,
  setUserAdmitCards,
  userReceipts,
  setUserReceipts,
  userPayments,
  setUserPayments,
  setCurrentView,
  setShowProfileModal,
  currentLang = 'en'
}: any) {
  
  // Wallet Modal & Payment States
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Clickable Stat Cards Modal States
  const [activeModalType, setActiveModalType] = useState<string | null>(null);

  // Master Vault Modal Visibility State
  const [showVaultModal, setShowVaultModal] = useState(false);

  // Secure PDF Viewer Modal State
  const [viewingPdfItem, setViewingPdfItem] = useState<any | null>(null);

  // View Status Popup State for Live Tracking
  const [selectedTrackingItem, setSelectedTrackingItem] = useState<any | null>(null);

  // --- NAVIGATION & CHAT WITH CAFE STATES ---
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CHAT_HUB' | 'TRACKING'>('OVERVIEW');

  // --- LIVE ORDER TRACKING STATES (Cleaned of Escrow terminology) ---
  const [ordersTracking, setOrdersTracking] = useState([
    {
      orderId: 'ORD-501',
      serviceName: 'SSC CGL 2026 Online Form',
      cafeName: 'Sri Ganesh Online Services',
      operator: 'R. H. Khan',
      serviceFee: '₹50',
      status: 'WORK_SUBMITTED', // 'PENDING' | 'ACCEPTED' | 'WORKING' | 'WORK_SUBMITTED' | 'COMPLETED'
      statusTextHi: 'फॉर्म कार्य पूर्ण और सबमिट हो चुका है',
      statusTextEn: 'Form work completed & submitted for review',
      date: '16 Sept 2026'
    },
    {
      orderId: 'ORD-502',
      serviceName: 'UP Police Constable Recruitment 2026',
      cafeName: 'Real Teach Info Center',
      operator: 'A. Rahman',
      serviceFee: '₹50',
      status: 'WORKING',
      statusTextHi: 'कैफे पार्टनर द्वारा फॉर्म भरा जा रहा है',
      statusTextEn: 'Cafe partner is currently filling your form',
      date: '16 Sept 2026'
    }
  ]);

  // --- 5TH BOX: APPROVED & RECHECKED FILES VAULT ---
  const [approvedFinalVault, setApprovedFinalVault] = useState([
    {
      orderId: 'ORD-401',
      serviceName: 'UP Police Constable Application Form',
      approvedDate: '15 Sept 2026',
      cafe: 'Real Teach Info Center',
      status: 'Approved & Credited'
    }
  ]);

  const [activeOrdersChat, setActiveOrdersChat] = useState([
    {
      orderId: 'ORD-501',
      serviceName: 'SSC CGL 2026 Online Form',
      cafeName: 'Sri Ganesh Online Services',
      cafeId: 'FE-MN1997',
      status: 'Pending',
      messages: [
        { senderName: 'Sri Ganesh Online Services', senderId: 'FE-MN1997', text: 'Hello! Your order ORD-501 is received. Please share your documents.', time: '10:05 AM', file: null as string | null }
      ]
    }
  ]);

  const [selectedOrderChatId, setSelectedOrderChatId] = useState('ORD-501');
  const [chatInput, setChatInput] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const clientId = 'FE-USER-8841';
  const clientName = candidateVault?.fullName || 'R. H. Khan';
  const currentActiveChat = activeOrdersChat.find(c => c.orderId === selectedOrderChatId);

  // Handle Add Money to Wallet
  const handleAddMoneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(addAmount);
    if (isNaN(amt) || amt < 50 || amt > 10000000) {
      alert('कृपया वैध राशि दर्ज करें!');
      return;
    }

    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setUserWalletBalance((prev: number) => prev + amt);
      setShowWalletModal(false);
      setAddAmount('');
      alert(`🎉 Successfully added ₹${amt} to your digital wallet!`);
    }, 2000);
  };

  const handleSendCafeMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() && !attachedFile) return;

    const newMessage = {
      senderName: clientName,
      senderId: clientId,
      text: chatInput.trim() || (attachedFile ? `Shared file: ${attachedFile.name}` : ''),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      file: attachedFile ? attachedFile.name : null
    };

    setActiveOrdersChat(prev => prev.map(order => {
      if (order.orderId === selectedOrderChatId) {
        return { ...order, messages: [...order.messages, newMessage] };
      }
      return order;
    }));

    setChatInput('');
    setAttachedFile(null);
  };

  // --- CORE LOGIC: USER CLICKS 'DONE' (REMOVES FROM TRACKING & MOVES TO FILLED FORMS) ---
  const handleApproveFinalSubmission = (order: any) => {
    setOrdersTracking(prev => prev.filter(ord => ord.orderId !== order.orderId));

    const newFilledFormItem = {
      id: order.orderId,
      name: order.serviceName,
      date: new Date().toLocaleDateString(),
      status: 'Completed & Verified'
    };
    setUserFilledForms((prev: any) => [newFilledFormItem, ...prev]);

    const newApprovedItem = {
      orderId: order.orderId,
      serviceName: order.serviceName,
      approvedDate: new Date().toLocaleDateString(),
      cafe: order.cafeName || 'Sri Ganesh Online Services',
      status: 'Approved & Credited'
    };
    setApprovedFinalVault(prev => [newApprovedItem, ...prev]);

    const unlockedCert = {
      id: `CERT-${order.orderId}`,
      name: `${order.serviceName} - Final Certificate / Admit Card`,
      date: new Date().toLocaleDateString(),
      status: 'Unlocked & Ready'
    };
    setUserAdmitCards((prev: any) => [unlockedCert, ...prev]);

    setViewingPdfItem(null);
  };

  const handleDownloadCertificate = (certId: string) => {
    alert(`📥 Downloading unlocked certificate / admit card for ID: ${certId} (Secure PDF Download)`);
  };

  return (
    <div className="space-y-6">
      
      {/* Navigation Tabs Switcher (Cleaned of Escrow term) */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 font-bold text-xs">
        <button onClick={() => setActiveTab('OVERVIEW')} className={`px-4 py-2 rounded-xl transition ${activeTab === 'OVERVIEW' ? 'bg-blue-600 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
          📊 Dashboard Overview
        </button>
        <button onClick={() => setActiveTab('TRACKING')} className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'TRACKING' ? 'bg-blue-600 text-white shadow' : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-50'}`}>
          📦 Live Order Tracking <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        </button>
        <button onClick={() => setActiveTab('CHAT_HUB')} className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'CHAT_HUB' ? 'bg-blue-600 text-white shadow' : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-50'}`}>
          💬 Chat with Cafe <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
      </div>

      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* User Greeting & Status Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1 z-10">
              <span className="bg-blue-500/30 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-400/30">
                {currentLang === 'hi' ? 'प्रोफाइल सक्रिय' : 'Profile Active'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                {currentLang === 'hi' ? `स्वागत है, ${candidateVault.fullName}` : `Welcome, ${candidateVault.fullName}`} 👋
              </h2>
              <p className="text-slate-400 text-xs">
                Mobile: {candidateVault.phone} | Email: {candidateVault.email} | District: {candidateVault.district}
              </p>
            </div>

            {/* Wallet Balance Box */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl text-right z-10 w-full sm:w-auto">
              <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                {currentLang === 'hi' ? 'डिजिटल वॉलेट बैलेंस' : 'Digital Wallet Balance'}
              </p>
              <p className="text-xl font-black text-emerald-400">₹{userWalletBalance}</p>
              <button 
                onClick={() => setShowWalletModal(true)}
                className="mt-2 w-full sm:w-auto px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs transition transform hover:scale-105 cursor-pointer"
              >
                {currentLang === 'hi' ? '+ फंड जोड़ें (Add Money)' : '+ Add Money'}
              </button>
            </div>
          </div>

          {/* 5 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            <div onClick={() => setActiveModalType('FILLED')} className="bg-blue-500 text-white p-4 sm:p-5 rounded-3xl shadow-lg space-y-1 transform transition hover:scale-105 cursor-pointer">
              <p className="text-2xl sm:text-3xl font-black">{userFilledForms.length}</p>
              <p className="text-xs font-bold opacity-90">{currentLang === 'hi' ? 'भरे गए फॉर्म' : 'Filled Forms'} ➔</p>
            </div>

            <div onClick={() => setActiveModalType('PENDING')} className="bg-orange-500 text-white p-4 sm:p-5 rounded-3xl shadow-lg space-y-1 transform transition hover:scale-105 cursor-pointer">
              <p className="text-2xl sm:text-3xl font-black">{userPendingForms.length}</p>
              <p className="text-xs font-bold opacity-90">{currentLang === 'hi' ? 'लंबित फॉर्म' : 'Pending Forms'} ➔</p>
            </div>

            <div onClick={() => setActiveModalType('ADMIT')} className="bg-teal-600 text-white p-4 sm:p-5 rounded-3xl shadow-lg space-y-1 transform transition hover:scale-105 cursor-pointer">
              <p className="text-2xl sm:text-3xl font-black">{userAdmitCards.length}</p>
              <p className="text-xs font-bold opacity-90">{currentLang === 'hi' ? 'सर्टिफिकेट & एडमिट कार्ड' : 'Certificates & Admit'} ➔</p>
            </div>

            <div onClick={() => setActiveModalType('RECEIPTS')} className="bg-indigo-600 text-white p-4 sm:p-5 rounded-3xl shadow-lg space-y-1 transform transition hover:scale-105 cursor-pointer">
              <p className="text-2xl sm:text-3xl font-black">{userReceipts.length}</p>
              <p className="text-xs font-bold opacity-90">{currentLang === 'hi' ? 'रसीदें' : 'Receipts'} ➔</p>
            </div>

            {/* 5th Box: Approved Vault */}
            <div onClick={() => setActiveModalType('APPROVED_VAULT')} className="col-span-2 sm:col-span-1 bg-emerald-600 text-white p-4 sm:p-5 rounded-3xl shadow-lg space-y-1 transform transition hover:scale-105 cursor-pointer">
              <p className="text-2xl sm:text-3xl font-black">{approvedFinalVault.length}</p>
              <p className="text-xs font-bold opacity-90">{currentLang === 'hi' ? 'अप्रूव्ड वॉल्ट' : 'Approved Vault'} ➔</p>
            </div>
          </div>

          {/* Master Profile Vault Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                {currentLang === 'hi' ? 'मास्टर प्रोफाइल वॉल्ट (1-Click Auto-Fill Vault)' : 'Master Profile Vault (1-Click Auto-Fill Vault)'}
              </h3>
              <p className="text-slate-500 text-xs">
                Securely manage personal, academic, and document details.
              </p>
            </div>

            <button 
              onClick={() => setShowVaultModal(true)}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-md transition text-xs sm:text-sm whitespace-nowrap cursor-pointer"
            >
              Master Vault & Docs
            </button>
          </div>

        </div>
      )}

      {/* --- LIVE ORDER TRACKING TAB (Clean Responsive Table & View Status Modal) --- */}
      {activeTab === 'TRACKING' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border space-y-5 animate-fadeIn max-w-4xl mx-auto">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">📦 Live Order Tracking</h3>
            <p className="text-slate-400 text-[11px]">Track your assigned form filling orders in real-time. Click 'View Status' for detailed progress updates.</p>
          </div>

          <div className="overflow-x-auto">
            {ordersTracking.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase text-[10px] font-black">
                    <th className="p-3 rounded-l-xl">Order ID</th>
                    <th className="p-3">Form / Service Name</th>
                    <th className="p-3">Assigned Cafe</th>
                    <th className="p-3">Live Status</th>
                    <th className="p-3 text-right rounded-r-xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ordersTracking.map((order) => (
                    <tr key={order.orderId} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-blue-600">{order.orderId}</td>
                      <td className="p-3 font-bold text-slate-900">{order.serviceName}</td>
                      <td className="p-3 text-slate-600">
                        <span className="font-bold block">{order.cafeName}</span>
                        <span className="text-[10px] text-slate-400">Op: {order.operator}</span>
                      </td>
                      <td className="p-3">
                        {order.status === 'PROCESSING' && (
                          <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-[9px] uppercase">
                            ⏳ Pending / Working
                          </span>
                        )}
                        {order.status === 'WORKING' && (
                          <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-bold text-[9px] uppercase animate-pulse">
                            ⚙️ On Working
                          </span>
                        )}
                        {order.status === 'WORK_SUBMITTED' && (
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[9px] uppercase animate-pulse">
                            ✓ Completed
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button 
                          onClick={() => setSelectedTrackingItem(order)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[11px] shadow transition cursor-pointer inline-block"
                        >
                          View Status
                        </button>
                        {order.status === 'WORK_SUBMITTED' && (
                          <button 
                            onClick={() => setViewingPdfItem(order)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-[11px] shadow transition cursor-pointer inline-block mt-1 sm:mt-0"
                          >
                            View PDF
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 bg-slate-50 rounded-2xl border text-center text-slate-500 text-xs space-y-1">
                <p className="font-bold">No active orders in live tracking.</p>
                <p className="text-[11px] text-slate-400">All completed orders have been successfully verified and moved to your Filled Forms.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- VIEW STATUS POPUP MODAL --- */}
      {selectedTrackingItem && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 font-sans text-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-4 animate-fadeIn text-slate-800">
            <button onClick={() => setSelectedTrackingItem(null)} className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 rounded-full w-7 h-7 font-bold text-slate-600 flex items-center justify-center transition cursor-pointer">✕</button>

            <div className="border-b pb-3 space-y-1">
              <span className="font-mono font-black text-blue-600 text-[10px]">Order ID: {selectedTrackingItem.orderId}</span>
              <h3 className="text-base font-black text-slate-900">{selectedTrackingItem.serviceName}</h3>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold">Assigned Cafe:</span>
                <span className="font-black text-slate-900">{selectedTrackingItem.cafeName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold">Operator Name:</span>
                <span className="font-black text-slate-900">{selectedTrackingItem.operator}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold">Service Fee:</span>
                <span className="font-black text-emerald-600">{selectedTrackingItem.serviceFee}</span>
              </div>
              <div className="border-t pt-2 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[9px] block">Current Live Status Update</span>
                <p className="font-bold text-blue-700 text-xs bg-blue-50 p-2.5 rounded-xl border border-blue-100">
                  {currentLang === 'hi' ? selectedTrackingItem.statusTextHi : selectedTrackingItem.statusTextEn}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button onClick={() => setSelectedTrackingItem(null)} className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl text-xs transition cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* --- SECURE PDF VIEWER MODAL (WITH CLEAN 'DONE' BUTTON) --- */}
      {viewingPdfItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 font-sans">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative space-y-4 max-h-[92vh] overflow-y-auto text-slate-800 select-none print:hidden">
            
            <button 
              onClick={() => setViewingPdfItem(null)} 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            <div className="border-b pb-3 pr-8 space-y-1">
              <span className="text-[10px] font-black tracking-widest text-blue-700 uppercase bg-blue-50 px-2.5 py-0.5 rounded-full">
                🔒 Secure Protected Document Viewer
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">{viewingPdfItem.serviceName}</h3>
              <p className="text-xs text-slate-500 font-mono">Order ID: {viewingPdfItem.orderId} | Cafe: {viewingPdfItem.cafeName || viewingPdfItem.cafe}</p>
            </div>

            <div className="relative bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-4 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none rotate-[-30deg]">
                <p className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-widest">FORMEASY SECURE VAULT - NO SCREENSHOT</p>
              </div>

              <div className="space-y-2 relative z-10">
                <div className="text-4xl">📄</div>
                <h4 className="font-black text-slate-800 text-sm sm:text-base">Final Submission Preview (Form Data & Profile)</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  यह दस्तावेज FormEasy एन्क्रिप्टेड सर्वर से सुरक्षित रूप से लोड किया गया है। गोपनीयता कारणों से इस स्क्रीन का स्क्रीनशॉट या प्रिंट लेना प्रतिबंधित है।
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border text-left text-xs space-y-2 relative z-10 text-slate-700">
                <div className="flex justify-between border-b pb-1 font-bold">
                  <span>Candidate Name: {candidateVault.fullName}</span>
                  <span>District: {candidateVault.district}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Mobile: {candidateVault.phone}</span>
                  <span>Email: {candidateVault.email}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-emerald-700">
                  <span>Submission Status: Verified & Completed</span>
                  <span>Fee Paid: ₹100</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleApproveFinalSubmission(viewingPdfItem)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg transition cursor-pointer text-xs flex items-center justify-center gap-2"
              >
                <span>✓</span> Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- CHAT WITH CAFE HUB --- */}
      {activeTab === 'CHAT_HUB' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border space-y-4 animate-fadeIn max-w-4xl mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-3 gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900">Chat with Cafe</h3>
              <p className="text-slate-400 text-[11px]">Chat directly with your assigned cyber cafe partner and share documents (PDF/JPG).</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-slate-50 p-4 rounded-2xl border space-y-2">
              <p className="font-black text-slate-500 uppercase text-[10px]">Select Order</p>
              {activeOrdersChat.map((order) => (
                <button 
                  key={order.orderId}
                  onClick={() => setSelectedOrderChatId(order.orderId)}
                  className={`w-full text-left p-3 rounded-xl transition font-bold space-y-1 ${selectedOrderChatId === order.orderId ? 'bg-blue-600 text-white shadow' : 'bg-white hover:bg-slate-100 text-slate-800 border'}`}
                >
                  <div className="flex justify-between items-center text-[10px] opacity-90">
                    <span>{order.orderId}</span>
                    <span className="px-1.5 py-0.5 bg-black/20 rounded">{order.status}</span>
                  </div>
                  <p className="text-xs truncate">{order.cafeName}</p>
                </button>
              ))}
            </div>

            <div className="md:col-span-2 space-y-3">
              {currentActiveChat && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center text-xs font-bold text-blue-950">
                  <span>Cafe: {currentActiveChat.cafeName}</span>
                  <span>Order: {currentActiveChat.orderId}</span>
                </div>
              )}

              <div className="h-64 overflow-y-auto space-y-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                {currentActiveChat?.messages.map((msg, idx) => {
                  const isMe = msg.senderId === clientId;
                  return (
                    <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-xs p-3 rounded-2xl shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-800 border rounded-bl-none'}`}>
                        <div className="flex justify-between items-center gap-3 pb-0.5 opacity-80 text-[9px] font-bold">
                          <span>{isMe ? 'Chat with me' : msg.senderName}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="text-xs">{msg.text}</p>
                        {msg.file && (
                          <div className="mt-1.5 p-1.5 bg-black/10 rounded-lg flex items-center justify-between gap-2 text-[10px] font-bold">
                            <span>📎 {msg.file}</span>
                            <button type="button" onClick={() => alert(`Opening document: ${msg.file}`)} className="px-2 py-0.5 bg-white text-blue-900 rounded text-[9px]">View</button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSendCafeMessage} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type message to cafe..." 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)} 
                  className="flex-1 p-3 border-2 border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-600 bg-slate-50" 
                />
                <label className="px-3 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer flex items-center gap-1 text-xs">
                  <span>{attachedFile ? 'Attached' : '📎 Docs'}</span>
                  <input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={(e) => setAttachedFile(e.target.files ? e.target.files[0] : null)} className="hidden" />
                </label>
                <button type="submit" className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs shadow">
                  Send
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

      {/* --- MASTER VAULT MODAL --- */}
      <MasterVaultModal 
        isOpen={showVaultModal} 
        onClose={() => setShowVaultModal(false)} 
        candidateVault={candidateVault} 
      />

      {/* --- ADD MONEY TO WALLET MODAL --- */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-5 animate-fadeIn text-slate-800">
            <button onClick={() => setShowWalletModal(false)} className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 font-bold text-slate-600 flex items-center justify-center transition">✕</button>

            <div className="text-center space-y-1">
              <span className="text-3xl">💳</span>
              <h3 className="text-lg font-black text-slate-900">{currentLang === 'hi' ? 'वॉलेट में पैसे जोड़ें' : 'Add Money to Wallet'}</h3>
              <p className="text-slate-500 text-xs">Add min ₹50 securely via UPI.</p>
            </div>

            <form onSubmit={handleAddMoneySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Enter Amount (₹)*</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 font-bold text-slate-400">₹</span>
                  <input type="number" min="50" max="10000000" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} placeholder="500" className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 text-sm focus:outline-none focus:border-blue-600 transition bg-white" required />
                </div>
                <div className="flex gap-2 mt-2">
                  {[100, 500, 1000, 5000].map((quickAmt) => (
                    <button key={quickAmt} type="button" onClick={() => setAddAmount(quickAmt.toString())} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 transition">+₹{quickAmt}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Payment Gateway:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => setSelectedUpiApp('gpay')} className={`p-3 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition ${selectedUpiApp === 'gpay' ? 'border-blue-600 bg-blue-50/50 text-blue-900' : 'border-slate-200 text-slate-600'}`}><span>📱</span> Google Pay</button>
                  <button type="button" onClick={() => setSelectedUpiApp('phonepe')} className={`p-3 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition ${selectedUpiApp === 'phonepe' ? 'border-purple-600 bg-purple-50/50 text-purple-900' : 'border-slate-200 text-slate-600'}`}><span>💜</span> PhonePe</button>
                  <button type="button" onClick={() => setSelectedUpiApp('paytm')} className={`p-3 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition ${selectedUpiApp === 'paytm' ? 'border-cyan-600 bg-cyan-50/50 text-cyan-900' : 'border-slate-200 text-slate-600'}`}><span>💙</span> Paytm UPI</button>
                </div>
              </div>

              <button type="submit" disabled={isProcessingPayment} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg transition text-sm flex items-center justify-center gap-2 cursor-pointer">
                {isProcessingPayment ? <span>Processing Secure UPI Payment...</span> : <span>✓ Pay ₹{addAmount || 0} & Add to Wallet</span>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- CLICKABLE STAT CARDS MODAL POPUP --- */}
      {activeModalType && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 animate-fadeIn text-slate-800">
            <button onClick={() => setActiveModalType(null)} className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 font-bold text-slate-600 flex items-center justify-center transition">✕</button>

            <div className="border-b pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {activeModalType === 'FILLED' && 'Filled Forms History'}
                {activeModalType === 'PENDING' && 'Pending Applications'}
                {activeModalType === 'ADMIT' && 'Certificates & Admit Cards Vault'}
                {activeModalType === 'RECEIPTS' && 'All Payment Receipts'}
                {activeModalType === 'APPROVED_VAULT' && '🛡️ Approved Vault (Rechecked Files)'}
              </h3>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
              {activeModalType === 'FILLED' && userFilledForms.map((item: any) => (
                <div key={item.id} className="p-3.5 bg-slate-50 rounded-2xl border flex justify-between items-center text-xs">
                  <div><p className="font-bold text-slate-900 text-sm">{item.name}</p><p className="text-slate-500">Submitted on: {item.date}</p></div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">{item.status}</span>
                </div>
              ))}
              {activeModalType === 'PENDING' && userPendingForms.map((item: any) => (
                <div key={item.id} className="p-3.5 bg-slate-50 rounded-2xl border flex justify-between items-center text-xs">
                  <div><p className="font-bold text-slate-900 text-sm">{item.name}</p><p className="text-slate-500">Saved on: {item.date}</p></div>
                  <span className="px-2.5 py-1 bg-orange-100 text-orange-800 font-bold rounded-full text-[10px]">{item.status}</span>
                </div>
              ))}
              {activeModalType === 'ADMIT' && userAdmitCards.map((item: any) => (
                <div key={item.id} className="p-3.5 bg-slate-50 rounded-2xl border flex justify-between items-center text-xs">
                  <div><p className="font-bold text-slate-900 text-sm">{item.name}</p><p className="text-slate-500">{item.date}</p></div>
                  <button 
                    onClick={() => handleDownloadCertificate(item.id)}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl cursor-pointer shadow-sm"
                  >
                    📥 Download PDF
                  </button>
                </div>
              ))}
              {activeModalType === 'RECEIPTS' && userReceipts.map((item: any) => (
                <div key={item.id} className="p-3.5 bg-slate-50 rounded-2xl border flex justify-between items-center text-xs">
                  <div><p className="font-bold text-slate-900 text-sm">{item.name}</p><p className="text-slate-500">Date: {item.date}</p></div>
                  <div className="text-right"><p className="font-black text-blue-600 text-sm">{item.amount}</p><span className="text-[10px] text-emerald-600 font-bold">Paid</span></div>
                </div>
              ))}
              
              {/* --- APPROVED VAULT CONTENT --- */}
              {activeModalType === 'APPROVED_VAULT' && approvedFinalVault.map((item: any) => (
                <div key={item.orderId} className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono font-black text-blue-600 text-[10px]">Order ID: {item.orderId}</span>
                    <p className="font-bold text-slate-900 text-sm">{item.serviceName}</p>
                    <p className="text-slate-500 text-[10px]">Cafe: {item.cafe} | Approved on: {item.approvedDate}</p>
                  </div>
                  <button 
                    onClick={() => { setActiveModalType(null); setViewingPdfItem({ orderId: item.orderId, serviceName: item.serviceName, cafeName: item.cafe, status: 'COMPLETED' }); }}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer shadow-sm"
                  >
                    👁️ View PDF
                  </button>
                </div>
              ))}
              {activeModalType === 'APPROVED_VAULT' && approvedFinalVault.length === 0 && (
                <p className="text-center text-slate-400 py-4 text-xs">No approved files in vault yet.</p>
              )}
            </div>

            <div className="pt-2">
              <button onClick={() => setActiveModalType(null)} className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}