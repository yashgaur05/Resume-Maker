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
                  <span><strong>8 Professional Templates</strong> - Modern, Classic, Creative, Minimal, Professional, Academic, Tech, Executive</span>
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
            
            <div className="mt-8">
              <Link href="/builder">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200">
                  Start Building Your Resume
                </button>
              </Link>
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
                <p className="text-sm">Choose from 8 templates</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl mb-2">4️⃣</div>
                <p className="text-sm">Export as PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
