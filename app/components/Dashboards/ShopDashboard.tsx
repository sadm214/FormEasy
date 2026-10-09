// app/components/Dashboards/ShopDashboard.tsx
'use client';
import React, { useState, useEffect } from 'react';

export default function ShopDashboard({ partnerId = 'FE-MN1997', partnerName = 'R. H. Khan', shopName = 'Sri Ganesh Online Services', onLogout }: { partnerId?: string; partnerName?: string; shopName?: string; onLogout: () => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ORDERS' | 'PENDING' | 'COMPLETED' | 'WALLET' | 'CHAT_HUB'>('OVERVIEW');

  const [walletBalance, setWalletBalance] = useState(2450);
  const [todaysEarnings, setTodaysEarnings] = useState(450);
  
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferMethod, setTransferMethod] = useState<'BANK' | 'UPI' | 'QR'>('BANK');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({ accountNumber: '', ifsc: '', holderName: '' });
  const [upiId, setUpiId] = useState('');
  
  const [payoutHistory, setPayoutHistory] = useState([
    { id: 'TXN-901', amount: 1000, date: '16 Sep 2026', status: 'Success (Instant)', method: 'Bank A/C' },
    { id: 'TXN-882', amount: 750, date: '15 Sep 2026', status: 'Success (Instant)', method: 'UPI' }
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-501', applicant: 'Amit Kumar', service: 'UP Scholarship Form', status: 'Pending', amount: 150, date: '16 Sep 2026' },
    { id: 'ORD-502', applicant: 'Priya Sharma', service: 'PAN Card Apply', status: 'Completed', amount: 200, date: '16 Sep 2026' },
    { id: 'ORD-503', applicant: 'Rahul Verma', service: 'Aadhaar Address Update', status: 'Pending', amount: 100, date: '16 Sep 2026' },
    { id: 'ORD-504', applicant: 'Neha Singh', service: 'Ration Card Correction', status: 'Completed', amount: 150, date: '16 Sep 2026' }
  ]);

  // --- COMPACT CLIENT CHAT & DOC SHARING (AI REMOVED) ---
  const [selectedOrderId, setSelectedOrderId] = useState('ORD-501');
  const [clientChats, setClientChats] = useState([
    {
      orderId: 'ORD-501',
      applicantName: 'Amit Kumar',
      clientId: 'FE-USER-101',
      messages: [
        { senderName: 'Amit Kumar (Client)', senderId: 'FE-USER-101', text: 'Please check my 10th marksheet and photo for ORD-501.', time: '10:10 AM', file: 'Marksheet.pdf' }
      ]
    },
    {
      orderId: 'ORD-503',
      applicantName: 'Rahul Verma',
      clientId: 'FE-USER-103',
      messages: [
        { senderName: 'Rahul Verma (Client)', senderId: 'FE-USER-103', text: 'Hello sir, updating my address. Sharing document.', time: '11:20 AM', file: 'AddressProof.jpg' }
      ]
    }
  ]);

  const [partnerChatInput, setPartnerChatInput] = useState('');
  const [partnerAttachedFile, setPartnerAttachedFile] = useState<File | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const completedOrders = orders.filter(o => o.status === 'Completed');

  const handleMarkComplete = (orderId: string, amount: number) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Completed' } : o));
    setWalletBalance(prev => prev + amount);
    setTodaysEarnings(prev => prev + amount);

    setClientChats(prev => prev.map(chat => {
      if (chat.orderId === orderId) {
        return { ...chat, messages: [{ senderName: 'System', senderId: 'SYS', text: 'Order completed and chat archived successfully.', time: 'Just now', file: null }] };
      }
      return chat;
    }));

    alert(`Form marked as completed! Rs ${amount} added instantly to your wallet. Chat archived.`);
  };

  const currentChatThread = clientChats.find(c => c.orderId === selectedOrderId);

  const handlePartnerSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerChatInput.trim() && !partnerAttachedFile) return;

    const newMsg = {
      senderName: shopName,
      senderId: partnerId,
      text: partnerChatInput.trim() || (partnerAttachedFile ? `Shared file: ${partnerAttachedFile.name}` : ''),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      file: partnerAttachedFile ? partnerAttachedFile.name : null
    };

    setClientChats(prev => prev.map(chat => {
      if (chat.orderId === selectedOrderId) {
        return { ...chat, messages: [...chat.messages, newMsg] };
      }
      return chat;
    }));

    setPartnerChatInput('');
    setPartnerAttachedFile(null);
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);

    if (amount < 500) {
      alert('Minimum transfer amount must be Rs 500.');
      return;
    }

    if (amount > walletBalance) {
      alert('Insufficient wallet balance.');
      return;
    }

    setWalletBalance(prev => prev - amount);
    const destinationDetail = transferMethod === 'BANK' ? `Bank (${bankDetails.ifsc.toUpperCase()})` : transferMethod === 'UPI' ? `UPI (${upiId})` : 'QR Transfer';
    
    const newTxn = {
      id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
      amount: amount,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Success (Instant)',
      method: destinationDetail
    };
    setPayoutHistory([newTxn, ...payoutHistory]);

    setWithdrawAmount('');
    setUpiId('');
    setShowTransferModal(false);
    alert(`Transfer successful! Rs ${amount} sent successfully.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-xs">
      
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm px-3.5 py-1.5 rounded-2xl shadow">
            {partnerId}
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black text-slate-900">{shopName}</h1>
            <p className="text-slate-500 font-medium text-[11px]">Digital Mitra: <span className="font-bold text-slate-700">{partnerName}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsOnline(!isOnline)} 
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${isOnline ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'}`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
            {isOnline ? 'Live Online Store Active' : 'Store Offline'}
          </button>

          <button onClick={onLogout} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl transition shadow">
            Log Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
        
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 font-bold text-xs">
          <button onClick={() => setActiveTab('OVERVIEW')} className={`px-4 py-2.5 rounded-xl transition ${activeTab === 'OVERVIEW' ? 'bg-blue-600 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>Overview</button>
          <button onClick={() => setActiveTab('ORDERS')} className={`px-4 py-2.5 rounded-xl transition ${activeTab === 'ORDERS' ? 'bg-blue-600 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>Total Orders ({totalOrdersCount})</button>
          <button onClick={() => setActiveTab('PENDING')} className={`px-4 py-2.5 rounded-xl transition ${activeTab === 'PENDING' ? 'bg-amber-600 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>Pending Forms ({pendingOrders.length})</button>
          <button onClick={() => setActiveTab('COMPLETED')} className={`px-4 py-2.5 rounded-xl transition ${activeTab === 'COMPLETED' ? 'bg-emerald-600 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>Completed Forms ({completedOrders.length})</button>
          <button onClick={() => setActiveTab('WALLET')} className={`px-4 py-2.5 rounded-xl transition ${activeTab === 'WALLET' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>Wallet & Settlement</button>
          <button onClick={() => setActiveTab('CHAT_HUB')} className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'CHAT_HUB' ? 'bg-blue-600 text-white shadow' : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-50'}`}>
            💬 Chat with Client <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>
        </div>

        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div onClick={() => setActiveTab('ORDERS')} className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-3xl shadow-lg cursor-pointer transition transform hover:-translate-y-1 space-y-2">
                <div className="flex justify-between items-center font-bold opacity-90"><span>Total Orders</span><span>📦</span></div>
                <h3 className="text-4xl font-black">{totalOrdersCount}</h3>
                <p className="text-[11px] underline font-medium">Click to view all orders →</p>
              </div>

              <div onClick={() => setActiveTab('PENDING')} className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-6 rounded-3xl shadow-lg cursor-pointer transition transform hover:-translate-y-1 space-y-2">
                <div className="flex justify-between items-center font-bold opacity-90"><span>Pending Forms</span><span>⏳</span></div>
                <h3 className="text-4xl font-black">{pendingOrders.length}</h3>
                <p className="text-[11px] underline font-medium">Process pending forms →</p>
              </div>

              <div onClick={() => setActiveTab('COMPLETED')} className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-6 rounded-3xl shadow-lg cursor-pointer transition transform hover:-translate-y-1 space-y-2">
                <div className="flex justify-between items-center font-bold opacity-90"><span>Completed Forms</span><span>✅</span></div>
                <h3 className="text-4xl font-black">{completedOrders.length}</h3>
                <p className="text-[11px] underline font-medium">View completed records →</p>
              </div>

              <div onClick={() => setActiveTab('WALLET')} className="bg-gradient-to-br from-indigo-600 to-purple-800 text-white p-6 rounded-3xl shadow-lg cursor-pointer transition transform hover:-translate-y-1 space-y-2">
                <div className="flex justify-between items-center font-bold opacity-90"><span>Today Earnings</span><span>⚡</span></div>
                <h3 className="text-3xl font-black text-yellow-300">₹{todaysEarnings}</h3>
                <p className="text-[11px] underline font-medium">Wallet: ₹{walletBalance} (Transfer) →</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ORDERS' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">All Received Form Orders ({totalOrdersCount})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Applicant Name</th>
                    <th className="py-3 px-3">Service Type</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                  {orders.map((ord, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 text-blue-600">{ord.id}</td>
                      <td className="py-3 px-3">{ord.applicant}</td>
                      <td className="py-3 px-3">{ord.service}</td>
                      <td className="py-3 px-3 text-slate-400 font-medium">{ord.date}</td>
                      <td className="py-3 px-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] ${ord.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-black text-slate-900">₹{ord.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'PENDING' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-200 space-y-4">
            <h3 className="text-base font-black text-amber-800">Pending Form Applications ({pendingOrders.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Applicant Name</th>
                    <th className="py-3 px-3">Service Type</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                  {pendingOrders.map((ord, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 text-blue-600">{ord.id}</td>
                      <td className="py-3 px-3">{ord.applicant}</td>
                      <td className="py-3 px-3">{ord.service}</td>
                      <td className="py-3 px-3 text-slate-900 font-black">₹{ord.amount}</td>
                      <td className="py-3 px-3">
                        <button 
                          onClick={() => handleMarkComplete(ord.id, ord.amount)} 
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-black transition shadow"
                        >
                          Complete & Earn ✓
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'COMPLETED' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-200 space-y-4">
            <h3 className="text-base font-black text-emerald-800">Successfully Completed Forms ({completedOrders.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Applicant Name</th>
                    <th className="py-3 px-3">Service Type</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Earned Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                  {completedOrders.map((ord, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 text-blue-600">{ord.id}</td>
                      <td className="py-3 px-3">{ord.applicant}</td>
                      <td className="py-3 px-3">{ord.service}</td>
                      <td className="py-3 px-3 text-slate-400 font-medium">{ord.date}</td>
                      <td className="py-3 px-3 font-black text-emerald-600">₹{ord.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'WALLET' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-950 to-blue-900 text-white rounded-3xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-slate-300 font-medium text-xs">Available Wallet Balance</p>
                <h2 className="text-4xl font-black text-yellow-300">₹{walletBalance}</h2>
                <div className="pt-2 border-t border-indigo-800 text-[11px] space-y-1">
                  <p className="text-slate-300">Today Earnings: <span className="font-bold text-emerald-400">₹{todaysEarnings}</span></p>
                  <p className="text-slate-400 text-[10px]">Min withdrawal limit: ₹500</p>
                </div>
              </div>

              <button 
                onClick={() => setShowTransferModal(true)} 
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg transition"
              >
                Transfer
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 md:col-span-2 space-y-4">
              <h3 className="text-base font-black text-slate-900">Transfer & Payout History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                      <th className="py-3 px-3">Txn ID</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Transfer Method</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                    {payoutHistory.map((txn, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3 text-indigo-600">{txn.id}</td>
                        <td className="py-3 px-3 text-slate-400 font-medium">{txn.date}</td>
                        <td className="py-3 px-3">{txn.method}</td>
                        <td className="py-3 px-3"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px]">{txn.status}</span></td>
                        <td className="py-3 px-3 font-black text-slate-900">₹{txn.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- COMPACT CHAT WITH CAFE / CLIENT (AI REMOVED) --- */}
        {activeTab === 'CHAT_HUB' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border space-y-4 max-w-4xl mx-auto animate-fadeIn">
            
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Chat with Client</h3>
                <p className="text-slate-400 text-[11px]">Review client messages and shared documents (PDF/JPG).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-slate-50 p-4 rounded-2xl border space-y-2">
                <p className="font-black text-slate-500 uppercase text-[10px]">Select Order</p>
                {clientChats.map((chat) => (
                  <button 
                    key={chat.orderId}
                    onClick={() => setSelectedOrderId(chat.orderId)}
                    className={`w-full text-left p-3 rounded-xl transition font-bold space-y-1 ${selectedOrderId === chat.orderId ? 'bg-blue-600 text-white shadow' : 'bg-white hover:bg-slate-100 text-slate-800 border'}`}
                  >
                    <div className="flex justify-between items-center text-[10px] opacity-90">
                      <span>{chat.orderId}</span>
                      <span>{chat.applicantName}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="md:col-span-2 space-y-3">
                {currentChatThread && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center text-xs font-bold text-blue-950">
                    <span>Client: {currentChatThread.applicantName}</span>
                    <span>Order: {currentChatThread.orderId}</span>
                  </div>
                )}

                {/* Compact Chat Box */}
                <div className="h-64 overflow-y-auto space-y-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  {currentChatThread?.messages.map((msg, idx) => {
                    const isMe = msg.senderId === partnerId;
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
                              <button type="button" onClick={() => alert(`Opening ${msg.file}`)} className="px-2 py-0.5 bg-white text-blue-900 rounded text-[9px]">View</button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handlePartnerSendMessage} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type reply..." 
                    value={partnerChatInput} 
                    onChange={(e) => setPartnerChatInput(e.target.value)} 
                    className="flex-1 p-3 border-2 border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-600 bg-slate-50" 
                  />
                  <label className="px-3 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer flex items-center gap-1 text-xs">
                    <span>{partnerAttachedFile ? 'Attached' : '📎 Docs'}</span>
                    <input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={(e) => setPartnerAttachedFile(e.target.files ? e.target.files[0] : null)} className="hidden" />
                  </label>
                  <button type="submit" className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs shadow">
                    Send
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

      </main>

      {showTransferModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-5 animate-fadeIn font-sans">
            <button onClick={() => setShowTransferModal(false)} className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center font-black">✕</button>
            
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">Transfer Earnings</h3>
              <p className="text-xs text-slate-400">Available Balance: <span className="font-bold text-emerald-600">₹{walletBalance}</span></p>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-2xl font-bold">
              <button type="button" onClick={() => setTransferMethod('BANK')} className={`py-2 rounded-xl text-[11px] transition ${transferMethod === 'BANK' ? 'bg-blue-600 text-white shadow' : 'text-slate-600'}`}>Bank A/C</button>
              <button type="button" onClick={() => setTransferMethod('UPI')} className={`py-2 rounded-xl text-[11px] transition ${transferMethod === 'UPI' ? 'bg-blue-600 text-white shadow' : 'text-slate-600'}`}>UPI ID</button>
              <button type="button" onClick={() => setTransferMethod('QR')} className={`py-2 rounded-xl text-[11px] transition ${transferMethod === 'QR' ? 'bg-blue-600 text-white shadow' : 'text-slate-600'}`}>QR Scan</button>
            </div>

            <form onSubmit={handleTransferSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Enter Amount (Min ₹500) *</label>
                <input 
                  type="number" 
                  min={500}
                  max={walletBalance}
                  placeholder="e.g. 1000" 
                  value={withdrawAmount} 
                  onChange={(e) => setWithdrawAmount(e.target.value)} 
                  className="w-full p-3.5 border-2 border-slate-200 rounded-2xl text-xs font-bold" 
                  required 
                />
              </div>

              {transferMethod === 'BANK' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Account Number *</label>
                    <input type="text" placeholder="Enter Account Number" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} className="w-full p-3.5 border-2 border-slate-200 rounded-2xl text-xs font-bold" required />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">IFSC Code *</label>
                    <input type="text" placeholder="SBIN0001234" value={bankDetails.ifsc} onChange={(e) => setBankDetails({...bankDetails, ifsc: e.target.value.toUpperCase()})} className="w-full p-3.5 border-2 border-slate-200 rounded-2xl text-xs font-bold uppercase" required />
                  </div>
                </div>
              )}

              {transferMethod === 'UPI' && (
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Enter UPI ID *</label>
                  <input type="text" placeholder="e.g. mobile@paytm" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="w-full p-3.5 border-2 border-slate-200 rounded-2xl text-xs font-bold" required />
                </div>
              )}

              {transferMethod === 'QR' && (
                <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                  <div className="w-20 h-20 bg-white border mx-auto flex items-center justify-center rounded-xl"><span>📷</span></div>
                  <p className="text-[11px] text-slate-500">Scan QR code to receive payout</p>
                </div>
              )}

              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-sm shadow-xl transition">
                Confirm & Transfer
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}