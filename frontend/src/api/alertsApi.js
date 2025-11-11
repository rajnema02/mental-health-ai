import api from './api';

export const getAlerts = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.get('/api/alerts', config);
  return response.data;
};

export const createAlert = async (alertData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  const sampleZone = {
    type: 'Polygon',
    coordinates: [
      [
        [77.40, 23.25], [77.45, 23.25], [77.45, 23.30],
        [77.40, 23.30], [77.40, 23.25],
      ],
    ],
  };

  const response = await api.post('/api/alerts', { 
    name: alertData.name, 
    zone: sampleZone 
  }, config);
  return response.data;
};

export const deleteAlert = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await api.delete(`/api/alerts/${id}`, config);
  return response.data;
};