import { useState } from 'react';
import AlertList from '../components/alerts/AlertList';
import AlertModal from '../components/alerts/AlertModal';

const AlertsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Alerts</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Create New Alert
        </button>
      </div>

      <AlertList />

      {isModalOpen && <AlertModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AlertsPage;