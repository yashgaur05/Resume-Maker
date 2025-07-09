'use client';

import { ResumeData } from '@/types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="p-8 font-sans text-black" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light mb-4">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <div className="text-sm space-y-1 text-gray-700">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {(personalInfo.city || personalInfo.state) && (
            <div>{personalInfo.city}{personalInfo.city && personalInfo.state && ', '}{personalInfo.state}</div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <p className="text-gray-800 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4 border-b border-gray-300 pb-1">
            EXPERIENCE
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{exp.jobTitle}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                </div>
                {exp.description.filter(d => d.trim()).length > 0 && (
                  <ul className="list-disc ml-4 space-y-1 text-sm">
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
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4 border-b border-gray-300 pb-1">
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
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
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4 border-b border-gray-300 pb-1">
            SKILLS
          </h2>
          {skills.technical.length > 0 && (
            <div className="mb-3">
              <h3 className="font-medium mb-1">Technical:</h3>
              <p className="text-sm">{skills.technical.join(' • ')}</p>
            </div>
          )}
          {skills.soft.length > 0 && (
            <div>
              <h3 className="font-medium mb-1">Additional:</h3>
              <p className="text-sm">{skills.soft.join(' • ')}</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
