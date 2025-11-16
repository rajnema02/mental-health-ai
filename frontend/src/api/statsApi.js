import api from "./api";

export const getInitialLoad = async (token) => {
  if (!token) {
    console.error("NO TOKEN SENT TO getInitialLoad()");
  }

  return api.get("/api/stats/initial-load", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDashboardStats = async (token) => {
  if (!token) {
    console.error("NO TOKEN SENT TO getDashboardStats()");
  }

  return api.get("/api/stats/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
