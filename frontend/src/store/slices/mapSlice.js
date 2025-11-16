// src/store/slices/mapSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInitialLoad } from '../../api/statsApi';

// -----------------------------------------------
// Initial State
// -----------------------------------------------
const initialState = {
  dataPoints: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// -----------------------------------------------
// Async Thunk: Fetch Initial Map Data
// -----------------------------------------------
export const fetchInitialData = createAsyncThunk(
  'map/fetchInitialData',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.token;
      if (!token) {
        // helpful debug log
        console.error('[mapSlice] Missing token when calling getInitialLoad()');
        return thunkAPI.rejectWithValue('Missing token');
      }

      // getInitialLoad returns response.data (array)
      const data = await getInitialLoad(token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message || 'Failed to load initial map data'
      );
    }
  }
);

// -----------------------------------------------
// Slice
// -----------------------------------------------
const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    // Add real-time map point (socket / streaming)
    addLiveMapPoint: (state, action) => {
      state.dataPoints.push(action.payload);

      // Limit array size to prevent performance issues
      if (state.dataPoints.length > 1000) {
        state.dataPoints.shift();
      }
    },
    clearMap: (state) => {
      state.dataPoints = [];
      state.status = 'idle';
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // action.payload should be an array of points
        state.dataPoints = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load map data';
      });
  },
});

export const { addLiveMapPoint, clearMap } = mapSlice.actions;
export default mapSlice.reducer;
