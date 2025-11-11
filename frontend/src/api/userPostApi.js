import api from './api'; 

export const analyzePost = async (postData, token) => {
  const { caption, imageUrl } = postData;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.post('/api/posts/analyze', { caption, imageUrl }, config);
  return response.data;
};

export const getMyPostHistory = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.get('/api/posts/my-history', config);
  return response.data;
};