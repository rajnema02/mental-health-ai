import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <header className="flex items-center justify-between p-4 bg-white shadow">
          <div className="text-lg font-semibold">Admin Dashboard</div>
          <div className="flex items-center gap-4">
            <div>{user?.name}</div>
            <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => dispatch(logout())}>Logout</button>
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
