import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminSignupPage from './pages/AdminSignupPage';
import UserLoginPage from './pages/UserLoginPage';
import UserSignupPage from './pages/UserSignupPage';
import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminRoute from './routes/AdminRoute';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/admin-signup" element={<AdminSignupPage />} />
      <Route path="/login" element={<UserLoginPage />} />
      <Route path="/signup" element={<UserSignupPage />} />
      <Route path="/my-dashboard" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
      <Route path="/admin-dashboard" element={<AdminRoute><DashboardPage /></AdminRoute>} />
      <Route path="/alerts" element={<AdminRoute><AlertsPage /></AdminRoute>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<div className="p-8">404 - Not Found</div>} />
    </Routes>
  );
}
