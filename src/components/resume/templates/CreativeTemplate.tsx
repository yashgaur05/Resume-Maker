'use client';

import { ResumeData } from '@/types/resume';

interface CreativeTemplateProps {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="p-8 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header with Creative Design */}
      <header className="relative mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              {personalInfo.email && <div>📧 {personalInfo.email}</div>}
              {personalInfo.phone && <div>📱 {personalInfo.phone}</div>}
            </div>
            <div className="space-y-1">
              {personalInfo.city && personalInfo.state && (
                <div>📍 {personalInfo.city}, {personalInfo.state}</div>
              )}
              {personalInfo.linkedin && <div>💼 LinkedIn Profile</div>}
            </div>
          </div>
        </div>
      </header>

      {/* Summary with Creative Styling */}
      {summary && (
        <section className="mb-8">
          <div className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-600 to-blue-600 rounded"></div>
            <div className="pl-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed italic">{summary}</p>
            </div>
          </div>
        </section>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                  💼
                </span>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute left-4 top-6 w-0.5 h-full bg-purple-200"></div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold z-10">
                        {exp.jobTitle.charAt(0)}
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="bg-white border border-purple-200 rounded-lg p-4 shadow-sm">
                          <h3 className="text-lg font-bold text-gray-800">{exp.jobTitle}</h3>
                          <p className="text-purple-600 font-semibold">{exp.company}</p>
                          <p className="text-sm text-gray-600 mb-3">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                          {exp.description.filter(d => d.trim()).length > 0 && (
                            <ul className="space-y-1 text-sm text-gray-700">
                              {exp.description.filter(d => d.trim()).map((desc, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-purple-600 mr-2">▸</span>
                                  <span>{desc}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
                  🎓
                </span>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-purple-600 font-semibold">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          {(skills.technical.length > 0 || skills.soft.length > 0) && (
            <section>
              <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs mr-2">
                  ⚡
                </span>
                Skills
              </h2>
              
              {skills.technical.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Technical</h3>
                  <div className="space-y-2">
                    {skills.technical.map((skill, index) => (
                      <div key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm text-center">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skills.soft.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Soft Skills</h3>
                  <div className="space-y-2">
                    {skills.soft.map((skill, index) => (
                      <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm text-center">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Languages */}
          {skills.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs mr-2">
                  🌍
                </span>
                Languages
              </h2>
              <div className="space-y-2">
                {skills.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
                    <span className="font-medium text-gray-800">{lang.language}</span>
                    <span className="text-sm text-purple-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
