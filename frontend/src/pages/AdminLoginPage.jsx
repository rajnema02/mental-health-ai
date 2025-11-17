import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/common/Loader';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('official@demo.com');
  const [password, setPassword] = useState('Official@123');
  const dispatch = useDispatch();
  const { isAuthenticated, role, status, error } = useSelector(s => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role === 'admin') navigate('/admin-dashboard');
  }, [isAuthenticated, role, navigate]);

  const submit = (e) => { e.preventDefault(); dispatch(loginAdmin({ email, password })); };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <form onSubmit={submit}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-2" required />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded mb-3" required />
          {status === 'loading' ? <Loader /> : <button className="w-full px-4 py-2 bg-blue-600 text-white rounded">Login</button>}
          {status === 'failed' && <div className="text-red-500 mt-2">{error}</div>}
        </form>
        <div className="mt-3 text-sm">
          <Link to="/admin-signup" className="text-blue-600">Create admin account</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
