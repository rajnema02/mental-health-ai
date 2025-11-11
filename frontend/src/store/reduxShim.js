import React from 'react';

// Minimal fake state to avoid runtime errors after removing Redux usage.
// Keep the shape similar to the original slices so selectors that read
// common keys won't throw when called.
export const fakeState = {
  auth: { user: null, token: null, role: null, isAuthenticated: false, status: 'idle', error: null },
  alerts: { alerts: [], status: 'idle', error: null },
  map: { dataPoints: [], status: 'idle', error: null },
  stats: { topicStats: [], emotionStats: [], status: 'idle', error: null },
  userPosts: { posts: [], status: 'idle', error: null },
};

// Provider: pass-through component (no store needed)
export const Provider = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

// useSelector: run selector against fakeState
export const useSelector = (selector) => {
  if (typeof selector !== 'function') return selector;
  try {
    return selector(fakeState);
  } catch (err) {
    // return undefined rather than crash if selector expects more complex state
    return undefined;
  }
};

// Fake dispatch: supports thunks (functions) by calling them with (dispatch, getState)
const getState = () => fakeState;
const dispatchImpl = (action) => {
  if (typeof action === 'function') {
    try {
      // Some thunks return a promise; return that to the caller
      return action(dispatchImpl, getState);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  // ignore plain action objects (no reducers to handle them)
  return action;
};

export const useDispatch = () => dispatchImpl;

// Default export for convenience
export default {
  Provider,
  useSelector,
  useDispatch,
  fakeState,
};
