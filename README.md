# 🚀 Personal Blog API - Full Stack Application

A modern, self-contained full-stack blog application built with **100% local development** in mind. Features a beautiful Frutiger Aero-inspired UI with real-time post management, rich text editing, and JWT authentication.

![Frutiger Aero Style](https://img.shields.io/badge/Style-Frutiger_Aero-00BFFF?style=for-the-badge&logo=designernews&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## ✨ Features

### 🎨 Modern UI/UX
- **Frutiger Aero Design** - Vibrant gradients, glass morphism effects, and smooth animations
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Rich Text Editor** - Format posts with bold, italics, lists, images, and custom fonts
- **Real-time Updates** - Instant feedback and state management

### 🔐 Authentication & Security
- **JWT Token-based Auth** - Secure user authentication
- **Protected Routes** - Role-based access control
- **User Profiles** - Personal dashboard and post management
- **Session Persistence** - Automatic login state management

### 📝 Content Management
- **CRUD Operations** - Create, read, update, and delete posts
- **Rich Content** - Support for formatted text, images, and custom styling
- **User-specific Content** - Users can only edit/delete their own posts
- **Comment System** - Interactive discussions on posts

### 🛠 Developer Experience
- **100% Local Development** - No external dependencies required
- **TypeScript** - Full type safety across frontend and backend
- **Hot Reload** - Instant development feedback
- **API Health Checks** - Built-in monitoring and status endpoints

## 🏗 Architecture
personal-blog-api/
├── 📁 backend/
│ ├── app.ts # Express server configuration
│ ├── db.ts # Prisma database client
│ ├── 📁 controllers/ # Route handlers
│ ├── 📁 middleware/ # Authentication & validation
│ └── 📁 utils/ # Helper functions
├── 📁 frontend/
│ ├── index.html # Main application
│ ├── styles.css # Frutiger Aero styling
│ └── app.js # Client-side logic
└── 📁 prisma/
└── schema.prisma # Database schema

text

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone and setup**
bash
git clone <your-repo-url>
cd personal-blog-api
npm install
Database Setup

bash
npx prisma generate
npx prisma db push
Start Development

bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
# Open index.html in your browser or use Live Server
Access Application

Frontend: http://localhost:5500 (or your local server)
Backend API: http://localhost:3000
Health Check: http://localhost:3000/health

## 🎮 Usage
First Time Setup
Register a new user account

Login with your credentials

Create your first blog post using the rich text editor

Explore the Frutiger Aero interface

Key Features in Action
✏️ Rich Text Editing - Use the toolbar for formatting

🖼️ Image Embedding - Insert images via URL

🔄 Real-time Management - Edit/delete posts instantly

🎨 Visual Feedback - Smooth animations and transitions

Administration
System Reset - Clear all data (development only)

Health Monitoring - Check API status anytime

User Management - Secure profile system

🛠 API Endpoints
Public Routes
Method	Endpoint	Description
POST	/auth/register	User registration
POST	/auth/login	User login
GET	/posts	Get all posts
GET	/posts/:id	Get specific post
GET	/posts/:id/comments	Get post comments
Protected Routes (Require JWT)
Method	Endpoint	Description
GET	/auth/profile	Get user profile
POST	/posts	Create new post
PUT	/posts/:id	Update post
DELETE	/posts/:id	Delete post
POST	/posts/:id/comments	Add comment
DELETE	/comments/:id	Delete comment
🎨 Design System
Frutiger Aero Palette
css
Primary: #00BFFF, #1E90FF, #87CEEB
Secondary: #32CD32, #98FB98, #B0E0E6
Gradients: Blue → Green transitions
Effects: Glass morphism, soft shadows, rounded corners
UI Components
Glass Cards - Semi-transparent containers

Animated Buttons - Gradient backgrounds with hover effects

Smooth Transitions - CSS animations throughout

Responsive Grid - Adaptive layout system

🔧 Development
Tech Stack
Frontend: Vanilla HTML/CSS/JavaScript

Backend: Node.js + Express + TypeScript

Database: SQLite + Prisma ORM

Authentication: JWT + bcrypt

Styling: Custom CSS with Frutiger Aero design

Scripts
bash
npm run dev          # Start development server
npm run build        # Build for production
npm run db:reset     # Reset database (development)
npx prisma studio    # Database management UI
Environment Setup
Create .env file:

env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
NODE_ENV="development"
🚀 Deployment
Local Production
bash
npm run build
npm start
Build Output
Static frontend files

Optimized backend bundle

Production database

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🎯 Roadmap
Image Upload - Direct file uploads

Post Categories - Tagging and organization

User Avatars - Profile picture support

Email Notifications - Comment replies

Progressive Web App - Offline functionality

Dark Mode - Alternative theme

📞 Support
If you have any questions or need help with setup:

Check the Issues page

Create a new issue with details

Provide system information and error logs

<div align="center">
Built with ❤️ using TypeScript, Express, and the Frutiger Aero design philosophy

⬆ Back to top

</div>
