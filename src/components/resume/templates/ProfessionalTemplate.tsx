'use client';

import { ResumeData } from '@/types/resume';

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
  return <div className="p-8">Professional Template - {data.personalInfo.fullName || 'Name'}</div>;
}
