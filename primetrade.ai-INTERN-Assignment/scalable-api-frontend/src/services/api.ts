import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: number;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  user_id: number;
  user_email?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authAPI = {
  register: (email: string, password: string, role?: string): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/register', { email, password, role }),

  login: (email: string, password: string): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/login', { email, password }),

  getProfile: (): Promise<AxiosResponse<ApiResponse<{ user: User }>>> =>
    api.get('/auth/profile'),
};

export const taskAPI = {
  getAll: (): Promise<AxiosResponse<ApiResponse<{ tasks: Task[]; count: number }>>> =>
    api.get('/tasks'),

  getById: (id: number): Promise<AxiosResponse<ApiResponse<{ task: Task }>>> =>
    api.get(`/tasks/${id}`),

  create: (task: Partial<Task>): Promise<AxiosResponse<ApiResponse<{ task: Task }>>> =>
    api.post('/tasks', task),

  update: (id: number, task: Partial<Task>): Promise<AxiosResponse<ApiResponse<{ task: Task }>>> =>
    api.put(`/tasks/${id}`, task),

  delete: (id: number): Promise<AxiosResponse<ApiResponse<{ task: Task }>>> =>
    api.delete(`/tasks/${id}`),

  getStats: (): Promise<AxiosResponse<ApiResponse<{ stats: { total: number; pending: number; in_progress: number; completed: number } }>>> =>
    api.get('/tasks/stats'),
};

export default api;
