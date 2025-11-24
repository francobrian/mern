import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  googleAuth: (token) => api.post('/auth/google', { token }),
  verifyToken: () => api.get('/auth/verify'),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
  getProfile: () => api.get('/auth/me'),
};

export const farmersAPI = {
  getAll: (params) => api.get('/farmers', { params }),
  getById: (id) => api.get(`/farmers/${id}`),
  update: (id, data) => api.put(`/farmers/${id}`, data),
  getProducts: (id, params) => api.get(`/farmers/${id}/products`, { params }),
  getNearby: (location) => api.get('/farmers/location/nearby', { params: location }),
};

export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getByCategory: (category, params) => api.get(`/products/category/${category}`, { params }),
  updateAvailability: (id, isAvailable) => api.patch(`/products/${id}/availability`, { isAvailable }),
  getFarmerProducts: (farmerId, params) => api.get(`/products/farmer/${farmerId}`, { params }),
};

export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: (params) => api.get('/orders/my-orders', { params }),
  getFarmerOrders: (params) => api.get('/orders/farmer-orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  cancel: (id) => api.patch(`/orders/${id}/cancel`),
  getStats: () => api.get('/orders/stats/overview'),
};

export const weatherAPI = {
  getWeather: (lat, lon) => api.get(`/weather/${lat}/${lon}`),
  getAdvisory: (params) => api.get('/weather/advisory', { params }),
  getCropAdvisory: (cropType, location) => api.get(`/weather/advisory/${cropType}/${location}`),
};

export const articlesAPI = {
  getAll: (params) => api.get('/articles', { params }),
  getById: (id) => api.get(`/articles/${id}`),
  create: (data) => api.post('/articles', data),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;