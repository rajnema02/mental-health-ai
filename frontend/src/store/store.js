// frontend/src/store/store.js
import { configureStore } from '@reduxjs/toolkit';

// NOTE: these reducer imports expect each slice file to `export default reducer`.
// We'll create those slice files next (authSlice, alertsSlice, mapSlice, statsSlice, userPostSlice).
import authReducer from './slices/authSlice';
import alertsReducer from './slices/alertsSlice';
import mapReducer from './slices/mapSlice';
import statsReducer from './slices/statsSlice';
import userPostReducer from './slices/userPostSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alerts: alertsReducer,
    map: mapReducer,
    stats: statsReducer,
    userPosts: userPostReducer,
  },

  // Keep serializableCheck disabled only if you need to store non-serializable values
  // (tokens, sockets, etc.). If you can keep everything serializable, remove this.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
