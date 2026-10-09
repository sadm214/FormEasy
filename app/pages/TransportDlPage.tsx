'use client';
import React from 'react';

export default function AdmitCardPage({ currentLang, setCurrentView, setSelectedJob, onOpenCafeRadar, t }: any) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border space-y-4 my-4">
      <h1 className="text-xl font-black text-slate-900">Admit Card Portal</h1>
      <p className="text-xs text-slate-500">Coming soon or loaded successfully!</p>
      <button onClick={() => setCurrentView('HOME')} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
        ← Back to Home
      </button>
    </div>
  );
}