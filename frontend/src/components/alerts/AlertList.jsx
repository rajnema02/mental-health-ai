import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlerts, removeAlert } from '../../store/slices/alertsSlice';
import Loader from '../common/Loader';

const AlertList = () => {
  const dispatch = useDispatch();
  const { alerts, status } = useSelector(s => s.alerts);

  useEffect(() => {
    dispatch(fetchAlerts());
  }, [dispatch]);

  if (status === 'loading') return <Loader />;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Active Alerts</h3>
      <ul>
        {alerts.map(a => (
          <li key={a._id} className="flex justify-between items-center py-2 border-b">
            <div>{a.name}</div>
            <div>
              <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => dispatch(removeAlert(a._id))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertList;
