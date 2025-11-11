import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from './store/reduxShim';

// Layouts
import AdminLayout from './components/layout/AdminLayout.jsx';

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage'; // Renamed for clarity
import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';

// Public User Pages
import UserLoginPage from './pages/UserLoginPage';
import UserSignupPage from './pages/UserSignupPage';
import UserDashboardPage from './pages/UserDashboardPage';

// This component protects Admin routes
const AdminProtectedRoute = () => {
  const data = useSelector((state) => state.auth);
  console.log(data,"data appjsx")
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  return isAuthenticated && role === 'admin' ? (
    <AdminLayout />
  ) : (
    <Navigate to="/login" replace />
  );
};

// This component protects User routes
const UserProtectedRoute = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  return isAuthenticated && role === 'user' ? (
    <Outlet /> // Renders child routes (e.g., UserDashboardPage)
  ) : (
    <Navigate to="/user/login" replace />
  );
};

function App() {
  // const { isAuthenticated, role } = useSelector((state) => state.auth);
  const isAuthenticated = false;
  const role = "user";

  return (
    <Routes>
      {/* Public Routes (for anyone) */}
      <Route
        path="/login"
        element={
          isAuthenticated && role === 'admin' ? (
            <Navigate to="/" />
          ) : (
            <AdminLoginPage />
          )
        }
      />
      <Route
        path="/user/login"
        element={
          isAuthenticated && role === 'user' ? (
            <Navigate to="/my-dashboard" />
          ) : (
            <UserLoginPage />
          )
        }
      />
      <Route
        path="/user/signup"
        element={
          isAuthenticated && role === 'user' ? (
            <Navigate to="/my-dashboard" />
          ) : (
            <UserSignupPage />
          )
        }
      />

      {/* Admin Protected Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
      </Route>

      {/* User Protected Routes */}
      <Route element={<UserProtectedRoute />}>
        <Route path="/my-dashboard" element={<UserDashboardPage />} />
      </Route>

      {/* Fallback route */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated && role === 'admin' ? '/' : '/user/login'} />}
      />
    </Routes>
  );
}

export default App;