import { useDispatch as reduxUseDispatch, useSelector as reduxUseSelector } from "../store/reduxShim";

// Custom wrappers that log when Redux-like hooks are called
export const useDispatch = () => {
  const dispatch = reduxUseDispatch();
  console.log("🟢 useDispatch called from:", getCallerFile());
  return dispatch;
};

export const useSelector = (selector) => {
  console.log("🟢 useSelector called from:", getCallerFile());
  return reduxUseSelector(selector);
};

// Helper to find which component invoked it
function getCallerFile() {
  const err = new Error();
  const stack = (err.stack || '').split("\n");
  // Stack[3] usually contains the component name or file
  return stack[3]?.trim() || "Unknown";
}
