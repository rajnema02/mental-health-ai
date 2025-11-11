import api from './api';

export const getInitialLoad = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.get('/api/stats/initial-load', config);
  return response.data;
};

export const getDashboardStats = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.get('/api/stats/dashboard', config);
  return response.data;
};