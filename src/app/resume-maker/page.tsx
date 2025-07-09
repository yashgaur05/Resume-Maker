'use client';

import { useState, useRef } from 'react';
import { ResumeData, Template } from '@/types/resume';
import ResumeForm from '@/components/resume/ResumeForm';
import ResumePreview from '@/components/resume/ResumePreview';
import TemplateSelector from '@/components/resume/TemplateSelector';

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
    languages: []
  },
  projects: [],
  certifications: [],
  achievements: [],
  references: [],
  customSections: []
};

export default function ResumeMaker() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('modern');
  const [activeSection, setActiveSection] = useState('personal');
  const [previewMode, setPreviewMode] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDataChange = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleExportPDF = async () => {
    if (typeof window !== 'undefined') {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = resumeRef.current;
      
      if (element) {
        const opt = {
          margin: 0.5,
          filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
      }
    }
  };

  const handleSaveData = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert('Resume data saved successfully!');
  };

  const handleLoadData = () => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      setResumeData(JSON.parse(saved));
      alert('Resume data loaded successfully!');
    } else {
      alert('No saved data found!');
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'summary', label: 'Summary', icon: '📝' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'achievements', label: 'Achievements', icon: '🌟' },
    { id: 'references', label: 'References', icon: '👥' },
    { id: 'custom', label: 'Custom Sections', icon: '➕' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              📄 Professional Resume Maker
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  previewMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {previewMode ? '📝 Edit' : '👁️ Preview'}
              </button>
              <button
                onClick={handleSaveData}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                💾 Save
              </button>
              <button
                onClick={handleLoadData}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                📂 Load
              </button>
              <button
                onClick={handleExportPDF}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                📥 Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {!previewMode ? (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Navigation */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-lg p-4 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Resume Sections</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{section.icon}</span>
                      <span>{section.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Template Selector */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <TemplateSelector
                    selectedTemplate={selectedTemplate}
                    onTemplateChange={setSelectedTemplate}
                  />
                </div>
              </div>
            </div>

            {/* Center - Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <ResumeForm
                  activeSection={activeSection}
                  resumeData={resumeData}
                  onDataChange={handleDataChange}
                />
              </div>
            </div>

            {/* Right - Preview */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-lg p-4 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div ref={resumeRef} className="transform scale-75 origin-top-left">
                    <ResumePreview
                      data={resumeData}
                      template={selectedTemplate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Full Preview Mode */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div ref={resumeRef}>
                <ResumePreview
                  data={resumeData}
                  template={selectedTemplate}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
