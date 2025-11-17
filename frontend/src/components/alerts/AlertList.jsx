import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlerts, removeAlert } from '../../store/slices/alertsSlice';
import Loader from '../common/Loader';


const AlertList = () => {
const dispatch = useDispatch();
const { alerts, status } = useSelector(s => s.alerts);


useEffect(() => { dispatch(fetchAlerts()); }, [dispatch]);


if (status === 'loading') return <Loader />;


return (
<>
<style>{`
.alert-box { background:#141f33; padding:16px; border-radius:10px; color:white; }
.alert-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #1e3050; }
.alert-delete { background:#e63946; padding:5px 12px; border-radius:6px; color:white; }
@media(max-width:600px){ .alert-row{ flex-direction:column; gap:8px; } }
`}</style>


<div className="alert-box">
<h3>Active Alerts</h3>
<ul>
{alerts.map(a => (
<li key={a._id} className="alert-row">
<div>{a.name}</div>
<button className="alert-delete" onClick={() => dispatch(removeAlert(a._id))}>Delete</button>
</li>
))}
</ul>
</div>
</>
);
};


export default AlertList;