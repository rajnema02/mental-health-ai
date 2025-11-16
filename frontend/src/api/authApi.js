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
  return response.data;
};

export const adminSignup = async (name, email, password) => {
  const res = await axios.post(`${BACKEND_URL}/api/auth/official/signup`, {
    name,
    email,
    password,
  });
  return res.data;
};

// --- User Auth ---
export const userLogin = async (email, password) => {
  const response = await axios.post(`${BACKEND_URL}/api/auth/user/login`, {
    email,
    password,
  });
  return response.data;
};

export const userSignup = async (name, email, password) => {
  const response = await axios.post(`${BACKEND_URL}/api/auth/user/signup`, {
    name,
    email,
    password,
  });
  return response.data;
};