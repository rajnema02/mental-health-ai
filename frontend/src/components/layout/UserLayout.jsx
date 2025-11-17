import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const UserLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="font-bold">My Wellness Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name}</span>
          <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => dispatch(logout())}>Logout</button>
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default UserLayout;
