import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import api from "../api/api";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, role, token } = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!token || role !== "admin") {
        setValid(false);
        setChecking(false);
        return;
      }

      try {
        // 🔒 BACKEND TOKEN VERIFICATION
        await api.get("/api/admin/validate", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setValid(true);
      } catch (err) {
        console.log("Token invalid:", err);
        setValid(false);
      }

      setChecking(false);
    };

    verifyAdmin();
  }, [token, role]);

  if (checking) return <div className="p-10 text-center">Checking Auth...</div>;

  if (!isAuthenticated || !valid || role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminRoute;
