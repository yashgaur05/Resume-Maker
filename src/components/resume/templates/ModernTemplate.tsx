'use client';

import { ResumeData } from '@/types/resume';

interface ModernTemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="p-8 font-sans text-gray-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center">
              📧 {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center">
              📱 {personalInfo.phone}
            </span>
          )}
          {personalInfo.city && personalInfo.state && (
            <span className="flex items-center">
              📍 {personalInfo.city}, {personalInfo.state}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center">
              💼 LinkedIn
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center">
              💻 GitHub
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b-2 border-blue-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b-2 border-blue-200 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-200 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                </div>
                {exp.description.filter(d => d.trim()).length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {exp.description.filter(d => d.trim()).map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b-2 border-blue-200 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-blue-600">{edu.institution}</p>
                  {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-sm text-gray-600">
                  {edu.graduationDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b-2 border-blue-200 pb-1">
            Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {skills.technical.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.languages.length > 0 && (
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-800 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                    >
                      {lang.language} ({lang.proficiency})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b-2 border-blue-200 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <div className="text-sm text-gray-600">
                    {project.startDate} - {project.endDate || 'Present'}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {project.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b-2 border-blue-200 pb-1">
            Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-sm text-blue-600">{cert.issuer}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {cert.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
