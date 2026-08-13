import axios from 'axios';

// Smart URL resolution ensuring /api suffix is always handled correctly
let rawUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim().replace(/\/+$/, '');
if (!rawUrl.endsWith('/api')) {
  rawUrl = `${rawUrl}/api`;
}
const API_BASE = rawUrl;

const api = axios.create({
  baseURL: API_BASE
});

// Request Interceptor: Attach JWT Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const loginAdmin = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const getAdminProfile = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

// Dashboard Stats API
export const getAdminStats = async () => {
  const res = await api.get('/admin/stats');
  return res.data;
};

// Products Management APIs
export const getProducts = async (params = {}) => {
  const res = await api.get('/products', { params });
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (formData) => {
  const res = await api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const updateProduct = async (id, formData) => {
  const res = await api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

export const toggleFeatured = async (id) => {
  const res = await api.patch(`/products/${id}/featured`);
  return res.data;
};

export const toggleAvailable = async (id) => {
  const res = await api.patch(`/products/${id}/available`);
  return res.data;
};

// Orders Management APIs
export const getOrders = async (status = '') => {
  const res = await api.get('/orders', { params: { status } });
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await api.put(`/orders/${id}/status`, { status });
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};

// Custom Requests Management APIs
export const getCustomRequests = async (status = '') => {
  const res = await api.get('/custom-requests', { params: { status } });
  return res.data;
};

export const updateCustomRequestStatus = async (id, status) => {
  const res = await api.put(`/custom-requests/${id}/status`, { status });
  return res.data;
};

export const deleteCustomRequest = async (id) => {
  const res = await api.delete(`/custom-requests/${id}`);
  return res.data;
};

export default api;
