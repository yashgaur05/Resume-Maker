import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Resume from '@/models/Resume';

export async function GET() {
  try {
    // Test MongoDB connection
    await connectDB();
    
    // Test basic database operations
    const resumeCount = await Resume.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful!',
      data: {
        connected: true,
        resumeCount,
        timestamp: new Date().toISOString(),
        database: 'resume-maker'
      }
    });
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json({
      success: false,
      error: 'MongoDB connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
