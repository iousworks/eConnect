# eConnect - Education Management Platform

![eConnect Logo](https://img.shields.io/badge/eConnect-Education%20Platform-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.x-black)
![React](https://img.shields.io/badge/React-18.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-blue)

A modern, full-stack education management platform built with Next.js, React, and MongoDB.

## ✨ Features

- **🔐 Authentication & Authorization**: Secure user registration and login with JWT
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **♿ Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **🚀 Performance**: Optimized with lazy loading, code splitting, and caching
- **🎨 Modern UI**: Beautiful interface with Tailwind CSS and Framer Motion
- **📊 Dashboard**: Comprehensive admin and user dashboards
- **🔄 Real-time API Testing**: Built-in API testing interface
- **🌐 SEO Optimized**: Server-side rendering and meta optimization

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR/SSG
- **React 18** - UI library with hooks and context
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or MongoDB Atlas)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/econnect
   JWT_SECRET=your-super-secret-jwt-key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   NODE_ENV=development
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
- **Course Creation**: Comprehensive course management tools
- **Student Management**: Track and manage student progress
- **Content Upload**: Easy content creation and sharing
- **Analytics**: Detailed insights into student performance
- **Grading System**: Streamlined grading and feedback tools

### For Administrators
- **User Management**: Complete control over users and permissions
- **System Analytics**: Platform-wide usage and performance metrics
- **Content Moderation**: Review and approve educational content
- **Role Management**: Flexible role-based access control

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: Database for data persistence
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication and authorization
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **HTML5**: Modern markup
- **CSS3**: Responsive styling with Grid/Flexbox
- **JavaScript ES6+**: Interactive functionality
- **Fetch API**: HTTP requests
- **Local Storage**: Client-side data persistence

## 📁 Project Structure

```
eConnect/
├── backend/                 # Express.js API server
│   ├── middleware/         # Custom middleware
│   │   └── auth.js        # JWT authentication middleware
│   ├── models/            # MongoDB schemas
│   │   └── User.js        # User model with roles
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication routes
│   │   ├── users.js       # User management routes
│   │   └── dashboard.js   # Dashboard routes
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend documentation
├── frontend/              # Web interface
│   ├── index.html         # Main application interface
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend documentation
├── documents/             # Project documentation
│   └── eConnect Offline Education Management Suite.pdf
├── MONGODB_SETUP.md       # Database setup guide
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ious-engineer/eConnect.git
   cd eConnect
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   npm start
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Backend API: `http://localhost:3000`
   - Frontend Interface: `http://localhost:8080`

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/econnect
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/search` - Search users

### Dashboard
- `GET /api/dashboard/student` - Student dashboard data
- `GET /api/dashboard/educator` - Educator dashboard data

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Code Style
- ESLint for JavaScript linting
- Prettier for code formatting
- Follow the existing code patterns

## 🌟 Key Features Implementation

### Role-Based Access Control
- **Student**: Access to courses, progress tracking, profile management
- **Educator**: Course creation, student management, analytics
- **Admin**: Full system access, user management, content moderation

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting (planned)

### Offline Capabilities
- Service worker implementation (planned)
- Local data caching
- Sync when online
- Progressive Web App features

## 📈 Future Enhancements

- [ ] Real-time messaging system
- [ ] Video conferencing integration
- [ ] Mobile application (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] File sharing system
- [ ] Discussion forums
- [ ] Assignment submission system

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@ious-engineer](https://github.com/ious-engineer)
- Portfolio: [theious.engineer](https://ious-engineer.github.io/portfolio)

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools
- Inspired by the need for accessible education technology
- Built with ❤️ for educators and students worldwide

---

**Note**: This project is designed to work offline-first, making education accessible even in areas with limited internet connectivity.