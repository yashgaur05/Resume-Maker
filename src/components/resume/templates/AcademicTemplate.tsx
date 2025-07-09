'use client';

import { ResumeData } from '@/types/resume';

export default function AcademicTemplate({ data }: { data: ResumeData }) {
  return <div className="p-8">Academic Template - {data.personalInfo.fullName || 'Name'}</div>;
}
