export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    PROFILE: "/api/auth/profile",
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
  TASKS: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",
    GET_ALL: "/api/tasks",
    GET_BY_ID: (id) => `/api/tasks/${id}`,
    CREATE: "/api/tasks",
    UPDATE: (id) => `/api/tasks/${id}`,
    DELETE: (id) => `/api/tasks/${id}`,
    UPDATE_STATUS: (id) => `/api/tasks/${id}/status`,
    UPDATE_CHECKLIST: (id) => `/api/tasks/${id}/todo`,
  },
  USERS: {
    GET_ALL: "/api/users",
    GET_BY_ID: (id) => `/api/users/${id}`,
  },
  REPORTS: {
    EXPORT_TASKS: "/api/reports/export/tasks",
    EXPORT_USERS: "/api/reports/export/users",
  },
};
