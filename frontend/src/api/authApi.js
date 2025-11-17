import api from './api';

export const adminLogin = async (email, password) => {
  const res = await api.post('/api/auth/official/login', { email, password });
  return res.data;
};

export const adminSignup = async (name, email, password) => {
  const res = await api.post('/api/auth/official/signup', { name, email, password });
  return res.data;
};

export const userLogin = async (email, password) => {
  const res = await api.post('/api/auth/user/login', { email, password });
  return res.data;
};

export const userSignup = async (name, email, password) => {
  const res = await api.post('/api/auth/user/signup', { name, email, password });
  return res.data;
};
