# 🤝 Contributing to Professional Resume Builder

Thank you for your interest in contributing to the Professional Resume Builder! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## 📜 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/Resume-Builder.git
   cd Resume-Builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Contributing Guidelines

### Types of Contributions

We welcome several types of contributions:

1. **🐛 Bug Fixes**
   - Fix existing issues
   - Improve error handling
   - Enhance user experience

2. **✨ New Features**
   - New resume templates
   - Additional form sections
   - Export options
   - UI improvements

3. **📚 Documentation**
   - README improvements
   - Code comments
   - API documentation
   - Tutorials

4. **🎨 Design Improvements**
   - UI/UX enhancements
   - Template designs
   - Responsive improvements
   - Accessibility features

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Naming**: Use descriptive variable and function names
- **Comments**: Add comments for complex logic

### File Structure

```
src/
├── app/                    # Next.js app directory
├── components/
│   ├── resume/
│   │   ├── forms/         # Form components
│   │   ├── templates/     # Resume templates
│   │   └── ...
│   └── ...
├── types/                 # TypeScript type definitions
└── ...
```

### Adding New Templates

1. **Create template component**
   ```typescript
   // src/components/resume/templates/YourTemplate.tsx
   import { ResumeData } from '@/types/resume';
   
   interface YourTemplateProps {
     data: ResumeData;
   }
   
   export default function YourTemplate({ data }: YourTemplateProps) {
     // Template implementation
   }
   ```

2. **Add to template selector**
   ```typescript
   // src/components/resume/TemplateSelector.tsx
   const templates: Record<Template, TemplateConfig> = {
     // ... existing templates
     yourTemplate: {
       name: 'Your Template',
       description: 'Description here',
       // ... configuration
     }
   };
   ```

3. **Update ResumePreview**
   ```typescript
   // src/components/resume/ResumePreview.tsx
   import YourTemplate from './templates/YourTemplate';
   
   // Add case in renderTemplate function
   case 'yourTemplate':
     return <YourTemplate {...commonProps} />;
   ```

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use a descriptive title
   - Explain what changes you made
   - Reference any related issues
   - Add screenshots if applicable

### Commit Message Format

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 🐛 Issue Reporting

When reporting issues:

1. **Check existing issues** first
2. **Use the issue template**
3. **Provide detailed information:**
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed

## 💡 Feature Requests

For new features:

1. **Check if it already exists**
2. **Describe the feature clearly**
3. **Explain the use case**
4. **Consider implementation complexity**

## 🧪 Testing

- Test your changes thoroughly
- Check responsive design
- Verify PDF export functionality
- Test with different browsers

## 📖 Documentation

When adding features:

- Update README.md if needed
- Add inline code comments
- Update type definitions
- Consider adding examples

## 🎉 Recognition

Contributors will be:

- Listed in the README
- Mentioned in release notes
- Given credit for their contributions

## ❓ Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Create a new issue with the `question` label
4. Reach out to maintainers

---

Thank you for contributing to the Professional Resume Builder! 🙏
