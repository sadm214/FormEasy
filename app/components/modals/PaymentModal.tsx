'use client';

export default function PaymentModal({ amount, onClose, onSuccess }: { amount: number; onClose: () => void; onSuccess: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] max-w-md w-full p-7 shadow-2xl relative text-xs space-y-5 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 bg-slate-100 rounded-full w-8 h-8 font-black flex items-center justify-center">✕</button>
        <span className="text-4xl">🔒</span>
        <h3 className="text-lg font-black text-slate-900">सुरक्षित ऑनलाइन एस्क्रो भुगतान</h3>
        <p className="text-slate-500">फॉर्म सफलतापूर्वक भरने के बाद ही कैफ़े वाले को पैसा मिलेगा।</p>
        <div className="p-4 bg-blue-50 border rounded-2xl font-bold text-sm">
          देय सर्विस चार्ज: <span className="text-emerald-700 font-black text-xl">₹{amount}</span>
        </div>
        <button onClick={onSuccess} className="w-full py-3.5 bg-emerald-600 text-white font-black rounded-xl shadow">
          ✓ Confirm Payment
        </button>
      </div>
    </div>
  );
}