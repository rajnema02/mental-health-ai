import AdminLayout from '../components/layout/AdminLayout.jsx';
import AlertList from '../components/alerts/AlertList';
import AlertModal from '../components/alerts/AlertModal';
import { useState } from 'react';

const AlertsPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Manage Alerts</h2>
        <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => setOpen(true)}>Create Alert</button>
      </div>

      <AlertList />
      {open && <AlertModal closeModal={() => setOpen(false)} />}
    </AdminLayout>
  );
};

export default AlertsPage;
