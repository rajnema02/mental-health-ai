import axios from 'axios';

// This is the "dumb" axios instance. It breaks the circular dependency.
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default api;