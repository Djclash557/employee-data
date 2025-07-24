# Employee Management System

A full-stack Employee Management System with attendance and task tracking, built with React (frontend) and Node.js/Express (backend), using Firebase for authentication and data storage.

## Features

- User authentication (Sign Up, Login, Protected Routes)
- Employee dashboard with attendance tracking
- Task assignment and management
- Employee list and management
- Settings and user profile management
- Modern UI with animations and responsive design

  ##Live Demo
  https://employee-data-frontend-81vb.onrender.com

## Tech Stack

- **Frontend:** React, CSS, Vite
- **Backend:** Node.js, Express
- **Database:** Firebase
- **Other:** JWT Authentication, RESTful APIs

## Project Structure

```
task 1/
  ├── employee data/         # Frontend (React)
  └── employee-backend/      # Backend (Node.js/Express)
```

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Setup

#### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "task 1"
```

#### 2. Install dependencies

**Frontend:**
```bash
cd "employee data"
npm install
```

**Backend:**
```bash
cd ../employee-backend
npm install
```



#### 4. Run the applications

**Backend:**
```bash
cd employee-backend
npm start
```

**Frontend:**
```bash
cd ../employee data
npm run dev
```

## Usage

- Visit `http://localhost:5173` (or the port shown in terminal) to access the frontend.
- Use the dashboard to manage employees, attendance, and tasks.

## Folder Details

- **employee data/src/**: React components, styles, and assets.
- **employee-backend/routes/**: API endpoints for users, employees, attendance, and tasks.
- **employee-backend/models/**: Mongoose models for MongoDB (if used).
- **employee-backend/middleware/**: Authentication middleware.

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

[MIT](LICENSE) (or your chosen license)

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Firebase](https://firebase.google.com/)
- [Vite](https://vitejs.dev/)
