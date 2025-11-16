import api from "./api";

export const getAlerts = async (token) => {
  const response = await api.get("/api/alerts", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const createAlert = async (alertData, token) => {
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

  const response = await api.post(
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

  return response.data;
};

export const deleteAlert = async (id, token) => {
  const response = await api.delete(`/api/alerts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
