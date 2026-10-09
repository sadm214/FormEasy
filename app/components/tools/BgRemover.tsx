// app/components/tools/BgRemover.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { removeBackground } from '@imgly/background-removal';

const studioPalette = [
  { name: 'Transparent', color: 'transparent', icon: '🪞' },
  { name: 'White', color: '#FFFFFF', icon: '⬜' },
  { name: 'Royal Blue', color: '#0056b3', icon: '🔵' },
  { name: 'Sky Blue', color: '#38bdf8', icon: '🌐' },
  { name: 'Red', color: '#DC2626', icon: '🟥' },
  { name: 'Green', color: '#16A34A', icon: '🟩' },
];

export default function BgRemover({ onClose, currentLang }: { onClose: () => void; currentLang: string }) {
  const [bgToolImageSrc, setBgToolImageSrc] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>('processed-photo');
  const [selectedBgColor, setSelectedBgColor] = useState('transparent');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [transparentImgBitmap, setTransparentImgBitmap] = useState<HTMLImageElement | null>(null);
  const [edgeBlendAmount, setEdgeBlendAmount] = useState<number>(0); // Range: 0 to 10
  
  const bgStudioCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showBgDownloadModal, setShowBgDownloadModal] = useState(false);

  // 1. फोटो अपलोड और ओरिजिनल फाइल का नाम कैप्चर करना
  const handleBgToolUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // फाइल के ओरिजिनल नाम से एक्सटेंशन हटाकर बेस नेम सेव करना (जैसे 'my-photo')
      const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setOriginalFileName(baseName);
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    const originalUrl = URL.createObjectURL(file);
    setBgToolImageSrc(originalUrl);
    setIsAiProcessing(true);
    
    try {
      const transparentBlob = await removeBackground(file);
      const transparentUrl = URL.createObjectURL(transparentBlob);
      
      const img = new Image();
      img.src = transparentUrl;
      img.onload = () => {
        setTransparentImgBitmap(img);
        renderCanvas(img, selectedBgColor, edgeBlendAmount);
        setIsAiProcessing(false);
      };
    } catch (err) {
      console.error('AI Background Removal Failed:', err);
      const img = new Image();
      img.src = originalUrl;
      img.onload = () => {
        setTransparentImgBitmap(img);
        renderCanvas(img, selectedBgColor, edgeBlendAmount);
        setIsAiProcessing(false);
      };
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      setOriginalFileName(baseName);
      processFile(file);
    }
  };

  // 2. कैनवास पर रेंडरिंग और सॉफ्टनेस/एज ब्लेंडिंग
  const renderCanvas = (img: HTMLImageElement, color: string, blend: number) => {
    if (!bgStudioCanvasRef.current || !img) return;
    const canvas = bgStudioCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.naturalWidth || img.width || 600;
    canvas.height = img.naturalHeight || img.height || 750;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (color !== 'transparent') {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (blend > 0 && color !== 'transparent') {
      ctx.save();
      ctx.filter = `blur(${blend * 0.5}px)`;
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      ctx.drawImage(img, 0, 0); // कोर इमेज ऊपर
    } else {
      ctx.drawImage(img, 0, 0);
    }
  };

  useEffect(() => {
    if (transparentImgBitmap) {
      renderCanvas(transparentImgBitmap, selectedBgColor, edgeBlendAmount);
    }
  }, [selectedBgColor, edgeBlendAmount, transparentImgBitmap]);

  // 3. ओरिजिनल नाम के साथ डाउनलोड करना
  const executeStudioDownload = (format: 'JPG' | 'PNG') => {
    if (!bgStudioCanvasRef.current) return;
    const canvas = bgStudioCanvasRef.current;
    const link = document.createElement('a'); 
    link.href = canvas.toDataURL(format === 'PNG' ? 'image/png' : 'image/jpeg', 0.95); 
    link.download = `${originalFileName}-bg-removed.${format.toLowerCase()}`; 
    link.click();
    setShowBgDownloadModal(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn font-sans overflow-y-auto">
      <div className="bg-white rounded-[20px] sm:rounded-[28px] max-w-3xl w-full p-4 sm:p-6 shadow-2xl relative space-y-3.5 my-auto max-h-[92vh] overflow-y-auto border border-slate-100 google-scrollbar">
        
        {/* Top Clean Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 sm:pb-3 pr-8">
          <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            {currentLang === 'hi' ? 'बैकग्राउंड रिमूवर और स्टूडियो' : 'Background Remover & Studio'}
          </h3>

          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Upload Box */}
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="relative border-2 border-dashed border-purple-300 hover:border-purple-500 p-3.5 sm:p-4 rounded-2xl bg-purple-50/40 text-center cursor-pointer group transition flex flex-col items-center justify-center gap-1"
        >
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleBgToolUpload} 
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
          />
          <span className="text-2xl sm:text-3xl group-hover:scale-110 transition">📤</span>
          <span className="font-bold text-xs sm:text-sm text-purple-950">
            {currentLang === 'hi' ? 'क्लिक करके फोटो अपलोड करें या ड्रैग करें' : 'Click to upload photo or drag & drop'}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Supports JPG, PNG, JPEG</span>
        </div>

        {/* Workspace Grid (Responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Canvas Preview Area */}
          <div className="md:col-span-7 bg-slate-100/90 border border-slate-200 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[260px] relative overflow-hidden shadow-inner">
            {isAiProcessing ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-7 h-7 border-3 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black text-purple-900 text-[11px] animate-pulse text-center">
                  {currentLang === 'hi' ? '🤖 AI बैकग्राउंड हटा रहा है...' : '🤖 AI removing background...'}
                </p>
              </div>
            ) : !bgToolImageSrc ? (
              <div className="text-center text-slate-400 text-xs font-bold px-4">
                {currentLang === 'hi' ? 'अपलोड फोटो यहाँ दिखेगी' : 'Uploaded photo preview here'}
              </div>
            ) : (
              <canvas ref={bgStudioCanvasRef} className="max-h-[220px] sm:max-h-[260px] max-w-full rounded-xl shadow-md border-2 border-white object-contain bg-checkered" />
            )}
          </div>

          {/* Controls Sidebar */}
          <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-3 shadow-sm">
            
            {/* Palette Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <span className="font-black text-[11px] text-slate-800 uppercase tracking-wider">
                {currentLang === 'hi' ? 'बैकग्राउंड कलर' : 'Background Color'}
              </span>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                {studioPalette.find(p => p.color === selectedBgColor)?.name || 'Custom'}
              </span>
            </div>

            {/* Standard Colors Grid */}
            <div className="grid grid-cols-3 gap-1.5">
              {studioPalette.map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedBgColor(item.color)} 
                  style={{ backgroundColor: item.color === 'transparent' ? '#ffffff' : item.color }} 
                  className={`h-8 rounded-xl border transition shadow-sm flex items-center justify-center font-bold text-[11px] cursor-pointer ${selectedBgColor === item.color ? 'border-purple-600 ring-2 ring-purple-300 scale-105' : 'border-slate-300 hover:border-slate-400'}`}
                  title={item.name}
                >
                  <span className="text-[10px] mr-1">{item.icon}</span>
                  <span className="text-[9px] text-slate-700 font-bold">{item.name}</span>
                </button>
              ))}
            </div>

            {/* Edge Blend / Softness Slider */}
            <div className="space-y-1 pt-1.5 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-slate-700">
                  {currentLang === 'hi' ? '✨ एज सॉफ्टनेस / ब्लेंड (0 से 10):' : '✨ Edge Softness / Blend:'}
                </label>
                <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">
                  {edgeBlendAmount} px
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="10" 
                step="1"
                value={edgeBlendAmount} 
                onChange={(e) => setEdgeBlendAmount(Number(e.target.value))} 
                className="w-full accent-purple-600 cursor-pointer" 
              />
            </div>

            {/* Custom Color & Change Photo */}
            <div className="space-y-2 pt-1.5 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={selectedBgColor === 'transparent' ? '#ffffff' : selectedBgColor} 
                  onChange={(e) => setSelectedBgColor(e.target.value)} 
                  className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer bg-white p-0.5 shadow-xs" 
                />
                <span className="text-xs font-mono font-bold text-slate-600 uppercase bg-white px-2 py-1 rounded-lg border border-slate-200 flex-1 text-center">
                  {selectedBgColor}
                </span>
              </div>
              
              <label className="block w-full py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl text-center text-[11px] transition cursor-pointer shadow-xs">
                🔄 {currentLang === 'hi' ? 'दूसरी फोटो बदलें' : 'Change Photo'}
                <input type="file" accept="image/*" onChange={handleBgToolUpload} className="hidden" />
              </label>
            </div>
          </div>

        </div>

        {/* Bottom Download Button */}
        <button 
          onClick={() => setShowBgDownloadModal(true)} 
          disabled={isAiProcessing || !bgToolImageSrc}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-black rounded-xl shadow-md transition-all text-xs tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>↓</span> {currentLang === 'hi' ? 'फोटो डाउनलोड करें (Download)' : 'Download Processed Photo'}
        </button>

        {/* Format Selection Modal */}
        {showBgDownloadModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-xs w-full p-5 text-center space-y-3 shadow-2xl border border-slate-100">
              <span className="text-2xl">📥</span>
              <h4 className="font-black text-sm text-slate-900">
                {currentLang === 'hi' ? 'फाइल फॉर्मेट चुनें' : 'Choose Download Format'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {currentLang === 'hi' ? 'कलर बैकग्राउंड के लिए JPG और ट्रांसपेरेंट के लिए PNG चुनें।' : 'Choose JPG for color background, PNG for transparent.'}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button 
                  onClick={() => executeStudioDownload('JPG')} 
                  className="py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                >
                  JPG Format
                </button>
                <button 
                  onClick={() => executeStudioDownload('PNG')} 
                  className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                >
                  PNG Format
                </button>
              </div>
              <button 
                onClick={() => setShowBgDownloadModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 pt-1 cursor-pointer block w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}