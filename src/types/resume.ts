export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  profileImage?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
  relevantCourses?: string[];
}

export interface Skills {
  technical: string[];
  soft: string[];
  languages: LanguageSkill[];
  tools?: string[];
  frameworks?: string[];
}

export interface LanguageSkill {
  language: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  url?: string;
  github?: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer?: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  url?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  references: Reference[];
  customSections: CustomSection[];
}

export type Template = 
  | 'modern' 
  | 'classic' 
  | 'creative' 
  | 'minimal' 
  | 'professional' 
  | 'academic' 
  | 'tech' 
  | 'executive';

export interface TemplateConfig {
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: 'single-column' | 'two-column' | 'sidebar';
}
