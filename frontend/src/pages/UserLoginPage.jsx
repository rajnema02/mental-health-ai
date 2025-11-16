import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../store/slices/authSlice";
import Loader from "../components/common/Loader";

const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, role, status, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && role === "user") {
      navigate("/my-dashboard", { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">User Login</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {status === "failed" && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {status === "loading" ? <Loader /> : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          New here?{" "}
          <Link
            to="/user-signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Create an account
          </Link>
        </p>

        <p className="text-sm text-center text-gray-400">
          <Link
            to="/admin-login"
            className="font-medium text-gray-500 hover:underline"
          >
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLoginPage;
