import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupAdmin } from "../store/slices/authSlice";
import Loader from "../components/common/Loader";

const AdminSignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, role, status, error } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 Redirect admin after successful signup
  useEffect(() => {
    if (isAuthenticated && role === "admin") {
      navigate("/admin-dashboard");   // CORRECT
    }
  }, [isAuthenticated, role, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupAdmin({ name, email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Admin Signup</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email (Admin)</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md"
            disabled={status === "loading"}
          >
            {status === "loading" ? <Loader /> : "Create Admin Account"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already an admin?{" "}
          <Link to="/admin-login" className="font-medium text-blue-600">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignupPage;
