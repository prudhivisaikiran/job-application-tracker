# Job Application Tracker

A full-stack MERN application for tracking job applications, interviews, and offers with a modern, intuitive interface.

## 🚀 Live Demo

- **Frontend**: [https://magnificent-souffle-bcbaa8.netlify.app](https://magnificent-souffle-bcbaa8.netlify.app)
- **Backend API**: [https://job-application-tracker-989k.onrender.com](https://job-application-tracker-989k.onrender.com)

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Job Management**: Create, read, update, and delete job applications
- **Status Tracking**: Track application status (Applied, Pending, Interviewing, Offer, Rejected)
- **Dashboard Analytics**: Visual statistics showing total applications, interviews, offers, and rejections
- **Responsive Design**: Modern, premium UI that works seamlessly on desktop and mobile
- **Real-time Updates**: Instant feedback with toast notifications

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Lucide React** - Modern icon library
- **React Hot Toast** - Elegant notifications
- **Custom CSS** - Premium styling with CSS variables

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Joi** - Request validation

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLIENT_URL=http://localhost:3000
```

Start the backend server:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

## 🚀 Deployment

This project is deployed using:
- **Frontend**: Netlify
- **Backend**: Render
- **Database**: MongoDB Atlas

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs for authenticated user
- `POST /api/jobs` - Create new job application
- `PUT /api/jobs/:id` - Update job application
- `DELETE /api/jobs/:id` - Delete job application

## 🎨 Features Showcase

- **Modern Dashboard**: Clean, card-based layout with real-time statistics
- **Inline Status Editing**: Update application status with a single click
- **Modal Forms**: Elegant, portal-based modals for creating and editing applications
- **Smart Scroll Lock**: Background scroll prevention without layout shifts
- **Custom Scrollbars**: Subtle, premium scrollbar styling
- **Dark Mode Support**: CSS variables for easy theme switching (foundation in place)

## 🔒 Security

- Password hashing with bcrypt
- JWT token-based authentication
- HTTP-only cookie support (ready for production)
- Input validation with Joi
- CORS configuration for production
- Environment variable protection

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Built as a portfolio project to demonstrate full-stack development skills.

---

**Note**: This is a portfolio project showcasing modern web development practices, including React hooks, RESTful API design, MongoDB integration, and production deployment workflows.
