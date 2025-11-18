import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AdminLayout from "../components/layout/AdminLayout.jsx";
import LiveHeatMap from "../components/dashboard/LiveHeatMap";
import TopicTracker from "../components/dashboard/TopicTracker";
import StatsChart from "../components/dashboard/StatsChart";

import { fetchInitialMapData } from "../store/slices/mapSlice";
import { fetchDashboardStats } from "../store/slices/statsSlice";
import { useSocket } from "../hooks/useSocket";

const DashboardPage = () => {
  const dispatch = useDispatch();

  // Live updates
  useSocket();

  useEffect(() => {
    dispatch(fetchInitialMapData());
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <AdminLayout>
      <style>{`
        .grid-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media(min-width: 1024px) {
          .grid-container {
            grid-template-columns: 2fr 1fr;
          }
        }

        .right-box {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .panel-dark {
          background: #141f33;
          border-radius: 12px;
          border: 1px solid #1e3050;
          padding: 12px;
        }
      `}</style>

      <div className="grid-container">
        
        {/* MAP — no dark background, no overlay */}
        <div style={{ height: "600px", padding: 0 }}>
          <LiveHeatMap />
        </div>

        {/* RIGHT SECTION */}
        <div className="right-box">
          <div className="panel-dark" style={{ height: "290px" }}>
            <TopicTracker />
          </div>

          <div className="panel-dark" style={{ height: "290px" }}>
            <StatsChart />
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
