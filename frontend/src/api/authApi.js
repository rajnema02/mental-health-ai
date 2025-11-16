import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ADMIN LOGIN
export const adminLogin = async (email, password) => {
  const res = await axios.post(`${BACKEND_URL}/api/auth/official/login`, {
    email,
    password,
  });
  return res.data;
};

// ADMIN SIGNUP
export const adminSignup = async (name, email, password) => {
  const res = await axios.post(`${BACKEND_URL}/api/auth/official/signup`, {
    name,
    email,
    password,
  });
  return res.data;
};

// USER LOGIN
export const userLogin = async (email, password) => {
  const res = await axios.post(`${BACKEND_URL}/api/auth/user/login`, {
    email,
    password,
  });
  return res.data;
};

// USER SIGNUP
export const userSignup = async (name, email, password) => {
  const res = await axios.post(`${BACKEND_URL}/api/auth/user/signup`, {
    name,
    email,
    password,
  });
  return res.data;
};
