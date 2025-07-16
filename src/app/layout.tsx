import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Resume Maker - Professional Resume Builder',
  description: 'Create beautiful resumes with multiple templates and export as PDF. Built with Next.js and React.',
  keywords: 'resume, cv, resume builder, professional resume, pdf export, templates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
