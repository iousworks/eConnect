# eConnect Backend API

A RESTful API backend for the eConnect Education Management Platform, connecting students and educators.

## Features

- **User Authentication**: Registration, login, and JWT-based authentication
- **Role-based Access Control**: Different permissions for students, educators, and admins
- **User Management**: Profile management and user search functionality
- **Dashboard APIs**: Personalized dashboards for students and educators
- **Offline-first Design**: Built to support offline education management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment**: dotenv for configuration

## Project Structure

```
backend/
├── models/
│   └── User.js              # User model (students & educators)
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User management routes
│   └── dashboard.js         # Dashboard data routes
├── middleware/
│   └── auth.js              # Authentication middleware
├── server.js                # Main server file
├── package.json             # Dependencies
└── .env.example             # Environment variables template
```

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd eConnect/backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```

5. Update `.env` with your configuration:
   ```
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your_secure_jwt_secret_here
   MONGODB_URI=mongodb://localhost:27017/econnect
   ```

6. Start the server:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student",
  "institution": "ABC University",
  "grade": "Grade 10"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "password123"
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <jwt_token>
```

### User Management

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <jwt_token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "Jane",
  "phoneNumber": "+1234567890",
  "institution": "XYZ University"
}
```

#### Get All Users (Educators/Admins only)
```http
GET /api/users?role=student&page=1&limit=10
Authorization: Bearer <jwt_token>
```

#### Search Users
```http
GET /api/users/search/john?role=student
Authorization: Bearer <jwt_token>
```

### Dashboard

#### Student Dashboard
```http
GET /api/dashboard/student
Authorization: Bearer <jwt_token>
```

#### Educator Dashboard
```http
GET /api/dashboard/educator
Authorization: Bearer <jwt_token>
```

#### Dashboard Statistics
```http
GET /api/dashboard/stats
Authorization: Bearer <jwt_token>
```

### Health Check

#### API Health
```http
GET /api/health
```

## User Roles

### Student
- Register and manage profile
- View dashboard with assignments and activities
- Search for educators in same institution
- Access to student-specific features

### Educator
- Register and manage profile
- View dashboard with teaching schedule
- Manage students in same institution
- Access to educator-specific features

### Admin (Future implementation)
- Full system access
- User management
- System configuration

## Database Schema

### User Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['student', 'educator', 'admin']),
  profilePicture: String,
  phoneNumber: String,
  dateOfBirth: Date,
  institution: String,
  grade: String (for students),
  subject: String (for educators),
  isActive: Boolean (default: true),
  isVerified: Boolean (default: false),
  lastLogin: Date,
  registrationDate: Date (default: now),
  timestamps: true
}
```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- CORS protection
- Environment-based configuration

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "message": "Detailed error description",
  "details": [] // Validation errors if applicable
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (duplicate data)
- `500` - Internal Server Error

## Future Enhancements

- Course/Class management
- Assignment system
- File upload functionality
- Real-time messaging
- Notification system
- Grade tracking
- Calendar integration
- Mobile app API endpoints

## Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Development Commands
```bash
npm run dev      # Start with nodemon
npm start        # Start production server
npm test         # Run tests (when implemented)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

---

**Author**: Jenny M. Subrastas  
**Project**: eConnect - Education Management Platform  
**Version**: 1.0.0