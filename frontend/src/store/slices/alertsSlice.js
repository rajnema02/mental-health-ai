import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAlerts, createAlert, deleteAlert } from "../../api/alertsApi";

export const fetchAlerts = createAsyncThunk(
  "alerts/fetchAlerts",
  async (_, thunkAPI) => {
    try {
      return await getAlerts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addAlert = createAsyncThunk(
  "alerts/addAlert",
  async (alertData, thunkAPI) => {
    try {
      return await createAlert(alertData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeAlert = createAsyncThunk(
  "alerts/removeAlert",
  async (id, thunkAPI) => {
    try {
      await deleteAlert(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    alerts: [],
    status: "idle",
    error: null,
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
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
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
