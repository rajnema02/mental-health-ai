import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAlerts, createAlert, deleteAlert } from '../../api/alertsApi';

const initialState = { alerts: [], status: 'idle', error: null };

// ✅ Fetch all alerts
export const fetchAlerts = createAsyncThunk(
  'alerts/fetchAlerts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) throw new Error('Missing authentication token');
      return await getAlerts(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Add new alert
export const addAlert = createAsyncThunk(
  'alerts/addAlert',
  async (alertData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) throw new Error('Missing authentication token');
      return await createAlert(alertData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Delete alert
export const removeAlert = createAsyncThunk(
  'alerts/removeAlert',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) throw new Error('Missing authentication token');
      await deleteAlert(id, token);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.alerts = action.payload || [];
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addAlert.fulfilled, (state, action) => {
        state.alerts.push(action.payload);
      })
      .addCase(addAlert.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeAlert.fulfilled, (state, action) => {
        state.alerts = state.alerts.filter((a) => a._id !== action.payload);
      })
      .addCase(removeAlert.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default alertsSlice.reducer;
