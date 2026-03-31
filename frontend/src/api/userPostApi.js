import api from "./api";

// 📌 Get posts of logged-in user
export const getMyPosts = async (token) => {
  const res = await api.get("/api/posts/my-posts", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.posts || res.data; // ✅ safe return
};

// 📌 Upload new post
export const uploadUserPost = async (formData, token) => {
  const res = await api.post("/api/posts/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// 📌 Delete a post
export const deleteUserPost = async (id, token) => {
  const res = await api.delete(`/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
