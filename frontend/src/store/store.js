// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import mapReducer from './slices/mapSlice';
// import statsReducer from './slices/statsSlice';
// import alertsReducer from './slices/alertsSlice';
import userPostReducer from './slices/userPostSlice';

// // Combine reducers
// const appReducer = combineReducers({
//   auth: authReducer,
//   map: mapReducer,
//   stats: statsReducer,
//   alerts: alertsReducer,
//   userPosts: userPostReducer,
// });

// // Safe root reducer that logs invalid actions instead of crashing
// const safeReducer = (state, action) => {
//   if (!action || !action.type) {
//     console.error("🚨 Undefined or invalid action detected:", action);
//     return state; // prevent crash
//   }
//   return appReducer(state, action);
// };

// // Debug middleware
// const debugMiddleware = () => (next) => (action) => {
//   if (!action || !action.type) {
//     console.error("⚠️ Invalid Redux Action Dispatched:", action);
//   } else {
//     console.log("✅ Redux Action Dispatched:", action.type);
//   }
//   return next(action);
// };

// export const store = configureStore({
//   reducer: safeReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }).concat(debugMiddleware),
// });

// console.log("🟢 Redux store created:", store);


// Redux store creation removed — project uses a runtime shim instead.
// Keep a harmless stub export so other modules that import `store` won't crash.
export const store = {
  // legacy API surface (no-ops)
  dispatch: () => {},
  getState: () => ({}),
  subscribe: () => () => {},
};