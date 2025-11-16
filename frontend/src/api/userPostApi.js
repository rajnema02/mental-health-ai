import api from "./api";

export const analyzePost = async (postData, token) => {
  const { caption, imageUrl } = postData;

  const response = await api.post(
    "/api/posts/analyze",
    { caption, imageUrl },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getMyPostHistory = async (token) => {
  const response = await api.get("/api/posts/my-history", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
