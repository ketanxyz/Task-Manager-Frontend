# Task Manager Frontend

## Description

This is the frontend part of a full-stack task management application built with React, Vite, and Tailwind CSS. It provides a user-friendly interface for managing tasks, user authentication, and administrative features.

## Features

- **User Authentication**: Login and signup functionality
- **Role-based Access**: Separate dashboards for Admin and regular Users
- **Task Management**: Create, view, update, and manage tasks
- **User Management**: Admin can manage users and assign tasks
- **Dashboard**: Overview with statistics and task summaries
- **Reports**: Generate and download task reports
- **File Uploads**: Support for uploading files with tasks
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- React Hot Toast for notifications
- Recharts for data visualization

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- MongoDB (for the backend)
- Backend server running (see Backend README for setup)

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ketanxyz/Task-Manager-Frontend.git
   cd Task-Manager-Frontend
   ```

2. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables for the backend**:
   - Navigate to the `Backend` folder
   - Create a `.env` file with the following variables:
     ```
     MONGO_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLIENT_URL=http://localhost:5173
     ```
   - Install backend dependencies and start the backend server:
     ```bash
     cd ../Backend
     npm install
     npm run dev
     ```

5. **Start the frontend development server**:
   ```bash
   cd ../frontend
   npm run dev
   ```

6. **Open your browser** and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code linting

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Cards/
│   │   ├── Inputs/
│   │   ├── layouts/
│   │   └── Modal/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   │   ├── Admin/
│   │   ├── Auth/
│   │   └── User/
│   ├── routes/
│   ├── utils/
│   └── assets/
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the ISC License.