'use client';

import { ResumeData } from '@/types/resume';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SummaryForm from './forms/SummaryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import AchievementsForm from './forms/AchievementsForm';
import ReferencesForm from './forms/ReferencesForm';
import CustomSectionsForm from './forms/CustomSectionsForm';

interface ResumeFormProps {
  activeSection: string;
  resumeData: ResumeData;
  onDataChange: (section: string, data: any) => void;
}

export default function ResumeForm({ activeSection, resumeData, onDataChange }: ResumeFormProps) {
  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) => onDataChange('personalInfo', data)}
          />
        );
      case 'summary':
        return (
          <SummaryForm
            data={resumeData.summary}
            onChange={(data) => onDataChange('summary', data)}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(data) => onDataChange('experience', data)}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(data) => onDataChange('education', data)}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => onDataChange('skills', data)}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(data) => onDataChange('projects', data)}
          />
        );
      case 'certifications':
        return (
          <CertificationsForm
            data={resumeData.certifications}
            onChange={(data) => onDataChange('certifications', data)}
          />
        );
      case 'achievements':
        return (
          <AchievementsForm
            data={resumeData.achievements}
            onChange={(data) => onDataChange('achievements', data)}
          />
        );
      case 'references':
        return (
          <ReferencesForm
            data={resumeData.references}
            onChange={(data) => onDataChange('references', data)}
          />
        );
      case 'custom':
        return (
          <CustomSectionsForm
            data={resumeData.customSections}
            onChange={(data) => onDataChange('customSections', data)}
          />
        );
      default:
        return <div>Select a section to edit</div>;
    }
  };

  const getSectionTitle = () => {
    const titles: { [key: string]: string } = {
      personal: 'Personal Information',
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills & Expertise',
      projects: 'Projects',
      certifications: 'Certifications',
      achievements: 'Achievements & Awards',
      references: 'References',
      custom: 'Custom Sections'
    };
    return titles[activeSection] || 'Resume Section';
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{getSectionTitle()}</h2>
        <p className="text-gray-600 text-sm mt-1">
          Fill in your information below. Changes will be reflected in the preview automatically.
        </p>
      </div>
      
      <div className="space-y-6">
        {renderSection()}
      </div>
    </div>
  );
}
