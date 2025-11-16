// src/pages/DashboardPage.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Use mapSlice for initial map load, statsSlice for charts
import { fetchInitialData } from '../store/slices/mapSlice';
import { fetchDashboardStats } from '../store/slices/statsSlice';

import { useSocket } from '../hooks/useSocket';

import LiveHeatMap from '../components/dashboard/LiveHeatMap';
import StatsChart from '../components/dashboard/StatsChart';
import TopicTracker from '../components/dashboard/TopicTracker';

const DashboardPage = () => {
  const dispatch = useDispatch();

  // Connect to Socket.IO server (socket will dispatch live points)
  useSocket();

  useEffect(() => {
    // Load Map Data + Dashboard Stats (make sure auth token is present)
    dispatch(fetchInitialData());
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">Public Health Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main Live Heatmap (2/3 width) */}
        <div className="h-[600px] lg:col-span-2">
          <LiveHeatMap />
        </div>

        {/* Sidebar Stats (1/3 width) */}
        <div className="space-y-4 h-[600px] flex flex-col">
          <div className="flex-1 p-4 bg-white rounded shadow">
            <TopicTracker />
          </div>
          <div className="flex-1 p-4 bg-white rounded shadow">
            <StatsChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
