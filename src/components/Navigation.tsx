'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-blue-200">
          📄 Resume Maker
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-200 transition-colors">
            Home
          </Link>

          <Link href="/resume-maker" className="hover:text-blue-200 transition-colors">
            Resume Builder
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-blue-500">
          <div className="flex flex-col space-y-2 mt-4">
            <Link href="/" className="hover:text-blue-200 py-2">
              Home
            </Link>

            <Link href="/resume-maker" className="hover:text-blue-200 py-2">
              Resume Builder
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
