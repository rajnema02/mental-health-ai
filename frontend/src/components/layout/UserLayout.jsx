import { useDispatch, useSelector } from '../../utils/reduxDebugger';
import { logout } from '../../store/slices/authSlice';

const UserLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-600">My Wellness Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Hello, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default UserLayout;