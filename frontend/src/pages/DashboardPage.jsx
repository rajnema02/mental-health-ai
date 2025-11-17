import AdminLayout from '../components/layout/AdminLayout.jsx';
import LiveHeatMap from '../components/dashboard/LiveHeatMap';
import TopicTracker from '../components/dashboard/TopicTracker';
import StatsChart from '../components/dashboard/StatsChart';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInitialMapData } from '../store/slices/mapSlice.js';
import { fetchDashboardStats } from '../store/slices/statsSlice';
import { useSocket } from '../hooks/useSocket';

const DashboardPage = () => {
  const dispatch = useDispatch();
  useSocket();

  useEffect(() => {
    dispatch(fetchInitialMapData());
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-[600px] bg-white rounded shadow p-2"><LiveHeatMap /></div>
        <div className="space-y-4">
          <div className="bg-white rounded shadow p-4 h-[290px]"><TopicTracker /></div>
          <div className="bg-white rounded shadow p-4 h-[290px]"><StatsChart /></div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
