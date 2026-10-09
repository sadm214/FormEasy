// app/components/tools/PdfStudio.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function PdfStudio({ onClose, currentLang }: { onClose: () => void; currentLang: string }) {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [originalFileName, setOriginalFileName] = useState<string>('document');
  const [pdfToolMode, setPdfToolMode] = useState<string>('JPG_TO_PDF');
  const [useCustomSize, setUseCustomSize] = useState<boolean>(false);
  const [targetKb, setTargetKb] = useState<number>(300);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Separate & Merge Advanced States
  const [splitType, setSplitType] = useState<'ALL' | 'CUSTOM'>('ALL');
  const [customPageInput, setCustomPageInput] = useState<string>('1');
  const [mergeFilePreviews, setMergeFilePreviews] = useState<{ name: string; size: string; previewUrl: string }[]>([]);
  const [separatePagesPreviews, setSeparatePagesPreviews] = useState<string[]>([]);
  const [selectedSeparatePages, setSelectedSeparatePages] = useState<number[]>([]);

  // स्क्रॉल कंटेनर के लिए रिफ (Ref)
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // फाइलों या सेपरेट पेजेस के प्रीव्यू जनरेट करने का इफेक्ट
  useEffect(() => {
    let isMounted = true;

    const loadPreviews = async () => {
      if (pdfFiles.length === 0) {
        if (isMounted) {
          setMergeFilePreviews([]);
          setSeparatePagesPreviews([]);
        }
        return;
      }

      if (pdfToolMode === 'MERGE') {
        try {
          if (!(window as any).pdfjsLib) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
              script.onload = () => {
                (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                resolve(null);
              };
              script.onerror = reject;
              document.head.appendChild(script);
            });
          }

          const pdfjsLib = (window as any).pdfjsLib;
          const list: { name: string; size: string; previewUrl: string }[] = [];

          for (const file of pdfFiles) {
            let previewUrl = 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
            if (file.type.includes('image')) {
              previewUrl = URL.createObjectURL(file);
            } else if (file.type === 'application/pdf') {
              try {
                const arrayBuffer = await file.arrayBuffer();
                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
                const pdfDoc = await loadingTask.promise;
                const page = await pdfDoc.getPage(1);
                const viewport = page.getViewport({ scale: 0.4 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const context = canvas.getContext('2d');
                await page.render({ canvasContext: context, viewport }).promise;
                previewUrl = canvas.toDataURL('image/jpeg', 0.8);
              } catch (err) {
                console.error('Error generating thumbnail:', err);
              }
            }

            list.push({
              name: file.name,
              size: `${(file.size / 1024).toFixed(1)} KB`,
              previewUrl
            });
          }

          if (isMounted) setMergeFilePreviews(list);
        } catch (e) {
          console.error('Error loading merge previews:', e);
        }
      } 
      else if (pdfToolMode === 'SEPARATE' && pdfFiles[0] && pdfFiles[0].type === 'application/pdf') {
        try {
          if (!(window as any).pdfjsLib) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
              script.onload = () => {
                (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                resolve(null);
              };
              script.onerror = reject;
              document.head.appendChild(script);
            });
          }

          const pdfjsLib = (window as any).pdfjsLib;
          const arrayBuffer = await pdfFiles[0].arrayBuffer();
          const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
          const pdfDoc = await loadingTask.promise;
          const numPages = pdfDoc.numPages;
          const pageImages: string[] = [];

          for (let i = 1; i <= numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const viewport = page.getViewport({ scale: 0.5 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const context = canvas.getContext('2d');
            await page.render({ canvasContext: context, viewport }).promise;
            pageImages.push(canvas.toDataURL('image/jpeg', 0.8));
          }

          if (isMounted) {
            setSeparatePagesPreviews(pageImages);
            setSelectedSeparatePages(pageImages.map((_, idx) => idx + 1));
          }
        } catch (e) {
          console.error('Error rendering PDF pages:', e);
        }
      }
    };

    loadPreviews();

    return () => {
      isMounted = false;
    };
  }, [pdfFiles, pdfToolMode]);

  const handlePi7PdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfFiles([file]);
      const fileName = file.name || 'document';
      const baseName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
      setOriginalFileName(baseName);
      setStatusMsg(currentLang === 'hi' ? `फ़ाइल लोड की गई: ${file.name}` : `File loaded: ${file.name}`);
    }
  };

  const handleMultiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      setPdfFiles(filesArr);
      if (filesArr[0]) {
        const fileName = filesArr[0].name || 'document';
        const baseName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
        setOriginalFileName(baseName);
      }
      setStatusMsg(currentLang === 'hi' ? `${filesArr.length} फ़ाइलें चुनी गईं।` : `${filesArr.length} file(s) selected.`);
    }
  };

  const compressImageToTargetBytes = async (fileOrBlob: Blob, targetBytes: number): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileOrBlob);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        const maxDim = 1400;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context failed'));

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        let low = 0.05;
        let high = 0.95;
        let bestBlob: Blob | null = null;

        const tryQuality = (q: number): Promise<Blob | null> => {
          return new Promise((res) => {
            canvas.toBlob((blob) => res(blob), 'image/jpeg', q);
          });
        };

        (async () => {
          for (let i = 0; i < 7; i++) {
            const mid = (low + high) / 2;
            const blob = await tryQuality(mid);
            if (!blob) break;
            bestBlob = blob;

            if (blob.size > targetBytes) {
              high = mid;
            } else {
              low = mid;
            }
          }

          if (!bestBlob) {
            canvas.toBlob((b) => {
              b?.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
            }, 'image/jpeg', 0.6);
            return;
          }

          const buffer = await bestBlob.arrayBuffer();
          resolve(new Uint8Array(buffer));
        })();
      };
    });
  };

  const runPi7PdfProcess = async () => {
    if (pdfFiles.length === 0) return alert(currentLang === 'hi' ? 'कृपया पहले फ़ाइल चुनें!' : 'Please select a file first!');
    setStatusMsg(currentLang === 'hi' ? 'प्रोसेसिंग हो रही है...' : 'Processing...');

    try {
      if (!(window as any).PDFLib) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const { PDFDocument } = (window as any).PDFLib;
      const file = pdfFiles[0];
      const arrayBuffer = await file.arrayBuffer();

      if (pdfToolMode === 'PDF_TO_JPG' || pdfToolMode === 'PDF_TO_PNG') {
        if (file.type !== 'application/pdf') {
          return alert(currentLang === 'hi' ? 'कृपया वैध PDF अपलोड करें।' : 'Please upload a valid PDF file.');
        }

        if (!(window as any).pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => {
              (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
              resolve(null);
            };
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;
        const totalPages = pdfDoc.numPages;
        const imgExt = pdfToolMode === 'PDF_TO_JPG' ? 'jpeg' : 'png';

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');
          await page.render({ canvasContext: context, viewport }).promise;

          const dataUrl = canvas.toDataURL(`image/${imgExt}`, 1.0);
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${originalFileName}_page-${i}.${imgExt === 'jpeg' ? 'jpg' : 'png'}`;
          link.click();
        }

        setStatusMsg(currentLang === 'hi' ? `सफलतापूर्वक ${totalPages} पेजेस इमेज में कनवर्ट हुए!` : `Converted ${totalPages} pages to images!`);
        return;
      }

      if (pdfToolMode === 'COMPRESS') {
        if (file.type !== 'application/pdf') {
          return alert(currentLang === 'hi' ? 'कृपया वैध PDF अपलोड करें।' : 'Please upload a valid PDF file.');
        }

        if (!(window as any).pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => {
              (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
              resolve(null);
            };
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdfDoc = await loadingTask.promise;
        const totalPages = pdfDoc.numPages;

        const newPdfDoc = await PDFDocument.create();
        const targetBytesPerFile = useCustomSize && targetKb > 0 ? (targetKb * 1024) / totalPages : 250 * 1024;

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');
          await page.render({ canvasContext: context, viewport }).promise;

          const pageBlob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), 'image/jpeg', 0.85));
          const compressedBytes = await compressImageToTargetBytes(pageBlob, targetBytesPerFile);

          const embeddedImage = await newPdfDoc.embedJpg(compressedBytes);
          const newPage = newPdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
          newPage.drawImage(embeddedImage, { x: 0, y: 0, width: embeddedImage.width, height: embeddedImage.height });
        }

        const pdfBytes = await newPdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${originalFileName}-compressed-${useCustomSize ? targetKb + 'kb' : 'optimized'}.pdf`;
        link.click();
        setStatusMsg(currentLang === 'hi' ? 'PDF सफलतापूर्वक कंप्रेस हो गई!' : 'PDF compressed successfully!');
        return;
      }

      if (pdfToolMode === 'SEPARATE') {
        if (file.type !== 'application/pdf') {
          return alert(currentLang === 'hi' ? 'कृपया वैध PDF अपलोड करें।' : 'Please upload a valid PDF file.');
        }

        const loadedPdf = await PDFDocument.load(arrayBuffer);
        const totalPages = loadedPdf.getPageCount();

        if (splitType === 'ALL') {
          for (let i = 0; i < totalPages; i++) {
            const singleDoc = await PDFDocument.create();
            const [copiedPage] = await singleDoc.copyPages(loadedPdf, [i]);
            singleDoc.addPage(copiedPage);

            const pdfBytes = await singleDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${originalFileName}_page-${i + 1}.pdf`;
            link.click();
          }
          setStatusMsg(currentLang === 'hi' ? `सभी ${totalPages} पेजेस सेपरेट हुए!` : `All ${totalPages} pages separated!`);
        } else {
          for (const pageNum of selectedSeparatePages) {
            const singleDoc = await PDFDocument.create();
            const [copiedPage] = await singleDoc.copyPages(loadedPdf, [pageNum - 1]);
            singleDoc.addPage(copiedPage);

            const pdfBytes = await singleDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${originalFileName}_page-${pageNum}.pdf`;
            link.click();
          }
          setStatusMsg(currentLang === 'hi' ? `चुने गए पेजेस सेपरेट हो गए!` : `Selected pages separated!`);
        }
        return;
      }

      if (pdfToolMode === 'MERGE') {
        const mergedDoc = await PDFDocument.create();
        for (const f of pdfFiles) {
          const buf = await f.arrayBuffer();
          if (f.type === 'application/pdf') {
            const loadedPdf = await PDFDocument.load(buf);
            const copiedPages = await mergedDoc.copyPages(loadedPdf, loadedPdf.getPageIndices());
            copiedPages.forEach((p: any) => mergedDoc.addPage(p));
          } else if (f.type.includes('image')) {
            let img = f.type.includes('png') ? await mergedDoc.embedPng(buf) : await mergedDoc.embedJpg(buf);
            const page = mergedDoc.addPage([img.width, img.height]);
            page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
          }
        }
        const mergedPdfBytes = await mergedDoc.save();
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a'); 
        link.href = URL.createObjectURL(blob); 
        link.download = `${originalFileName}-merged.pdf`; 
        link.click();
        setStatusMsg(currentLang === 'hi' ? 'सभी फाइलें सफलतापूर्वक मर्ज हो गईं!' : 'All files merged successfully!');
        return;
      }

      if (pdfToolMode === 'JPG_TO_PDF' || pdfToolMode === 'PNG_TO_PDF') {
        const pdfDoc = await PDFDocument.create();
        for (const f of pdfFiles) {
          let imageBytes: Uint8Array;
          if (useCustomSize && targetKb > 0) {
            const targetBytes = targetKb * 1024;
            imageBytes = await compressImageToTargetBytes(f, targetBytes);
          } else {
            const buf = await f.arrayBuffer();
            imageBytes = new Uint8Array(buf);
          }

          let img = f.type.includes('png') && !useCustomSize ? await pdfDoc.embedPng(imageBytes) : await pdfDoc.embedJpg(imageBytes);
          const page = pdfDoc.addPage([img.width, img.height]);
          page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = useCustomSize ? `${originalFileName}-${targetKb}kb.pdf` : `${originalFileName}.pdf`;
        link.click();
        setStatusMsg(currentLang === 'hi' ? 'PDF कनवर्ट हो गई!' : 'Converted to PDF successfully!');
        return;
      }

      setStatusMsg('Operation completed successfully.');
    } catch (err) {
      console.error(err);
      setStatusMsg(currentLang === 'hi' ? 'एरर: कृपया सही फाइल अपलोड करें।' : 'Error: Please upload a valid file.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 animate-fadeIn font-sans overflow-y-auto">
      <div className="bg-white rounded-[20px] sm:rounded-[28px] max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative space-y-3.5 my-auto max-h-[92vh] overflow-y-auto border border-slate-100 google-scrollbar">
        
        {/* Top Clean Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 pr-8">
          <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📄 PDF & Image Studio Pro</span>
          </h3>

          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 pt-1">
          
          {/* Left / Main Workspace */}
          <div className="lg:col-span-8 space-y-3">
            
            {/* Upload Box */}
            <div className="relative border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-2xl p-4 sm:p-5 bg-blue-50/40 transition text-center cursor-pointer group flex flex-col items-center justify-center gap-1.5">
              <input 
                type="file" 
                id="pdf-studio-file-input"
                multiple={pdfToolMode === 'MERGE' || pdfToolMode.includes('TO_PDF')} 
                accept={pdfToolMode.includes('PDF_TO_') || pdfToolMode === 'COMPRESS' || pdfToolMode === 'SEPARATE' ? 'application/pdf' : 'application/pdf,image/jpeg,image/png'} 
                onChange={pdfToolMode === 'MERGE' ? handleMultiFileChange : handlePi7PdfFileChange} 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
              />
              <span className="text-2xl group-hover:scale-110 transition">📁</span>
              {pdfFiles.length > 0 ? (
                <div className="space-y-2 w-full relative z-20">
                  <div className="bg-white px-3 py-1.5 rounded-xl shadow-xs border border-blue-200 text-blue-950 font-black text-xs truncate max-w-full">
                    📄 {pdfFiles.length > 1 ? `${pdfFiles.length} Files Selected` : pdfFiles[0].name}
                  </div>

                  {/* MERGE PREVIEW WITH ORIGINAL NAME & SCROLLING CONTROLS */}
                  {pdfToolMode === 'MERGE' && mergeFilePreviews.length > 0 && (
                    <div className="space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Selected Files & Previews:</p>
                        {/* Scroll Navigation Buttons (Fully Working) */}
                        <div className="flex gap-1">
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); scrollLeft(); }}
                            className="w-6 h-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer shadow-sm transition"
                          >
                            ◀
                          </button>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); scrollRight(); }}
                            className="w-6 h-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer shadow-sm transition"
                          >
                            ▶
                          </button>
                        </div>
                      </div>

                      <div 
                        ref={scrollContainerRef}
                        className="flex gap-2.5 overflow-x-auto p-1.5 scrollbar-none snap-x"
                        style={{ scrollBehavior: 'smooth' }}
                      >
                        {mergeFilePreviews.map((item, idx) => (
                          <div key={idx} className="shrink-0 w-36 bg-white p-2 rounded-xl border border-blue-200 shadow-xs flex flex-col items-center snap-start">
                            <img src={item.previewUrl} alt="Preview" className="w-full h-16 object-cover rounded border bg-slate-100" />
                            <span className="text-[11px] font-bold text-slate-800 truncate w-full text-center mt-1" title={item.name}>{item.name}</span>
                            <span className="text-[9px] text-slate-400 font-semibold">{item.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SEPARATE PREVIEWS WITH INDIVIDUAL PAGES & SCROLLING */}
                  {pdfToolMode === 'SEPARATE' && separatePagesPreviews.length > 0 && (
                    <div className="space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-purple-900 uppercase">Select Pages ({separatePagesPreviews.length} Pages):</p>
                        <div className="flex gap-1">
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); scrollLeft(); }}
                            className="w-6 h-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer shadow-sm transition"
                          >
                            ◀
                          </button>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); scrollRight(); }}
                            className="w-6 h-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer shadow-sm transition"
                          >
                            ▶
                          </button>
                        </div>
                      </div>

                      <div 
                        ref={scrollContainerRef}
                        className="flex gap-2 overflow-x-auto p-1.5 scrollbar-none snap-x"
                        style={{ scrollBehavior: 'smooth' }}
                      >
                        {separatePagesPreviews.map((src, idx) => {
                          const pageNum = idx + 1;
                          const isSelected = selectedSeparatePages.includes(pageNum);
                          return (
                            <div 
                              key={idx} 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isSelected) {
                                  setSelectedSeparatePages(selectedSeparatePages.filter(p => p !== pageNum));
                                } else {
                                  setSelectedSeparatePages([...selectedSeparatePages, pageNum]);
                                }
                              }}
                              className={`shrink-0 w-24 relative rounded-xl border-2 p-1.5 cursor-pointer transition flex flex-col items-center bg-white snap-start ${isSelected ? 'border-purple-600 bg-purple-50 shadow-sm' : 'border-slate-200 opacity-60'}`}
                            >
                              <img src={src} alt={`Page ${pageNum}`} className="w-full h-16 object-cover rounded shadow-xs" />
                              <span className="text-[10px] font-black text-slate-800 mt-1">Page {pageNum} {isSelected ? '✓' : ''}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-slate-800 block">
                    {currentLang === 'hi' ? 'क्लिक करके फाइल अपलोड करें या ड्रैग करें' : 'Click to upload file or drag & drop'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {pdfToolMode === 'SEPARATE' ? 'Upload PDF to view individual page thumbnails' : pdfToolMode === 'MERGE' ? 'Upload multiple PDFs to see original names & previews' : 'Supports PDF and Image formats'}
                  </span>
                </div>
              )}
            </div>

            {/* SIZE OPTIONS CARD */}
            {pdfToolMode !== 'SEPARATE' && !pdfToolMode.includes('PDF_TO_') && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5 shadow-xs animate-fadeIn">
                <span className="font-black text-slate-800 block text-[11px] uppercase tracking-wider border-b border-slate-200 pb-1.5">
                  {currentLang === 'hi' ? 'साइज विकल्प (100% सटीक टारगेट):' : 'Size Options (100% Accurate Target):'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer transition ${!useCustomSize ? 'border-blue-600 bg-blue-50/70 shadow-xs' : 'border-slate-200 bg-white'}`}>
                    <input type="radio" name="sizeOption" checked={!useCustomSize} onChange={() => setUseCustomSize(false)} className="accent-blue-600" />
                    <span className="font-bold text-xs text-slate-800">Original Size</span>
                  </label>
                  <label className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer transition ${useCustomSize ? 'border-blue-600 bg-blue-50/70 shadow-xs' : 'border-slate-200 bg-white'}`}>
                    <input type="radio" name="sizeOption" checked={useCustomSize} onChange={() => setUseCustomSize(true)} className="accent-blue-600" />
                    <span className="font-bold text-xs text-slate-800">Custom Size</span>
                  </label>
                </div>

                {useCustomSize && (
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-blue-200 pt-1">
                    <span className="text-xs font-bold text-slate-700">Target Size (KB):</span>
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="number" 
                        min="20" 
                        value={targetKb} 
                        onChange={(e) => setTargetKb(Number(e.target.value))} 
                        className="w-20 p-1.5 border border-blue-300 rounded-lg text-center font-black text-blue-900 bg-slate-50 text-xs focus:outline-none" 
                      />
                      <span className="text-xs font-bold text-slate-500">KB</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SEPARATE PDF OPTIONS */}
            {pdfToolMode === 'SEPARATE' && (
              <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 space-y-2.5 shadow-xs animate-fadeIn">
                <span className="font-black text-purple-950 block text-[11px] uppercase tracking-wider">
                  {currentLang === 'hi' ? 'सेपरेशन मोड:' : 'Separation Mode:'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button"
                    onClick={() => setSplitType('ALL')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs border transition cursor-pointer text-center ${splitType === 'ALL' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white text-slate-700 border-purple-200 hover:bg-purple-100'}`}
                  >
                    📂 Separate All Pages
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSplitType('CUSTOM')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs border transition cursor-pointer text-center ${splitType === 'CUSTOM' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-white text-slate-700 border-purple-200 hover:bg-purple-100'}`}
                  >
                    🎯 Select Specific Pages
                  </button>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex-wrap gap-2.5">
              <div className="text-slate-500 font-bold bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200 text-[11px]">
                Mode: <b className="text-blue-900 font-black">{pdfToolMode}</b>
              </div>
              <button 
                onClick={runPi7PdfProcess} 
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-xl shadow-md transition text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>⚙️</span> {currentLang === 'hi' ? 'प्रोसेस और डाउनलोड करें' : 'Process & Download'}
              </button>
            </div>

            {/* Status Notification */}
            {statusMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center font-bold text-emerald-900 text-xs shadow-xs animate-fadeIn">
                {statusMsg}
              </div>
            )}
          </div>

          {/* Right Sidebar / Tools Mode Options */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2 shadow-xs">
            <span className="font-black text-slate-800 block border-b border-slate-200 pb-1.5 text-[11px] uppercase tracking-wider">
              {currentLang === 'hi' ? 'टूल्स मोड' : 'Tools Mode'}
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 text-xs">
              <button 
                onClick={() => setPdfToolMode('JPG_TO_PDF')} 
                className={`p-2.5 border rounded-xl text-left font-bold transition cursor-pointer flex items-center justify-between ${pdfToolMode === 'JPG_TO_PDF' ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'}`}
              >
                <span>📄 JPG to PDF</span>
              </button>
              <button 
                onClick={() => setPdfToolMode('PNG_TO_PDF')} 
                className={`p-2.5 border rounded-xl text-left font-bold transition cursor-pointer flex items-center justify-between ${pdfToolMode === 'PNG_TO_PDF' ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'}`}
              >
                <span>📄 PNG to PDF</span>
              </button>
              <button 
                onClick={() => setPdfToolMode('PDF_TO_JPG')} 
                className={`p-2.5 border rounded-xl text-left font-bold transition cursor-pointer flex items-center justify-between ${pdfToolMode === 'PDF_TO_JPG' ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'}`}
              >
                <span>🖼️ PDF to JPG</span>
              </button>
              <button 
                onClick={() => setPdfToolMode('PDF_TO_PNG')} 
                className={`p-2.5 border rounded-xl text-left font-bold transition cursor-pointer flex items-center justify-between ${pdfToolMode === 'PDF_TO_PNG' ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'}`}
              >
                <span>🖼️ PDF to PNG</span>
              </button>
              <button 
                onClick={() => setPdfToolMode('COMPRESS')} 
                className={`p-2.5 border rounded-xl text-left font-bold transition cursor-pointer flex items-center justify-between ${pdfToolMode === 'COMPRESS' ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'}`}
              >
                <span>🗜️ Compress PDF</span>
              </button>
              <button 
                onClick={() => setPdfToolMode('SEPARATE')} 
                className={`p-2.5 border rounded-xl text-left font-bold transition cursor-pointer flex items-center justify-between ${pdfToolMode === 'SEPARATE' ? 'bg-purple-600 border-purple-600 text-white shadow-sm' : 'bg-white border-purple-100 text-slate-700'}`}
              >
                <span>✂️ Separate PDF</span>
              </button>
              <button 
                onClick={() => setPdfToolMode('MERGE')} 
                className={`p-2.5 border rounded-xl text-left font-bold transition cursor-pointer flex items-center justify-between ${pdfToolMode === 'MERGE' ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'}`}
              >
                <span>📑 Merge PDF</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}