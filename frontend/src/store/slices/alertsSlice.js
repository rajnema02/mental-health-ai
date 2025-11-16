import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAlerts, createAlert, deleteAlert } from "../../api/alertsApi";

export const fetchAlerts = createAsyncThunk(
  "alerts/fetchAlerts",
  async () => {
    return await getAlerts();  // token auto-attached by interceptor
  }
);

export const addAlert = createAsyncThunk(
  "alerts/addAlert",
  async (alertData) => {
    return await createAlert(alertData);  // token auto-attached
  }
);

export const removeAlert = createAsyncThunk(
  "alerts/removeAlert",
  async (id) => {
    await deleteAlert(id);  // token auto-attached
    return id;
  }
);

const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    alerts: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.alerts = action.payload;
      })
      .addCase(addAlert.fulfilled, (state, action) => {
        state.alerts.push(action.payload);
      })
      .addCase(removeAlert.fulfilled, (state, action) => {
        state.alerts = state.alerts.filter((a) => a._id !== action.payload);
      });
  },
});

export default alertsSlice.reducer;
