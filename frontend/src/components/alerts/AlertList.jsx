import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlerts, removeAlert } from "../../store/slices/alertsSlice";

const AlertList = () => {
  const dispatch = useDispatch();
  const { alerts, status } = useSelector((state) => state.alerts);

  useEffect(() => {
    dispatch(fetchAlerts());   // ✔ correct
  }, [dispatch]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Your Active Alerts</h2>

      {status === "loading" && <p>Loading...</p>}

      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li key={alert._id} className="flex justify-between p-2 border">
            <span>{alert.name}</span>
            <button
              onClick={() => dispatch(removeAlert(alert._id))}
              className="px-3 py-1 text-white bg-red-600 rounded"
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
