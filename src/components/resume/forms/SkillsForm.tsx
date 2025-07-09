'use client';

import { useState } from 'react';
import { Skills, LanguageSkill } from '@/types/resume';

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: 'Intermediate' as const });

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      onChange({
        ...data,
        technical: [...data.technical, newTechnicalSkill.trim()]
      });
      setNewTechnicalSkill('');
    }
  };

  const removeTechnicalSkill = (index: number) => {
    onChange({
      ...data,
      technical: data.technical.filter((_, i) => i !== index)
    });
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onChange({
        ...data,
        soft: [...data.soft, newSoftSkill.trim()]
      });
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (index: number) => {
    onChange({
      ...data,
      soft: data.soft.filter((_, i) => i !== index)
    });
  };

  const addLanguage = () => {
    if (newLanguage.language.trim()) {
      onChange({
        ...data,
        languages: [...data.languages, { ...newLanguage, language: newLanguage.language.trim() }]
      });
      setNewLanguage({ language: '', proficiency: 'Intermediate' });
    }
  };

  const removeLanguage = (index: number) => {
    onChange({
      ...data,
      languages: data.languages.filter((_, i) => i !== index)
    });
  };

  const skillSuggestions = {
    technical: [
      'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git',
      'TypeScript', 'Java', 'C++', 'MongoDB', 'PostgreSQL', 'Kubernetes',
      'Machine Learning', 'Data Analysis', 'Figma', 'Photoshop', 'Excel'
    ],
    soft: [
      'Leadership', 'Communication', 'Problem Solving', 'Team Collaboration',
      'Project Management', 'Critical Thinking', 'Adaptability', 'Creativity',
      'Time Management', 'Attention to Detail', 'Customer Service', 'Negotiation'
    ]
  };

  return (
    <div className="space-y-8">
      {/* Technical Skills */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Technical Skills</h3>
        
        {/* Add New Technical Skill */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
            placeholder="Add a technical skill..."
          />
          <button
            onClick={addTechnicalSkill}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Current Technical Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.technical.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeTechnicalSkill(index)}
                className="text-blue-600 hover:text-blue-800"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        {/* Technical Skill Suggestions */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Popular technical skills:</p>
          <div className="flex flex-wrap gap-2">
            {skillSuggestions.technical.map((skill, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!data.technical.includes(skill)) {
                    onChange({
                      ...data,
                      technical: [...data.technical, skill]
                    });
                  }
                }}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                disabled={data.technical.includes(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Soft Skills</h3>
        
        {/* Add New Soft Skill */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
            placeholder="Add a soft skill..."
          />
          <button
            onClick={addSoftSkill}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add
          </button>
        </div>

        {/* Current Soft Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.soft.map((skill, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSoftSkill(index)}
                className="text-green-600 hover:text-green-800"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        {/* Soft Skill Suggestions */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Popular soft skills:</p>
          <div className="flex flex-wrap gap-2">
            {skillSuggestions.soft.map((skill, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!data.soft.includes(skill)) {
                    onChange({
                      ...data,
                      soft: [...data.soft, skill]
                    });
                  }
                }}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                disabled={data.soft.includes(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Languages</h3>
        
        {/* Add New Language */}
        <div className="grid md:grid-cols-3 gap-2 mb-4">
          <input
            type="text"
            value={newLanguage.language}
            onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
            placeholder="Language name..."
          />
          <select
            value={newLanguage.proficiency}
            onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value as any })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Native">Native</option>
          </select>
          <button
            onClick={addLanguage}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Add Language
          </button>
        </div>

        {/* Current Languages */}
        <div className="space-y-2">
          {data.languages.map((lang, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg p-3"
            >
              <div>
                <span className="font-medium text-purple-800">{lang.language}</span>
                <span className="text-purple-600 text-sm ml-2">({lang.proficiency})</span>
              </div>
              <button
                onClick={() => removeLanguage(index)}
                className="text-purple-600 hover:text-purple-800"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-orange-800 mb-2">🎯 Skills Tips</h4>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Include both technical and soft skills relevant to your target job</li>
          <li>• Be honest about your skill levels - employers may test them</li>
          <li>• Use keywords from the job description when applicable</li>
          <li>• Group similar skills together for better organization</li>
          <li>• Include programming languages, tools, and frameworks for tech roles</li>
          <li>• Don't forget to mention language skills if relevant to the position</li>
        </ul>
      </div>
    </div>
  );
}
