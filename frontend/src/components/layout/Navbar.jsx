import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";


const Navbar = () => {
const dispatch = useDispatch();
const { user, role, isAuthenticated } = useSelector((state) => state.auth);


return (
<>
<style>{`
.nav-bar{ background:#141f33; padding:16px; border-bottom:1px solid #1e3050; color:white; display:flex; justify-content:space-between; }
.logout-btn{ background:#e63946; padding:8px 14px; border-radius:8px; color:white; }
`}</style>


<header className="nav-bar">
<h1 style={{fontSize:'1.4rem'}}>Project Vesta</h1>


<div style={{display:'flex', alignItems:'center', gap:'12px'}}>
{isAuthenticated && <span>Hello, {user?.name || role}</span>}
<button onClick={() => dispatch(logout())} className="logout-btn">Logout</button>
</div>
</header>
</>
);
};
export default Navbar;