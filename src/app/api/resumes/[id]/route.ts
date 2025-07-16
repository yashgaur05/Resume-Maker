import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Resume from '@/models/Resume';
import mongoose from 'mongoose';

// GET - Fetch a specific resume by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid resume ID' },
        { status: 400 }
      );
    }
    
    const resume = await Resume.findById(id).select('-__v');
    
    if (!resume) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: resume
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
}

// PUT - Update a specific resume
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid resume ID' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!body.personalInfo || !body.personalInfo.fullName || !body.personalInfo.email) {
      return NextResponse.json(
        { success: false, error: 'Personal info with name and email is required' },
        { status: 400 }
      );
    }
    
    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      {
        personalInfo: body.personalInfo,
        summary: body.summary || '',
        experiences: body.experiences || [],
        education: body.education || [],
        skills: body.skills || [],
        selectedTemplate: body.selectedTemplate || 'modern',
        userId: body.userId || null
      },
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!updatedResume) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedResume,
      message: 'Resume updated successfully'
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update resume' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific resume
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid resume ID' },
        { status: 400 }
      );
    }
    
    const deletedResume = await Resume.findByIdAndDelete(id);
    
    if (!deletedResume) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete resume' },
      { status: 500 }
    );
  }
}
