import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// --- Admin Auth ---
export const adminLogin = async (email, password) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/auth/official/login`,
    {
      email,
      password,
    }
  );
  return response.data; // { _id, name, email, token }
};

// --- User Auth ---
export const userLogin = async (email, password) => {
  const response = await axios.post(`${BACKEND_URL}/api/auth/user/login`, {
    email,
    password,
  });
  return response.data; // { _id, name, email, token }
};

export const userSignup = async (name, email, password) => {
  const response = await axios.post(`${BACKEND_URL}/api/auth/user/signup`, {
    name,
    email,
    password,
  });
  return response.data; // { _id, name, email, token }
};