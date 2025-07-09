'use client';

import { useState } from 'react';
import { Education } from '@/types/resume';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      honors: '',
      relevantCourses: []
    };
    onChange([...data, newEducation]);
    setEditingIndex(data.length);
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteEducation = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Education</h3>
        <button
          onClick={addEducation}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No education added yet</p>
          <button
            onClick={addEducation}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div key={education.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {editingIndex === index ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Degree *
                          </label>
                          <input
                            type="text"
                            value={education.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                            placeholder="Bachelor of Science in Computer Science"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Institution *
                          </label>
                          <input
                            type="text"
                            value={education.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                            placeholder="University Name"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={education.location}
                            onChange={(e) => updateEducation(index, 'location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                            placeholder="City, State"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Graduation Date *
                          </label>
                          <input
                            type="month"
                            value={education.graduationDate}
                            onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            GPA (Optional)
                          </label>
                          <input
                            type="text"
                            value={education.gpa || ''}
                            onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                            placeholder="3.8/4.0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Honors/Awards (Optional)
                        </label>
                        <input
                          type="text"
                          value={education.honors || ''}
                          onChange={(e) => updateEducation(index, 'honors', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                          placeholder="Magna Cum Laude, Dean's List, etc."
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {education.degree || 'Degree'} at {education.institution || 'Institution'}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {education.location} • {education.graduationDate}
                      </p>
                      {education.gpa && (
                        <p className="text-sm text-gray-600">GPA: {education.gpa}</p>
                      )}
                      {education.honors && (
                        <p className="text-sm text-gray-600">{education.honors}</p>
                      )}
                    </div>
                  )}
                </div>

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
                  
                  <button
                    onClick={() => deleteEducation(index)}
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

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">📚 Education Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• List education in reverse chronological order</li>
          <li>• Include GPA only if it's 3.5 or higher</li>
          <li>• Mention relevant coursework for entry-level positions</li>
          <li>• Include honors, awards, and academic achievements</li>
          <li>• For recent graduates, education can come before experience</li>
        </ul>
      </div>
    </div>
  );
}
