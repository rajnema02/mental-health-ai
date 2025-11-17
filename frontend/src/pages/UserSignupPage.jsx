import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

const UserSignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated, role, status, error } = useSelector(s => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role === 'user') navigate('/my-dashboard');
  }, [isAuthenticated, role, navigate]);

  const submit = (e) => { e.preventDefault(); dispatch(signupUser({ name, email, password })); };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-4">Create Account</h2>
        <form onSubmit={submit}>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded mb-2" required />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-2" required />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded mb-3" required />
          {status === 'loading' ? <Loader /> : <button className="w-full px-4 py-2 bg-blue-600 text-white rounded">Create Account</button>}
          {status === 'failed' && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default UserSignupPage;
