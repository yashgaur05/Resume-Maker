import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📄 Resume Maker
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create beautiful resumes with multiple templates and export as PDF
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">✨ Features</h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎨</span>
                  <span><strong>12 Professional Templates</strong> - Modern, Classic, Executive, ATS-Friendly, Harvard, Tech, Consulting, Banking, Legal, and more</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📝</span>
                  <span><strong>Complete Resume Sections</strong> - Personal info, summary, experience, education, skills, projects, certifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👀</span>
                  <span><strong>Live Preview</strong> - See changes in real-time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📄</span>
                  <span><strong>PDF Export</strong> - Download professional PDFs</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💾</span>
                  <span><strong>Save/Load</strong> - Save progress locally</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <span><strong>Responsive Design</strong> - Works on all devices</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💡</span>
                  <span><strong>Smart Tips</strong> - Writing guidance for each section</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <Link href="/builder">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200 w-full sm:w-auto">
                  Start Building Your Resume
                </button>
              </Link>
              <div className="text-center">
                <Link href="/templates" className="text-blue-600 hover:text-blue-700 text-sm underline">
                  View All Templates →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">🎯 How to Use</h3>
            <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl mb-2">1️⃣</div>
                <p className="text-sm">Visit the homepage</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl mb-2">2️⃣</div>
                <p className="text-sm">Fill in your information</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl mb-2">3️⃣</div>
                <p className="text-sm">Choose from 12+ templates</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl mb-2">4️⃣</div>
                <p className="text-sm">Export as PDF/Word</p>
              </div>
            </div>
          </div>

          {/* Developer Section */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-4xl">👨‍💻</div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">Meet the Developer</h3>
                  <p className="text-blue-600">Creator of this Resume Builder</p>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Yash Gaur</h4>
                <p className="text-gray-600 mb-4">
                  Computer Science Engineering student passionate about creating tools that help people succeed in their careers.
                </p>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="text-lg">📧</span>
                  <a
                    href="mailto:theyash968@gmail.com"
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    theyash968@gmail.com
                  </a>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Need help or have feedback?</strong> Feel free to reach out for support, suggestions, or custom features!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
