'use client';

import { Template, TemplateConfig } from '@/types/resume';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onTemplateChange: (template: Template) => void;
}

const templates: Record<Template, TemplateConfig> = {
  modern: {
    name: 'Modern',
    description: 'Clean and contemporary design',
    preview: '🎨',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#60A5FA',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: 'two-column'
  },
  classic: {
    name: 'Classic',
    description: 'Traditional and professional',
    preview: '📄',
    colors: {
      primary: '#1F2937',
      secondary: '#374151',
      accent: '#6B7280',
      text: '#111827',
      background: '#FFFFFF'
    },
    fonts: {
      heading: 'Times New Roman',
      body: 'Times New Roman'
    },
    layout: 'single-column'
  },
  creative: {
    name: 'Creative',
    description: 'Bold and artistic design',
    preview: '🎭',
    colors: {
      primary: '#7C3AED',
      secondary: '#5B21B6',
      accent: '#A78BFA',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Open Sans'
    },
    layout: 'sidebar'
  },
  minimal: {
    name: 'Minimal',
    description: 'Simple and elegant',
    preview: '⚪',
    colors: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#808080',
      text: '#000000',
      background: '#FFFFFF'
    },
    fonts: {
      heading: 'Helvetica',
      body: 'Helvetica'
    },
    layout: 'single-column'
  },
  professional: {
    name: 'Professional',
    description: 'Corporate and formal',
    preview: '💼',
    colors: {
      primary: '#1E3A8A',
      secondary: '#1E40AF',
      accent: '#3B82F6',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    fonts: {
      heading: 'Arial',
      body: 'Arial'
    },
    layout: 'two-column'
  },
  academic: {
    name: 'Academic',
    description: 'Scholarly and detailed',
    preview: '🎓',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10B981',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    fonts: {
      heading: 'Georgia',
      body: 'Georgia'
    },
    layout: 'single-column'
  },
  tech: {
    name: 'Tech',
    description: 'Modern tech-focused design',
    preview: '💻',
    colors: {
      primary: '#0F172A',
      secondary: '#1E293B',
      accent: '#64748B',
      text: '#0F172A',
      background: '#FFFFFF'
    },
    fonts: {
      heading: 'JetBrains Mono',
      body: 'Inter'
    },
    layout: 'sidebar'
  },
  executive: {
    name: 'Executive',
    description: 'Premium and sophisticated',
    preview: '👔',
    colors: {
      primary: '#92400E',
      secondary: '#B45309',
      accent: '#D97706',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Source Sans Pro'
    },
    layout: 'two-column'
  }
};

export default function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Template</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(templates).map(([key, template]) => (
          <button
            key={key}
            onClick={() => onTemplateChange(key as Template)}
            className={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${
              selectedTemplate === key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{template.preview}</div>
              <div className="text-sm font-medium text-gray-800">{template.name}</div>
              <div className="text-xs text-gray-600 mt-1">{template.description}</div>
              
              {/* Color Preview */}
              <div className="flex justify-center space-x-1 mt-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: template.colors.primary }}
                ></div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: template.colors.secondary }}
                ></div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: template.colors.accent }}
                ></div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Template Details */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-800 mb-2">
          {templates[selectedTemplate].name} Template
        </h4>
        <p className="text-xs text-gray-600 mb-2">
          {templates[selectedTemplate].description}
        </p>
        <div className="text-xs text-gray-500">
          <div>Layout: {templates[selectedTemplate].layout}</div>
          <div>Font: {templates[selectedTemplate].fonts.heading}</div>
        </div>
      </div>
    </div>
  );
}
