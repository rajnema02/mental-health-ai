import api from "./api";

// Fetch map + topic stats
export const getInitialLoad = async (token) => {
  const res = await api.get("/api/stats/initial-load", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data; // { mapData, topicStats }
};

// Fetch chart stats only
export const getDashboardStats = async (token) => {
  const res = await api.get("/api/stats/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
