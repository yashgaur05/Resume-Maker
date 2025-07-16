'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import resumeService, { ResumeData } from '@/services/resumeService';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
}

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: ''
  });

  const [summary, setSummary] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  // Sample data for demonstration
  const loadSampleData = () => {
    setPersonalInfo({
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev',
      linkedin: 'https://linkedin.com/in/johndoe'
    });
    setSummary('Experienced software developer with 5+ years of expertise in full-stack development. Passionate about creating scalable web applications and leading cross-functional teams to deliver high-quality solutions.');
    setExperiences([
      {
        id: '1',
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2021',
        endDate: '2024',
        current: true,
        description: 'Led development of microservices architecture'
      }
    ]);
    setEducation([
      {
        id: '1',
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2016',
        endDate: '2020',
        gpa: '3.8'
      }
    ]);
    setSkills(['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker']);
  };

  const templates: Template[] = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with subtle colors',
      preview: '🎨',
      category: 'Professional'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional and professional layout',
      preview: '📋',
      category: 'Traditional'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and artistic design for creative fields',
      preview: '🎭',
      category: 'Creative'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant with lots of white space',
      preview: '⚪',
      category: 'Simple'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate style perfect for business roles',
      preview: '💼',
      category: 'Business'
    },
    {
      id: 'academic',
      name: 'Academic',
      description: 'Scholarly design for academic positions',
      preview: '🎓',
      category: 'Academic'
    },
    {
      id: 'tech',
      name: 'Tech',
      description: 'Developer-focused with modern typography',
      preview: '💻',
      category: 'Technology'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Premium look for senior positions',
      preview: '👔',
      category: 'Executive'
    }
  ];

  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Summary', icon: '📝' },
    { number: 3, title: 'Experience', icon: '💼' },
    { number: 4, title: 'Education', icon: '🎓' },
    { number: 5, title: 'Skills', icon: '⚡' },
    { number: 6, title: 'Template', icon: '🎨' },
    { number: 7, title: 'Preview', icon: '👀' }
  ];

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setExperiences(prev => [...prev, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(prev => prev.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setEducation(prev => [...prev, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(prev => prev.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(prev => prev.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    setSkills(prev => [...prev, '']);
  };

  const updateSkill = (index: number, value: string) => {
    setSkills(prev => prev.map((skill, i) => i === index ? value : skill));
  };

  const removeSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const exportToPDF = async () => {
    if (!resumeRef.current) return;

    setIsExporting(true);

    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;

      const element = resumeRef.current;
      const fileName = `${personalInfo.fullName || 'Resume'}_${selectedTemplate}.pdf`;

      const opt = {
        margin: 0.5,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait'
        }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const saveResumeData = async () => {
    if (!personalInfo.fullName || !personalInfo.email) {
      alert('Please fill in your name and email before saving.');
      return;
    }

    setIsSaving(true);

    const resumeData = {
      personalInfo,
      summary,
      experiences,
      education,
      skills,
      selectedTemplate
    };

    try {
      let result;

      if (currentResumeId) {
        // Update existing resume
        result = await resumeService.updateResume(currentResumeId, resumeData);
      } else {
        // Create new resume
        result = await resumeService.saveResume(resumeData);
      }

      if (result.success && result.data) {
        setCurrentResumeId(result.data._id || null);
        // Also save to localStorage as backup
        resumeService.saveToLocalStorage({ ...resumeData, currentStep });
        alert(result.message || 'Resume saved to database successfully!');
      } else {
        // Fallback to localStorage if database fails
        resumeService.saveToLocalStorage({ ...resumeData, currentStep });
        alert('Database save failed. Saved locally instead: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      // Fallback to localStorage
      resumeService.saveToLocalStorage({ ...resumeData, currentStep });
      alert('Database save failed. Saved locally instead.');
    } finally {
      setIsSaving(false);
    }
  };

  const loadResumeData = async () => {
    if (!personalInfo.email) {
      // Try to load from localStorage first
      const localData = resumeService.loadFromLocalStorage();
      if (localData) {
        setPersonalInfo(localData.personalInfo || {});
        setSummary(localData.summary || '');
        setExperiences(localData.experiences || []);
        setEducation(localData.education || []);
        setSkills(localData.skills || []);
        setSelectedTemplate(localData.selectedTemplate || 'modern');
        setCurrentStep(localData.currentStep || 1);
        alert('Resume data loaded from local storage!');
      } else {
        alert('Please enter your email to load saved resumes from database.');
      }
      return;
    }

    setIsLoading(true);

    try {
      const result = await resumeService.getResumesByEmail(personalInfo.email);

      if (result.success && result.data && result.data.length > 0) {
        const latestResume = result.data[0]; // Get the most recent resume
        setCurrentResumeId(latestResume._id || null);
        setPersonalInfo(latestResume.personalInfo);
        setSummary(latestResume.summary);
        setExperiences(latestResume.experiences);
        setEducation(latestResume.education);
        setSkills(latestResume.skills);
        setSelectedTemplate(latestResume.selectedTemplate);

        alert(`Resume loaded from database! Found ${result.data.length} saved resume(s).`);
      } else {
        // Try localStorage as fallback
        const localData = resumeService.loadFromLocalStorage();
        if (localData) {
          setPersonalInfo(localData.personalInfo || {});
          setSummary(localData.summary || '');
          setExperiences(localData.experiences || []);
          setEducation(localData.education || []);
          setSkills(localData.skills || []);
          setSelectedTemplate(localData.selectedTemplate || 'modern');
          setCurrentStep(localData.currentStep || 1);
          alert('No database records found. Loaded from local storage instead.');
        } else {
          alert('No saved resume data found in database or local storage.');
        }
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      alert('Error loading resume from database. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Personal Information</h2>
        <button
          onClick={loadSampleData}
          className="btn-secondary text-sm"
        >
          📝 Load Sample Data
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-input"
            value={personalInfo.fullName}
            onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-input"
            value={personalInfo.email}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            placeholder="john.doe@email.com"
          />
        </div>
        <div>
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-input"
            value={personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-input"
            value={personalInfo.location}
            onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
            placeholder="City, State"
          />
        </div>
        <div>
          <label className="form-label">Website</label>
          <input
            type="url"
            className="form-input"
            value={personalInfo.website}
            onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </div>
        <div>
          <label className="form-label">LinkedIn</label>
          <input
            type="url"
            className="form-input"
            value={personalInfo.linkedin}
            onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
      </div>
    </div>
  );

  const renderSummaryStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Professional Summary</h2>
      <div>
        <label className="form-label">Summary</label>
        <textarea
          className="form-input h-32"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Write a brief professional summary highlighting your key achievements and career goals..."
        />
        <p className="text-sm text-gray-500 mt-1">
          💡 Tip: Keep it concise (2-3 sentences) and focus on your most relevant skills and achievements.
        </p>
      </div>
    </div>
  );

  const renderTemplateStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Choose Template</h2>
      <p className="text-gray-600">Select a template that best fits your style and industry</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer border-2 rounded-lg p-4 transition-all hover:shadow-lg ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">{template.preview}</div>
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{template.category}</p>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
            {selectedTemplate === template.id && (
              <div className="mt-2 text-center">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ✓ Selected
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Selected Template: {templates.find(t => t.id === selectedTemplate)?.name}</h4>
        <p className="text-blue-700 text-sm">{templates.find(t => t.id === selectedTemplate)?.description}</p>
      </div>
    </div>
  );

  const getTemplateStyles = (templateId: string) => {
    const styles = {
      modern: {
        container: 'bg-white border-l-4 border-blue-500',
        header: 'bg-gradient-to-r from-blue-50 to-blue-100 p-6',
        name: 'text-2xl font-bold text-blue-900',
        contact: 'text-blue-700',
        section: 'border-b border-blue-200 pb-4 mb-4',
        sectionTitle: 'text-lg font-semibold text-blue-800 mb-2'
      },
      classic: {
        container: 'bg-white border border-gray-300',
        header: 'border-b-2 border-gray-800 p-6',
        name: 'text-2xl font-bold text-gray-900',
        contact: 'text-gray-700',
        section: 'border-b border-gray-300 pb-4 mb-4',
        sectionTitle: 'text-lg font-semibold text-gray-800 mb-2 uppercase tracking-wide'
      },
      creative: {
        container: 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200',
        header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6',
        name: 'text-2xl font-bold',
        contact: 'text-purple-100',
        section: 'border-b border-purple-200 pb-4 mb-4',
        sectionTitle: 'text-lg font-semibold text-purple-700 mb-2'
      },
      minimal: {
        container: 'bg-white',
        header: 'p-6',
        name: 'text-2xl font-light text-gray-900',
        contact: 'text-gray-600',
        section: 'pb-4 mb-4',
        sectionTitle: 'text-lg font-light text-gray-800 mb-2'
      }
    };
    return styles[templateId as keyof typeof styles] || styles.modern;
  };

  const renderPreview = (forPDF = false) => {
    const styles = getTemplateStyles(selectedTemplate);

    return (
      <div
        ref={forPDF ? resumeRef : null}
        className={`${styles.container} ${forPDF ? 'print-resume' : 'rounded-lg shadow-lg'} overflow-hidden ${forPDF ? 'w-full' : 'max-w-2xl mx-auto'}`}
        style={forPDF ? {
          minHeight: '11in',
          width: '8.5in',
          margin: '0 auto',
          backgroundColor: 'white',
          fontSize: '12px',
          lineHeight: '1.4'
        } : {}}
      >
        {/* Header */}
        <div className={styles.header} style={forPDF ? { padding: '24px' } : {}}>
          <h1 className={styles.name} style={forPDF ? { fontSize: '24px', marginBottom: '8px' } : {}}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className={`${styles.contact} space-y-1 mt-2`} style={forPDF ? { fontSize: '11px' } : {}}>
            {personalInfo.email && <div>📧 {personalInfo.email}</div>}
            {personalInfo.phone && <div>📱 {personalInfo.phone}</div>}
            {personalInfo.location && <div>📍 {personalInfo.location}</div>}
            {personalInfo.website && <div>🌐 {personalInfo.website}</div>}
            {personalInfo.linkedin && <div>💼 {personalInfo.linkedin}</div>}
          </div>
        </div>

        <div className="p-6 space-y-6" style={forPDF ? { padding: '24px', fontSize: '11px' } : {}}>
          {/* Summary */}
          {summary && (
            <div className={styles.section} style={forPDF ? { marginBottom: '16px', paddingBottom: '12px' } : {}}>
              <h2 className={styles.sectionTitle} style={forPDF ? { fontSize: '14px', marginBottom: '8px' } : {}}>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed" style={forPDF ? { lineHeight: '1.5' } : {}}>
                {summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Work Experience</h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-semibold">{exp.position || 'Position'}</h3>
                    <p className="text-gray-600">{exp.company || 'Company'}</p>
                    <p className="text-sm text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    {exp.description && (
                      <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold">
                      {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-gray-600">{edu.institution || 'Institution'}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                      {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.filter(skill => skill.trim()).map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfoStep();
      case 2:
        return renderSummaryStep();
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Work Experience</h2>
              <button onClick={addExperience} className="btn-primary">
                + Add Experience
              </button>
            </div>

            {experiences.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No work experience added yet.</p>
                <button onClick={addExperience} className="btn-primary">
                  Add Your First Experience
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="bg-gray-50 rounded-lg p-6 border">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Experience #{index + 1}</h3>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Job Title *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="form-label">Company *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="Tech Corp"
                        />
                      </div>
                      <div>
                        <label className="form-label">Start Date</label>
                        <input
                          type="text"
                          className="form-input"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          placeholder="Jan 2020"
                        />
                      </div>
                      <div>
                        <label className="form-label">End Date</label>
                        <input
                          type="text"
                          className="form-input"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          placeholder="Dec 2023"
                          disabled={exp.current}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm">I currently work here</span>
                      </label>
                    </div>

                    <div className="mt-4">
                      <label className="form-label">Job Description</label>
                      <textarea
                        className="form-input h-24"
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Education</h2>
              <button onClick={addEducation} className="btn-primary">
                + Add Education
              </button>
            </div>

            {education.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No education added yet.</p>
                <button onClick={addEducation} className="btn-primary">
                  Add Your First Education
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={edu.id} className="bg-gray-50 rounded-lg p-6 border">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Education #{index + 1}</h3>
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Institution *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          placeholder="University of Technology"
                        />
                      </div>
                      <div>
                        <label className="form-label">Degree *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div>
                        <label className="form-label">Field of Study</label>
                        <input
                          type="text"
                          className="form-input"
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                          placeholder="Computer Science"
                        />
                      </div>
                      <div>
                        <label className="form-label">GPA (Optional)</label>
                        <input
                          type="text"
                          className="form-input"
                          value={edu.gpa}
                          onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                          placeholder="3.8"
                        />
                      </div>
                      <div>
                        <label className="form-label">Start Date</label>
                        <input
                          type="text"
                          className="form-input"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          placeholder="2016"
                        />
                      </div>
                      <div>
                        <label className="form-label">End Date</label>
                        <input
                          type="text"
                          className="form-input"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          placeholder="2020"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Skills</h2>
              <button onClick={addSkill} className="btn-primary">
                + Add Skill
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-sm">
                💡 <strong>Tip:</strong> Add your technical skills, programming languages, tools, and soft skills.
                Each skill will appear as a tag on your resume.
              </p>
            </div>

            {skills.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No skills added yet.</p>
                <button onClick={addSkill} className="btn-primary">
                  Add Your First Skill
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="form-input flex-1"
                        value={skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        placeholder="e.g., JavaScript, React, Project Management"
                      />
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Remove skill"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                {skills.filter(skill => skill.trim()).length > 0 && (
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Preview:</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.filter(skill => skill.trim()).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 6:
        return renderTemplateStep();
      case 7:
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Resume Preview</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="btn-secondary text-sm"
                >
                  {showPreview ? '📝 Edit Mode' : '👀 Preview Mode'}
                </button>
                <button
                  onClick={exportToPDF}
                  disabled={isExporting}
                  className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? '⏳ Generating...' : '📄 Export as PDF'}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Template:</strong> {templates.find(t => t.id === selectedTemplate)?.name}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Your resume is ready! You can preview it below or export it as a PDF.
              </p>
              {currentResumeId && (
                <p className="text-xs text-green-600">
                  ✅ Saved to database (ID: {currentResumeId.slice(-8)})
                </p>
              )}
            </div>

            {renderPreview()}

            {/* Hidden PDF Preview */}
            <div className="hidden">
              {renderPreview(true)}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm md:text-base">
              ← Back to Home
            </Link>
            <h1 className="text-lg md:text-xl font-bold">Resume Builder</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={saveResumeData}
                disabled={isSaving}
                className="btn-secondary text-xs px-2 py-1 hidden sm:block disabled:opacity-50"
                title="Save to Database"
              >
                {isSaving ? '⏳ Saving...' : '💾 Save'}
              </button>
              <button
                onClick={loadResumeData}
                disabled={isLoading}
                className="btn-secondary text-xs px-2 py-1 hidden sm:block disabled:opacity-50"
                title="Load from Database"
              >
                {isLoading ? '⏳ Loading...' : '📂 Load'}
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-secondary text-xs md:text-sm px-2 py-1 md:px-3 md:py-2"
              >
                {showPreview ? '📝' : '👀'}
                <span className="hidden sm:inline ml-1">
                  {showPreview ? 'Edit' : 'Preview'}
                </span>
              </button>
              <div className="text-xs md:text-sm text-gray-500">
                {currentStep}/{steps.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex flex-col items-center cursor-pointer min-w-0 flex-shrink-0 px-1 ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                  }`}
                  onClick={() => setCurrentStep(step.number)}
                >
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
                      currentStep >= step.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-xs mt-1 text-center hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Layout */}
          <div className={`${showPreview && currentStep < 7 ? 'lg:grid lg:grid-cols-2 lg:gap-8' : ''}`}>
            {/* Form Content */}
            <div className={`${showPreview && currentStep < 7 ? 'lg:col-span-1' : ''}`}>
              <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
                {renderCurrentStep()}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 md:mt-8 pt-6 border-t">
                  <button
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                    disabled={currentStep === steps.length}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Sidebar */}
            {showPreview && currentStep < 7 && (
              <div className="lg:col-span-1 mt-6 lg:mt-0">
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {templates.find(t => t.id === selectedTemplate)?.name || 'Modern'}
                      </span>
                      <button
                        onClick={exportToPDF}
                        disabled={isExporting}
                        className="text-xs btn-primary px-2 py-1 disabled:opacity-50"
                        title="Export as PDF"
                      >
                        {isExporting ? '⏳' : '📄'}
                      </button>
                    </div>
                  </div>
                  <div className="transform scale-75 origin-top-left w-[133%] h-96 overflow-hidden">
                    {renderPreview()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
