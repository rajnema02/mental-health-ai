import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminLogin, userLogin, userSignup } from '../../api/authApi';

// -----------------------------------------------
// Restore Authentication From localStorage
// -----------------------------------------------
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

// -----------------------------------------------
//  Async Thunks
// -----------------------------------------------

// Admin Login
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await adminLogin(email, password);

      // Save to local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('role', 'admin');

      return { ...data, role: 'admin' };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

// User Login
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
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

// User Signup
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
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

// -----------------------------------------------
// Slice
// -----------------------------------------------

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
      state.error = null;
    };

    const rejected = (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    };

    builder
      // Admin Login
      .addCase(loginAdmin.pending, pending)
      .addCase(loginAdmin.fulfilled, fulfilled)
      .addCase(loginAdmin.rejected, rejected)

      // User Login
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, fulfilled)
      .addCase(loginUser.rejected, rejected)

      // User Signup
      .addCase(signupUser.pending, pending)
      .addCase(signupUser.fulfilled, fulfilled)
      .addCase(signupUser.rejected, rejected);
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
