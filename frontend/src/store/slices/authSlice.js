import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminLogin, userLogin, userSignup, adminSignup } from '../../api/authApi';

// Restore from localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));
const storedToken = localStorage.getItem('token');
const storedRole = localStorage.getItem('role');

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  role: storedRole || null,
  isAuthenticated: !!storedToken,
  status: 'idle',
  error: null,
};

// -------------------------
// Admin Login
// -------------------------
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await adminLogin(email, password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('role', 'admin');

      return { ...data, role: 'admin' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Login failed');
    }
  }
);

// -------------------------
// Admin Signup  (FIXED)
// -------------------------
export const signupAdmin = createAsyncThunk(
  'auth/signupAdmin',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const data = await adminSignup(name, email, password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('role', 'admin');

      return { ...data, role: 'admin' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Signup failed');
    }
  }
);

// -------------------------
// User Login
// -------------------------
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await userLogin(email, password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('role', 'user');

      return { ...data, role: 'user' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Login failed');
    }
  }
);

// -------------------------
// User Signup
// -------------------------
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const data = await userSignup(name, email, password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('role', 'user');

      return { ...data, role: 'user' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Signup failed');
    }
  }
);

// -------------------------
// Slice
// -------------------------
const authSlice = createSlice({
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
      state.error = null;
      state.isAuthenticated = false;
      state.status = 'idle';
    },
  },

  extraReducers: (builder) => {
    const pending = (state) => {
      state.status = 'loading';
      state.error = null;
    };

    const fulfilled = (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token;
      state.role = action.payload.role;
    };

    const rejected = (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    };

    builder
      // ADMIN LOGIN
      .addCase(loginAdmin.pending, pending)
      .addCase(loginAdmin.fulfilled, fulfilled)
      .addCase(loginAdmin.rejected, rejected)

      // ADMIN SIGNUP (🔥 MISSING EARLIER – FIXED)
      .addCase(signupAdmin.pending, pending)
      .addCase(signupAdmin.fulfilled, fulfilled)
      .addCase(signupAdmin.rejected, rejected)

      // USER LOGIN
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, fulfilled)
      .addCase(loginUser.rejected, rejected)

      // USER SIGNUP
      .addCase(signupUser.pending, pending)
      .addCase(signupUser.fulfilled, fulfilled)
      .addCase(signupUser.rejected, rejected);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
