import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((s) => s.auth);
  if (!isAuthenticated || role !== 'admin') return <Navigate to="/admin-login" replace />;
  return children;
};

export default AdminRoute;
