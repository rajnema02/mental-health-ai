// src/store/slices/mapSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInitialLoad } from "../../api/statsApi";

export const fetchInitialMapData = createAsyncThunk(
  "map/fetchInitialMapData",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const res = await getInitialLoad(token);
    return res.mapData; // backend returns {mapData, stats}
  }
);

const mapSlice = createSlice({
  name: "map",
  initialState: {
    dataPoints: [],
    status: "idle",
  },
  reducers: {
    // 🔥 NEW: add socket live point
    addLiveMapPoint: (state, action) => {
      state.dataPoints.unshift(action.payload); // add at beginning

      // keep max 500 points
      if (state.dataPoints.length > 500) {
        state.dataPoints.pop();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialMapData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInitialMapData.fulfilled, (state, action) => {
        state.status = "success";
        console.log("🌍 Initial map data:", action.payload);
        state.dataPoints = action.payload || [];
      })
      .addCase(fetchInitialMapData.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { addLiveMapPoint } = mapSlice.actions;
export default mapSlice.reducer;
