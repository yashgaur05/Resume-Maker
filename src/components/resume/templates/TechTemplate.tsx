'use client';

import { ResumeData } from '@/types/resume';

export default function TechTemplate({ data }: { data: ResumeData }) {
  return <div className="p-8">Tech Template - {data.personalInfo.fullName || 'Name'}</div>;
}
