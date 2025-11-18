import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInitialLoad } from "../../api/statsApi";

export const fetchInitialMapData = createAsyncThunk(
  "map/fetchInitialMapData",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const res = await getInitialLoad(token);
    return res.mapData;   // IMPORTANT
  }
);

const mapSlice = createSlice({
  name: "map",
  initialState: {
    dataPoints: [],
    status: "idle"
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialMapData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInitialMapData.fulfilled, (state, action) => {
        state.status = "success";
        console.log("🌍 REDUX MAP DATA:", action.payload);
        state.dataPoints = action.payload || [];
      })
      .addCase(fetchInitialMapData.rejected, (state) => {
        state.status = "error";
      })
     
  }
});

export default mapSlice.reducer;
