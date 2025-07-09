'use client';

import { useState } from 'react';
import { Project } from '@/types/resume';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      url: '',
      github: '',
      highlights: ['']
    };
    onChange([...data, newProject]);
    setEditingIndex(data.length);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteProject = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
    setEditingIndex(null);
  };

  const addTechnology = (projectIndex: number, tech: string) => {
    if (tech.trim()) {
      const updated = [...data];
      updated[projectIndex].technologies.push(tech.trim());
      onChange(updated);
    }
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updated = [...data];
    updated[projectIndex].technologies.splice(techIndex, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Projects</h3>
        <button
          onClick={addProject}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <button
            onClick={addProject}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {editingIndex === index ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Name *
                        </label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => updateProject(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                          placeholder="E-commerce Website"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
                          rows={3}
                          placeholder="Brief description of the project..."
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="month"
                            value={project.startDate}
                            onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date (Optional)
                          </label>
                          <input
                            type="month"
                            value={project.endDate || ''}
                            onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project URL (Optional)
                          </label>
                          <input
                            type="url"
                            value={project.url || ''}
                            onChange={(e) => updateProject(index, 'url', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://project-demo.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            GitHub URL (Optional)
                          </label>
                          <input
                            type="url"
                            value={project.github || ''}
                            onChange={(e) => updateProject(index, 'github', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://github.com/username/project"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Technologies Used
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm flex items-center space-x-1"
                            >
                              <span>{tech}</span>
                              <button
                                onClick={() => removeTechnology(index, techIndex)}
                                className="text-purple-600 hover:text-purple-800"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Add technology (press Enter)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addTechnology(index, e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {project.name || 'Project Name'}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {project.startDate} - {project.endDate || 'Present'}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
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
                    onClick={() => deleteProject(index)}
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

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-purple-800 mb-2">🚀 Project Tips</h4>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Include both personal and professional projects</li>
          <li>• Focus on projects relevant to your target job</li>
          <li>• Mention specific technologies and tools used</li>
          <li>• Include links to live demos or GitHub repositories</li>
          <li>• Highlight your role and key contributions</li>
          <li>• Quantify impact when possible (users, performance, etc.)</li>
        </ul>
      </div>
    </div>
  );
}
