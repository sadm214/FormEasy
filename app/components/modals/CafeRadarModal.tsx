// app/components/modals/CafeRadarModal.tsx
'use client';
import React, { useState, useEffect } from 'react';

export default function CafeRadarModal({ 
  jobTitle = 'Govt Job / Form Service', 
  onClose, 
  onPaymentSuccess 
}: { 
  jobTitle?: string; 
  onClose: () => void; 
  onPaymentSuccess: (assignedCafe: any, orderId: string) => void 
}) {
  const [radarStep, setRadarStep] = useState<'SEARCHING' | 'BIDDING' | 'PAYMENT'>('SEARCHING');
  
  // Nearby active cafe partners bidding for the form
  const [biddingCafes, setBiddingCafes] = useState([
    { id: 'FE-MN1997', name: 'Sri Ganesh Online Services', rating: '4.9 ★', price: 150, distance: '0.8 km away', verified: true },
    { id: 'FE-MN2041', name: 'National Cyber Cafe', rating: '4.8 ★', price: 120, distance: '1.5 km away', verified: true },
    { id: 'FE-MN3102', name: 'Digital Mitra Kendra', rating: '4.7 ★', price: 100, distance: '2.1 km away', verified: true }
  ]);

  const [selectedCafe, setSelectedCafe] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'QR' | 'BANK'>('UPI');

  // Simulate radar searching when modal opens
  useEffect(() => {
    const timer = setTimeout(() => {
      setRadarStep('BIDDING');
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCafe = (cafe: any) => {
    setSelectedCafe(cafe);
    setRadarStep('PAYMENT');
  };

  const handleProcessPayment = () => {
    const generatedOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    alert(`Payment Successful!\n\nOrder ID: ${generatedOrderId}\nAssigned Cyber Cafe: ${selectedCafe.name} (${selectedCafe.id})\n\nYour details have been shared with the partner. Live chat & document sharing is now active!`);
    onPaymentSuccess(selectedCafe, generatedOrderId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 font-sans text-xs">
      <div className="bg-white rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 animate-fadeIn">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center font-black text-slate-600 transition">✕</button>

        {/* STEP 1: SEARCHING RADAR ANIMATION */}
        {radarStep === 'SEARCHING' && (
          <div className="text-center py-10 space-y-6">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
              <div className="absolute inset-2 rounded-full bg-blue-500/40 animate-pulse"></div>
              <div className="relative z-10 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                📡
              </div>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-black text-slate-900">Scanning Nearby Cyber Cafe Servers...</h3>
              <p className="text-slate-400 text-[11px] max-w-xs mx-auto">
                Connecting to active digital mitras in your district for <strong className="text-blue-600">{jobTitle}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: BIDDING LIST (CAFE ACCEPTANCE & PRICING) */}
        {radarStep === 'BIDDING' && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-[10px]">Active Partners Found</span>
              <h3 className="text-lg font-black text-slate-900 pt-1">Select Verified Cyber Cafe</h3>
              <p className="text-slate-400 text-[11px]">Review cafe ratings, distance, and service charges before confirming.</p>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {biddingCafes.map((cafe) => (
                <div key={cafe.id} className="p-4 bg-slate-50 hover:bg-blue-50/40 border-2 border-slate-100 hover:border-blue-500 rounded-2xl transition flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <b className="text-slate-900 text-xs">{cafe.name}</b>
                      <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[9px]">{cafe.id}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Rating: <strong className="text-amber-600">{cafe.rating}</strong> | Distance: {cafe.distance}</p>
                    <p className="text-xs text-emerald-600 font-black">Service Fee: ₹{cafe.price}</p>
                  </div>
                  <button 
                    onClick={() => handleSelectCafe(cafe)} 
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-md transition"
                  >
                    Select & Proceed ➔
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: SECURE PAYMENT GATEWAY */}
        {radarStep === 'PAYMENT' && selectedCafe && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-full text-[10px]">Secure Escrow Checkout</span>
              <h3 className="text-lg font-black text-slate-900 pt-1">Complete Payment</h3>
              <p className="text-slate-400 text-[11px]">Paying to: <strong className="text-slate-700">{selectedCafe.name}</strong></p>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex justify-between items-center font-bold">
              <span className="text-slate-700">Total Service Fee:</span>
              <span className="text-xl text-indigo-900 font-black">₹{selectedCafe.price}</span>
            </div>

            {/* Payment Methods Tabs */}
            <div className="space-y-2">
              <label className="block text-slate-700 font-bold">Choose Payment Method *</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-2xl font-bold">
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod('UPI')} 
                  className={`py-2.5 rounded-xl transition ${paymentMethod === 'UPI' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  📱 UPI App
                </button>
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod('QR')} 
                  className={`py-2.5 rounded-xl transition ${paymentMethod === 'QR' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  🪪 QR Scan
                </button>
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod('BANK')} 
                  className={`py-2.5 rounded-xl transition ${paymentMethod === 'BANK' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  🏦 NetBanking
                </button>
              </div>
            </div>

            {paymentMethod === 'QR' && (
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-2">
                <div className="w-24 h-24 bg-white border mx-auto flex items-center justify-center rounded-xl shadow-inner text-2xl">
                  📱
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Scan QR code using GPay, PhonePe or Paytm to pay ₹{selectedCafe.price}</p>
              </div>
            )}

            {paymentMethod === 'UPI' && (
              <div>
                <label className="block text-slate-700 font-bold mb-1">Enter UPI ID / VPA *</label>
                <input 
                  type="text" 
                  placeholder="e.g. yourname@paytm or @oksbi" 
                  className="w-full p-3.5 border-2 border-slate-200 rounded-2xl text-xs font-bold focus:outline-none focus:border-blue-600 bg-slate-50/50" 
                  required 
                />
              </div>
            )}

            <button 
              onClick={handleProcessPayment} 
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-sm shadow-xl transition transform active:scale-95"
            >
              Pay ₹{selectedCafe.price} & Confirm Order ⚡
            </button>
          </div>
        )}

      </div>
    </div>
  );
}