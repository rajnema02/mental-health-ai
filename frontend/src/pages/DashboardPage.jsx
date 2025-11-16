import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchInitialData } from "../store/slices/mapSlice";
import { fetchDashboardStats } from "../store/slices/statsSlice";

import LiveHeatMap from "../components/dashboard/LiveHeatMap";
import StatsChart from "../components/dashboard/StatsChart";
import TopicTracker from "../components/dashboard/TopicTracker";
import Loader from "../components/common/Loader";

import AdminLayout from "../components/layout/AdminLayout.jsx";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { status: mapStatus } = useSelector((state) => state.map);
  const { loading: statsLoading } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchInitialData());
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const isLoading = mapStatus === "loading" || statsLoading;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.name}!
      </h1>

      <p className="mb-6 text-gray-600">
        Monitor public mental health trends, alerts, and live community stress data.
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="h-[600px] lg:col-span-2">
            <LiveHeatMap />
          </div>

          <div className="space-y-4 h-[600px] flex flex-col">
            <div className="flex-1 p-4 bg-white rounded shadow">
              <TopicTracker />
            </div>
            <div className="flex-1 p-4 bg-white rounded shadow">
              <StatsChart />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DashboardPage;
