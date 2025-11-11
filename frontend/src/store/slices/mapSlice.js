import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getInitialLoad } from '../../api/statsApi';

const initialState = { dataPoints: [], status: 'idle', error: null };

// ✅ Fetch initial data for map
export const fetchInitialData = createAsyncThunk(
  'map/fetchInitialData',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) throw new Error('Missing authentication token');
      return await getInitialLoad(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    // ✅ Add real-time point (via socket)
    addLiveMapPoint: (state, action) => {
      state.dataPoints.push(action.payload);
      if (state.dataPoints.length > 1000) {
        state.dataPoints.shift();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dataPoints = action.payload || [];
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addLiveMapPoint } = mapSlice.actions;
export default mapSlice.reducer;
