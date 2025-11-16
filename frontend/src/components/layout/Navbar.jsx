import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  // Get user info from Redux store
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Project Vesta</h1>

      <div className="flex items-center gap-4">
        {/* Show logged in user */}
        {isAuthenticated && (
          <span className="text-gray-700 font-semibold">
            {user?.name ? `Hello, ${user.name}` : role === "admin" ? "Admin" : "User"}
          </span>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
