import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';


const UserLoginPage = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const dispatch = useDispatch();
const { isAuthenticated, role, status, error } = useSelector(s => s.auth);
const navigate = useNavigate();


useEffect(() => { if(isAuthenticated && role==='user') navigate('/my-dashboard'); }, [isAuthenticated, role, navigate]);


const submit = e => { e.preventDefault(); dispatch(loginUser({ email, password })); };


return (
<>
<style>{`
.auth-wrapper{ min-height:100vh; display:flex; justify-content:center; align-items:center; padding:20px; background:#0d1526; }
.auth-box{ background:#141f33; padding:22px; border-radius:12px; width:100%; max-width:420px; border:1px solid #1e3050; color:white; }
.auth-input{ width:100%; padding:12px; border-radius:8px; background:#0f1a2e; border:1px solid #1e3050; margin-bottom:10px; color:white; }
.auth-btn{ width:100%; background:#1a73e8; padding:12px; border-radius:8px; color:white; font-weight:bold; }
`}</style>


<div className="auth-wrapper">
<div className="auth-box">
<h2 style={{fontSize:'1.4rem', marginBottom:'14px'}}>User Login</h2>
<form onSubmit={submit}>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="auth-input" required />
<input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="auth-input" required />


{status==='loading' ? <Loader /> : <button className="auth-btn">Login</button>}
{status==='failed' && <div style={{color:'red'}}>{error}</div>}
</form>
<div style={{marginTop:'12px'}}>
<Link to="/signup" style={{color:'#4ea8ff'}}>Create account</Link>
</div>
</div>
</div>
</>
);
};
export default UserLoginPage;