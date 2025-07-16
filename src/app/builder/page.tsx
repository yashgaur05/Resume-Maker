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

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
  startDate?: string;
  endDate?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
}

interface Volunteer {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('yash-template');
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Font customization for Yash's template
  const [fontSize, setFontSize] = useState('medium');
  const [fontFamily, setFontFamily] = useState('inter');
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [volunteer, setVolunteer] = useState<Volunteer[]>([]);

  // Sample data for demonstration
  const sampleDataSets = {
    software: {
      personalInfo: {
        fullName: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        website: 'https://sarahchen.dev',
        linkedin: 'https://linkedin.com/in/sarahchen'
      },
      summary: 'Senior Software Engineer with 7+ years of experience building scalable web applications and leading engineering teams. Expertise in full-stack development, cloud architecture, and agile methodologies. Proven track record of delivering high-impact products that serve millions of users.',
      experiences: [
        {
          id: '1',
          company: 'Google',
          position: 'Senior Software Engineer',
          startDate: 'Jan 2022',
          endDate: '',
          current: true,
          description: '• Led development of core search infrastructure serving 100M+ daily users\n• Architected microservices using Go and Kubernetes, improving system reliability by 40%\n• Mentored 5 junior engineers and established best practices for code review and testing\n• Collaborated with product managers to define technical requirements for new features'
        },
        {
          id: '2',
          company: 'Meta (Facebook)',
          position: 'Software Engineer',
          startDate: 'Jun 2019',
          endDate: 'Dec 2021',
          current: false,
          description: '• Built and maintained React-based user interfaces for Facebook Marketplace\n• Optimized database queries reducing page load times by 35%\n• Implemented A/B testing framework used by 20+ product teams\n• Participated in on-call rotation and incident response for critical systems'
        },
        {
          id: '3',
          company: 'Startup Inc.',
          position: 'Full Stack Developer',
          startDate: 'Aug 2017',
          endDate: 'May 2019',
          current: false,
          description: '• Developed MVP for fintech startup from concept to 10,000 active users\n• Built RESTful APIs using Node.js and PostgreSQL\n• Implemented CI/CD pipelines using Jenkins and Docker\n• Worked directly with founders to prioritize features and technical debt'
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Stanford University',
          degree: 'Master of Science',
          field: 'Computer Science',
          startDate: '2015',
          endDate: '2017',
          gpa: '3.9'
        },
        {
          id: '2',
          institution: 'UC Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2011',
          endDate: '2015',
          gpa: '3.7'
        }
      ],
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Go', 'AWS', 'Kubernetes', 'Docker', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Git', 'Agile/Scrum']
    },
    business: {
      personalInfo: {
        fullName: 'Michael Rodriguez',
        email: 'michael.rodriguez@email.com',
        phone: '+1 (555) 987-6543',
        location: 'New York, NY',
        website: 'https://michaelrodriguez.com',
        linkedin: 'https://linkedin.com/in/michaelrodriguez'
      },
      summary: 'Results-driven Business Development Manager with 8+ years of experience in B2B sales and strategic partnerships. Proven track record of exceeding revenue targets by 25%+ and building lasting client relationships. Expert in market analysis, contract negotiation, and cross-functional team leadership.',
      experiences: [
        {
          id: '1',
          company: 'Salesforce',
          position: 'Senior Business Development Manager',
          startDate: 'Mar 2021',
          endDate: '',
          current: true,
          description: '• Manage $15M+ portfolio of enterprise accounts, consistently exceeding quarterly targets by 30%\n• Developed strategic partnerships with 3 major technology vendors, generating $5M in new revenue\n• Led cross-functional team of 8 members to launch new product line in EMEA market\n• Implemented CRM optimization strategies that improved sales team efficiency by 45%'
        },
        {
          id: '2',
          company: 'HubSpot',
          position: 'Business Development Manager',
          startDate: 'Jan 2019',
          endDate: 'Feb 2021',
          current: false,
          description: '• Generated $8M+ in new business through strategic outbound campaigns\n• Built and maintained relationships with C-level executives at Fortune 500 companies\n• Collaborated with marketing team to develop lead generation strategies\n• Achieved 120% of annual quota for two consecutive years'
        },
        {
          id: '3',
          company: 'Oracle',
          position: 'Sales Representative',
          startDate: 'Jun 2016',
          endDate: 'Dec 2018',
          current: false,
          description: '• Managed territory of 150+ SMB accounts with annual revenue of $3M+\n• Conducted product demonstrations and technical presentations to key stakeholders\n• Negotiated contracts and pricing with procurement teams\n• Mentored 3 new sales representatives on best practices and company processes'
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Wharton School, University of Pennsylvania',
          degree: 'Master of Business Administration',
          field: 'Finance & Strategy',
          startDate: '2014',
          endDate: '2016',
          gpa: '3.8'
        },
        {
          id: '2',
          institution: 'University of Michigan',
          degree: 'Bachelor of Arts',
          field: 'Economics',
          startDate: '2010',
          endDate: '2014',
          gpa: '3.6'
        }
      ],
      skills: ['B2B Sales', 'Strategic Partnerships', 'CRM (Salesforce)', 'Contract Negotiation', 'Market Analysis', 'Lead Generation', 'Account Management', 'Financial Modeling', 'Presentation Skills', 'Team Leadership']
    },
    marketing: {
      personalInfo: {
        fullName: 'Emily Johnson',
        email: 'emily.johnson@email.com',
        phone: '+1 (555) 456-7890',
        location: 'Los Angeles, CA',
        website: 'https://emilyjohnson.marketing',
        linkedin: 'https://linkedin.com/in/emilyjohnson'
      },
      summary: 'Creative Digital Marketing Manager with 6+ years of experience driving brand growth through data-driven campaigns. Expertise in social media marketing, content strategy, and performance analytics. Successfully increased brand engagement by 200%+ and generated $10M+ in attributed revenue.',
      experiences: [
        {
          id: '1',
          company: 'Nike',
          position: 'Senior Digital Marketing Manager',
          startDate: 'Feb 2022',
          endDate: '',
          current: true,
          description: '• Lead digital marketing strategy for Nike Running division ($500M+ annual revenue)\n• Managed $5M annual advertising budget across Google Ads, Facebook, and Instagram\n• Increased social media engagement by 250% through innovative content campaigns\n• Collaborated with creative teams to develop award-winning video content'
        },
        {
          id: '2',
          company: 'Spotify',
          position: 'Digital Marketing Manager',
          startDate: 'Aug 2020',
          endDate: 'Jan 2022',
          current: false,
          description: '• Developed and executed marketing campaigns for Spotify Premium subscriptions\n• Increased conversion rates by 40% through A/B testing and optimization\n• Managed influencer partnerships with 50+ content creators\n• Analyzed campaign performance using Google Analytics and internal tools'
        },
        {
          id: '3',
          company: 'Startup Media Co.',
          position: 'Marketing Specialist',
          startDate: 'May 2018',
          endDate: 'Jul 2020',
          current: false,
          description: '• Created content marketing strategy that increased organic traffic by 300%\n• Managed social media accounts with 100K+ followers across platforms\n• Designed and implemented email marketing campaigns with 25% open rates\n• Coordinated with design team to create visual assets for campaigns'
        }
      ],
      education: [
        {
          id: '1',
          institution: 'UCLA',
          degree: 'Master of Science',
          field: 'Marketing Analytics',
          startDate: '2016',
          endDate: '2018',
          gpa: '3.9'
        },
        {
          id: '2',
          institution: 'USC',
          degree: 'Bachelor of Arts',
          field: 'Communications',
          startDate: '2012',
          endDate: '2016',
          gpa: '3.7'
        }
      ],
      skills: ['Digital Marketing', 'Social Media Marketing', 'Google Ads', 'Facebook Ads', 'Content Strategy', 'SEO/SEM', 'Google Analytics', 'A/B Testing', 'Email Marketing', 'Influencer Marketing', 'Adobe Creative Suite', 'Marketing Automation']
    }
  };

  const loadSampleData = (type: 'software' | 'business' | 'marketing' = 'software') => {
    const data = sampleDataSets[type];
    setPersonalInfo(data.personalInfo);
    setSummary(data.summary);
    setExperiences(data.experiences);
    setEducation(data.education);
    setSkills(data.skills);
  };

  const templates: Template[] = [
    {
      id: 'yash-template',
      name: "Yash's Used Template",
      description: 'Personalized developer template with customizable fonts and export options',
      preview: '⭐',
      category: 'Featured'
    },
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
      description: 'Traditional black & white professional layout',
      preview: '📋',
      category: 'Traditional'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Premium corporate design for C-level positions',
      preview: '👔',
      category: 'Executive'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Standard business format used by Fortune 500',
      preview: '💼',
      category: 'Business'
    },
    {
      id: 'ats-friendly',
      name: 'ATS Friendly',
      description: 'Optimized for Applicant Tracking Systems',
      preview: '🤖',
      category: 'ATS'
    },
    {
      id: 'harvard',
      name: 'Harvard Style',
      description: 'Academic format preferred by top universities',
      preview: '🏛️',
      category: 'Academic'
    },
    {
      id: 'tech',
      name: 'Tech',
      description: 'Developer-focused with clean code aesthetics',
      preview: '💻',
      category: 'Technology'
    },
    {
      id: 'consulting',
      name: 'Consulting',
      description: 'McKinsey/BCG style for consulting roles',
      preview: '📊',
      category: 'Consulting'
    },
    {
      id: 'banking',
      name: 'Banking',
      description: 'Conservative design for financial services',
      preview: '🏦',
      category: 'Finance'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design for creative and design roles',
      preview: '🎭',
      category: 'Creative'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean Scandinavian-inspired design',
      preview: '⚪',
      category: 'Simple'
    },
    {
      id: 'legal',
      name: 'Legal',
      description: 'Formal layout for law firms and legal roles',
      preview: '⚖️',
      category: 'Legal'
    }
  ];

  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Summary', icon: '📝' },
    { number: 3, title: 'Experience', icon: '💼' },
    { number: 4, title: 'Education', icon: '🎓' },
    { number: 5, title: 'Skills', icon: '⚡' },
    { number: 6, title: 'Projects', icon: '🚀' },
    { number: 7, title: 'Certifications', icon: '🏆' },
    { number: 8, title: 'Additional', icon: '📋' },
    { number: 9, title: 'Template', icon: '🎨' },
    { number: 10, title: 'Preview', icon: '👀' }
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

  // Project functions
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: ''
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(prev => prev.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  // Certification functions
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      link: ''
    };
    setCertifications(prev => [...prev, newCert]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCertifications(prev => prev.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertification = (id: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
  };

  // Award functions
  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      date: '',
      description: ''
    };
    setAwards(prev => [...prev, newAward]);
  };

  const updateAward = (id: string, field: keyof Award, value: string) => {
    setAwards(prev => prev.map(award =>
      award.id === id ? { ...award, [field]: value } : award
    ));
  };

  const removeAward = (id: string) => {
    setAwards(prev => prev.filter(award => award.id !== id));
  };

  // Language functions
  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Beginner'
    };
    setLanguages(prev => [...prev, newLang]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setLanguages(prev => prev.map(lang =>
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const removeLanguage = (id: string) => {
    setLanguages(prev => prev.filter(lang => lang.id !== id));
  };

  // Volunteer functions
  const addVolunteer = () => {
    const newVol: Volunteer = {
      id: Date.now().toString(),
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setVolunteer(prev => [...prev, newVol]);
  };

  const updateVolunteer = (id: string, field: keyof Volunteer, value: string | boolean) => {
    setVolunteer(prev => prev.map(vol =>
      vol.id === id ? { ...vol, [field]: value } : vol
    ));
  };

  const removeVolunteer = (id: string) => {
    setVolunteer(prev => prev.filter(vol => vol.id !== id));
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

  const exportToWord = async () => {
    if (!resumeRef.current) return;

    setIsExporting(true);

    try {
      // Create a simple HTML structure for Word export
      const resumeContent = resumeRef.current.innerHTML;
      const wordContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Resume</title>
          <style>
            body { font-family: ${fontFamily === 'inter' ? 'Arial, sans-serif' : fontFamily === 'times' ? 'Times New Roman, serif' : fontFamily === 'georgia' ? 'Georgia, serif' : 'Arial, sans-serif'};
                   font-size: ${fontSize === 'small' ? '10px' : fontSize === 'large' ? '12px' : '11px'};
                   line-height: 1.2; margin: 0.5in; }
            h1 { font-size: ${fontSize === 'small' ? '16px' : fontSize === 'large' ? '20px' : '18px'}; color: #2563eb; text-align: center; margin-bottom: 5px; }
            h2 { font-size: ${fontSize === 'small' ? '12px' : fontSize === 'large' ? '14px' : '13px'}; color: #2563eb; border-bottom: 1px solid #2563eb; margin-top: 8px; margin-bottom: 3px; }
            .contact-info { text-align: center; margin-bottom: 8px; }
            .section { margin-bottom: 8px; }
            .experience-item, .education-item, .project-item { margin-bottom: 5px; }
            .job-title, .degree-title, .project-title { font-weight: bold; }
            .company, .institution { font-style: italic; }
            .date { color: #666; font-size: smaller; }
            .skills { display: flex; flex-wrap: wrap; gap: 5px; }
            .skill-tag { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: smaller; }
          </style>
        </head>
        <body>
          ${resumeContent.replace(/class="[^"]*"/g, '').replace(/style="[^"]*"/g, '')}
        </body>
        </html>
      `;

      const blob = new Blob([wordContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${personalInfo.fullName || 'Resume'}_${selectedTemplate}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating Word document:', error);
      alert('Error generating Word document. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getFontStyles = () => {
    if (selectedTemplate !== 'yash-template') return {};

    const fontFamilyMap = {
      inter: 'Inter, system-ui, -apple-system, sans-serif',
      times: 'Times New Roman, serif',
      georgia: 'Georgia, serif',
      arial: 'Arial, sans-serif',
      helvetica: 'Helvetica, Arial, sans-serif'
    };

    const fontSizeMap = {
      small: { base: '10px', name: '16px', section: '12px' },
      medium: { base: '11px', name: '18px', section: '13px' },
      large: { base: '12px', name: '20px', section: '14px' }
    };

    return {
      fontFamily: fontFamilyMap[fontFamily as keyof typeof fontFamilyMap] || fontFamilyMap.inter,
      fontSize: fontSizeMap[fontSize as keyof typeof fontSizeMap]?.base || fontSizeMap.medium.base,
      nameSize: fontSizeMap[fontSize as keyof typeof fontSizeMap]?.name || fontSizeMap.medium.name,
      sectionSize: fontSizeMap[fontSize as keyof typeof fontSizeMap]?.section || fontSizeMap.medium.section
    };
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
      projects,
      certifications,
      awards,
      languages,
      volunteer,
      selectedTemplate,
      fontSize,
      fontFamily
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
        setProjects(localData.projects || []);
        setCertifications(localData.certifications || []);
        setAwards(localData.awards || []);
        setLanguages(localData.languages || []);
        setVolunteer(localData.volunteer || []);
        setSelectedTemplate(localData.selectedTemplate || 'yash-template');
        setFontSize(localData.fontSize || 'medium');
        setFontFamily(localData.fontFamily || 'inter');
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
        setExperiences(latestResume.experiences || []);
        setEducation(latestResume.education || []);
        setSkills(latestResume.skills || []);
        setProjects(latestResume.projects || []);
        setCertifications(latestResume.certifications || []);
        setAwards(latestResume.awards || []);
        setLanguages(latestResume.languages || []);
        setVolunteer(latestResume.volunteer || []);
        setSelectedTemplate(latestResume.selectedTemplate);
        setFontSize(latestResume.fontSize || 'medium');
        setFontFamily(latestResume.fontFamily || 'inter');

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
          setProjects(localData.projects || []);
          setCertifications(localData.certifications || []);
          setAwards(localData.awards || []);
          setLanguages(localData.languages || []);
          setVolunteer(localData.volunteer || []);
          setSelectedTemplate(localData.selectedTemplate || 'yash-template');
          setFontSize(localData.fontSize || 'medium');
          setFontFamily(localData.fontFamily || 'inter');
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
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => loadSampleData('software')}
            className="btn-secondary text-sm"
          >
            💻 Tech Sample
          </button>
          <button
            onClick={() => loadSampleData('business')}
            className="btn-secondary text-sm"
          >
            💼 Business Sample
          </button>
          <button
            onClick={() => loadSampleData('marketing')}
            className="btn-secondary text-sm"
          >
            📈 Marketing Sample
          </button>
        </div>
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
      <p className="text-gray-600">Select a professional template that best fits your industry and career level</p>

      {/* Template Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['All', 'Professional', 'Executive', 'Academic', 'Technology', 'Creative'].map((category) => (
          <button
            key={category}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer border-2 rounded-lg p-4 transition-all hover:shadow-lg transform hover:scale-105 ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{template.preview}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full mb-2">
                {template.category}
              </span>
              <p className="text-sm text-gray-600 leading-tight">{template.description}</p>
            </div>
            {selectedTemplate === template.id && (
              <div className="mt-3 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ✓ Selected
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl">{templates.find(t => t.id === selectedTemplate)?.preview}</div>
          <div>
            <h4 className="font-semibold text-blue-900">
              {templates.find(t => t.id === selectedTemplate)?.name} Template
            </h4>
            <p className="text-blue-600 text-sm">
              {templates.find(t => t.id === selectedTemplate)?.category} Category
            </p>
          </div>
        </div>
        <p className="text-blue-700 text-sm leading-relaxed">
          {templates.find(t => t.id === selectedTemplate)?.description}
        </p>
        <div className="mt-3 text-xs text-blue-600">
          💡 This template is optimized for {templates.find(t => t.id === selectedTemplate)?.category.toLowerCase()} roles and follows industry best practices.
        </div>

        {/* Font Customization for Yash's Template */}
        {selectedTemplate === 'yash-template' && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-blue-300">
            <h5 className="font-semibold text-blue-900 mb-4">⭐ Exclusive Customization Options</h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Font Family</label>
                <select
                  className="form-input"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                >
                  <option value="inter">Inter (Modern)</option>
                  <option value="times">Times New Roman (Classic)</option>
                  <option value="georgia">Georgia (Elegant)</option>
                  <option value="arial">Arial (Clean)</option>
                  <option value="helvetica">Helvetica (Professional)</option>
                </select>
              </div>

              <div>
                <label className="form-label">Font Size</label>
                <select
                  className="form-input"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                >
                  <option value="small">Small (10px) - Ultra Compact</option>
                  <option value="medium">Medium (11px) - Compact</option>
                  <option value="large">Large (12px) - Standard</option>
                </select>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                🎨 <strong>Personalized for Yash:</strong> These customization options are exclusively available for your template.
                Changes will be reflected in both preview and exports.
              </p>
            </div>
          </div>
        )}
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
        container: 'bg-white border border-gray-400',
        header: 'border-b-2 border-black p-6 bg-white',
        name: 'text-2xl font-bold text-black uppercase tracking-wide',
        contact: 'text-gray-800',
        section: 'border-b border-gray-400 pb-4 mb-4',
        sectionTitle: 'text-lg font-bold text-black mb-2 uppercase tracking-wider'
      },
      executive: {
        container: 'bg-white border-2 border-gray-800',
        header: 'bg-gray-900 text-white p-8',
        name: 'text-3xl font-bold tracking-wide',
        contact: 'text-gray-300',
        section: 'border-b-2 border-gray-800 pb-6 mb-6',
        sectionTitle: 'text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide'
      },
      professional: {
        container: 'bg-white border border-gray-300',
        header: 'bg-gray-100 border-b border-gray-300 p-6',
        name: 'text-2xl font-semibold text-gray-900',
        contact: 'text-gray-700',
        section: 'border-b border-gray-200 pb-4 mb-4',
        sectionTitle: 'text-lg font-semibold text-gray-800 mb-2'
      },
      'ats-friendly': {
        container: 'bg-white',
        header: 'p-6 border-b border-gray-300',
        name: 'text-2xl font-bold text-black',
        contact: 'text-black',
        section: 'pb-4 mb-4',
        sectionTitle: 'text-lg font-bold text-black mb-2 uppercase'
      },
      harvard: {
        container: 'bg-white',
        header: 'p-6 text-center border-b-2 border-red-800',
        name: 'text-2xl font-serif font-bold text-red-800',
        contact: 'text-gray-700',
        section: 'pb-4 mb-4',
        sectionTitle: 'text-lg font-serif font-bold text-red-800 mb-2'
      },
      tech: {
        container: 'bg-gray-50 border border-gray-300',
        header: 'bg-gray-900 text-green-400 p-6 font-mono',
        name: 'text-2xl font-mono font-bold',
        contact: 'text-green-300 font-mono text-sm',
        section: 'border-b border-gray-300 pb-4 mb-4',
        sectionTitle: 'text-lg font-mono font-bold text-gray-900 mb-2'
      },
      consulting: {
        container: 'bg-white border border-blue-900',
        header: 'bg-blue-900 text-white p-6',
        name: 'text-2xl font-bold',
        contact: 'text-blue-100',
        section: 'border-b border-blue-200 pb-4 mb-4',
        sectionTitle: 'text-lg font-bold text-blue-900 mb-2'
      },
      banking: {
        container: 'bg-white border-2 border-gray-600',
        header: 'bg-white border-b-2 border-gray-600 p-6',
        name: 'text-2xl font-serif font-bold text-gray-900',
        contact: 'text-gray-700',
        section: 'border-b border-gray-400 pb-4 mb-4',
        sectionTitle: 'text-lg font-serif font-semibold text-gray-900 mb-2'
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
        header: 'p-6 border-b border-gray-200',
        name: 'text-2xl font-light text-gray-900',
        contact: 'text-gray-600',
        section: 'pb-4 mb-4',
        sectionTitle: 'text-lg font-light text-gray-800 mb-2'
      },
      legal: {
        container: 'bg-white border-2 border-black',
        header: 'bg-white border-b-2 border-black p-6',
        name: 'text-2xl font-serif font-bold text-black text-center',
        contact: 'text-black text-center',
        section: 'border-b border-black pb-4 mb-4',
        sectionTitle: 'text-lg font-serif font-bold text-black mb-2 text-center'
      },
      'yash-template': {
        container: 'bg-white border border-gray-300',
        header: 'bg-white p-3 text-center border-b border-gray-300',
        name: 'text-xl font-bold text-blue-600 uppercase tracking-wide',
        contact: 'text-gray-700 text-xs mt-1',
        section: 'pb-2 mb-2',
        sectionTitle: 'text-base font-bold text-blue-600 mb-1 uppercase tracking-wide'
      }
    };
    return styles[templateId as keyof typeof styles] || styles.modern;
  };

  const renderPreview = (forPDF = false) => {
    const styles = getTemplateStyles(selectedTemplate);
    const fontStyles = getFontStyles();

    return (
      <div
        ref={forPDF ? resumeRef : null}
        className={`${styles.container} ${forPDF ? 'print-resume' : 'rounded-lg shadow-lg'} overflow-hidden ${forPDF ? 'w-full' : 'max-w-2xl mx-auto'}`}
        style={{
          ...(forPDF ? {
            minHeight: '11in',
            width: '8.5in',
            margin: '0 auto',
            backgroundColor: 'white',
            fontSize: '12px',
            lineHeight: '1.4'
          } : {}),
          ...(selectedTemplate === 'yash-template' ? {
            fontFamily: fontStyles.fontFamily,
            fontSize: fontStyles.fontSize,
            lineHeight: '1.2',
            padding: forPDF ? '0.3in' : '12px'
          } : {})
        }}
      >
        {/* Header */}
        <div
          className={styles.header}
          style={{
            ...(forPDF ? { padding: '24px' } : {}),
            ...(selectedTemplate === 'yash-template' ? { padding: forPDF ? '12px' : '8px' } : {})
          }}
        >
          <h1
            className={styles.name}
            style={{
              ...(forPDF ? { fontSize: '24px', marginBottom: '8px' } : {}),
              ...(selectedTemplate === 'yash-template' ? { fontSize: fontStyles.nameSize } : {})
            }}
          >
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className={`${styles.contact} ${selectedTemplate === 'yash-template' ? 'space-y-0' : 'space-y-1'} mt-2`} style={forPDF ? { fontSize: '11px' } : {}}>
            {selectedTemplate === 'yash-template' ? (
              // Developer template format - inline contact info
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {personalInfo.email && <span>📧 {personalInfo.email}</span>}
                {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
                {personalInfo.linkedin && <span>💼 LinkedIn: {personalInfo.linkedin.replace('https://linkedin.com/in/', '')}</span>}
              </div>
            ) : (
              // Other templates - vertical contact info
              <>
                {personalInfo.email && <div>📧 {personalInfo.email}</div>}
                {personalInfo.phone && <div>📱 {personalInfo.phone}</div>}
                {personalInfo.location && <div>📍 {personalInfo.location}</div>}
                {personalInfo.website && <div>🌐 {personalInfo.website}</div>}
                {personalInfo.linkedin && <div>💼 {personalInfo.linkedin}</div>}
              </>
            )}
          </div>
        </div>

        <div
          className={selectedTemplate === 'yash-template' ? 'p-3 space-y-3' : 'p-6 space-y-6'}
          style={{
            ...(forPDF ? { padding: '24px', fontSize: '11px' } : {}),
            ...(selectedTemplate === 'yash-template' && forPDF ? { padding: '12px', fontSize: '10px' } : {})
          }}
        >
          {/* Summary */}
          {summary && (
            <div
              className={styles.section}
              style={{
                ...(forPDF ? { marginBottom: '16px', paddingBottom: '12px' } : {}),
                ...(selectedTemplate === 'yash-template' ? { marginBottom: '8px', paddingBottom: '6px' } : {})
              }}
            >
              <h2
                className={styles.sectionTitle}
                style={{
                  ...(forPDF ? { fontSize: '14px', marginBottom: '8px' } : {}),
                  ...(selectedTemplate === 'yash-template' ? { fontSize: fontStyles.sectionSize, marginBottom: '3px' } : {})
                }}
              >
                Professional Summary
              </h2>
              <p
                className={selectedTemplate === 'yash-template' ? 'text-gray-700 leading-tight text-sm' : 'text-gray-700 leading-relaxed'}
                style={forPDF ? { lineHeight: '1.5' } : {}}
              >
                {summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div className={styles.section}>
              <h2
                className={styles.sectionTitle}
                style={selectedTemplate === 'yash-template' ? { fontSize: fontStyles.sectionSize, marginBottom: '3px' } : {}}
              >
                Work Experience
              </h2>
              <div className={selectedTemplate === 'yash-template' ? 'space-y-2' : 'space-y-4'}>
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <h3 className={selectedTemplate === 'yash-template' ? 'font-semibold text-sm' : 'font-semibold'}>
                      {exp.position || 'Position'}
                    </h3>
                    <p className={selectedTemplate === 'yash-template' ? 'text-gray-600 font-medium text-xs' : 'text-gray-600 font-medium'}>
                      {exp.company || 'Company'}
                    </p>
                    <p className={selectedTemplate === 'yash-template' ? 'text-xs text-gray-500 italic' : 'text-sm text-gray-500 italic'}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <div className={selectedTemplate === 'yash-template' ? 'text-xs text-gray-700 mt-1' : 'text-sm text-gray-700 mt-2'}>
                        {exp.description.split('\n').map((line, index) => (
                          <p key={index} className={selectedTemplate === 'yash-template' ? 'mb-0.5' : 'mb-1'}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className={styles.section}>
              <h2
                className={styles.sectionTitle}
                style={selectedTemplate === 'yash-template' ? { fontSize: fontStyles.sectionSize, marginBottom: '3px' } : {}}
              >
                Education
              </h2>
              <div className={selectedTemplate === 'yash-template' ? 'space-y-1' : 'space-y-4'}>
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className={selectedTemplate === 'yash-template' ? 'font-semibold text-sm' : 'font-semibold'}>
                      {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className={selectedTemplate === 'yash-template' ? 'text-gray-600 text-xs' : 'text-gray-600'}>
                      {edu.institution || 'Institution'}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className={selectedTemplate === 'yash-template' ? 'text-xs text-gray-500' : 'text-sm text-gray-500'}>
                        {edu.startDate} - {edu.endDate}
                      </p>
                      {edu.gpa && (
                        <p className={selectedTemplate === 'yash-template' ? 'text-xs text-gray-500' : 'text-sm text-gray-500'}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className={styles.section}>
              <h2
                className={styles.sectionTitle}
                style={selectedTemplate === 'yash-template' ? { fontSize: fontStyles.sectionSize } : {}}
              >
                {selectedTemplate === 'yash-template' ? 'Technical Skills' : 'Skills'}
              </h2>
              {selectedTemplate === 'yash-template' ? (
                // Developer template - categorized skills
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-gray-800">Technical Skills: </span>
                    <span className="text-gray-700">
                      {skills.filter(skill => skill.trim()).join(', ')}
                    </span>
                  </div>
                </div>
              ) : (
                // Other templates - tag format
                <div className="flex flex-wrap gap-2">
                  {skills.filter(skill => skill.trim()).map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className={styles.section}>
              <h2
                className={styles.sectionTitle}
                style={selectedTemplate === 'yash-template' ? { fontSize: fontStyles.sectionSize, marginBottom: '3px' } : {}}
              >
                Projects
              </h2>
              <div className={selectedTemplate === 'yash-template' ? 'space-y-2' : 'space-y-4'}>
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className={selectedTemplate === 'yash-template' ? 'font-semibold text-sm' : 'font-semibold'}>
                      {project.name || 'Project Name'}
                    </h3>
                    {project.technologies && (
                      <p className={selectedTemplate === 'yash-template' ? 'text-xs text-gray-600 italic' : 'text-sm text-gray-600 italic'}>
                        Technologies: {project.technologies}
                      </p>
                    )}
                    {(project.startDate || project.endDate) && (
                      <p className={selectedTemplate === 'yash-template' ? 'text-xs text-gray-500' : 'text-sm text-gray-500'}>
                        {project.startDate} - {project.endDate}
                      </p>
                    )}
                    {project.description && (
                      <div className={selectedTemplate === 'yash-template' ? 'text-xs text-gray-700 mt-1' : 'text-sm text-gray-700 mt-1'}>
                        {project.description.split('\n').map((line, index) => (
                          <p key={index} className={selectedTemplate === 'yash-template' ? 'mb-0.5' : 'mb-1'}>{line}</p>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <p className={selectedTemplate === 'yash-template' ? 'text-xs text-blue-600 mt-1' : 'text-sm text-blue-600 mt-1'}>
                        🔗 {project.link}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className={styles.section}>
              <h2
                className={styles.sectionTitle}
                style={selectedTemplate === 'yash-template' ? { fontSize: fontStyles.sectionSize, marginBottom: '3px' } : {}}
              >
                Certifications
              </h2>
              <div className={selectedTemplate === 'yash-template' ? 'space-y-1' : 'space-y-3'}>
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className={selectedTemplate === 'yash-template' ? 'font-semibold text-sm' : 'font-semibold'}>
                      {cert.name || 'Certification Name'}
                    </h3>
                    <p className={selectedTemplate === 'yash-template' ? 'text-gray-600 text-xs' : 'text-gray-600'}>
                      {cert.issuer || 'Issuing Organization'}
                    </p>
                    {cert.date && (
                      <p className={selectedTemplate === 'yash-template' ? 'text-xs text-gray-500' : 'text-sm text-gray-500'}>
                        {cert.date}
                      </p>
                    )}
                    {cert.credentialId && (
                      <p className={selectedTemplate === 'yash-template' ? 'text-xs text-gray-500' : 'text-xs text-gray-500'}>
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Awards & Honors</h2>
              <div className="space-y-2">
                {awards.map((award) => (
                  <div key={award.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold">{award.title || 'Award Title'}</span>
                      <span className="text-gray-600 ml-2">- {award.issuer || 'Organization'}</span>
                    </div>
                    {award.date && <span className="text-sm text-gray-500">{award.date}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Languages</h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="font-medium">{lang.name || 'Language'}</span>
                    <span className="text-sm text-gray-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Volunteer Experience */}
          {volunteer.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Volunteer Experience</h2>
              <div className="space-y-4">
                {volunteer.map((vol) => (
                  <div key={vol.id}>
                    <h3 className="font-semibold">{vol.role || 'Volunteer Role'}</h3>
                    <p className="text-gray-600 font-medium">{vol.organization || 'Organization'}</p>
                    <p className="text-sm text-gray-500 italic">{vol.startDate} - {vol.current ? 'Present' : vol.endDate}</p>
                    {vol.description && (
                      <p className="text-sm text-gray-700 mt-1">{vol.description}</p>
                    )}
                  </div>
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
                        className="form-input h-32"
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        placeholder="• Led development of key features that increased user engagement by 25%&#10;• Managed team of 5 engineers and coordinated with product managers&#10;• Implemented best practices for code review and testing&#10;• Collaborated with cross-functional teams to deliver projects on time"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💡 Tip: Use bullet points (•) to list your achievements and responsibilities. Start each point with an action verb.
                      </p>
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
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Projects</h2>
              <button onClick={addProject} className="btn-primary">
                + Add Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No projects added yet.</p>
                <button onClick={addProject} className="btn-primary">
                  Add Your First Project
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={project.id} className="bg-gray-50 rounded-lg p-6 border">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Project #{index + 1}</h3>
                      <button
                        onClick={() => removeProject(project.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Project Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={project.name}
                          onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                          placeholder="Resume Builder App"
                        />
                      </div>
                      <div>
                        <label className="form-label">Technologies Used</label>
                        <input
                          type="text"
                          className="form-input"
                          value={project.technologies}
                          onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div>
                        <label className="form-label">Start Date</label>
                        <input
                          type="text"
                          className="form-input"
                          value={project.startDate || ''}
                          onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                          placeholder="Jan 2024"
                        />
                      </div>
                      <div>
                        <label className="form-label">End Date</label>
                        <input
                          type="text"
                          className="form-input"
                          value={project.endDate || ''}
                          onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                          placeholder="Mar 2024"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">Project Link (Optional)</label>
                        <input
                          type="url"
                          className="form-input"
                          value={project.link || ''}
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="form-label">Project Description</label>
                      <textarea
                        className="form-input h-32"
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        placeholder="• Built a full-stack resume builder with React and Node.js&#10;• Implemented PDF export functionality using html2pdf.js&#10;• Designed responsive UI with Tailwind CSS&#10;• Integrated MongoDB for data persistence"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💡 Tip: Describe the project's purpose, your role, technologies used, and key achievements.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Certifications</h2>
              <button onClick={addCertification} className="btn-primary">
                + Add Certification
              </button>
            </div>

            {certifications.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No certifications added yet.</p>
                <button onClick={addCertification} className="btn-primary">
                  Add Your First Certification
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={cert.id} className="bg-gray-50 rounded-lg p-6 border">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Certification #{index + 1}</h3>
                      <button
                        onClick={() => removeCertification(cert.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Certification Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={cert.name}
                          onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                          placeholder="AWS Certified Solutions Architect"
                        />
                      </div>
                      <div>
                        <label className="form-label">Issuing Organization *</label>
                        <input
                          type="text"
                          className="form-input"
                          value={cert.issuer}
                          onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                          placeholder="Amazon Web Services"
                        />
                      </div>
                      <div>
                        <label className="form-label">Date Obtained</label>
                        <input
                          type="text"
                          className="form-input"
                          value={cert.date}
                          onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                          placeholder="March 2024"
                        />
                      </div>
                      <div>
                        <label className="form-label">Credential ID (Optional)</label>
                        <input
                          type="text"
                          className="form-input"
                          value={cert.credentialId || ''}
                          onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                          placeholder="ABC123456789"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">Verification Link (Optional)</label>
                        <input
                          type="url"
                          className="form-input"
                          value={cert.link || ''}
                          onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                          placeholder="https://verify.certification.com/abc123"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 8:
        return (
          <div className="space-y-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Additional Sections</h2>

            {/* Awards Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Awards & Honors</h3>
                <button onClick={addAward} className="btn-secondary text-sm">
                  + Add Award
                </button>
              </div>

              {awards.map((award, index) => (
                <div key={award.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Award #{index + 1}</span>
                    <button onClick={() => removeAward(award.id)} className="text-red-600 text-sm">🗑️</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      className="form-input"
                      value={award.title}
                      onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                      placeholder="Award Title"
                    />
                    <input
                      type="text"
                      className="form-input"
                      value={award.issuer}
                      onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                      placeholder="Issuing Organization"
                    />
                    <input
                      type="text"
                      className="form-input"
                      value={award.date}
                      onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                      placeholder="Date"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Languages Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Languages</h3>
                <button onClick={addLanguage} className="btn-secondary text-sm">
                  + Add Language
                </button>
              </div>

              {languages.map((lang, index) => (
                <div key={lang.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Language #{index + 1}</span>
                    <button onClick={() => removeLanguage(lang.id)} className="text-red-600 text-sm">🗑️</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      className="form-input"
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                      placeholder="Language Name"
                    />
                    <select
                      className="form-input"
                      value={lang.proficiency}
                      onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Native">Native</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Volunteer Experience Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Volunteer Experience</h3>
                <button onClick={addVolunteer} className="btn-secondary text-sm">
                  + Add Volunteer Work
                </button>
              </div>

              {volunteer.map((vol, index) => (
                <div key={vol.id} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Volunteer #{index + 1}</span>
                    <button onClick={() => removeVolunteer(vol.id)} className="text-red-600 text-sm">🗑️</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      className="form-input"
                      value={vol.organization}
                      onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)}
                      placeholder="Organization"
                    />
                    <input
                      type="text"
                      className="form-input"
                      value={vol.role}
                      onChange={(e) => updateVolunteer(vol.id, 'role', e.target.value)}
                      placeholder="Role/Position"
                    />
                    <input
                      type="text"
                      className="form-input"
                      value={vol.startDate}
                      onChange={(e) => updateVolunteer(vol.id, 'startDate', e.target.value)}
                      placeholder="Start Date"
                    />
                    <input
                      type="text"
                      className="form-input"
                      value={vol.endDate}
                      onChange={(e) => updateVolunteer(vol.id, 'endDate', e.target.value)}
                      placeholder="End Date"
                      disabled={vol.current}
                    />
                  </div>
                  <label className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      checked={vol.current}
                      onChange={(e) => updateVolunteer(vol.id, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Currently volunteering here</span>
                  </label>
                  <textarea
                    className="form-input h-20"
                    value={vol.description}
                    onChange={(e) => updateVolunteer(vol.id, 'description', e.target.value)}
                    placeholder="Describe your volunteer work and impact..."
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 9:
        return renderTemplateStep();
      case 10:
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
                {selectedTemplate === 'yash-template' && (
                  <button
                    onClick={exportToWord}
                    disabled={isExporting}
                    className="btn-primary bg-blue-600 hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExporting ? '⏳ Generating...' : '📝 Export as Word'}
                  </button>
                )}
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

            {/* Developer Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">👨‍💻</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Developer Information</h4>
                  <p className="text-blue-600 text-sm">Resume Builder Creator</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-blue-700 text-sm">
                  <strong>Developer:</strong> Yash Gaur
                </p>
                <p className="text-blue-700 text-sm">
                  <strong>Email:</strong>
                  <a href="mailto:theyash968@gmail.com" className="text-blue-600 hover:text-blue-800 underline ml-1">
                    theyash968@gmail.com
                  </a>
                </p>
                <p className="text-blue-600 text-xs mt-3">
                  💡 This Resume Builder was developed by Yash Gaur. For support, feedback, or custom features, feel free to reach out!
                </p>
              </div>
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
