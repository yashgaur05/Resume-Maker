import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Resume from '@/models/Resume';

// GET - Fetch all resumes or search by email
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let query = {};
    if (email) {
      query = { 'personalInfo.email': email };
    }
    
    const resumes = await Resume.find(query)
      .sort({ updatedAt: -1 })
      .limit(limit)
      .select('-__v');
    
    return NextResponse.json({
      success: true,
      data: resumes,
      count: resumes.length
    });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}

// POST - Create a new resume
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.personalInfo || !body.personalInfo.fullName || !body.personalInfo.email) {
      return NextResponse.json(
        { success: false, error: 'Personal info with name and email is required' },
        { status: 400 }
      );
    }
    
    // Create new resume
    const resume = new Resume({
      personalInfo: body.personalInfo,
      summary: body.summary || '',
      experiences: body.experiences || [],
      education: body.education || [],
      skills: body.skills || [],
      selectedTemplate: body.selectedTemplate || 'modern',
      userId: body.userId || null
    });
    
    const savedResume = await resume.save();
    
    return NextResponse.json({
      success: true,
      data: savedResume,
      message: 'Resume saved successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating resume:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save resume' },
      { status: 500 }
    );
  }
}
