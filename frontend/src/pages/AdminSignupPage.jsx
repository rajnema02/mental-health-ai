import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupAdmin } from '../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';


const AdminSignupPage = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const dispatch = useDispatch();
const { isAuthenticated, role, status, error } = useSelector(s => s.auth);
const navigate = useNavigate();


useEffect(() => {
if (isAuthenticated && role === 'admin') navigate('/admin-dashboard');
}, [isAuthenticated, role, navigate]);


const submit = (e) => { e.preventDefault(); dispatch(signupAdmin({ name, email, password })); };


return (
<>
<style>{`
.signup-wrapper{ min-height:100vh; display:flex; justify-content:center; align-items:center; padding:20px; background:#0d1526; }
.signup-box{ background:#141f33; padding:24px; width:100%; max-width:420px; border-radius:12px; color:white; border:1px solid #1e3050; }
.signup-title{ font-size:1.4rem; margin-bottom:16px; text-align:center; }
.signup-input{ width:100%; padding:12px; margin-bottom:10px; border-radius:8px; border:1px solid #1e3050; background:#0f1a2e; color:white; }
.signup-btn{ width:100%; background:#1a73e8; padding:12px; border-radius:8px; color:white; font-weight:bold; margin-top:4px; }
`}</style>


<div className="signup-wrapper">
<div className="signup-box">
<h2 className="signup-title">Admin Signup</h2>
<form onSubmit={submit}>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="signup-input" required />
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="signup-input" required />
<input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="signup-input" required />


{status === 'loading' ? <Loader /> : <button className="signup-btn">Create Admin</button>}
{status === 'failed' && <div style={{color:'red', marginTop:'8px'}}>{error}</div>}
</form>
<div style={{marginTop:'12px', textAlign:'center'}}>
<Link to="/admin-login" className="login-link">Already have an admin account? Login</Link>
</div>
</div>
</div>
</>
);
};
export default AdminSignupPage;