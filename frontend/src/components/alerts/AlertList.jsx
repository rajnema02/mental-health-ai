import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../utils/reduxDebugger';



import { fetchAlerts, removeAlert } from '../../store/slices/alertsSlice';

const AlertList = () => {
  const dispatch = useDispatch();
  const { alerts, status } = useSelector((state) => state.alerts);

  useEffect(() => {
    dispatch(fetchAlerts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeAlert(id));
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Your Active Alerts</h2>
      {status === 'loading' && <p>Loading alerts...</p>}
      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li
            key={alert._id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <span className="font-semibold">{alert.name}</span>
            <button
              onClick={() => handleDelete(alert._id)}
              className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertList;