import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "userLocation",
  initialState: {
    coords: null,
  },
  reducers: {
    updateLocation: (state, action) => {
      state.coords = action.payload;
    },
  },
});

export const { updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
