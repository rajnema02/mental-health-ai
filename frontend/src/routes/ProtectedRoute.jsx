import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated || role !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
