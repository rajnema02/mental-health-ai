import axios from 'axios';

// This is now a simple, "dumb" axios instance.
// It does NOT import the store. This breaks the circular dependency.
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default api;