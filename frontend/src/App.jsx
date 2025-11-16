import { Routes, Route } from "react-router-dom";

import AdminLoginPage from "./pages/AdminLoginPage";
import UserLoginPage from "./pages/UserLoginPage";
import UserSignupPage from "./pages/UserSignupPage";

import DashboardPage from "./pages/DashboardPage";
import AlertsPage from "./pages/AlertsPage";
import UserDashboardPage from "./pages/UserDashboardPage";

import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminSignupPage from "./pages/AdminSignupPage";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/" element={<UserLoginPage />} />
      <Route path="/user-signup" element={<UserSignupPage />} />
      <Route path="/admin-signup" element={<AdminSignupPage />} />

      {/* USER-PROTECTED ROUTE */} 
      <Route
        path="/my-dashboard"
        element={
          <ProtectedRoute>
            <UserDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* ADMIN-PROTECTED ROUTES */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <div className="flex">
              <Sidebar />
              <div className="flex-1 p-4">
                <DashboardPage />
              </div>
            </div>
          </AdminRoute>
        }
      />

      <Route
        path="/alerts"
        element={
          <AdminRoute>
            <div className="flex">
              <Sidebar />
              <div className="flex-1 p-4">
                <AlertsPage />
              </div>
            </div>
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center h-screen text-3xl">
            404 – Page Not Found
          </div>
        }
      />
    </Routes>
  );
}
