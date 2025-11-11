import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  adminLogin,
  userLogin,
  userSignup,
} from '../../api/authApi';

// Get initial state from local storage
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

const initialState = {
  user: user || null,
  token: token || null,
  role: role || null,
  isAuthenticated: !!token,
  status: 'idle',
  error: null,
};

// --- Thunks ---
export const loginAdmin = createAsyncThunk(
  'auth/adminLogin',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await adminLogin(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('role', 'admin');
      return { ...data, role: 'admin' };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/userLogin',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await userLogin(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('role', 'user');
      return { ...data, role: 'user' };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/userSignup',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const data = await userSignup(name, email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('role', 'user');
      return { ...data, role: 'user' };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = 'loading';
      state.error = null;
    };
    const handleFulfilled = (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token;
      state.role = action.payload.role;
    };
    const handleRejected = (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    };

    builder
      // All three thunks share the same logic
      .addCase(loginAdmin.pending, handlePending)
      .addCase(loginAdmin.fulfilled, handleFulfilled)
      .addCase(loginAdmin.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(signupUser.pending, handlePending)
      .addCase(signupUser.fulfilled, handleFulfilled)
      .addCase(signupUser.rejected, handleRejected);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;