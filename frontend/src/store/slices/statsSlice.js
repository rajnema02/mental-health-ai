import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardStats } from '../../api/statsApi';

const initialState = {
  topicStats: [],
  emotionStats: [],
  status: 'idle',
  error: null,
};

// ✅ Fetch dashboard statistics
export const fetchDashboardStats = createAsyncThunk(
  'stats/fetchDashboardStats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) throw new Error('Missing authentication token');
      return await getDashboardStats(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topicStats = action.payload?.topicStats || [];
        state.emotionStats = action.payload?.emotionStats || [];
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
