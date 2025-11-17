import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInitialLoad } from "../../api/statsApi";

// ----------------------------------------------------
// Initial State
// ----------------------------------------------------
const initialState = {
  dataPoints: [],
  status: "idle",
  error: null,
};

// ----------------------------------------------------
// Thunk: Load Initial Map Points
// ----------------------------------------------------
export const fetchInitialMapData = createAsyncThunk(
  "map/fetchInitialMapData",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await getInitialLoad(token); // backend returns array
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
const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addLiveMapPoint: (state, action) => {
      state.dataPoints.push(action.payload);

      if (state.dataPoints.length > 1500) {
        state.dataPoints.shift();
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialMapData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInitialMapData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataPoints = action.payload;
      })
      .addCase(fetchInitialMapData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addLiveMapPoint } = mapSlice.actions;
export default mapSlice.reducer;
