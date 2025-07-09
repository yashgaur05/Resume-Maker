@echo off
echo ========================================
echo  Uploading Resume Maker to GitHub
echo ========================================
echo.

REM Navigate to project directory
cd /d "c:\Users\thega\OneDrive\Desktop\Project"

echo Initializing Git repository...
git init

echo Adding GitHub remote...
git remote add origin https://github.com/yashgaur05/Resume-Maker.git

echo Setting main branch...
git branch -M main

echo.
echo ========================================
echo  COMMIT 1: Project Foundation
echo ========================================

REM First commit - Foundation
git add package.json package-lock.json tsconfig.json next.config.js postcss.config.js tailwind.config.js .gitignore .env.local next-env.d.ts

git commit -m "feat: Initialize Next.js project with TypeScript and Tailwind CSS

- Set up Next.js 15.3.3 with TypeScript 5.8.3
- Configure Tailwind CSS for styling
- Add html2pdf.js for PDF export functionality
- Set up ESLint and development tools
- Configure project structure and build settings"

echo Pushing first commit...
git push -u origin main

echo.
echo ========================================
echo  COMMIT 2: Core Application
echo ========================================

REM Second commit - Core Application
git add src/

git commit -m "feat: Implement comprehensive resume builder with 8 professional templates

Core Features:
- Complete resume builder with live preview
- 8 professional templates (Modern, Classic, Creative, Minimal, Professional, Academic, Tech, Executive)
- Comprehensive form sections (Personal Info, Summary, Experience, Education, Skills, Projects, Certifications, Achievements, References, Custom Sections)
- PDF export functionality with html2pdf.js
- Save/Load functionality using localStorage
- Responsive design for all devices
- Smart tips and writing guidance
- Template switching with real-time preview

Components:
- Resume form components for each section
- Template selector with preview
- Live resume preview
- Navigation and layout components
- TypeScript interfaces and types"

echo Pushing second commit...
git push origin main

echo.
echo ========================================
echo  COMMIT 3: Documentation
echo ========================================

REM Third commit - Documentation
git add README.md LICENSE CONTRIBUTING.md DEPLOYMENT.md

git commit -m "docs: Add comprehensive documentation and project guidelines

Documentation:
- Comprehensive README with features, installation, and usage guide
- MIT License for open source distribution
- Contributing guidelines for community contributions
- Deployment guide for multiple platforms (Vercel, Netlify, GitHub Pages, Docker)
- Project structure and development setup instructions
- Feature showcase and template descriptions

Repository ready for:
- Easy deployment to multiple platforms
- Community contributions
- Professional use and customization"

echo Pushing final commit...
git push origin main

echo.
echo ========================================
echo  SUCCESS! Resume Maker uploaded to GitHub
echo ========================================
echo.
echo Repository: https://github.com/yashgaur05/Resume-Maker
echo.
echo The project has been uploaded with 3 professional commits:
echo 1. Project Foundation and Configuration
echo 2. Core Resume Builder Application
echo 3. Documentation and Guidelines
echo.
echo You can now:
echo - View your repository at the URL above
echo - Deploy to Vercel, Netlify, or other platforms
echo - Share with the community
echo.
pause
