import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/constants';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on 401
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    console.log('🚀 Making login request to:', `${API_URL}/auth/login`);
    return api.post('/auth/login', credentials);
  },
  
  register: (userData: any) =>
    api.post('/auth/register', userData),
  
  getProfile: () =>
    api.get('/auth/profile'),
  
  updateProfile: (userData: any) =>
    api.put('/auth/profile', userData),
};

// Members API
export const membersAPI = {
  getAll: (params?: any) =>
    api.get('/members', { params }),
  
  getById: (id: string) =>
    api.get(`/members/${id}`),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getActivities: (params?: any) => api.get('/admin/activities', { params }),
};

// Trainers API
export const trainersAPI = {
  getAll: (params?: any) => api.get('/trainers', { params }),
  getById: (id: string) => api.get(`/trainers/${id}`),
  getStats: (id?: string) => api.get(`/trainers/${id}/stats`),
};

// Staff API
export const staffAPI = {
  getAll: (params?: any) => api.get('/staff', { params }),
  getById: (id: string) => api.get(`/staff/${id}`),
};

// Sessions API
export const sessionsAPI = {
  getAll: (params?: any) => api.get('/sessions', { params }),
  getByMember: (memberId: string, params?: any) =>
    api.get(`/sessions/member/${memberId}`, { params }),
  getTodayStats: () => api.get('/sessions/stats/today'),
};

// Training Sessions API
export const trainingSessionsAPI = {
  getAll: (params?: any) => api.get('/training-sessions', { params }),
  getByTrainer: (trainerId: string, params?: any) =>
    api.get(`/training-sessions/trainer/${trainerId}`, { params }),
  getByMember: (memberId: string, params?: any) =>
    api.get(`/training-sessions/member/${memberId}`, { params }),
};

// Memberships API
export const membershipsAPI = {
  getMyMemberships: () =>
    api.get('/memberships/my-memberships'),
  
  getAll: (params?: any) =>
    api.get('/memberships', { params }),
};

// Check-in API
export const checkinAPI = {
  checkin: (memberId: string, notes?: string) =>
    api.post('/checkin/checkin', { memberId, notes }),
  
  checkout: (sessionId: string, notes?: string) =>
    api.post(`/checkin/checkout/${sessionId}`, { notes }),
  
  getActiveSessions: () =>
    api.get('/checkin/active'),
  
  getTodaySessions: () =>
    api.get('/checkin/today'),
  
  getHistory: (memberId: string, params?: any) =>
    api.get(`/checkin/member/${memberId}/history`, { params }),
};

// Equipment API
export const equipmentAPI = {
  getAll: (params?: any) => api.get('/equipment', { params }),
  getById: (id: string) => api.get(`/equipment/${id}`),
};

// Classes API
export const classesAPI = {
  getAll: (params?: any) => api.get('/classes', { params }),
  getById: (id: string) => api.get(`/classes/${id}`),
};

// Payments API
export const paymentsAPI = {
  getAll: (params?: any) => api.get('/payments', { params }),
  getById: (id: string) => api.get(`/payments/${id}`),
};

// Appointments API
export const appointmentsAPI = {
  getAll: (params?: any) => api.get('/appointments', { params }),
  getById: (id: string) => api.get(`/appointments/${id}`),
  create: (data: any) => api.post('/appointments', data),
  update: (id: string, data: any) => api.put(`/appointments/${id}`, data),
};

// Packages API
export const packagesAPI = {
  getAll: (params?: any) => api.get('/packages', { params }),
  getById: (id: string) => api.get(`/packages/${id}`),
};

// Invoices API
export const invoicesAPI = {
  getAll: (params?: any) => api.get('/invoices', { params }),
  getById: (id: string) => api.get(`/invoices/${id}`),
};

// Notifications API
export const notificationsAPI = {
  getAll: (params?: any) => api.get('/notifications', { params }),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/mark-all-read'),
};

export default api;


