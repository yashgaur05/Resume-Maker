# 📄 Professional Resume Builder

A comprehensive, modern resume builder built with Next.js, React, and TypeScript. Create stunning professional resumes with multiple templates and export as PDF.

![Resume Builder](https://img.shields.io/badge/Resume-Builder-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-blue)

## ✨ Features

### 🎨 **8 Professional Templates**
- **Modern** - Clean and contemporary design
- **Classic** - Traditional and professional
- **Creative** - Bold and artistic design
- **Minimal** - Simple and elegant
- **Professional** - Corporate and formal
- **Academic** - Scholarly and detailed
- **Tech** - Modern tech-focused design
- **Executive** - Premium and sophisticated

### 📝 **Complete Resume Sections**
- ✅ Personal Information with contact details
- ✅ Professional Summary with templates
- ✅ Work Experience with detailed descriptions
- ✅ Education background and achievements
- ✅ Technical and soft skills
- ✅ Projects with technologies used
- ✅ Certifications and credentials
- ✅ Achievements and awards
- ✅ References
- ✅ Custom sections (volunteer work, publications, etc.)

### 🚀 **Advanced Features**
- ✅ **Live Preview** - See changes in real-time
- ✅ **PDF Export** - Download professional PDFs
- ✅ **Save/Load** - Save progress locally
- ✅ **Template Switching** - Change templates instantly
- ✅ **Responsive Design** - Works on all devices
- ✅ **Smart Tips** - Writing guidance for each section
- ✅ **ATS Friendly** - Optimized for applicant tracking systems
- ✅ **Offline Capable** - No external dependencies required

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashgaur05/Resume-Builder.git
   cd Resume-Builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Getting Started
1. **Visit the homepage** to learn about features
2. **Click "Start Building Your Resume"** or navigate to `/resume-maker`
3. **Fill in your information** section by section
4. **Choose a template** from 8 professional designs
5. **Preview in real-time** as you build
6. **Export as PDF** when ready

### Tips for Best Results
- Use the **summary templates** for inspiration
- Add **quantifiable achievements** in experience
- Include **relevant keywords** for ATS optimization
- **Save frequently** to preserve your work
- **Preview different templates** to find the best fit

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3
- **Frontend**: React 19.1.0, TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.17
- **PDF Generation**: html2pdf.js
- **Icons**: Emoji-based design
- **Storage**: Browser localStorage

## 📁 Project Structure

```
Resume-Builder/
├── src/
│   ├── app/
│   │   ├── resume-maker/          # Main resume builder page
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Homepage
│   ├── components/
│   │   ├── resume/
│   │   │   ├── forms/             # Form components for each section
│   │   │   ├── templates/         # Resume template components
│   │   │   ├── ResumeForm.tsx     # Main form component
│   │   │   ├── ResumePreview.tsx  # Preview component
│   │   │   └── TemplateSelector.tsx
│   │   └── Navigation.tsx         # Site navigation
│   └── types/
│       └── resume.ts              # TypeScript interfaces
├── public/                        # Static assets
├── package.json
└── README.md
```

## 🎯 Available Templates

| Template | Best For | Style |
|----------|----------|-------|
| Modern | Tech professionals | Clean, contemporary |
| Classic | Traditional industries | Professional, formal |
| Creative | Design/Creative roles | Bold, artistic |
| Minimal | Any industry | Simple, elegant |
| Professional | Corporate roles | Business-focused |
| Academic | Education/Research | Scholarly, detailed |
| Tech | Software developers | Code-friendly |
| Executive | Leadership roles | Premium, sophisticated |

## 📄 Export Options

- **PDF Format** - Professional, print-ready
- **Multiple Page Sizes** - Letter, A4 compatible
- **High Quality** - 300 DPI resolution
- **Optimized File Size** - Efficient compression

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yash Gaur**
- GitHub: [@yashgaur05](https://github.com/yashgaur05)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- PDF generation by [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)

---

⭐ **Star this repository if you found it helpful!**
