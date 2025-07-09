'use client';

import { ResumeData, Template } from '@/types/resume';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import TechTemplate from './templates/TechTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: Template;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const renderTemplate = () => {
    const commonProps = { data };
    
    switch (template) {
      case 'modern':
        return <ModernTemplate {...commonProps} />;
      case 'classic':
        return <ClassicTemplate {...commonProps} />;
      case 'creative':
        return <CreativeTemplate {...commonProps} />;
      case 'minimal':
        return <MinimalTemplate {...commonProps} />;
      case 'professional':
        return <ProfessionalTemplate {...commonProps} />;
      case 'academic':
        return <AcademicTemplate {...commonProps} />;
      case 'tech':
        return <TechTemplate {...commonProps} />;
      case 'executive':
        return <ExecutiveTemplate {...commonProps} />;
      default:
        return <ModernTemplate {...commonProps} />;
    }
  };

  return (
    <div className="bg-white shadow-lg" style={{ width: '8.5in', minHeight: '11in' }}>
      {renderTemplate()}
    </div>
  );
}
