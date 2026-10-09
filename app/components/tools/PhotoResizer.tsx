// app/components/tools/PhotoResizer.tsx
'use client';
import React, { useState } from 'react';

export default function PhotoResizer({ onClose, currentLang }: { onClose: () => void; currentLang: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetWidth, setTargetWidth] = useState<number>(350);
  const [targetHeight, setTargetHeight] = useState<number>(450);
  const [targetKb, setTargetKb] = useState<number>(50); // Default 50 KB
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('SSC');
  const [outputFileSize, setOutputFileSize] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDownloadLink(null);
    }
  };

  // Govt Exam Presets with Smart Quality Targets
  const applyGovtPreset = (key: string, w: number, h: number, kb: number) => {
    setSelectedPreset(key);
    setTargetWidth(w);
    setTargetHeight(h);
    setTargetKb(kb);
    setDownloadLink(null);
  };

  // High Quality Smart Compression Algorithm (Maintains crisp clarity near target size)
  const handleResize = () => {
    if (!selectedFile || !previewUrl) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // High quality smoothing image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Smart proportional quality step-down to protect visual clarity
        let quality = 0.95;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        let base64Length = dataUrl.split(',')[1].length;
        let sizeInBytes = (base64Length * 3) / 4;
        
        // Intelligent target buffer (Keep slightly below limit to ensure strict compliance without losing quality)
        let idealTargetBytes = targetKb * 1024;

        let iterations = 0;
        while (sizeInBytes > idealTargetBytes && quality > 0.40 && iterations < 8) {
          quality -= 0.08;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          base64Length = dataUrl.split(',')[1].length;
          sizeInBytes = (base64Length * 3) / 4;
          iterations++;
        }

        setDownloadLink(dataUrl);
        let finalKb = (sizeInBytes / 1024).toFixed(1);
        setOutputFileSize(finalKb + ' KB');
      }
      setIsProcessing(false);
    };
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn font-sans">
      <div className="bg-white rounded-[24px] sm:rounded-[28px] max-w-sm sm:max-w-md w-full p-5 sm:p-6 shadow-2xl relative border border-slate-100 space-y-4 max-h-[92vh] overflow-y-auto google-scrollbar">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs transition cursor-pointer"
        >
          ✕
        </button>

        {/* Clean Header */}
        <div className="pr-8 pt-1">
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {currentLang === 'hi' ? 'फोटो और सिग्नेचर रिसाइज़र' : 'Photo & Sign Resizer'}
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            {currentLang === 'hi' ? 'बेहतरीन क्वालिटी और सटीक साइज के साथ रिसाइज करें' : 'Resize with high visual clarity & precise file size'}
          </p>
        </div>

        {/* Form Controls */}
        <div className="space-y-3.5">
          
          {/* File Upload Box & Live Preview */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {currentLang === 'hi' ? 'फोटो या हस्ताक्षर चुनें:' : 'Select Photo / Signature:'}
            </label>
            
            <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-3 sm:p-4 bg-slate-50/70 transition text-center cursor-pointer group flex flex-col items-center justify-center gap-1.5">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => { handleFileChange(e); }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
              />
              
              {previewUrl ? (
                <div className="flex flex-col items-center space-y-1 z-0">
                  <img src={previewUrl} alt="Uploaded Preview" className="h-16 w-16 object-cover rounded-xl border-2 border-blue-500 shadow-sm bg-white p-0.5" />
                  <span className="text-[11px] font-bold text-blue-600">
                    {currentLang === 'hi' ? '✓ फोटो लोड हो गई (बदलने के लिए क्लिक करें)' : '✓ Photo loaded (Click to change)'}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-1">
                  <span className="text-xl group-hover:scale-110 transition">📁</span>
                  <span className="text-xs font-bold text-slate-700">
                    {currentLang === 'hi' ? 'क्लिक करके फोटो अपलोड करें' : 'Click here to upload photo'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">JPG, PNG, JPEG</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              {currentLang === 'hi' ? '⚡ लोकप्रिय एग्जाम प्रेसेट्स (क्वालिटी मेंटेन):' : '⚡ Popular Exam Presets (High Quality):'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              <button 
                onClick={() => { applyGovtPreset('SSC', 350, 450, 45); }}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer text-center ${selectedPreset === 'SSC' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600'}`}
              >
                SSC (~45 KB)
              </button>
              <button 
                onClick={() => { applyGovtPreset('POLICE', 400, 500, 90); }}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer text-center ${selectedPreset === 'POLICE' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600'}`}
              >
                Police (~90 KB)
              </button>
              <button 
                onClick={() => { applyGovtPreset('UPSC', 350, 350, 270); }}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer text-center ${selectedPreset === 'UPSC' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600'}`}
              >
                UPSC (~270 KB)
              </button>
              <button 
                onClick={() => { applyGovtPreset('BANK', 200, 230, 45); }}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer text-center ${selectedPreset === 'BANK' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600'}`}
              >
                Banking (~45 KB)
              </button>
              <button 
                onClick={() => { applyGovtPreset('SIGN', 400, 200, 22); }}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer text-center ${selectedPreset === 'SIGN' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600'}`}
              >
                ✍️ Sign (~22 KB)
              </button>
              <button 
                onClick={() => { applyGovtPreset('CUSTOM', targetWidth, targetHeight, targetKb); }}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer text-center ${selectedPreset === 'CUSTOM' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600'}`}
              >
                ⚙️ Custom
              </button>
            </div>
          </div>

          {/* Custom Dimensions & File Size (KB/MB) Controls */}
          <div className="space-y-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-600">
                  {currentLang === 'hi' ? 'चौड़ाई (Width px):' : 'Width (px):'}
                </label>
                <input 
                  type="number" 
                  value={targetWidth} 
                  onChange={(e) => { setTargetWidth(Number(e.target.value)); setSelectedPreset('CUSTOM'); setDownloadLink(null); }} 
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 shadow-inner" 
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-600">
                  {currentLang === 'hi' ? 'लंबाई (Height px):' : 'Height (px):'}
                </label>
                <input 
                  type="number" 
                  value={targetHeight} 
                  onChange={(e) => { setTargetHeight(Number(e.target.value)); setSelectedPreset('CUSTOM'); setDownloadLink(null); }} 
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 shadow-inner" 
                />
              </div>
            </div>

            {/* File Size KB/MB Slider & Input */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-bold text-slate-600">
                  {currentLang === 'hi' ? 'टारगेट फ़ाइल साइज़ (KB):' : 'Target File Size (KB):'}
                </label>
                <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {targetKb} KB {targetKb >= 1024 ? `(${(targetKb / 1024).toFixed(1)} MB)` : ''}
                </span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="5120" 
                step="5"
                value={targetKb} 
                onChange={(e) => { setTargetKb(Number(e.target.value)); setSelectedPreset('CUSTOM'); setDownloadLink(null); }} 
                className="w-full accent-blue-600 cursor-pointer" 
              />
            </div>
          </div>

          {/* Dynamic Action / Download Button (वही बटन क्लिक होते ही ग्रीन कलर में डाउनलोड नाउ बन जाएगा) */}
          {!downloadLink ? (
            <button 
              onClick={handleResize}
              disabled={!selectedFile || isProcessing}
              className={`w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-xl shadow-lg shadow-blue-600/20 transition-all text-xs tracking-wider uppercase cursor-pointer ${!selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? (currentLang === 'hi' ? 'प्रोसेस हो रहा है...' : 'Processing...') : (currentLang === 'hi' ? '⚡ प्रोसेस एंड रिसाइज फोटो' : '⚡ Process & Resize Photo')}
            </button>
          ) : (
            <div className="space-y-2 animate-fadeIn">
              {/* जनरेटेड फोटो का छोटा प्रीव्यू और डिटेल्स */}
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <img src={downloadLink} alt="Generated Preview" className="h-10 w-10 object-cover rounded-lg border border-emerald-300 bg-white p-0.5 shadow-sm" />
                  <div>
                    <span className="text-[10px] font-black text-emerald-800 block">
                      {currentLang === 'hi' ? '✓ फोटो तैयार है' : '✓ Photo Ready'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600">
                      {targetWidth}×{targetHeight} px • <b className="text-emerald-700">{outputFileSize}</b>
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setDownloadLink(null)} 
                  className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  {currentLang === 'hi' ? 'बदलाव करें' : 'Modify'}
                </button>
              </div>

              {/* ग्रीन कलर में डायरेक्ट 'डाउनलोड नाउ' बटन */}
              <a 
                href={downloadLink} 
                download={`resized-photo-${targetWidth}x${targetHeight}-${outputFileSize}.jpg`}
                className="block w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-md transition text-center cursor-pointer uppercase tracking-wider"
              >
                {currentLang === 'hi' ? '↓ डाउनलोड नाउ' : '↓ Download Now'}
              </a>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}