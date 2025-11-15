<div align="center">

<h1>🚀 Personal Blog API - Full Stack Application</h1>

<p>A modern, self-contained full-stack blog application built with <strong>100% local development</strong> in mind. Features a beautiful Frutiger Aero-inspired UI with real-time post management, rich text editing, and JWT authentication.</p>

<img src="https://img.shields.io/badge/Style-Frutiger_Aero-00BFFF?style=for-the-badge&logo=designernews&logoColor=white" alt="Frutiger Aero Style">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js">
<img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">

<br>
<br>

</div>

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


## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone and setup**
```bash
git clone <your-repo-url>
cd personal-blog-api
npm install
