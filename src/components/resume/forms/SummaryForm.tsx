'use client';

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}

export default function SummaryForm({ data, onChange }: SummaryFormProps) {
  const summaryTemplates = [
    {
      title: "Software Developer",
      content: "Experienced software developer with 5+ years of expertise in full-stack development. Proficient in React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading cross-functional teams to achieve project goals."
    },
    {
      title: "Marketing Professional",
      content: "Results-driven marketing professional with 7+ years of experience in digital marketing, brand management, and campaign optimization. Expertise in SEO, social media marketing, and data analytics. Successfully increased brand awareness by 150% and generated $2M+ in revenue."
    },
    {
      title: "Project Manager",
      content: "Certified Project Manager with 8+ years of experience leading complex projects from initiation to completion. Expert in Agile methodologies, risk management, and stakeholder communication. Successfully delivered 50+ projects on time and within budget."
    },
    {
      title: "Data Scientist",
      content: "Data scientist with 4+ years of experience in machine learning, statistical analysis, and data visualization. Proficient in Python, R, and SQL. Developed predictive models that improved business efficiency by 30% and reduced costs by $500K annually."
    }
  ];

  const handleTemplateSelect = (template: string) => {
    onChange(template);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Professional Summary</h3>
        <p className="text-sm text-gray-600 mb-4">
          Write a compelling 2-4 sentence summary that highlights your key qualifications, experience, and career goals.
        </p>
        
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400"
          rows={6}
          placeholder="Write your professional summary here. Focus on your key achievements, skills, and what makes you unique as a candidate..."
        />
        
        <div className="mt-2 text-sm text-gray-500">
          Character count: {data.length} (Recommended: 200-400 characters)
        </div>
      </div>

      {/* Summary Templates */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-3">📝 Summary Templates</h4>
        <p className="text-sm text-gray-600 mb-4">
          Click on any template below to use it as a starting point. Customize it to match your experience.
        </p>
        
        <div className="space-y-3">
          {summaryTemplates.map((template, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-gray-800">{template.title}</h5>
                <button
                  onClick={() => handleTemplateSelect(template.content)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Use Template
                </button>
              </div>
              <p className="text-sm text-gray-600">{template.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Writing Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-green-800 mb-2">✍️ Writing Tips</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Start with your years of experience and job title</li>
          <li>• Mention 2-3 key skills or areas of expertise</li>
          <li>• Include quantifiable achievements when possible</li>
          <li>• Tailor the summary to the specific job you're applying for</li>
          <li>• Use action words and avoid first-person pronouns</li>
          <li>• Keep it concise but impactful (2-4 sentences)</li>
        </ul>
      </div>

      {/* Keywords Suggestions */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-purple-800 mb-2">🔑 Power Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {[
            'Experienced', 'Proven track record', 'Expert in', 'Specialized in',
            'Results-driven', 'Innovative', 'Strategic', 'Leadership',
            'Cross-functional', 'Scalable', 'Optimized', 'Implemented',
            'Developed', 'Managed', 'Led', 'Achieved', 'Increased', 'Reduced'
          ].map((keyword, index) => (
            <span
              key={index}
              className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs cursor-pointer hover:bg-purple-200 transition-colors"
              onClick={() => onChange(data + (data ? ' ' : '') + keyword)}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
