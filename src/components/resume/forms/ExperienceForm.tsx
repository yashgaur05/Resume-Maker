'use client';

import { useState } from 'react';
import { Experience } from '@/types/resume';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
      achievements: []
    };
    onChange([...data, newExperience]);
    setEditingIndex(data.length);
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteExperience = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
    setEditingIndex(null);
  };

  const addDescriptionPoint = (index: number) => {
    const updated = [...data];
    updated[index].description.push('');
    onChange(updated);
  };

  const updateDescriptionPoint = (expIndex: number, descIndex: number, value: string) => {
    const updated = [...data];
    updated[expIndex].description[descIndex] = value;
    onChange(updated);
  };

  const removeDescriptionPoint = (expIndex: number, descIndex: number) => {
    const updated = [...data];
    updated[expIndex].description.splice(descIndex, 1);
    onChange(updated);
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === data.length - 1)
    ) {
      return;
    }

    const updated = [...data];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Work Experience</h3>
        <button
          onClick={addExperience}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <button
            onClick={addExperience}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Job
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div key={experience.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {editingIndex === index ? (
                    <div className="space-y-4">
                      {/* Job Title and Company */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title *
                          </label>
                          <input
                            type="text"
                            value={experience.jobTitle}
                            onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                            placeholder="Software Engineer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company *
                          </label>
                          <input
                            type="text"
                            value={experience.company}
                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                            placeholder="Tech Company Inc."
                          />
                        </div>
                      </div>

                      {/* Location and Dates */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={experience.location}
                            onChange={(e) => updateExperience(index, 'location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                            placeholder="New York, NY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date *
                          </label>
                          <input
                            type="month"
                            value={experience.startDate}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <div className="space-y-2">
                            <input
                              type="month"
                              value={experience.endDate}
                              onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
                              disabled={experience.current}
                            />
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={experience.current}
                                onChange={(e) => {
                                  updateExperience(index, 'current', e.target.checked);
                                  if (e.target.checked) {
                                    updateExperience(index, 'endDate', '');
                                  }
                                }}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-600">Current Position</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Job Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Description & Responsibilities
                        </label>
                        {experience.description.map((desc, descIndex) => (
                          <div key={descIndex} className="flex items-start space-x-2 mb-2">
                            <span className="text-gray-400 mt-2">•</span>
                            <textarea
                              value={desc}
                              onChange={(e) => updateDescriptionPoint(index, descIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                              rows={2}
                              placeholder="Describe your responsibilities and achievements..."
                            />
                            {experience.description.length > 1 && (
                              <button
                                onClick={() => removeDescriptionPoint(index, descIndex)}
                                className="text-red-600 hover:text-red-700 mt-2"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => addDescriptionPoint(index)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          + Add Another Point
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {experience.jobTitle || 'Job Title'} at {experience.company || 'Company'}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {experience.location} • {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                      </p>
                      <div className="mt-2">
                        {experience.description.filter(d => d.trim()).map((desc, i) => (
                          <p key={i} className="text-sm text-gray-600">• {desc}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  {editingIndex === index ? (
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  )}
                  
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => moveExperience(index, 'up')}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveExperience(index, 'down')}
                      disabled={index === data.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                  
                  <button
                    onClick={() => deleteExperience(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-yellow-800 mb-2">💡 Experience Tips</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• List experiences in reverse chronological order (most recent first)</li>
          <li>• Use action verbs to start each bullet point (Developed, Managed, Led, etc.)</li>
          <li>• Include quantifiable achievements when possible (increased sales by 20%)</li>
          <li>• Focus on accomplishments, not just job duties</li>
          <li>• Tailor descriptions to match the job you're applying for</li>
        </ul>
      </div>
    </div>
  );
}
