'use client';

import { ResumeData } from '@/types/resume';

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return <div className="p-8">Executive Template - {data.personalInfo.fullName || 'Name'}</div>;
}
