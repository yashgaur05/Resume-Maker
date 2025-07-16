# 📄 Resume Maker

A professional resume builder built with Next.js and React. Create beautiful resumes with multiple templates and export as PDF.

## ✨ Features

- 🎨 **8 Professional Templates** - Modern, Classic, Creative, Minimal, Professional, Academic, Tech, Executive
- 📝 **Complete Resume Sections** - Personal info, summary, experience, education, skills, projects, certifications
- 👀 **Live Preview** - See changes in real-time
- 📄 **PDF Export** - Download professional PDFs
- 💾 **Database Storage** - Save resumes to MongoDB with localStorage fallback
- 📱 **Responsive Design** - Works on all devices
- 💡 **Smart Tips** - Writing guidance for each section
- 🔄 **Multi-Resume Support** - Save and manage multiple resumes per email
- ⚡ **Real-time Sync** - Automatic save status and loading indicators

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashgaur05/Resume-Maker.git
   cd Resume-Maker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB (Optional)**
   ```bash
   # Start MongoDB locally
   mongod --dbpath /path/to/your/db

   # Or use MongoDB Atlas cloud database
   # Update MONGODB_URI in .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Go to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. Visit the homepage
2. Click "Start Building Your Resume"
3. Fill in your information section by section
4. Choose from 8 professional templates
5. Preview your resume in real-time
6. Export as PDF when ready

## 🛠️ Tech Stack

- **Next.js 15.3.3** - React framework
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **MongoDB** - Database for resume storage
- **Mongoose** - MongoDB object modeling
- **html2pdf.js** - PDF generation

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages
├── components/
│   ├── resume/
│   │   ├── forms/         # Form components
│   │   ├── templates/     # Resume templates
│   │   └── ...
│   └── Navigation.tsx
└── types/                 # TypeScript types
```

## 🎨 Available Templates

- **Modern** - Clean and contemporary
- **Classic** - Traditional and professional
- **Creative** - Bold and artistic
- **Minimal** - Simple and elegant
- **Professional** - Corporate style
- **Academic** - Scholarly design
- **Tech** - Developer-focused
- **Executive** - Premium look

## 🗄️ Database Configuration

### MongoDB Setup
The application supports MongoDB for persistent resume storage:

```bash
# Local MongoDB
MONGODB_URI="mongodb://localhost:27017/resume-maker"

# MongoDB Atlas (Cloud)
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/resume-maker"
```

### Features
- **Persistent Storage** - Resumes saved across sessions
- **Multi-Resume Support** - Multiple resumes per email
- **Automatic Backup** - Falls back to localStorage if database unavailable
- **Real-time Status** - Visual indicators for save/load operations

### API Endpoints
- `GET /api/test` - Test database connection
- `GET /api/resumes` - List all resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/[id]` - Get specific resume
- `PUT /api/resumes/[id]` - Update resume
- `DELETE /api/resumes/[id]` - Delete resume

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yash Gaur** - [@yashgaur05](https://github.com/yashgaur05)

<<<<<<< HEAD
---

⭐ **Star this repository if you found it helpful!**
=======
>>>>>>> 7d3bdf89c60ab461d52e5698682b0e1e7491f9f1
