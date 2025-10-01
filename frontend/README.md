# eConnect Frontend

A modern, responsive web interface for testing and interacting with the eConnect Education Management Platform API.

## Features

- **Beautiful UI**: Modern gradient design with smooth animations
- **Complete API Testing**: Test all backend endpoints through a user-friendly interface
- **Authentication Flow**: Register, login, and manage user sessions
- **Role-based Interface**: Different views for students and educators
- **Real-time API Status**: Live connection status to backend
- **Dashboard Integration**: Interactive dashboards for both user roles
- **User Management**: Search users, view profiles, and manage accounts
- **Custom API Testing**: Send custom requests to any endpoint

## Getting Started

### Prerequisites
- Node.js installed
- eConnect backend running on localhost:3000

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd eConnect/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   This will start a local server on `http://localhost:8080` and automatically open your browser.

### Alternative (No Installation)
You can also open the `index.html` file directly in your web browser, but you may encounter CORS issues with some API calls.

## Usage

### 1. Check API Status
The interface automatically checks if your backend API is running and displays the connection status at the top.

### 2. Authentication
- **Register**: Create new student or educator accounts
- **Login**: Authenticate with existing credentials
- **Logout**: Clear session and tokens

### 3. Dashboard
- View role-specific dashboards (student or educator)
- Access statistics and recent activities
- See institution-specific information

### 4. User Management
- Search for users by name, email, or institution
- View user profiles
- Browse all users (role-dependent access)

### 5. API Testing
- Test individual endpoints
- Send custom API requests
- Verify authentication tokens
- Debug API responses

## Interface Sections

### Authentication Tab
- User registration form with role selection
- Login form
- Token management
- Session status display

### Dashboard Tab
- Role-specific dashboard views
- Statistics overview
- Recent activities and events
- Quick action buttons

### Users Tab
- User search functionality
- Profile management
- User listing (for authorized roles)
- Search results display

### API Testing Tab
- Health check endpoint
- Token verification
- Custom request builder
- Response analysis

## API Integration

The frontend connects to the eConnect backend API running on `localhost:3000`. It supports:

- All authentication endpoints
- User management operations
- Dashboard data retrieval
- Real-time status checking
- Error handling and validation

## Responsive Design

The interface is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices
- Different screen sizes and orientations

## Security Features

- JWT token management
- Secure authentication flow
- Role-based access control
- Input validation
- Error handling

## Customization

You can easily customize:
- API base URL (change `API_BASE` constant)
- Styling and colors (modify CSS variables)
- Interface layout (update HTML structure)
- Additional features (extend JavaScript functions)

## Troubleshooting

### API Connection Issues
- Ensure backend server is running on port 3000
- Check for CORS issues if using file:// protocol
- Verify network connectivity

### Authentication Problems
- Clear browser localStorage if experiencing token issues
- Check backend logs for authentication errors
- Verify user credentials and account status

### Display Issues
- Clear browser cache
- Check browser console for JavaScript errors
- Ensure modern browser compatibility

## Development

### Project Structure
```
frontend/
├── index.html          # Main interface file
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript ES6+**: API interactions and dynamic content
- **Fetch API**: HTTP requests to backend
- **LocalStorage**: Token and session management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

---

**Author**: Jenny M. Subrastas  
**Project**: eConnect - Education Management Platform  
**Frontend Version**: 1.0.0