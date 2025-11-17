import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/common/Loader';


const AdminLoginPage = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const dispatch = useDispatch();
const { isAuthenticated, role, status, error } = useSelector(s => s.auth);
const navigate = useNavigate();


useEffect(() => {
if (isAuthenticated && role === 'admin') navigate('/admin-dashboard');
}, [isAuthenticated, role, navigate]);


const submit = (e) => { e.preventDefault(); dispatch(loginAdmin({ email, password })); };


return (
<>
<style>{`
.login-wrapper{
min-height:100vh; display:flex; justify-content:center; align-items:center; padding:20px;
background:#0d1526;
}
.login-box{
background:#141f33; padding:24px; width:100%; max-width:420px; border-radius:12px;
color:white; border:1px solid #1e3050;
}
.login-title{ font-size:1.4rem; margin-bottom:16px; text-align:center; }
.login-input{
width:100%; padding:12px; margin-bottom:10px; border-radius:8px;
border:1px solid #1e3050; background:#0f1a2e; color:white;
}
.login-btn{
width:100%; background:#1a73e8; padding:12px; border-radius:8px;
color:white; font-weight:bold; margin-top:4px;
}
.login-link{ color:#4ea8ff; text-decoration:underline; font-size:0.9rem; }
`}</style>


<div className="login-wrapper">
<div className="login-box">
<h2 className="login-title">Admin Login</h2>
<form onSubmit={submit}>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="login-input" required />
<input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="login-input" required />


{status === 'loading' ? <Loader /> : <button className="login-btn">Login</button>}
{status === 'failed' && <div style={{color:'red', marginTop:'8px'}}>{error}</div>}
</form>


<div style={{marginTop:'12px', textAlign:'center'}}>
<Link to="/admin-signup" className="login-link">Create admin account</Link>
</div>
</div>
</div>
</>
);
};
export default AdminLoginPage;