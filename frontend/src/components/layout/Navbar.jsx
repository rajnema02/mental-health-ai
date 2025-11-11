import { useDispatch } from '../../store/reduxShim';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Project Vesta</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;