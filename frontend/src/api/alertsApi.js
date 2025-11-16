import api from "./api";

export const getAlerts = async () => {
  const res = await api.get("/api/alerts");
  return res.data;
};

export const createAlert = async (alertData) => {
  const res = await api.post("/api/alerts", alertData);
  return res.data;
};

export const deleteAlert = async (id) => {
  const res = await api.delete(`/api/alerts/${id}`);
  return res.data;
};
