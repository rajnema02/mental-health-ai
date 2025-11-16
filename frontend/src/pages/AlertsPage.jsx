import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlerts } from "../store/slices/alertsSlice";
import AdminLayout from "../components/layout/AdminLayout.jsx";
import AlertList from "../components/alerts/AlertList";
import AlertModal from "../components/alerts/AlertModal";
import { useState } from "react";

const AlertsPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchAlerts());
    }
  }, [token, dispatch]);  // <---- FIXED

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
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
    </AdminLayout>
  );
};

export default AlertsPage;
