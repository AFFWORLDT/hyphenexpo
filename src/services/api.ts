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

export default api;


