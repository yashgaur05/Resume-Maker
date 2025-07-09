'use client';

import { ResumeData } from '@/types/resume';

interface ClassicTemplateProps {
  data: ResumeData;
}

export default function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="p-8 font-serif text-gray-900" style={{ fontFamily: 'Times New Roman, serif' }}>
      {/* Header */}
      <header className="text-center mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <div className="text-sm space-y-1">
          {personalInfo.address && (
            <div>{personalInfo.address}</div>
          )}
          {(personalInfo.city || personalInfo.state) && (
            <div>
              {personalInfo.city}{personalInfo.city && personalInfo.state && ', '}{personalInfo.state} {personalInfo.zipCode}
            </div>
          )}
          <div className="flex justify-center space-x-4 mt-2">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.email && <span>{personalInfo.email}</span>}
          </div>
          {(personalInfo.linkedin || personalInfo.website) && (
            <div className="flex justify-center space-x-4">
              {personalInfo.linkedin && <span>LinkedIn Profile Available</span>}
              {personalInfo.website && <span>Portfolio Available</span>}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-center border-b border-gray-400 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-justify leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-center border-b border-gray-400 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold">{exp.jobTitle}</h3>
                    <p className="italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                </div>
                {exp.description.filter(d => d.trim()).length > 0 && (
                  <ul className="list-disc ml-6 space-y-1">
                    {exp.description.filter(d => d.trim()).map((desc, index) => (
                      <li key={index} className="text-justify">{desc}</li>
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
          <h2 className="text-lg font-bold mb-3 text-center border-b border-gray-400 pb-1">
            EDUCATION
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="italic">{edu.institution}{edu.location && `, ${edu.location}`}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  {edu.honors && <p className="italic">{edu.honors}</p>}
                </div>
                <div className="text-right">
                  <p className="font-semibold">{edu.graduationDate}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-center border-b border-gray-400 pb-1">
            SKILLS
          </h2>
          {skills.technical.length > 0 && (
            <div className="mb-3">
              <h3 className="font-bold mb-1">Technical Skills:</h3>
              <p>{skills.technical.join(', ')}</p>
            </div>
          )}
          {skills.soft.length > 0 && (
            <div className="mb-3">
              <h3 className="font-bold mb-1">Additional Skills:</h3>
              <p>{skills.soft.join(', ')}</p>
            </div>
          )}
          {skills.languages.length > 0 && (
            <div>
              <h3 className="font-bold mb-1">Languages:</h3>
              <p>
                {skills.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', ')}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-center border-b border-gray-400 pb-1">
            PROJECTS
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold">{project.name}</h3>
                  <p className="font-semibold">
                    {project.startDate} - {project.endDate || 'Present'}
                  </p>
                </div>
                <p className="text-justify mb-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <p className="italic">Technologies: {project.technologies.join(', ')}</p>
                )}
                {project.highlights.length > 0 && (
                  <ul className="list-disc ml-6 mt-1">
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
          <h2 className="text-lg font-bold mb-3 text-center border-b border-gray-400 pb-1">
            CERTIFICATIONS
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="italic">{cert.issuer}</p>
                </div>
                <p className="font-semibold">{cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
