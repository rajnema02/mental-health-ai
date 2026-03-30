import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import alertsReducer from './slices/alertsSlice';
import mapReducer from './slices/mapSlice';
import statsReducer from './slices/statsSlice';
import userPostReducer from './slices/userPostSlice';
import userlocationReducer from './slices/userLocationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    alerts: alertsReducer,
    map: mapReducer,
    stats: statsReducer,
    userPosts: userPostReducer,
    userLocation: userlocationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // for socket + map data
    }),
});

export default store;
