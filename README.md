# Task Manager Frontend

## Description

This is the frontend part of a full-stack task management application built with React, Vite, and Tailwind CSS. It provides a user-friendly interface for managing tasks, user authentication, and administrative features.

## Repositories

- **Frontend**: https://github.com/ketanxyz/Task-Manager-Frontend.git
- **Backend**: https://github.com/ketanxyz/Task-Manager-backend.git

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
- Backend server running

## Installation and Setup

### Backend Setup

1. **Clone the backend repository**:
   ```bash
   git clone https://github.com/ketanxyz/Task-Manager-backend.git
   cd Task-Manager-backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the backend root directory with the following variables:
     ```
     MONGO_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLIENT_URL=http://localhost:5173
     ADMIN_INVITE_TOKEN=4588944
     PORT=8000
     ```
   - The `ADMIN_INVITE_TOKEN` is used to create the initial admin account.

4. **Start the backend server**:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:8000`

### Frontend Setup

1. **Clone the frontend repository** (in a separate terminal or directory):
   ```bash
   git clone https://github.com/ketanxyz/Task-Manager-Frontend.git
   cd Task-Manager-Frontend/frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

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

This project is licensed under the ISC License.