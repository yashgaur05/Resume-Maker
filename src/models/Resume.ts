import mongoose, { Schema, Document } from 'mongoose';

// Interface for Personal Information
interface IPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
}

// Interface for Experience
interface IExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

// Interface for Education
interface IEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

// Interface for Resume Document
export interface IResume extends Document {
  userId?: string; // Optional user ID for future user authentication
  personalInfo: IPersonalInfo;
  summary: string;
  experiences: IExperience[];
  education: IEducation[];
  skills: string[];
  selectedTemplate: string;
  createdAt: Date;
  updatedAt: Date;
}

// Personal Info Schema
const PersonalInfoSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  linkedin: { type: String, default: '' }
});

// Experience Schema
const ExperienceSchema = new Schema({
  id: { type: String, required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' }
});

// Education Schema
const EducationSchema = new Schema({
  id: { type: String, required: true },
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  gpa: { type: String, default: '' }
});

// Main Resume Schema
const ResumeSchema = new Schema({
  userId: { type: String, default: null }, // For future user authentication
  personalInfo: { type: PersonalInfoSchema, required: true },
  summary: { type: String, default: '' },
  experiences: [ExperienceSchema],
  education: [EducationSchema],
  skills: [{ type: String }],
  selectedTemplate: { type: String, default: 'modern' }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create indexes for better performance
ResumeSchema.index({ 'personalInfo.email': 1 });
ResumeSchema.index({ userId: 1 });
ResumeSchema.index({ createdAt: -1 });

// Export the model
export default mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);
