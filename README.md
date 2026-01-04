# Car Rental Platform

A modern, full-stack car rental application built with React, Node.js, Express, and MongoDB. This platform enables users to browse and book cars while providing car owners with a comprehensive management dashboard.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

### Customer Features

- 🚗 Browse available cars with detailed information and images
- 📋 View car specifications and rental prices
- 🛒 Seamless car booking and reservation system
- 👤 User authentication and profile management
- 📱 Responsive design for mobile and desktop
- 💬 Testimonials and featured car sections

### Owner Features

- 🏠 Comprehensive dashboard for managing vehicles
- ➕ Add new cars to inventory with image uploads
- ✏️ Edit and manage existing car listings
- 📅 View and manage customer bookings
- 📊 Track rental history and statistics

## Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Motion** - Animation library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **ImageKit** - Image management and optimization
- **Multer** - File upload middleware
- **CORS** - Cross-Origin Resource Sharing

## Project Structure

```
Car Rental/
├── client/                      # Frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Banner.jsx
│   │   │   ├── CarCard.jsx
│   │   │   ├── FeaturedSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   ├── Title.jsx
│   │   │   └── owner/         # Owner-specific components
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Cars.jsx
│   │   │   ├── CarDetails.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   └── owner/         # Owner dashboard pages
│   │   ├── context/           # React Context for state management
│   │   ├── assets/            # Static assets and images
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json            # Deployment configuration
│
└── server/                      # Backend application
    ├── controllers/            # Business logic
    │   ├── userController.js
    │   ├── ownerController.js
    │   └── bookingController.js
    ├── models/                # MongoDB schemas
    │   ├── User.js
    │   ├── Car.js
    │   └── Booking.js
    ├── routes/               # API endpoints
    │   ├── userRoutes.js
    │   ├── ownerRoutes.js
    │   └── bookingRoutes.js
    ├── middlewares/          # Express middleware
    │   ├── auth.js
    │   └── multer.js
    ├── config/              # Configuration files
    │   ├── db.js
    │   └── imageKit.js
    ├── server.js
    ├── package.json
    └── vercel.json
```

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn package manager

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the server directory with the required environment variables (see [Environment Variables](#environment-variables))

4. Start the server:

```bash
npm run server      # Development with nodemon
# or
npm start           # Production
```

The server will run on `http://localhost:3000` by default.

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will typically run on `http://localhost:5173`.

## Environment Variables

### Server (.env)

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Server
PORT=3000
```

### Client (.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd server
npm run server
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

### Production Build

**Frontend:**

```bash
cd client
npm run build
npm run preview
```

**Backend:**

```bash
cd server
npm start
```

## API Documentation

### User Routes (`/api/user`)

- `POST /login` - User login
- `POST /register` - User registration
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

### Owner Routes (`/api/owner`)

- `POST /add-car` - Add a new car
- `PUT /edit-car/:id` - Edit car details
- `DELETE /car/:id` - Delete a car
- `GET /cars` - Get all owner's cars
- `GET /dashboard` - Get owner dashboard stats

### Booking Routes (`/api/bookings`)

- `POST /create` - Create a new booking
- `GET /my-bookings` - Get user's bookings
- `PUT /cancel/:id` - Cancel a booking
- `GET /owner-bookings` - Get owner's bookings

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

For more information or support, please open an issue in the repository.
