// src/pages/DashboardPage.jsx
import AdminLayout from "../components/layout/AdminLayout.jsx";
import LiveHeatMap from "../components/dashboard/LiveHeatMap";
import TopicTracker from "../components/dashboard/TopicTracker";
import StatsChart from "../components/dashboard/StatsChart";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchInitialMapData } from "../store/slices/mapSlice.js";
import { fetchDashboardStats } from "../store/slices/statsSlice";
import { useSocket } from "../hooks/useSocket";

const DashboardPage = () => {
  const dispatch = useDispatch();

  // Socket connection
  useSocket();

  useEffect(() => {
    dispatch(fetchInitialMapData());
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <AdminLayout>
      <>
        <style>{`
          .grid-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
          }
          @media(min-width:1024px){
            .grid-container {
              grid-template-columns: 2fr 1fr;
            }
          }
          .panel-box {
            background: #141f33;
            border: 1px solid #1e3050;
            border-radius: 12px;
            padding: 12px;
            height: 100%;
          }
        `}</style>

        <div className="grid-container">
          {/* Main Map */}
          <div className="panel-box" style={{ height: "600px" }}>
            <LiveHeatMap />
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-4">
            <div className="panel-box" style={{ height: "290px" }}>
              <TopicTracker />
            </div>

            <div className="panel-box" style={{ height: "290px" }}>
              <StatsChart />
            </div>
          </div>
        </div>
      </>
    </AdminLayout>
  );
};

export default DashboardPage;
