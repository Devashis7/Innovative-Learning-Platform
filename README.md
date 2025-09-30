# 🚀 Innovative Learning Platform

A modern, full-stack e-learning platform designed specifically for B.Tech Computer Science Engineering students. Built with React, Node.js, and MongoDB, this platform offers an intuitive learning experience with comprehensive course management and progress tracking.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-%5E18.3.1-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/atlas)

## ✨ Features

### 🎓 **Student Features**
- **Course Browsing**: Explore comprehensive B.Tech CSE curriculum
- **Interactive Learning**: Structured units, topics, and subtopics with multimedia resources
- **Progress Tracking**: Real-time learning progress with visual indicators
- **Responsive Design**: Seamless experience across all devices
- **Dark/Light Mode**: Toggle between themes for comfortable learning
- **Course Details**: Detailed curriculum overview with expandable content sections

### 👨‍💼 **Admin Features**
- **Course Management**: Create, edit, and manage complete course structures
- **User Management**: Full CRUD operations for user accounts and roles
- **Analytics Dashboard**: Real-time platform statistics and insights
- **Content Organization**: Hierarchical content management (Units → Topics → Subtopics → Resources)
- **Bulk Operations**: Efficient management of multiple courses and users

### 🎨 **Design & UX**
- **Modern UI**: Clean, professional interface with gradient accents
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Theme System**: Comprehensive light/dark mode with consistent styling
- **Mobile-First**: Responsive design optimized for all screen sizes
- **Accessibility**: WCAG compliant design with proper contrast ratios

## 🛠️ Technology Stack

### **Frontend**
- **React 18.3.1** - Modern UI library with hooks and context
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router Dom** - Client-side routing
- **React Icons** - Comprehensive icon library
- **Axios** - HTTP client for API requests

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** - MongoDB object modeling
- **JSON Web Tokens** - Secure authentication
- **bcryptjs** - Password hashing and security
- **CORS** - Cross-origin resource sharing

### **Development Tools**
- **ESLint** - Code quality and style enforcement
- **Vitest** - Unit testing framework
- **Concurrently** - Run multiple scripts simultaneously
- **Nodemon** - Development server auto-restart

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.0.0 or higher)
- **npm** (version 8.0.0 or higher)
- **MongoDB Atlas Account** (for database)
- **Git** (for version control)

## 🚀 Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/Devashis7/Innovative-Learning-Platform.git
cd Innovative-Learning-Platform
```

### 2. **Install Dependencies**
```bash
# Install all dependencies (client + server)
npm run install-all

# Or install separately
npm run install-client
npm run install-server
```

### 3. **Environment Setup**
Create a `.env` file in the `server` directory:
```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/InnovativeLearningPlatform
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-here
```

### 4. **Seed Database (Optional)**
```bash
# Populate database with sample B.Tech CSE courses
npm run seed
```

### 5. **Start Development**
```bash
# Start both client and server concurrently
npm run dev

# Or start separately
npm run client  # Frontend on http://localhost:5173
npm run server  # Backend on http://localhost:3000
```

## 📁 Project Structure

```
innovative-learning-platform/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── utils/         # Utility functions and API calls
│   │   └── styles/        # Global styles and Tailwind config
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend application
│   ├── controllers/       # Request handlers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route definitions
│   ├── middleware/       # Custom middleware
│   ├── config/           # Database configuration
│   └── package.json      # Backend dependencies
├── README.md             # Project documentation
└── package.json          # Root package configuration
```

## 🔧 Available Scripts

### **Root Level Scripts**
```bash
npm run dev          # Start both client and server
npm run setup        # Install all dependencies and seed database
npm run build        # Build client for production
npm start            # Start production server
```

### **Client Scripts**
```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run lint         # Run ESLint
```

### **Server Scripts**
```bash
npm start            # Start production server
npm run dev          # Start development server (Nodemon)
npm run test         # Run server tests
```

## 🔐 Authentication & Authorization

The platform implements JWT-based authentication with role-based access control:

- **Students**: Can browse courses, track progress, and access learning materials
- **Admins**: Full platform access including user management and course creation
- **Protected Routes**: Middleware ensures secure access to authorized content
- **Token Management**: Automatic token refresh and secure storage

## 📊 Database Schema

### **User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ["student", "admin"]
}
```

### **Course Model**
```javascript
{
  name: String,
  description: String,
  units: [{
    name: String,
    topics: [{
      name: String,
      subtopics: [{
        name: String,
        resources: [{
          type: ["youtube", "notes", "pdf", "link"],
          url: String,
          title: String
        }]
      }]
    }]
  }]
}
```

### **Progress Model**
```javascript
{
  userId: ObjectId,
  courseId: ObjectId,
  unitsProgress: [{
    unitIndex: Number,
    topicsProgress: [{
      topicIndex: Number,
      subtopicsProgress: [{
        subtopicIndex: Number,
        completed: Boolean,
        completedAt: Date
      }]
    }]
  }]
}
```

## 🎨 Theme System

The platform features a comprehensive theme system:

- **Dynamic Switching**: Toggle between light and dark modes
- **Consistent Colors**: Unified color palette across components
- **CSS Variables**: Efficient theme management
- **Accessibility**: WCAG compliant contrast ratios
- **User Preference**: Remembers user's theme choice

## 🧪 Testing

```bash
# Frontend tests
cd client && npm run test

# Backend tests (when implemented)
cd server && npm run test

# Run all tests
npm run test
```

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**
```bash
# Build the client
cd client && npm run build

# Deploy the dist/ folder to your hosting service
```

### **Backend (Railway/Render/Heroku)**
```bash
# Ensure environment variables are set
# Deploy the server/ directory
```

### **Database**
- Uses MongoDB Atlas (cloud-hosted)
- Automatic scaling and backups
- Global distribution for optimal performance

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Devashis7**
- GitHub: [@Devashis7](https://github.com/Devashis7)
- Project: [Innovative Learning Platform](https://github.com/Devashis7/Innovative-Learning-Platform)

## 🙏 Acknowledgments

- **React Team** - For the amazing frontend library
- **MongoDB** - For the flexible database solution
- **TailwindCSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Open Source Community** - For inspiration and guidance

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join our discussions** for community support

---

⭐ **Star this repository** if you find it helpful!

🐛 **Found a bug?** Please open an issue with details.

💡 **Have ideas?** We'd love to hear your suggestions!

---

**Built with ❤️ for the engineering community**