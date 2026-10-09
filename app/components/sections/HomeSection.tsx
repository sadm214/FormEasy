// app/components/sections/HomeSection.tsx
'use client';
import React, { useState } from 'react';
import { liveJobs, liveAdmitCards, liveResults } from '../../data/portalData';

export default function HomeSection({ 
  currentLang, 
  setCurrentView, 
  setSelectedJob, 
  setActiveTool, 
  setShowAuthModal, 
  setShowShopAuthModal, 
  setAuthMode, 
  t, 
  setActiveCategoryData 
}: any) {

  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // सभी 12 श्रेणियों के पूरे भरपूर लिंक्स (प्रत्येक बॉक्स में 10-10 लिंक्स)
  const homeCategories = [
    {
      id: 'latest-jobs',
      title: 'Latest Jobs',
      titleHi: 'नवीनतम नौकरियां',
      icon: '💼',
      showSeeMore: true,
      requiresSummary: true, // फॉर्म भरने वाली श्रेणी (समरी खुलेगी)
      links: [
        { title: 'BPSC TRE 4.0 Online Form 2026 for 33,320 Teacher Posts', titleHi: 'बिहार शिक्षक भर्ती (BPSC TRE 4.0) ऑनलाइन फॉर्म 2026', lastDate: '10 October 2026', fee: '₹750 (Gen/OBC) | ₹200 (SC/ST)', qualification: 'Bachelor/Master Degree with B.Ed & CTET/STET', applyLink: 'https://www.bpsc.bih.nic.in', notificationLink: 'https://www.bpsc.bih.nic.in', description: 'Bihar Public Service Commission teacher recruitment notification.' },
        { title: 'UPSC Civil Services Exam Recruitment 2026', titleHi: 'यूपीएससी सिविल सेवा परीक्षा भर्ती 2026', lastDate: '24 March 2026', fee: '₹100 (Gen/OBC)', qualification: 'Bachelor Degree in Any Stream', applyLink: 'https://upsconline.nic.in', notificationLink: 'https://upsc.gov.in', description: 'Union Public Service Commission Civil Services Exam recruitment.' },
        { title: 'SSC CGL Tier-I Online Form 2026', titleHi: 'एसएससी सीजीएल टियर-I ऑनलाइन फॉर्म 2026', lastDate: '15 April 2026', fee: '₹100 (Gen/OBC)', qualification: 'Graduation Degree', applyLink: 'https://ssc.gov.in', notificationLink: 'https://ssc.gov.in', description: 'Staff Selection Commission CGL 2026 recruitment notification.' },
        { title: 'UP Police Constable & SI Recruitment 2026', titleHi: 'यूपी पुलिस कांस्टेबल और एसआई भर्ती 2026', lastDate: '30 March 2026', fee: '₹400', qualification: '10+2 Intermediate Passed', applyLink: 'https://uppbpb.gov.in', notificationLink: 'https://uppbpb.gov.in', description: 'UP Police Recruitment and Promotion Board constable vacancies.' },
        { title: 'Railway RRB NTPC & Group D Vacancy 2026', titleHi: 'रेलवे आरआरबी एनटीपीसी और ग्रुप डी रिक्ति 2026', lastDate: '10 May 2026', fee: '₹500', qualification: '10th / 12th / Graduation', applyLink: 'https://rrbcdg.gov.in', notificationLink: 'https://rrbcdg.gov.in', description: 'Railway Recruitment Board NTPC and Level-1 posts.' },
        { title: 'IBPS PO & Clerk Examination 2026', titleHi: 'आईबीपीएस पीओ और क्लर्क परीक्षा 2026', lastDate: '20 June 2026', fee: '₹850', qualification: 'Graduation in Any Stream', applyLink: 'https://ibps.in', notificationLink: 'https://ibps.in', description: 'Institute of Banking Personnel Selection CWE PO/MT and Clerk.' },
        { title: 'Indian Army Agniveer Recruitment Rally 2026', titleHi: 'भारतीय सेना अग्निवीर भर्ती रैली 2026', lastDate: '15 July 2026', fee: '₹250', qualification: '10th / 12th Pass', applyLink: 'https://joinindianarmy.nic.in', notificationLink: 'https://joinindianarmy.nic.in', description: 'Indian Army Agniveer General Duty, Clerk, Tradesman.' },
        { title: 'State Bank of India (SBI) Junior Associate 2026', titleHi: 'भारतीय स्टेट बैंक जूनियर एसोसिएट 2026', lastDate: '30 May 2026', fee: '₹750', qualification: 'Graduation Degree', applyLink: 'https://sbi.co.in', notificationLink: 'https://sbi.co.in', description: 'SBI Clerk recruitment across India.' },
        { title: 'UPSSSC PET & Lower Subordinate Posts 2026', titleHi: 'यूपीएसएसएससी पीईटी और लोअर अधीनस्थ पद 2026', lastDate: '12 April 2026', fee: '₹185', qualification: 'High School / Intermediate', applyLink: 'https://upsssc.gov.in', notificationLink: 'https://upsssc.gov.in', description: 'Uttar Pradesh Subordinate Services Selection Commission PET.' },
        { title: 'LIC AAO & Assistant Recruitment 2026', titleHi: 'एलआईसी डबल एओ और सहायक भर्ती 2026', lastDate: '25 June 2026', fee: '₹700', qualification: 'Bachelor Degree', applyLink: 'https://licindia.in', notificationLink: 'https://licindia.in', description: 'Life Insurance Corporation Assistant Administrative Officer.' }
      ]
    },
    {
      id: 'admit-card',
      title: 'Admit Card',
      titleHi: 'प्रवेश पत्र',
      icon: '🎫',
      showSeeMore: true,
      requiresSummary: false, // एडमिट कार्ड (सीधे डाउनलोड लिंक खुलेगा)
      links: [
        { title: 'UPSC Civil Services Prelims Admit Card 2026', titleHi: 'यूपीएससी सिविल सेवा प्रीलिम्स एडमिट कार्ड 2026', downloadUrl: 'https://upsc.gov.in' },
        { title: 'SSC CGL Tier-I Exam Admit Card 2026', titleHi: 'एसएससी सीजीएल टियर-I परीक्षा एडमिट कार्ड 2026', downloadUrl: 'https://ssc.nic.in' },
        { title: 'UP Police Constable Exam Call Letter 2026', titleHi: 'यूपी पुलिस कांस्टेबल परीक्षा कॉल लेटर 2026', downloadUrl: 'https://uppbpb.gov.in' },
        { title: 'Railway RRB NTPC CBT-1 Hall Ticket 2026', titleHi: 'रेलवे आरआरबी एनटीपीसी सीबीटी-1 हॉल टिकट 2026', downloadUrl: 'https://rrbcdg.gov.in' },
        { title: 'IBPS PO Prelims Call Letter 2026', titleHi: 'आईबीपीएस पीओ प्रीलिम्स कॉल लेटर 2026', downloadUrl: 'https://ibps.in' },
        { title: 'Indian Army Agniveer Exam Admit Card 2026', titleHi: 'भारतीय सेना अग्निवीर परीक्षा एडमिट कार्ड 2026', downloadUrl: 'https://joinindianarmy.nic.in' },
        { title: 'SBI Clerk Prelims Call Letter 2026', titleHi: 'एसबीआई क्लर्क प्रीलिम्स कॉल लेटर 2026', downloadUrl: 'https://sbi.co.in' },
        { title: 'UPSSSC PET Exam Admit Card 2026', titleHi: 'यूपीएसएसएससी पीईटी परीक्षा एडमिट कार्ड 2026', downloadUrl: 'https://upsssc.gov.in' },
        { title: 'LIC AAO Prelims Call Letter 2026', titleHi: 'एलआईसी डबल एओ प्रीलिम्स कॉल लेटर 2026', downloadUrl: 'https://licindia.in' },
        { title: 'CTEF & State TET Exam Admit Card 2026', titleHi: 'सीटेट और राज्य टीईटी परीक्षा एडमिट कार्ड 2026', downloadUrl: 'https://ctet.nic.in' }
      ]
    },
    {
      id: 'result',
      title: 'Result',
      titleHi: 'परिणाम',
      icon: '📊',
      showSeeMore: true,
      requiresSummary: false, // रिजल्ट (सीधे डाउनलोड लिंक खुलेगा)
      links: [
        { title: 'UPSC Civil Services Prelims Exam Result 2026', titleHi: 'यूपीएससी सिविल सेवा प्रीलिम्स परीक्षा परिणाम 2026', downloadUrl: 'https://upsc.gov.in' },
        { title: 'SSC CGL Tier-I Final Result & Marks 2026', titleHi: 'एसएससी सीजीएल टियर-I अंतिम परिणाम और अंक 2026', downloadUrl: 'https://ssc.nic.in' },
        { title: 'UP Police Constable Written Exam Result 2026', titleHi: 'यूपी पुलिस कांस्टेबल लिखित परीक्षा परिणाम 2026', downloadUrl: 'https://uppbpb.gov.in' },
        { title: 'Railway RRB NTPC CBT-1 Merit List 2026', titleHi: 'रेलवे आरआरबी एनटीपीसी सीबीटी-1 मेरिट लिस्ट 2026', downloadUrl: 'https://rrbcdg.gov.in' },
        { title: 'IBPS PO Prelims Score Card & Result 2026', titleHi: 'आईबीपीएस पीओ प्रीलिम्स स्कोर कार्ड और रिजल्ट 2026', downloadUrl: 'https://ibps.in' },
        { title: 'SBI Junior Associate Final Result 2026', titleHi: 'एसबीआई जूनियर एसोसिएट अंतिम परिणाम 2026', downloadUrl: 'https://sbi.co.in' },
        { title: 'UPSSSC PET Score Card 2026', titleHi: 'यूपीएसएसएससी पीईटी स्कोर कार्ड 2026', downloadUrl: 'https://upsssc.gov.in' },
        { title: 'Indian Army Agniveer Result 2026', titleHi: 'भारतीय सेना अग्निवीर परिणाम 2026', downloadUrl: 'https://joinindianarmy.nic.in' },
        { title: 'CTET Exam Results & Scorecard 2026', titleHi: 'सीटेट परीक्षा परिणाम और स्कोरकार्ड 2026', downloadUrl: 'https://ctet.nic.in' },
        { title: 'GATE & NEET PG Exam Results 2026', titleHi: 'गेट और नीट पीजी परीक्षा परिणाम 2026', downloadUrl: 'https://gate2026.iisc.ac.in' }
      ]
    },
    {
      id: 'admission',
      title: 'Admission',
      titleHi: 'प्रवेश',
      icon: '🎓',
      showSeeMore: true,
      requiresSummary: true, // फॉर्म/काउंसलिंग भरना होता है (समरी खुलेगी)
      links: [
        { title: 'JEE Main & Advanced Admission Counselling 2026', titleHi: 'जेईई मेन और एडवांस्ड प्रवेश काउंसलिंग 2026', lastDate: '15 May 2026', fee: '₹1000', qualification: '10+2 PCM', applyLink: 'https://jeemain.nta.nic.in', notificationLink: 'https://jeemain.nta.nic.in', description: 'Engineering entrance counselling.' },
        { title: 'NEET UG Medical MBBS / BDS Counselling 2026', titleHi: 'नीट यूजी मेडिकल एमबीबीएस / बीडीएस काउंसलिंग 2026', lastDate: '20 May 2026', fee: '₹1000', qualification: '10+2 PCB with NEET', applyLink: 'https://mcc.nic.in', notificationLink: 'https://mcc.nic.in', description: 'Medical admissions counselling.' },
        { title: 'CUET UG & PG Central University Admission 2026', titleHi: 'सीयूईटी यूजी और पीजी केंद्रीय विश्वविद्यालय प्रवेश 2026', lastDate: '30 April 2026', fee: '₹650', qualification: '10+2 / Graduation', applyLink: 'https://cuet.samarth.ac.in', notificationLink: 'https://cuet.samarth.ac.in', description: 'Common University Entrance Test.' },
        { title: 'UP B.Ed Joint Entrance Examination Admission 2026', titleHi: 'यूपी बीएड संयुक्त प्रवेश परीक्षा प्रवेश 2026', lastDate: '15 April 2026', fee: '₹1000', qualification: 'Graduation / Post Graduation', applyLink: 'https://lkouniv.ac.in', notificationLink: 'https://lkouniv.ac.in', description: 'Bachelor of Education entrance.' },
        { title: 'ITI & Polytechnic Diploma Admission Form 2026', titleHi: 'आईटीआई और पॉलिटेक्निक डिप्लोमा प्रवेश फॉर्म 2026', lastDate: '25 May 2026', fee: '₹300', qualification: '10th / 12th Pass', applyLink: 'https://jeecup.admissions.nic.in', notificationLink: 'https://jeecup.admissions.nic.in', description: 'JEECUP polytechnic admissions.' },
        { title: 'IGNOU Distance Learning Admission Session 2026', titleHi: 'इग्नू दूरस्थ शिक्षा प्रवेश सत्र 2026', lastDate: '31 July 2026', fee: '₹300', qualification: 'As per course', applyLink: 'https://ignou.ac.in', notificationLink: 'https://ignou.ac.in', description: 'Indira Gandhi National Open University.' },
        { title: 'BHU & JNU UG/PG Entrance Admission 2026', titleHi: 'बीएचयू और जेएनयू यूजी/पीजी प्रवेश 2026', lastDate: '10 June 2026', fee: '₹500', qualification: 'CUET Score / Eligibility', applyLink: 'https://bhuonline.in', notificationLink: 'https://bhuonline.in', description: 'Banaras Hindu University admissions.' },
        { title: 'AIIMS Nursing & Paramedical Admission 2026', titleHi: 'एम्स नर्सिंग और पैरामेडिकल प्रवेश 2026', lastDate: '20 May 2026', fee: '₹1500', qualification: '10+2 Science PCB', applyLink: 'https://aiimsexams.ac.in', notificationLink: 'https://aiimsexams.ac.in', description: 'AIIMS B.Sc Nursing admissions.' },
        { title: 'NIFT & NID Design Course Admission 2026', titleHi: 'निफ्ट और एनआईडी डिज़ाइन पाठ्यक्रम प्रवेश 2026', lastDate: '15 March 2026', fee: '₹3000', qualification: '10+2 / Graduation', applyLink: 'https://nift.ac.in', notificationLink: 'https://nift.ac.in', description: 'National Institute of Fashion Technology.' },
        { title: 'UP DElLED (BTC) Admission Form 2026', titleHi: 'यूपी डीईएलएड (बीटीसी) प्रवेश फॉर्म 2026', lastDate: '30 June 2026', fee: '₹700', qualification: 'Graduation with 50%', applyLink: 'https://updeled.gov.in', notificationLink: 'https://updeled.gov.in', description: 'Diploma in Elementary Education.' }
      ]
    },
    {
      id: 'syllabus',
      title: 'Syllabus',
      titleHi: 'पाठ्यक्रम',
      icon: '📖',
      showSeeMore: true,
      requiresSummary: false, // सिलेबस (सीधे डाउनलोड लिंक खुलेगा)
      links: [
        { title: 'UPSC Civil Services Prelims & Mains Syllabus 2026', titleHi: 'यूपीएससी सिविल सेवा प्रीलिम्स और मेंस पाठ्यक्रम 2026', downloadUrl: 'https://upsc.gov.in' },
        { title: 'SSC CGL Tier-I & Tier-II Exam Syllabus 2026', titleHi: 'एसएससी सीजीएल टियर-I और टियर-II परीक्षा पाठ्यक्रम 2026', downloadUrl: 'https://ssc.nic.in' },
        { title: 'UP Police Constable Detailed Exam Syllabus 2026', titleHi: 'यूपी पुलिस कांस्टेबल विस्तृत परीक्षा पाठ्यक्रम 2026', downloadUrl: 'https://uppbpb.gov.in' },
        { title: 'Railway RRB NTPC CBT-1 & CBT-2 Syllabus 2026', titleHi: 'रेलवे आरआरबी एनटीपीसी सीबीटी-1 और सीबीटी-2 पाठ्यक्रम 2026', downloadUrl: 'https://rrbcdg.gov.in' },
        { title: 'IBPS PO & Clerk Exam Syllabus & Pattern 2026', titleHi: 'आईबीपीएस पीओ और क्लर्क परीक्षा पाठ्यक्रम और पैटर्न 2026', downloadUrl: 'https://ibps.in' },
        { title: 'UPSSSC PET Exam Topic-wise Syllabus 2026', titleHi: 'यूपीएसएसएससी पीईटी परीक्षा विषय-वार पाठ्यक्रम 2026', downloadUrl: 'https://upsssc.gov.in' },
        { title: 'CTET Paper-I & Paper-II Detailed Syllabus 2026', titleHi: 'सीटेट पेपर-I और पेपर-II विस्तृत पाठ्यक्रम 2026', downloadUrl: 'https://ctet.nic.in' },
        { title: 'NDA & CDS Exam Syllabus & Marking Scheme 2026', titleHi: 'एनडीए और सीडीएस परीक्षा पाठ्यक्रम और अंकन योजना 2026', downloadUrl: 'https://upsc.gov.in' },
        { title: 'GATE Examination Subject-wise Syllabus 2026', titleHi: 'गेट परीक्षा विषय-वार पाठ्यक्रम 2026', downloadUrl: 'https://gate2026.iisc.ac.in' },
        { title: 'NEET UG Physics, Chemistry & Biology Syllabus 2026', titleHi: 'नीट यूजी भौतिकी, रसायन और जीव विज्ञान पाठ्यक्रम 2026', downloadUrl: 'https://nmc.org.in' }
      ]
    },
    {
      id: 'answer-key',
      title: 'Answer Key',
      titleHi: 'उत्तर कुंजी',
      icon: '🔑',
      showSeeMore: true,
      requiresSummary: false, // आंसर की (सीधे डाउनलोड लिंक खुलेगा)
      links: [
        { title: 'UPSC Civil Services Prelims Official Answer Key 2026', titleHi: 'यूपीएससी सिविल सेवा प्रीलिम्स आधिकारिक उत्तर कुंजी 2026', downloadUrl: 'https://upsc.gov.in' },
        { title: 'SSC CGL Tier-I Answer Key & Objection Tracker 2026', titleHi: 'एसएससी सीजीएल टियर-I उत्तर कुंजी और आपत्ति ट्रैकर 2026', downloadUrl: 'https://ssc.nic.in' },
        { title: 'UP Police Constable Exam Answer Key 2026', titleHi: 'यूपी पुलिस कांस्टेबल परीक्षा उत्तर कुंजी 2026', downloadUrl: 'https://uppbpb.gov.in' },
        { title: 'Railway RRB NTPC CBT-1 Response Sheet 2026', titleHi: 'रेलवे आरआरबी एनटीपीसी सीबीटी-1 रिस्पॉन्स शीट 2026', downloadUrl: 'https://rrbcdg.gov.in' },
        { title: 'IBPS PO Prelims Answer Key & Correct Options 2026', titleHi: 'आईबीपीएस पीओ प्रीलिम्स उत्तर कुंजी और सही विकल्प 2026', downloadUrl: 'https://ibps.in' },
        { title: 'SBI Clerk Prelims Response Sheet 2026', titleHi: 'एसबीआई क्लर्क प्रीलिम्स रिस्पॉन्स शीट 2026', downloadUrl: 'https://sbi.co.in' },
        { title: 'UPSSSC PET Official Answer Key 2026', titleHi: 'यूपीएसएसएससी पीईटी आधिकारिक उत्तर कुंजी 2026', downloadUrl: 'https://upsssc.gov.in' },
        { title: 'CTET Official Answer Key & Challenge Portal 2026', titleHi: 'सीटेट आधिकारिक उत्तर कुंजी और चुनौती पोर्टल 2026', downloadUrl: 'https://ctet.nic.in' },
        { title: 'JEE Main Session Official Answer Key 2026', titleHi: 'जेईई मेन सत्र आधिकारिक उत्तर कुंजी 2026', downloadUrl: 'https://jeemain.nta.nic.in' },
        { title: 'NEET UG Official Answer Key & OMR Sheet 2026', titleHi: 'नीट यूजी आधिकारिक उत्तर कुंजी और ओएमआर शीट 2026', downloadUrl: 'https://neet.nta.nic.in' }
      ]
    },
    {
      id: 'scholarship',
      title: 'Scholarship',
      titleHi: 'छात्रवृत्ति',
      icon: '🎓',
      showSeeMore: true,
      requiresSummary: true, // स्कॉलरशिप फॉर्म भरना होता है (समरी खुलेगी)
      links: [
        { title: 'National Scholarship Portal (NSP) Fresh & Renewal 2026', titleHi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) फ्रेश और रिन्यूअल 2026', lastDate: '30 Oct 2026', fee: 'Free', qualification: 'Students', applyLink: 'https://scholarships.gov.in', notificationLink: 'https://scholarships.gov.in', description: 'NSP scholarship registration.' },
        { title: 'UP Scholarship Pre-Matric & Post-Matric Online Form 2026', titleHi: 'यूपी छात्रवृत्ति प्री-मैट्रिक और पोस्ट-मैट्रिक ऑनलाइन फॉर्म 2026', lastDate: '31 Dec 2026', fee: 'Free', qualification: 'Students in UP', applyLink: 'https://scholarship.up.gov.in', notificationLink: 'https://scholarship.up.gov.in', description: 'UP scholarship form.' },
        { title: 'AICTE Pragati & Saksham Scholarship Scheme 2026', titleHi: 'एआईसीटीई प्रगति और सक्षम छात्रवृत्ति योजना 2026', lastDate: '30 Nov 2026', fee: 'Free', qualification: 'Technical Students', applyLink: 'https://aicte-india.org', notificationLink: 'https://aicte-india.org', description: 'AICTE scholarship.' },
        { title: 'NCERT National Talent Search Scholarship 2026', titleHi: 'एनसीईआरटी राष्ट्रीय प्रतिभा खोज छात्रवृत्ति 2026', lastDate: '30 Aug 2026', fee: 'Free', qualification: 'Class 10th Students', applyLink: 'https://ncert.nic.in', notificationLink: 'https://ncert.nic.in', description: 'NCERT NTS scholarship.' },
        { title: 'Post Matric Scholarship for SC/ST/OBC Students 2026', titleHi: 'एससी/एसटी/ओबीसी छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति 2026', lastDate: '31 Oct 2026', fee: 'Free', qualification: 'Reserved Category Students', applyLink: 'https://scholarships.gov.in', notificationLink: 'https://scholarships.gov.in', description: 'Category scholarship.' },
        { title: 'Inspire Fellowship & Scholarship for Higher Education 2026', titleHi: 'उच्च शिक्षा के लिए इंस्पायर फेलोशिप और छात्रवृत्ति 2026', lastDate: '30 Sep 2026', fee: 'Free', qualification: 'Science Students', applyLink: 'https://online-inspire.gov.in', notificationLink: 'https://online-inspire.gov.in', description: 'DST inspire scholarship.' },
        { title: 'Minority Affairs Merit-cum-Means Scholarship 2026', titleHi: 'अल्पसंख्यक मामलों की मेरिट-कम-मींस छात्रवृत्ति 2026', lastDate: '15 Oct 2026', fee: 'Free', qualification: 'Minority Students', applyLink: 'https://scholarships.gov.in', notificationLink: 'https://scholarships.gov.in', description: 'Minority scholarship.' },
        { title: 'Tata Trust Higher Education Scholarship 2026', titleHi: 'टाटा ट्रस्ट उच्च शिक्षा छात्रवृत्ति 2026', lastDate: '30 June 2026', fee: 'Free', qualification: 'College Students', applyLink: 'https://tatatrusts.org', notificationLink: 'https://tatatrusts.org', description: 'Tata trust scholarship.' },
        { title: 'Chief Minister Merit Scholarship Scheme 2026', titleHi: 'मुख्यमंत्री मेधावी छात्र छात्रवृत्ति योजना 2026', lastDate: '30 Nov 2026', fee: 'Free', qualification: 'Meritorious Students', applyLink: 'https://scholarship.up.gov.in', notificationLink: 'https://scholarship.up.gov.in', description: 'CM merit scholarship.' },
        { title: 'Sanskrit & Vedas Board Scholarship Scheme 2026', titleHi: 'संस्कृत और वेद बोर्ड छात्रवृत्ति योजना 2026', lastDate: '31 Aug 2026', fee: 'Free', qualification: 'Sanskrit Students', applyLink: 'https://sanskrit.up.gov.in', notificationLink: 'https://sanskrit.up.gov.in', description: 'Sanskrit board scholarship.' }
      ]
    },
    {
      id: 'csc-edistrict',
      title: 'CSC & e-District',
      titleHi: 'सीएससी और ई-डिस्ट्रिक्ट सेवाएं',
      icon: '💻',
      showSeeMore: true,
      requiresSummary: true, // ई-डिस्ट्रिक्ट फॉर्म भरना होता है (समरी खुलेगी)
      links: [
        { title: 'UP e-District Income, Caste & Domicile Certificate 2026', titleHi: 'यूपी ई-डिस्ट्रिक्ट आय, जाति और निवास प्रमाण पत्र 2026', lastDate: 'Active', fee: '₹30', qualification: 'Citizens of UP', applyLink: 'https://edistrict.up.gov.in', notificationLink: 'https://edistrict.up.gov.in', description: 'Apply for caste, income, domicile certificates.' },
        { title: 'CSC Aadhaar Seva Kendra & Update Services 2026', titleHi: 'सीएससी आधार सेवा केंद्र और अपडेट सेवाएं 2026', lastDate: 'Active', fee: 'As per UIDAI', qualification: 'All Citizens', applyLink: 'https://uidai.gov.in', notificationLink: 'https://uidai.gov.in', description: 'Aadhaar update and services.' },
        { title: 'PAN Card New & Correction Service via UTI / NSDL 2026', titleHi: 'यूटीआई / एनएसडीएल के माध्यम से पैन कार्ड नई और सुधार सेवा 2026', lastDate: 'Active', fee: '₹107', qualification: 'All Citizens', applyLink: 'https://www.protean-tinpan.com', notificationLink: 'https://www.protean-tinpan.com', description: 'PAN card application and correction.' },
        { title: 'Ration Card New Application & Member Addition 2026', titleHi: 'राशन कार्ड नया आवेदन और सदस्य जोड़ना 2026', lastDate: 'Active', fee: 'Free / Nominal', qualification: 'Families', applyLink: 'https://fcs.up.gov.in', notificationLink: 'https://fcs.up.gov.in', description: 'Ration card services.' },
        { title: 'Ayushman Bharat Golden Card Registration 2026', titleHi: 'आयुष्मान भारत गोल्डन कार्ड पंजीकरण 2026', lastDate: 'Active', fee: 'Free', qualification: 'Eligible Families', applyLink: 'https://beneficiary.nha.gov.in', notificationLink: 'https://beneficiary.nha.gov.in', description: 'Ayushman card registration.' },
        { title: 'Electricity Bill Payment & Smart Meter Services 2026', titleHi: 'बिजली बिल भुगतान और स्मार्ट मीटर सेवाएं 2026', lastDate: 'Active', fee: 'As per bill', qualification: 'Consumers', applyLink: 'https://uppcl.org', notificationLink: 'https://uppcl.org', description: 'Electricity bill online payment.' },
        { title: 'Labour Card (श्रम कार्ड) Registration & Renewal 2026', titleHi: 'श्रम कार्ड पंजीकरण और नवीनीकरण 2026', lastDate: 'Active', fee: 'Free', qualification: 'Workers', applyLink: 'https://uplabour.gov.in', notificationLink: 'https://uplabour.gov.in', description: 'Labour registration portal.' },
        { title: 'Old Age, Widow & Disability Pension Online Form 2026', titleHi: 'वृद्धावस्था, विधवा और विकलांगता पेंशन ऑनलाइन फॉर्म 2026', lastDate: 'Active', fee: 'Free', qualification: 'Eligible Citizens', applyLink: 'https://sspy-up.gov.in', notificationLink: 'https://sspy-up.gov.in', description: 'Social pension schemes.' },
        { title: 'Marriage Registration Certificate Online Portal 2026', titleHi: 'विवाह पंजीकरण प्रमाण पत्र ऑनलाइन पोर्टल 2026', lastDate: 'Active', fee: '₹100', qualification: 'Married Couples', applyLink: 'https://igrsup.gov.in', notificationLink: 'https://igrsup.gov.in', description: 'Marriage registration.' },
        { title: 'Fasal Bima & Kisan Credit Card Services 2026', titleHi: 'फसल बीमा और किसान क्रेडिट कार्ड सेवाएं 2026', lastDate: 'Active', fee: 'As per scheme', qualification: 'Farmers', applyLink: 'https://pmfby.gov.in', notificationLink: 'https://pmfby.gov.in', description: 'Crop insurance services.' }
      ]
    },
    {
      id: 'certificate',
      title: 'Certificates (CCC & Diplomas)',
      titleHi: 'प्रमाण पत्र (ट्रिपल सी और डिप्लोमा)',
      icon: '📜',
      showSeeMore: true,
      requiresSummary: true, // सर्टिफिकेट फॉर्म भरना होता है (समरी खुलेगी)
      links: [
        { title: 'NIELIT CCC Course Online Form & Certificate Download 2026', titleHi: 'नाेलिट ट्रिपल सी कोर्स ऑनलाइन फॉर्म और सर्टिफिकेट डाउनलोड 2026', lastDate: 'Every Month', fee: '₹590', qualification: '10+2 / 10th', applyLink: 'https://student.nielit.gov.in', notificationLink: 'https://student.nielit.gov.in', description: 'CCC computer course application and certificate.' },
        { title: 'NIELIT O Level Computer Diploma Certificate 2026', titleHi: 'नाेलिट ओ लेवल कंप्यूटर डिप्लोमा प्रमाण पत्र 2026', lastDate: 'Jan / July', fee: '₹500', qualification: '10+2 Passed', applyLink: 'https://student.nielit.gov.in', notificationLink: 'https://student.nielit.gov.in', description: 'O level computer diploma.' },
        { title: 'DigiLocker Verified Academic Marksheets & Certificates 2026', titleHi: 'डिजीलॉकर सत्यापित शैक्षणिक मार्कशीट और प्रमाण पत्र 2026', downloadUrl: 'https://digilocker.gov.in' },
        { title: 'Birth & Death Registration Certificate Portal (CRS) 2026', titleHi: 'जन्म और मृत्यु पंजीकरण प्रमाण पत्र पोर्टल (CRS) 2026', downloadUrl: 'https://crsorgi.gov.in' },
        { title: 'Skill India Digital Certificate Download & Verification 2026', titleHi: 'स्किल इंडिया डिजिटल प्रमाण पत्र डाउनलोड और सत्यापन 2026', downloadUrl: 'https://skillindiadigital.gov.in' },
        { title: 'ITI National Trade Certificate (NTC) Verification 2026', titleHi: 'आईटीआई राष्ट्रीय व्यापार प्रमाण पत्र (NTC) सत्यापन 2026', downloadUrl: 'https://ncvtmis.gov.in' },
        { title: 'UP Board High School & Intermediate Pass Certificate 2026', titleHi: 'यूपी बोर्ड हाई स्कूल और इंटरमीडिएट उत्तीर्ण प्रमाण पत्र 2026', downloadUrl: 'https://upmsp.edu.in' },
        { title: 'Polytechnic Diploma Final Year Certificate Download 2026', titleHi: 'पॉलिटेक्निक डिप्लोमा अंतिम वर्ष प्रमाण पत्र डाउनलोड 2026', downloadUrl: 'https://bteup.ac.in' },
        { title: 'National Apprenticeship Training Certificate (NATS) 2026', titleHi: 'राष्ट्रीय प्रशिक्षुता प्रशिक्षण प्रमाण पत्र (NATS) 2026', downloadUrl: 'https://portal.mhrdnats.gov.in' },
        { title: 'Yoga & Wellness Instructor Certification Portal 2026', titleHi: 'योग और कल्याण प्रशिक्षक प्रमाणन पोर्टल 2026', downloadUrl: 'https://yogacertificationboard.nic.in' }
      ]
    },
    {
      id: 'identity-document',
      title: 'Identity & Digital Document',
      titleHi: 'पहचान और डिजिटल दस्तावेज',
      icon: '🪪',
      showSeeMore: false,
      requiresSummary: false, // डायरेक्ट डाउनलोड/सेवा लिंक खुलेगा
      links: [
        { title: 'Aadhaar Card Download, PVC Order & Status Check 2026', titleHi: 'आधार कार्ड डाउनलोड, पीवीसी ऑर्डर और स्टेटस चेक 2026', downloadUrl: 'https://uidai.gov.in' },
        { title: 'PAN Card e-KYC & Instant Download Portal 2026', titleHi: 'पैन कार्ड ई-केवाईसी और इंस्टेंट डाउनलोड पोर्टल 2026', downloadUrl: 'https://www.protean-tinpan.com' },
        { title: 'Voter ID Card (EPIC) New Registration & Download 2026', titleHi: 'वोटर आईडी कार्ड (EPIC) नया पंजीकरण और डाउनलोड 2026', downloadUrl: 'https://voters.eci.gov.in' },
        { title: 'Indian Passport Online Application & Status Tracking 2026', titleHi: 'भारतीय पासपोर्ट ऑनलाइन आवेदन और स्थिति ट्रैकिंग 2026', downloadUrl: 'https://passportindia.gov.in' },
        { title: 'Driving License (DL) PVC Card & Status Portal 2026', titleHi: 'ड्राइविंग लाइसेंस (DL) पीवीसी कार्ड और स्टेटस पोर्टल 2026', downloadUrl: 'https://parivahan.gov.in' },
        { title: 'Ration Card Digital Copy Download Service 2026', titleHi: 'राशन कार्ड डिजिटल कॉपी डाउनलोड सेवा 2026', downloadUrl: 'https://fcs.up.gov.in' },
        { title: 'e-Shram Universal Account Card Download 2026', titleHi: 'ई-श्रम यूनिवर्सल अकाउंट कार्ड डाउनलोड 2026', downloadUrl: 'https://eshram.gov.in' },
        { title: 'Ayushman Health Card Digital Download 2026', titleHi: 'आयुष्मान हेल्थ कार्ड डिजिटल डाउनलोड 2026', downloadUrl: 'https://beneficiary.nha.gov.in' },
        { title: 'Udyam MSME Registration & Certificate Download 2026', titleHi: 'उद्यम एमएसएमई पंजीकरण और प्रमाण पत्र डाउनलोड 2026', downloadUrl: 'https://udyamregistration.gov.in' },
        { title: 'Police Clearance Certificate (PCC) Online Portal 2026', titleHi: 'पुलिस क्लीयरेंस सर्टिफिकेट (PCC) ऑनलाइन पोर्टल 2026', downloadUrl: 'https://passportindia.gov.in' }
      ]
    },
    {
      id: 'land-record',
      title: 'Land Record & Revenue',
      titleHi: 'भूमि अभिलेख और राजस्व सेवाएं',
      icon: '🏡',
      showSeeMore: false,
      requiresSummary: false, // डायरेक्ट भूलेख पोर्टल खुलेगा
      links: [
        { title: 'UP Bhulekh Naksha & Khatauni Online Verification 2026', titleHi: 'यूपी भूलेख नक्शा और खतौनी ऑनलाइन सत्यापन 2026', downloadUrl: 'https://upbhulekh.gov.in' },
        { title: 'Bhu Naksha UP Plot Map & Ownership Details 2026', titleHi: 'भू नक्शा यूपी प्लॉट मैप और स्वामित्व विवरण 2026', downloadUrl: 'https://bhunaksha.up.gov.in' },
        { title: 'Stamp and Registration Department Property Deed 2026', titleHi: 'स्टाम्प और पंजीकरण विभाग संपत्ति विलेख 2026', downloadUrl: 'https://igrsup.gov.in' },
        { title: 'Khasra Khatauni Digital Copy Download Service 2026', titleHi: 'खसरा खतौनी डिजिटल कॉपी डाउनलोड सेवा 2026', downloadUrl: 'https://upbhulekh.gov.in' },
        { title: 'Pradhan Mantri Kisan Samman Nidhi Beneficiary Status 2026', titleHi: 'प्रधानमंत्री किसान सम्मान निधि लाभार्थी स्थिति 2026', downloadUrl: 'https://pmkisan.gov.in' },
        { title: 'Kisan Credit Card (KCC) Online Application 2026', titleHi: 'किसान क्रेडिट कार्ड (KCC) ऑनलाइन आवेदन 2026', downloadUrl: 'https://pmkisan.gov.in' },
        { title: 'Agricultural Land Mutation (Dakhil Kharij) Portal 2026', titleHi: 'कृषि भूमि नामांतरण (दाखिल खारिज) पोर्टल 2026', downloadUrl: 'https://edistrict.up.gov.in' },
        { title: 'Revenue Court Case Status & Cause List Portal 2026', titleHi: 'राजस्व न्यायालय वाद स्थिति और कॉज लिस्ट पोर्टल 2026', downloadUrl: 'https://vaad.up.nic.in' },
        { title: 'Gaon Sabha Land Property Allotment Records 2026', titleHi: 'ग्राम सभा भूमि संपत्ति आवंटन रिकॉर्ड 2026', downloadUrl: 'https://upbhulekh.gov.in' },
        { title: 'Soil Health Card Online Report & Registration 2026', titleHi: 'मृदा स्वास्थ्य कार्ड ऑनलाइन रिपोर्ट और पंजीकरण 2026', downloadUrl: 'https://soilhealth.dac.gov.in' }
      ]
    },
    {
      id: 'transport-service',
      title: 'Transport & Vehicle',
      titleHi: 'परिवहन और वाहन सेवाएं',
      icon: '🚗',
      showSeeMore: false,
      requiresSummary: false, // डायरेक्ट परिवहन पोर्टल खुलेगा
      links: [
        { title: 'Parivahan Sewa Driving License (LL/DL) Application 2026', titleHi: 'परिवहन सेवा ड्राइविंग लाइसेंस (LL/DL) आवेदन 2026', downloadUrl: 'https://parivahan.gov.in' },
        { title: 'Vehicle Registration Certificate (RC) Status & Transfer 2026', titleHi: 'वाहन पंजीकरण प्रमाण पत्र (RC) स्थिति और ट्रांसफर 2026', downloadUrl: 'https://parivahan.gov.in' },
        { title: 'FASTag Recharge, Balance Check & KYC Services 2026', titleHi: 'फास्टैग रिचार्ज, बैलेंस चेक और केवाईसी सेवाएं 2026', downloadUrl: 'https://ihmcl.co.in' },
        { title: 'Fancy Vehicle Number Booking & Auction Portal 2026', titleHi: 'फैंसी वाहन नंबर बुकिंग और नीलामी पोर्टल 2026', downloadUrl: 'https://fancy.parivahan.gov.in' },
        { title: 'Motor Vehicle e-Challan Payment & Status Check 2026', titleHi: 'मोटर वाहन ई-चालान भुगतान और स्थिति जांच 2026', downloadUrl: 'https://echallan.parivahan.gov.in' },
        { title: 'Learner License Online Computer Test Portal 2026', titleHi: 'लर्नर लाइसेंस ऑनलाइन कंप्यूटर टेस्ट पोर्टल 2026', downloadUrl: 'https://parivahan.gov.in' },
        { title: 'Vehicle Fitness Certificate Renewal Portal 2026', titleHi: 'वाहन फिटनेस प्रमाण पत्र नवीनीकरण पोर्टल 2026', downloadUrl: 'https://parivahan.gov.in' },
        { title: 'National Permit Online Application for Commercial Vehicles 2026', titleHi: 'वाणिज्यिक वाहनों के लिए राष्ट्रीय परमिट ऑनलाइन आवेदन 2026', downloadUrl: 'https://parivahan.gov.in' },
        { title: 'High Security Registration Plate (HSRP) Booking 2026', titleHi: 'हाई सिक्योरिटी रजिस्ट्रेशन प्लेट (HSRP) बुकिंग 2026', downloadUrl: 'https://siam.in' },
        { title: 'Electric Vehicle (EV) Subsidy & Registration Portal 2026', titleHi: 'इलेक्ट्रिक वाहन (EV) सब्सिडी और पंजीकरण पोर्टल 2026', downloadUrl: 'https://fame2.heavyindustry.gov.in' }
      ]
    }
  ];

  const handleSeeMore = (categoryId: string, categoryTitle: string) => {
    if (categoryId === 'latest-jobs' || categoryId === 'latest_jobs') {
      setCurrentView('LATEST_JOBS');
    } else if (categoryId === 'admit-card') {
      setCurrentView('ADMIT_CARD');
    } else if (categoryId === 'result') {
      setCurrentView('RESULT');
    } else if (categoryId === 'syllabus') {
      setCurrentView('SYLLABUS');
    } else if (categoryId === 'answer-key') {
      setCurrentView('ANSWER_KEY');
    } else if (categoryId === 'scholarship') {
      setCurrentView('SCHOLARSHIP');
    } else if (categoryId === 'certificate') {
      setCurrentView('CERTIFICATE');
    } else if (categoryId === 'csc-edistrict') {
      setCurrentView('CSC_EDISTRICT');
    } else {
      let targetData = liveJobs;
      setActiveCategoryData({ title: categoryTitle, items: targetData });
      setCurrentView('CATEGORY_PAGE');
    }
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber || whatsappNumber.length < 10) {
      alert(currentLang === 'hi' ? 'कृपया सही व्हाट्सएप नंबर दर्ज करें!' : 'Please enter a valid WhatsApp number!');
      return;
    }
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setShowNotificationModal(false);
      setWhatsappNumber('');
      alert(currentLang === 'hi' ? '🎉 आपके व्हाट्सएप नंबर पर अलर्ट सफलतापूर्वक सेट हो गए हैं!' : '🎉 WhatsApp notifications activated successfully!');
    }, 1500);
  };

  const headerGradients = [
    "from-blue-600 to-indigo-700",       
    "from-emerald-600 to-teal-700",      
    "from-purple-600 to-indigo-700",     
    "from-amber-600 to-orange-700",      
    "from-sky-600 to-blue-700",          
    "from-rose-600 to-pink-700",         
    "from-cyan-600 to-blue-600",         
    "from-violet-600 to-purple-700",     
    "from-emerald-700 to-green-800",     
    "from-lime-600 to-emerald-700",      
    "from-slate-700 to-slate-900",       
    "from-indigo-600 to-blue-800"        
  ];

  return (
    <div className="w-full font-sans animate-fadeIn space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-[20px] p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800/60">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 max-w-xl z-10 text-center md:text-left">
          <span className="inline-block bg-amber-400 text-slate-950 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            Official Digital Service Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight letterSpacing:3px">
            Welcome to <span className="text-amber-400 ">FormEasy</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            {currentLang === 'hi' 
              ? 'सरकारी नौकरी, एडमिट कार्ड, रिजल्ट, और ई-डिस्ट्रिक्ट सेवाएं एक ही स्थान पर सुरक्षित तरीके से प्राप्त करें।' 
              : 'Right information at the right time is the first step to success. Access all jobs, admit cards, results, admissions, and digital services instantly.'}
          </p>
        </div>

        <div className="shrink-0 z-10 w-full md:w-auto flex justify-center">
          <button 
            onClick={() => setShowNotificationModal(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition transform hover:scale-105 cursor-pointer whitespace-nowrap flex items-center gap-2 border border-emerald-400/30"
          >
            <span className="text-base">💬</span> 
            <span>{currentLang === 'hi' ? 'व्हाट्सएप अलर्ट्स पाएं' : 'Get WhatsApp Alerts'}</span>
          </button>
        </div>
      </div>

      {/* 12 Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {homeCategories.map((cat, idx) => {
          const boxTitle = currentLang === 'hi' ? cat.titleHi : cat.title;
          const gradientClass = headerGradients[idx % headerGradients.length];

          return (
            <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              
              {/* Box Header */}
              <div className={`bg-gradient-to-r ${gradientClass} px-4 py-3 flex items-center justify-between text-white shadow-sm shrink-0`}>
                <h2 className="font-bold text-xs sm:text-sm flex items-center gap-2 drop-shadow-sm tracking-wide">
                  <span className="text-base bg-white/20 p-1 rounded-lg">{cat.icon}</span>
                  {boxTitle}
                </h2>
                {cat.showSeeMore && (
                  <button 
                    onClick={() => handleSeeMore(cat.id, boxTitle)}
                    className="bg-white/20 hover:bg-white hover:text-slate-900 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition shadow-sm cursor-pointer whitespace-nowrap backdrop-blur-sm"
                  >
                    {currentLang === 'hi' ? 'सभी देखें ➔' : 'See More ➔'}
                  </button>
                )}
              </div>

              {/* Box Links: केवल फॉर्म वाली श्रेणियों में समरी खुलेगी, बाकी में सीधे ऑफिशियल/डाउनलोड लिंक खुलेगा */}
              <div className="p-3 flex-1 bg-white">
                <ul className="space-y-1.5">
                  {cat.links.map((link: any, lIdx: number) => (
                    <li 
                      key={lIdx} 
                      className="flex items-start gap-2.5 group p-2 hover:bg-slate-50 rounded-xl cursor-pointer border-b border-slate-100 last:border-0 transition" 
                      onClick={() => {
                        if (cat.requiresSummary) {
                          // जॉब्स, एडमिशन, स्कॉलरशिप आदि (जहाँ फॉर्म भरना है) के लिए समरी खुलेगी
                          setSelectedJob(link);
                        } else {
                          // एडमिट कार्ड, रिजल्ट, सिलेबस आदि के लिए सीधे वेबसाइट या डाउनलोड लिंक खुलेगा
                          const targetUrl = link.downloadUrl || link.applyLink || 'https://google.com';
                          window.open(targetUrl, '_blank', 'noopener,noreferrer');
                        }
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5 group-hover:scale-125 transition"></span>
                      <span className="text-xs font-medium text-slate-700 group-hover:text-blue-700 leading-snug line-clamp-2">
                        {currentLang === 'hi' ? link.titleHi : link.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* Notification Modal Popup */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-xs sm:text-sm space-y-4 border border-slate-100 animate-fadeIn font-sans text-slate-800">
            <button onClick={() => setShowNotificationModal(false)} className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 font-bold text-slate-600 flex items-center justify-center transition cursor-pointer">✕</button>
            
            <div className="text-center space-y-1">
              <span className="text-3xl">💬</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">{currentLang === 'hi' ? 'व्हाट्सएप नोटिफिकेशन अलर्ट' : 'WhatsApp Notification Alerts'}</h3>
              <p className="text-slate-500 text-[11px] sm:text-xs">{currentLang === 'hi' ? 'अपनी पसंदीदा श्रेणियों का चयन करें और सीधे व्हाट्सएप पर अपडेट पाएं।' : 'Select your favorite categories and get updates directly on WhatsApp.'}</p>
            </div>

            <form onSubmit={handleNotificationSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-slate-700 font-bold mb-1 text-xs">{currentLang === 'hi' ? 'व्हाट्सएप मोबाइल नंबर*' : 'WhatsApp Mobile Number*'}</label>
                <input 
                  type="tel" 
                  value={whatsappNumber} 
                  onChange={(e) => setWhatsappNumber(e.target.value)} 
                  placeholder="9876543210" 
                  className="w-full p-3 border-2 border-slate-200 rounded-2xl font-bold text-slate-900 text-xs focus:outline-none focus:border-blue-600 transition bg-white" 
                  required 
                />
              </div>

              <button type="submit" disabled={isSubscribed} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-md text-sm transition cursor-pointer">
                {isSubscribed ? (currentLang === 'hi' ? 'सब्स्क्राइब हो रहा है...' : 'Subscribing...') : (currentLang === 'hi' ? '✓ व्हाट्सएप अलर्ट एक्टिवेट करें' : '✓ Activate WhatsApp Alerts')}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}