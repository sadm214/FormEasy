import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import PortalItem from '@/app/PortalItem'; // सही पाथ (app folder के अंदर)

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category'); // e.g. ADMISSION, RESULT, ADMIT_CARD, LATEST_JOBS, etc.

    const query = category ? { category } : {};
    const items = await PortalItem.find(query).sort({ _id: -1 }).limit(100);

    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}