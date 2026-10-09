// app/components/modals/MasterVaultModal.tsx
'use client';
import React, { useState } from 'react';

export default function MasterVaultModal({ isOpen, onClose, candidateVault }: any) {
  if (!isOpen) return null;

  // --- GRANULAR PRIVACY & SHARING STATES ---
  const [shareSettings, setShareSettings] = useState({
    shareAll: true,
    basic: true,
    address: true,
    academics: true,
    banking: false,
    identity: false,
    photos: true,
    otherDocs: true
  });

  const [partnerName, setPartnerName] = useState('');
  const [secureLink, setSecureLink] = useState('');
  const [isLinkActive, setIsLinkActive] = useState(false);

  // 1. Basic Details (नाम, फादर, मदर, DOB, जेंडर, मेरिटल स्टेटस, कैटेगरी)
  const [basicInfo, setBasicInfo] = useState({
    fullName: candidateVault?.fullName || 'R. H. Khan',
    fatherName: candidateVault?.fatherName || 'Mr. Khan',
    motherName: candidateVault?.motherName || '',
    dob: candidateVault?.dob || '2001-05-15',
    gender: candidateVault?.gender || 'Male',
    maritalStatus: candidateVault?.maritalStatus || 'Unmarried',
    category: candidateVault?.category || 'OBC',
    bloodGroup: 'O+',
    phone: candidateVault?.phone || '9876543210',
    email: candidateVault?.email || 'khan@example.com'
  });

  // 2. Address Details (Permanent & Correspondence)
  const [addressInfo, setAddressInfo] = useState({
    permHouse: '', permCity: '', permDistrict: candidateVault?.district || 'Kushinagar', permState: 'Uttar Pradesh', permCountry: 'India', permPincode: candidateVault?.pincode || '274304',
    corrHouse: '', corrCity: '', corrDistrict: candidateVault?.district || 'Kushinagar', corrState: 'Uttar Pradesh', corrCountry: 'India', corrPincode: candidateVault?.pincode || '274304'
  });

  // 3. Academic Qualifications (Dropdown with 40-50 courses, certificates & Other)
  const availableCourses = [
    '10th (High School)', '12th (Intermediate)', 'ITI Certificate', 'Diploma in Engineering', 'Polytechnic',
    'Graduation - B.A.', 'Graduation - B.Sc.', 'Graduation - B.Com.', 'Graduation - B.Tech / B.E.', 'Graduation - BCA',
    'Graduation - BBA', 'Graduation - LLB', 'Post Graduation - M.A.', 'Post Graduation - M.Sc.', 'Post Graduation - M.Com.',
    'Post Graduation - M.Tech', 'Post Graduation - MCA', 'Post Graduation - MBA', 'Ph.D. / Doctorate', 
    'B.Ed (Bachelor of Education)', 'B.T.C / D.El.Ed', 'UPTET Certificate', 'CTET Certificate', 'SUPER TET Scorecard',
    'CCC Certificate (NIELIT)', 'O Level Computer Certificate', 'A Level Computer Certificate',
    'Computer Typing English', 'Computer Typing Hindi', 'Stenography Certificate', 'Other (Type manually)'
  ];

  const [academics, setAcademics] = useState([
    { level: '10th (High School)', customLevel: '', board: 'UP Board', institution: 'Local School', year: '2018', maxMarks: '600', obtainedMarks: '492', isSaved: true, share: true },
    { level: '12th (Intermediate)', customLevel: '', board: 'UP Board', institution: 'Local College', year: '2020', maxMarks: '500', obtainedMarks: '395', isSaved: true, share: true }
  ]);

  const addMoreAcademic = () => {
    setAcademics([...academics, { level: 'Graduation - B.A.', customLevel: '', board: '', institution: '', year: '', maxMarks: '', obtainedMarks: '', isSaved: false, share: true }]);
  };

  const calculatePercentage = (max: string, obt: string) => {
    const m = parseFloat(max);
    const o = parseFloat(obt);
    if (!m || isNaN(m) || isNaN(o) || m <= 0) return '0.00%';
    return ((o / m) * 100).toFixed(2) + '%';
  };

  // 4. Banking Details
  const [bankAccounts, setBankAccounts] = useState([
    { accountHolder: basicInfo.fullName, bankAccount: '', ifscCode: '', bankName: '', passbookFile: null, isUploaded: false, share: false }
  ]);

  const addMoreBankAccount = () => {
    setBankAccounts([...bankAccounts, { accountHolder: basicInfo.fullName, bankAccount: '', ifscCode: '', bankName: '', passbookFile: null, isUploaded: false, share: false }]);
  };

  // 5. Identity Proofs & Certificates
  const availableIdTypes = ['Aadhaar / [Aadhaar Redacted]', 'PAN Card', 'Passport', 'Driving License', 'Caste Certificate', 'Income Certificate', 'Domicile Certificate', 'EWS Certificate'];
  const [identityProofs, setIdentityProofs] = useState([
    { idType: 'Aadhaar / [Aadhaar Redacted]', idNumber: '[Redacted]', file: null, isUploaded: true, share: false },
    { idType: 'PAN Card', idNumber: 'ABCDE1234F', file: null, isUploaded: true, share: false }
  ]);

  const addMoreIdentityProof = () => {
    setIdentityProofs([...identityProofs, { idType: 'Caste Certificate', idNumber: '', file: null, isUploaded: false, share: true }]);
  };

  // 6. Photo & Signature Vault (Hindi & English Signatures + Passport Photo)
  const [mediaVault, setMediaVault] = useState({
    passportPhoto: { file: null, isUploaded: false },
    engSignature: { file: null, isUploaded: false },
    hinSignature: { file: null, isUploaded: false }
  });

  // 7. Other Documents Vault
  const [otherDocs, setOtherDocs] = useState([
    { docType: 'CCC Certificate (NIELIT)', customDocName: '', certNumber: '', file: null, isUploaded: false, share: true }
  ]);

  // 24-Hour Secure Link Sharing
  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim()) {
      alert('कृपया साइबर कैफे संचालक या पार्टनर का नाम दर्ज करें!');
      return;
    }
    const randomToken = Math.random().toString(36).substring(2, 10);
    setSecureLink(`https://fastform.in/share/vault-${randomToken}`);
    setIsLinkActive(true);
    alert(`🔒 Secure sharing link generated for ${partnerName}! It will expire in 24 hours.`);
  };

  const handleStopLink = () => {
    setIsLinkActive(false);
    setSecureLink('');
    alert('🛑 Secure link has been revoked and sharing is now stopped.');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto text-slate-800 animate-fadeIn font-sans text-xs">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 bg-slate-100 hover:bg-slate-200 rounded-full w-9 h-9 font-bold text-slate-600 flex items-center justify-center transition"
        >
          ✕
        </button>

        {/* Modal Header & Master Select All */}
        <div className="border-b pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="space-y-1">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">Secure Digital Locker</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Master Profile Vault & Privacy Hub
            </h2>
          </div>

          <label className="flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-2 rounded-2xl cursor-pointer text-xs font-bold text-blue-900">
            <input 
              type="checkbox" 
              checked={shareSettings.shareAll} 
              onChange={(e) => {
                const val = e.target.checked;
                setShareSettings({ shareAll: val, basic: val, address: val, academics: val, banking: val, identity: val, photos: val, otherDocs: val });
              }}
              className="w-4 h-4 accent-blue-600 rounded"
            />
            <span>✓ Select All / Share All Data</span>
          </label>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert('Master Vault updated successfully!'); onClose(); }} className="space-y-6">
          
          {/* 1. BASIC DETAILS */}
          <div className="p-4 bg-slate-50 rounded-2xl border space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-sm text-blue-900 uppercase">1. Basic Details</h3>
              <label className="flex items-center gap-2 text-xs font-bold text-emerald-700 cursor-pointer bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                <input type="checkbox" checked={shareSettings.basic} onChange={(e) => setShareSettings({...shareSettings, basic: e.target.checked})} className="w-4 h-4 accent-emerald-600 rounded" />
                <span>Share with Cafe</span>
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-medium">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Full Name *</label>
                <input type="text" value={basicInfo.fullName} onChange={(e) => setBasicInfo({...basicInfo, fullName: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white" required />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Father's Name *</label>
                <input type="text" value={basicInfo.fatherName} onChange={(e) => setBasicInfo({...basicInfo, fatherName: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white" required />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Mother's Name</label>
                <input type="text" value={basicInfo.motherName} onChange={(e) => setBasicInfo({...basicInfo, motherName: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Date of Birth *</label>
                <input type="date" value={basicInfo.dob} onChange={(e) => setBasicInfo({...basicInfo, dob: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white" required />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Gender</label>
                <input type="text" value={basicInfo.gender} onChange={(e) => setBasicInfo({...basicInfo, gender: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Marital Status</label>
                <input type="text" value={basicInfo.maritalStatus} onChange={(e) => setBasicInfo({...basicInfo, maritalStatus: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Category (OBC/SC/ST/Gen)</label>
                <input type="text" value={basicInfo.category} onChange={(e) => setBasicInfo({...basicInfo, category: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Phone Number</label>
                <input type="text" value={basicInfo.phone} onChange={(e) => setBasicInfo({...basicInfo, phone: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white" />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Email ID</label>
                <input type="email" value={basicInfo.email} onChange={(e) => setBasicInfo({...basicInfo, email: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white" />
              </div>
            </div>
          </div>

          {/* 2. ADDRESS DETAILS (Permanent & Correspondence) */}
          <div className="p-4 bg-slate-50 rounded-2xl border space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-sm text-blue-900 uppercase">2. Address Details (Permanent & Correspondence)</h3>
              <label className="flex items-center gap-2 text-xs font-bold text-emerald-700 cursor-pointer bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                <input type="checkbox" checked={shareSettings.address} onChange={(e) => setShareSettings({...shareSettings, address: e.target.checked})} className="w-4 h-4 accent-emerald-600 rounded" />
                <span>Share with Cafe</span>
              </label>
            </div>

            {/* Permanent Address */}
            <div className="space-y-2">
              <p className="text-xs font-extrabold text-slate-700">Permanent Address:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input type="text" placeholder="House No. & Village" value={addressInfo.permHouse} onChange={(e) => setAddressInfo({...addressInfo, permHouse: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
                <input type="text" placeholder="City / Town" value={addressInfo.permCity} onChange={(e) => setAddressInfo({...addressInfo, permCity: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
                <input type="text" placeholder="District" value={addressInfo.permDistrict} onChange={(e) => setAddressInfo({...addressInfo, permDistrict: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
                <input type="text" placeholder="State" value={addressInfo.permState} onChange={(e) => setAddressInfo({...addressInfo, permState: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
                <input type="text" placeholder="Country" value={addressInfo.permCountry} onChange={(e) => setAddressInfo({...addressInfo, permCountry: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
                <input type="text" placeholder="Pincode" value={addressInfo.permPincode} onChange={(e) => setAddressInfo({...addressInfo, permPincode: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
              </div>
            </div>

            {/* Correspondence Address */}
            <div className="space-y-2 pt-2 border-t">
              <p className="text-xs font-extrabold text-slate-700">Correspondence Address:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input type="text" placeholder="House No. & Village" value={addressInfo.corrHouse} onChange={(e) => setAddressInfo({...addressInfo, corrHouse: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
                <input type="text" placeholder="City / Town" value={addressInfo.corrCity} onChange={(e) => setAddressInfo({...addressInfo, corrCity: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
                <input type="text" placeholder="District" value={addressInfo.corrDistrict} onChange={(e) => setAddressInfo({...addressInfo, corrDistrict: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
                <input type="text" placeholder="State" value={addressInfo.corrState} onChange={(e) => setAddressInfo({...addressInfo, corrState: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
                <input type="text" placeholder="Country" value={addressInfo.corrCountry} onChange={(e) => setAddressInfo({...addressInfo, corrCountry: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
                <input type="text" placeholder="Pincode" value={addressInfo.corrPincode} onChange={(e) => setAddressInfo({...addressInfo, corrPincode: e.target.value})} className="p-2.5 border rounded-xl bg-white" />
              </div>
            </div>
          </div>

          {/* 3. ACADEMIC QUALIFICATIONS (Dropdown + Custom Other + Percentage) */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center border-b pb-1">
              <h3 className="font-black text-sm text-blue-900 uppercase">3. Academic Qualifications</h3>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-bold text-emerald-700 cursor-pointer bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  <input type="checkbox" checked={shareSettings.academics} onChange={(e) => setShareSettings({...shareSettings, academics: e.target.checked})} className="w-4 h-4 accent-emerald-600 rounded" />
                  <span>Share All</span>
                </label>
                <button type="button" onClick={addMoreAcademic} className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-xs hover:bg-blue-700 transition">
                  + Add Qualification
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {academics.map((acad, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border space-y-3 transition ${acad.isSaved ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-xs text-blue-900 bg-blue-100 px-3 py-1 rounded-lg uppercase">
                      {acad.level === 'Other (Type manually)' ? (acad.customLevel || 'Custom Course') : acad.level}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${acad.isSaved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {acad.isSaved ? 'Saved ✓' : 'Editing...'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Select Course / Certificate *</label>
                      <select 
                        value={acad.level} 
                        onChange={(e) => {
                          const updated = [...academics];
                          updated[idx].level = e.target.value;
                          setAcademics(updated);
                        }} 
                        className="w-full p-2 border rounded-xl bg-white font-semibold text-slate-800"
                      >
                        {availableCourses.map((crs, cIdx) => (
                          <option key={cIdx} value={crs}>{crs}</option>
                        ))}
                      </select>
                    </div>
                    {acad.level === 'Other (Type manually)' && (
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Type Custom Course Name *</label>
                        <input type="text" placeholder="e.g. Advanced Diploma" value={acad.customLevel} onChange={(e) => {
                          const updated = [...academics];
                          updated[idx].customLevel = e.target.value;
                          setAcademics(updated);
                        }} className="w-full p-2 border rounded-xl bg-white" />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Board / University</label>
                      <input type="text" placeholder="UP Board / CBSE" value={acad.board} onChange={(e) => {
                        const updated = [...academics];
                        updated[idx].board = e.target.value;
                        setAcademics(updated);
                      }} className="w-full p-2 border rounded-xl bg-white" disabled={acad.isSaved} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold mb-0.5">School / College</label>
                      <input type="text" placeholder="Institution Name" value={acad.institution} onChange={(e) => {
                        const updated = [...academics];
                        updated[idx].institution = e.target.value;
                        setAcademics(updated);
                      }} className="w-full p-2 border rounded-xl bg-white" disabled={acad.isSaved} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Passing Year</label>
                      <input type="text" placeholder="2022" value={acad.year} onChange={(e) => {
                        const updated = [...academics];
                        updated[idx].year = e.target.value;
                        setAcademics(updated);
                      }} className="w-full p-2 border rounded-xl bg-white" disabled={acad.isSaved} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Max Marks</label>
                      <input type="number" placeholder="500" value={acad.maxMarks} onChange={(e) => {
                        const updated = [...academics];
                        updated[idx].maxMarks = e.target.value;
                        setAcademics(updated);
                      }} className="w-full p-2 border rounded-xl bg-white" disabled={acad.isSaved} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Marks Obtained</label>
                      <input type="number" placeholder="412" value={acad.obtainedMarks} onChange={(e) => {
                        const updated = [...academics];
                        updated[idx].obtainedMarks = e.target.value;
                        setAcademics(updated);
                      }} className="w-full p-2 border rounded-xl bg-white" disabled={acad.isSaved} />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <div className="text-xs font-bold text-emerald-700">
                      Percentage: <span className="underline">{calculatePercentage(acad.maxMarks, acad.obtainedMarks)}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => {
                        const updated = [...academics];
                        updated[idx].isSaved = !updated[idx].isSaved;
                        setAcademics(updated);
                      }}
                      className={`px-4 py-1.5 rounded-xl font-bold text-xs transition ${acad.isSaved ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                    >
                      {acad.isSaved ? 'Edit Details ✎' : 'Save Details ✓'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. BANKING DETAILS */}
          <div className="p-4 bg-slate-50 rounded-2xl border space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-sm text-blue-900 uppercase">4. Banking Details & Passbook Upload</h3>
              <button type="button" onClick={addMoreBankAccount} className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-xs hover:bg-blue-700 transition">
                + Add Another Bank
              </button>
            </div>

            <div className="space-y-3">
              {bankAccounts.map((bank, bIdx) => (
                <div key={bIdx} className="p-3 bg-white border rounded-2xl space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <input type="text" placeholder="Account Holder Name" value={bank.accountHolder} onChange={(e) => {
                      const updated = [...bankAccounts];
                      updated[bIdx].accountHolder = e.target.value;
                      setBankAccounts(updated);
                    }} className="p-2 border rounded-xl bg-slate-50" />
                    <input type="text" placeholder="Account Number" value={bank.bankAccount} onChange={(e) => {
                      const updated = [...bankAccounts];
                      updated[bIdx].bankAccount = e.target.value;
                      setBankAccounts(updated);
                    }} className="p-2 border rounded-xl bg-slate-50" />
                    <input type="text" placeholder="IFSC Code" value={bank.ifscCode} onChange={(e) => {
                      const updated = [...bankAccounts];
                      updated[bIdx].ifscCode = e.target.value;
                      setBankAccounts(updated);
                    }} className="p-2 border rounded-xl bg-slate-50" />
                    <input type="text" placeholder="Bank Name" value={bank.bankName} onChange={(e) => {
                      const updated = [...bankAccounts];
                      updated[bIdx].bankName = e.target.value;
                      setBankAccounts(updated);
                    }} className="p-2 border rounded-xl bg-slate-50" />
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">Passbook / Cheque:</span>
                      {bank.isUploaded && <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">✓ Uploaded</span>}
                      <input type="file" onChange={(e) => {
                        if(e.target.files && e.target.files[0]) {
                          const updated = [...bankAccounts];
                          updated[bIdx].passbookFile = e.target.files[0].name as never;
                          updated[bIdx].isUploaded = true;
                          setBankAccounts(updated);
                        }
                      }} className="text-[10px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. IDENTITY PROOFS & CERTIFICATES */}
          <div className="p-4 bg-slate-50 rounded-2xl border space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-sm text-blue-900 uppercase">5. Identity Proofs & Certificates</h3>
              <button type="button" onClick={addMoreIdentityProof} className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-xs hover:bg-blue-700 transition">
                + Add ID / Certificate
              </button>
            </div>

            <div className="space-y-3">
              {identityProofs.map((idItem, iIdx) => (
                <div key={iIdx} className="p-3.5 bg-white border rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 w-full">
                    <select 
                      value={idItem.idType} 
                      onChange={(e) => {
                        const updated = [...identityProofs];
                        updated[iIdx].idType = e.target.value;
                        setIdentityProofs(updated);
                      }}
                      className="p-2 border rounded-xl bg-slate-50 font-semibold"
                    >
                      {availableIdTypes.map((t, tIdx) => (
                        <option key={tIdx} value={t}>{t}</option>
                      ))}
                    </select>
                    <input 
                      type="text" 
                      placeholder="Enter ID Number" 
                      value={idItem.idNumber} 
                      onChange={(e) => {
                        const updated = [...identityProofs];
                        updated[iIdx].idNumber = e.target.value;
                        setIdentityProofs(updated);
                      }}
                      className="p-2 border rounded-xl bg-slate-50 font-semibold" 
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    {idItem.isUploaded && <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full">✓ Uploaded</span>}
                    <input 
                      type="file" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const updated = [...identityProofs];
                          updated[iIdx].file = e.target.files[0].name as never;
                          updated[iIdx].isUploaded = true;
                          setIdentityProofs(updated);
                        }
                      }}
                      className="text-[10px]" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. PHOTO & SIGNATURE VAULT (Hindi & English Signature Options) */}
          <div className="p-4 bg-slate-50 rounded-2xl border space-y-3">
            <div className="border-b pb-2">
              <h3 className="font-black text-sm text-blue-900 uppercase">6. Photo & Signature Vault (Hindi & English)</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white border rounded-2xl space-y-2">
                <p className="font-bold text-slate-800">📸 Passport Size Photo</p>
                {mediaVault.passportPhoto.isUploaded && <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">✓ Uploaded</span>}
                <input type="file" onChange={(e) => {
                  if(e.target.files && e.target.files[0]) {
                    setMediaVault({...mediaVault, passportPhoto: { file: e.target.files[0].name as never, isUploaded: true }});
                  }
                }} className="text-[10px]" />
              </div>

              <div className="p-3 bg-white border rounded-2xl space-y-2">
                <p className="font-bold text-slate-800">✍️ English Signature</p>
                {mediaVault.engSignature.isUploaded && <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">✓ Uploaded</span>}
                <input type="file" onChange={(e) => {
                  if(e.target.files && e.target.files[0]) {
                    setMediaVault({...mediaVault, engSignature: { file: e.target.files[0].name as never, isUploaded: true }});
                  }
                }} className="text-[10px]" />
              </div>

              <div className="p-3 bg-white border rounded-2xl space-y-2">
                <p className="font-bold text-slate-800">✍️ Hindi Signature (हिंदी हस्ताक्षर)</p>
                {mediaVault.hinSignature.isUploaded && <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">✓ Uploaded</span>}
                <input type="file" onChange={(e) => {
                  if(e.target.files && e.target.files[0]) {
                    setMediaVault({...mediaVault, hinSignature: { file: e.target.files[0].name as never, isUploaded: true }});
                  }
                }} className="text-[10px]" />
              </div>
            </div>
          </div>

          {/* 7. OTHER CERTIFICATES & DOCUMENTS */}
          <div className="p-4 bg-slate-50 rounded-2xl border space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-sm text-blue-900 uppercase">7. Other Certificates & Professional Documents</h3>
              <button type="button" onClick={() => setOtherDocs([...otherDocs, { docType: 'CCC Certificate (NIELIT)', customDocName: '', certNumber: '', file: null, isUploaded: false, share: true }])} className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-xs hover:bg-blue-700 transition">
                + Add Document
              </button>
            </div>

            <div className="space-y-3">
              {otherDocs.map((docItem, dIdx) => (
                <div key={dIdx} className="p-3.5 bg-white border rounded-2xl space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <select 
                      value={docItem.docType} 
                      onChange={(e) => {
                        const updated = [...otherDocs];
                        updated[dIdx].docType = e.target.value;
                        setOtherDocs(updated);
                      }}
                      className="p-2 border rounded-xl bg-slate-50 font-semibold"
                    >
                      <option value="CCC Certificate (NIELIT)">CCC Certificate (NIELIT)</option>
                      <option value="B.Ed (Bachelor of Education)">B.Ed (Bachelor of Education)</option>
                      <option value="Computer Typing Hindi">Computer Typing Hindi</option>
                      <option value="Other (Type manually)">Other (Type manually)</option>
                    </select>

                    <input 
                      type="text" 
                      placeholder="Certificate Number" 
                      value={docItem.certNumber} 
                      onChange={(e) => {
                        const updated = [...otherDocs];
                        updated[dIdx].certNumber = e.target.value;
                        setOtherDocs(updated);
                      }} 
                      className="p-2 border rounded-xl bg-slate-50 font-semibold" 
                    />

                    <div className="flex items-center gap-2">
                      {docItem.isUploaded && <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full">✓</span>}
                      <input 
                        type="file" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const updated = [...otherDocs];
                            updated[dIdx].file = e.target.files[0].name as never;
                            updated[dIdx].isUploaded = true;
                            setOtherDocs(updated);
                          }
                        }}
                        className="text-[10px]" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. 24-HOUR SECURE LINK SHARING */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3 mt-4">
            <h3 className="font-black text-sm text-yellow-300 uppercase">🔗 Secure Cyber Cafe Link Sharing (24-Hour Expiry)</h3>
            <p className="text-slate-300 text-xs">Generate a secure temporary link for your trusted cyber cafe partner. You can revoke or stop this link anytime.</p>

            {!isLinkActive ? (
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <input 
                  type="text" 
                  placeholder="Enter Partner Name (e.g. Sri Ganesh Cyber)" 
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
                <button 
                  type="button"
                  onClick={handleGenerateLink}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs transition whitespace-nowrap"
                >
                  Generate 24h Secure Link ➔
                </button>
              </div>
            ) : (
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-400 font-bold">● Active Share Link for: {partnerName}</span>
                  <span className="text-slate-400">Expires in 24 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={secureLink} className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-yellow-300 font-mono" />
                  <button type="button" onClick={() => { navigator.clipboard.writeText(secureLink); alert('Link copied to clipboard!'); }} className="px-3 py-2 bg-blue-600 text-white font-black rounded-lg">Copy</button>
                  <button type="button" onClick={handleStopLink} className="px-3 py-2 bg-red-600 text-white font-black rounded-lg">Revoke</button>
                </div>
              </div>
            )}
          </div>

          {/* Master Save / Close Buttons */}
          <div className="pt-4 flex gap-3">
            <button type="submit" className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg transition text-sm">
              ✓ Save Complete Master Vault & Privacy Settings
            </button>
            <button type="button" onClick={onClose} className="px-6 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-2xl text-sm transition">
              Close
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}