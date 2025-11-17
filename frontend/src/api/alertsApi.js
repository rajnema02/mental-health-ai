// frontend/src/api/alertsApi.js
import api from './api';

// GET all alerts
export const getAlerts = async (token) => {
  const res = await api.get('/api/alerts', {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// CREATE new alert
export const createAlert = async (alertData, token) => {

  // Always send valid Polygon to backend
  const sampleZone = {
    type: "Polygon",
    coordinates: [
      [
        [77.40, 23.25],
        [77.45, 23.25],
        [77.45, 23.30],
        [77.40, 23.30],
        [77.40, 23.25],
      ],
    ],
  };

  const res = await api.post(
    "/api/alerts",
    {
      name: alertData.name,
      zone: sampleZone,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

// DELETE alert
export const deleteAlert = async (id, token) => {
  const res = await api.delete(`/api/alerts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
