import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardStats } from "../../api/statsApi";

const initialState = {
  topicStats: [],
  emotionStats: [],
  loading: false,
  error: null,
};

// ----------------------------------------------------
// Thunk: Admin Dashboard Stats
// ----------------------------------------------------
export const fetchDashboardStats = createAsyncThunk(
  "stats/fetchDashboardStats",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await getDashboardStats(token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message
      );
    }
  }
);

// ----------------------------------------------------
// Slice
// ----------------------------------------------------
const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.topicStats = action.payload.topicStats || [];
        state.emotionStats = action.payload.emotionStats || [];
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
