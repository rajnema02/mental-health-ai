import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, isAuthenticated, role } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("official@demo.com");
  const [password, setPassword] = useState("Official@123");

  // Redirect admin after successful login
  if (isAuthenticated && role === "admin") {
    navigate("/admin-dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    dispatch(loginAdmin({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
            disabled={status === "loading"}
          >
            {status === "loading" ? <Loader /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
