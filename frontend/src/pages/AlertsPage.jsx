import AdminLayout from '../components/layout/AdminLayout.jsx';
import AlertList from '../components/alerts/AlertList';
import AlertModal from '../components/alerts/AlertModal';
import { useState } from 'react';


const AlertsPage = () => {
const [open, setOpen] = useState(false);


return (
<AdminLayout>
<>
<style>{`
.alerts-header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.alerts-title{ font-size:1.6rem; font-weight:600; color:white; }
.alerts-btn{ background:#00b894; padding:8px 14px; border-radius:8px; color:white; font-weight:bold; }
`}</style>


<div className="alerts-header">
<h2 className="alerts-title">Manage Alerts</h2>
<button className="alerts-btn" onClick={() => setOpen(true)}>Create Alert</button>
</div>


<AlertList />
{open && <AlertModal closeModal={() => setOpen(false)} />}
</>
</AdminLayout>
);
};


export default AlertsPage;