import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;// Change this to your backend URL if different

const api = axios.create({
  baseURL: BASE_URL
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
