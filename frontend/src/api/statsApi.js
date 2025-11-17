import api from './api';

export const getInitialLoad = async () => {
  const res = await api.get('/api/stats/initial-load');
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await api.get('/api/stats/dashboard');
  return res.data;
};
