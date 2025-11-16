// frontend/src/store/slices/statsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardStats, getInitialLoad } from "../../api/statsApi";

const initialState = {
  dataPoints: [],
  topicStats: [],
  emotionStats: [],
  loading: false,
  error: null,
};

export const fetchInitialData = createAsyncThunk(
  "stats/fetchInitialData",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("Missing token");
    }

    // ❗ getInitialLoad already returns response.data
    const data = await getInitialLoad(token);
    return data;  // FIXED
  }
);

export const fetchDashboardStats = createAsyncThunk(
  "stats/fetchDashboardStats",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("Missing token");
    }

    // ❗ getDashboardStats returns response.data
    const data = await getDashboardStats(token);
    return data;  // FIXED
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Initial load
      .addCase(fetchInitialData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.loading = false;
        state.dataPoints = action.payload;  // FIXED
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.topicStats = action.payload.topicStats;
        state.emotionStats = action.payload.emotionStats;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
