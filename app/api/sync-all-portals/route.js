import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import PortalItem from '@/app/PortalItem'; // सही पाथ (app folder के अंदर)

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    // यहाँ अपनी असली MongoDB URL सीधे स्ट्रिंग में डाल दें (Testing ke liye)
    await mongoose.connect('mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/formeasy?retryWrites=true&w=majority');
  }
}

export async function GET() {
  try {
    await connectDB();

    const response = await fetch('https://sarkariresult.com', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, error: 'Failed to fetch source website' }, { status: 500 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const scrapedData = [];

    // 1. Results category
    $('#post_result ul li a').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr('href');
      if (title && link) {
        scrapedData.push({
          title,
          category: 'RESULT',
          dept: 'EXAM BOARD',
          downloadUrl: link.startsWith('http') ? link : `https://sarkariresult.com${link}`
        });
      }
    });

    // 2. Admit Card category
    $('#post_admitcard ul li a').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr('href');
      if (title && link) {
        scrapedData.push({
          title,
          category: 'ADMIT_CARD',
          dept: 'RECRUITMENT BOARD',
          downloadUrl: link.startsWith('http') ? link : `https://sarkariresult.com${link}`
        });
      }
    });

    // 3. Latest Jobs & other categories
    $('#post_latestjob ul li a').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr('href');
      if (title && link) {
        let assignedCategory = 'LATEST_JOBS';
        const lowerTitle = title.toLowerCase();
        
        if (lowerTitle.includes('admission') || lowerTitle.includes('btech')) assignedCategory = 'ADMISSION';
        else if (lowerTitle.includes('psc')) assignedCategory = 'PSC';
        else if (lowerTitle.includes('scholarship')) assignedCategory = 'SCHOLARSHIP';
        else if (lowerTitle.includes('passport') || lowerTitle.includes('transport')) assignedCategory = 'TRANSPORT';

        scrapedData.push({
          title,
          category: assignedCategory,
          dept: 'GOVT SERVICES',
          downloadUrl: link.startsWith('http') ? link : `https://sarkariresult.com${link}`
        });
      }
    });

    for (const item of scrapedData) {
      await PortalItem.findOneAndUpdate(
        { title: item.title, category: item.category },
        { $set: item },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      success: true,
      totalSynced: scrapedData.length,
      message: 'All categories successfully synced to database!'
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}