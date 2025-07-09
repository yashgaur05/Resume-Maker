import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Professional Resume Maker
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create stunning, professional resumes with our comprehensive resume builder.
            Choose from multiple templates and export as PDF.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resume-maker"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Start Building Your Resume
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Resume Maker?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">8 Professional Templates</h3>
              <p className="text-gray-600">Choose from Modern, Classic, Creative, Minimal, Professional, Academic, Tech, and Executive templates.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-3">Complete Resume Sections</h3>
              <p className="text-gray-600">Include all essential sections: Experience, Education, Skills, Projects, Certifications, and more.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-3">PDF Export</h3>
              <p className="text-gray-600">Download your resume as a professional PDF ready for job applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Templates</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Modern', icon: '🎨', color: 'blue' },
              { name: 'Classic', icon: '📄', color: 'gray' },
              { name: 'Creative', icon: '🎭', color: 'purple' },
              { name: 'Minimal', icon: '⚪', color: 'black' },
              { name: 'Professional', icon: '💼', color: 'blue' },
              { name: 'Academic', icon: '🎓', color: 'green' },
              { name: 'Tech', icon: '💻', color: 'slate' },
              { name: 'Executive', icon: '👔', color: 'amber' }
            ].map((template, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{template.icon}</div>
                <h3 className="font-semibold text-gray-800">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-2">Professional design</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Everything You Need</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-green-600 mr-3">✅</span>
                  <div>
                    <h4 className="font-semibold">Live Preview</h4>
                    <p className="text-gray-600">See changes in real-time as you build your resume</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3">✅</span>
                  <div>
                    <h4 className="font-semibold">Smart Tips</h4>
                    <p className="text-gray-600">Get expert guidance for each section</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3">✅</span>
                  <div>
                    <h4 className="font-semibold">Save & Load</h4>
                    <p className="text-gray-600">Save your progress and continue later</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3">✅</span>
                  <div>
                    <h4 className="font-semibold">ATS Friendly</h4>
                    <p className="text-gray-600">Optimized for applicant tracking systems</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-3">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">Create your professional resume in minutes</p>
              <Link
                href="/resume-maker"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Build Resume Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
