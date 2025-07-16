'use client';

import React from 'react';
import Link from 'next/link';

const templates = [
  {
    id: 'yash-template',
    name: "Yash's Used Template",
    description: 'Personalized developer template with customizable fonts and export options',
    preview: '⭐',
    category: 'Featured',
    bestFor: 'Software developers, computer science students, technical roles'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with subtle colors',
    preview: '🎨',
    category: 'Professional',
    bestFor: 'Tech companies, startups, creative roles'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional black & white professional layout',
    preview: '📋',
    category: 'Traditional',
    bestFor: 'Corporate roles, government positions'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium corporate design for C-level positions',
    preview: '👔',
    category: 'Executive',
    bestFor: 'Senior management, C-suite executives'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Standard business format used by Fortune 500',
    preview: '💼',
    category: 'Business',
    bestFor: 'Business roles, consulting, finance'
  },
  {
    id: 'ats-friendly',
    name: 'ATS Friendly',
    description: 'Optimized for Applicant Tracking Systems',
    preview: '🤖',
    category: 'ATS',
    bestFor: 'Large corporations, online applications'
  },
  {
    id: 'harvard',
    name: 'Harvard Style',
    description: 'Academic format preferred by top universities',
    preview: '🏛️',
    category: 'Academic',
    bestFor: 'Academic positions, research roles'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Developer-focused with clean code aesthetics',
    preview: '💻',
    category: 'Technology',
    bestFor: 'Software engineers, developers, IT roles'
  },
  {
    id: 'consulting',
    name: 'Consulting',
    description: 'McKinsey/BCG style for consulting roles',
    preview: '📊',
    category: 'Consulting',
    bestFor: 'Management consulting, strategy roles'
  },
  {
    id: 'banking',
    name: 'Banking',
    description: 'Conservative design for financial services',
    preview: '🏦',
    category: 'Finance',
    bestFor: 'Investment banking, financial services'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative and design roles',
    preview: '🎭',
    category: 'Creative',
    bestFor: 'Design, marketing, creative industries'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean Scandinavian-inspired design',
    preview: '⚪',
    category: 'Simple',
    bestFor: 'Any role, minimalist preference'
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Formal layout for law firms and legal roles',
    preview: '⚖️',
    category: 'Legal',
    bestFor: 'Law firms, legal positions, compliance'
  }
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Resume Templates</h1>
            <p className="text-gray-600 mt-2">
              Choose from 12 professional templates designed for different industries and career levels
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">{template.preview}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                  <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mb-3">
                    {template.category}
                  </span>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {template.description}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-700">
                      <strong>Best for:</strong> {template.bestFor}
                    </p>
                  </div>
                  <Link href="/builder">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Use This Template
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Your Resume?</h2>
              <p className="text-gray-600 mb-6">
                Start with any template and customize it to match your experience and industry.
                All templates are ATS-friendly and professionally designed.
              </p>
              <Link href="/builder">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
                  Start Building Now
                </button>
              </Link>
            </div>
          </div>

          {/* Developer Section */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="text-3xl">👨‍💻</div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">Developer</h3>
                  <p className="text-blue-600 text-sm">Resume Builder Creator</p>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Yash Gaur</h4>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span>📧</span>
                  <a
                    href="mailto:theyash968@gmail.com"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    theyash968@gmail.com
                  </a>
                </div>

                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-blue-800">
                    💡 Questions about templates or need custom designs? Feel free to reach out!
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
