# Scalable REST API with Authentication & Role-Based Access

A comprehensive REST API built with Node.js, Express, and PostgreSQL featuring JWT authentication, role-based access control, and a React frontend for testing.

## 🚀 Features

### Backend (Node.js/Express)
- **Authentication**: JWT-based authentication with secure password hashing
- **Role-Based Access Control**: User and admin roles with different permissions
- **API Versioning**: RESTful API with versioning support (`/api/v1`)
- **Input Validation**: Comprehensive validation using Joi
- **Security**: Rate limiting, XSS protection, input sanitization
- **Error Handling**: Centralized error handling with detailed responses
- **Database**: PostgreSQL with optimized queries and indexing
- **Documentation**: Swagger/OpenAPI documentation
- **Logging**: Request logging with Morgan

### Frontend (React/TypeScript)
- **Authentication**: Login, registration, and protected routes
- **Dashboard**: Task management interface
- **CRUD Operations**: Create, read, update, delete tasks
- **Real-time Updates**: Dynamic task status updates
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Error Handling**: User-friendly error messages

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd scalable-api-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=scalable_api
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3001
   ```

4. **Set up the database**
   ```bash
   # Create database
   createdb scalable_api
   
   # Run the initialization script
   psql -d scalable_api -f database/init.sql
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

The API will be available at `http://localhost:3000`
API Documentation: `http://localhost:3000/api-docs`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../scalable-api-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3001`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/v1/auth/profile
Authorization: Bearer <token>
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/v1/tasks
Authorization: Bearer <token>
```

#### Create Task
```http
POST /api/v1/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description",
  "status": "pending"
}
```

#### Update Task
```http
PUT /api/v1/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /api/v1/tasks/:id
Authorization: Bearer <token>
```

#### Get Task Statistics
```http
GET /api/v1/tasks/stats
Authorization: Bearer <token>
```

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents brute force attacks
- **Input Sanitization**: XSS protection and input validation
- **CORS Configuration**: Secure cross-origin requests
- **Helmet.js**: Security headers

## 🏗️ Project Structure

```
scalable-api-backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── validators/      # Input validation schemas
│   └── server.js        # Server entry point
├── database/
│   └── init.sql         # Database initialization
├── .env.example         # Environment variables template
└── README.md           # This file

scalable-api-frontend/
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   ├── services/        # API services
│   └── App.tsx          # Main App component
└── .env.example         # Environment variables template
```

## 🧪 Testing the API

### Using Swagger UI
1. Start the backend server
2. Navigate to `http://localhost:3000/api-docs`
3. Use the interactive documentation to test endpoints

### Using Frontend
1. Start both backend and frontend servers
2. Navigate to `http://localhost:3001`
3. Register a new account or login
4. Use the dashboard to test CRUD operations

### Using curl
```bash
# Register user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create task (replace TOKEN with actual JWT)
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test Task","description":"This is a test task"}'
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Production Considerations
- Use environment variables for sensitive data
- Enable HTTPS in production
- Set up proper logging and monitoring
- Use a reverse proxy (nginx)
- Implement database backups
- Set up CI/CD pipeline

## 📈 Scalability Notes

### Current Architecture
- **Monolithic**: Single application with modular structure
- **Database**: PostgreSQL with connection pooling
- **Caching**: Ready for Redis integration
- **Load Balancing**: Stateless design for horizontal scaling

### Future Enhancements
- **Microservices**: Split into auth, tasks, and user services
- **Caching**: Redis for session management and query caching
- **Message Queue**: RabbitMQ/Kafka for async processing
- **Load Balancer**: nginx or AWS ALB for traffic distribution
- **Database Sharding**: For handling large datasets
- **CDN**: For static assets in frontend

### Performance Optimizations
- Database indexing on frequently queried fields
- Connection pooling for database connections
- Rate limiting to prevent abuse
- Input validation to reduce processing overhead
- Efficient error handling to minimize resource usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please open an issue in the repository.
