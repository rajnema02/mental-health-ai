// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <style>{`
        .side-bar {
          width: 240px;
          background: #0f1a2e;
          padding: 20px;
          border-right: 1px solid #1e3050;
          min-height: 100vh;
        }
        .side-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: white;
        }
        .side-link {
          display: block;
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 6px;
          color: #d1d5db;
          text-decoration: none;
        }
        .side-link-active {
          background: #1a2744;
          color: white;
        }
      `}</style>

      <aside className="side-bar">
        <div className="side-title">Admin Panel</div>

        <nav>
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              isActive ? "side-link side-link-active" : "side-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/alerts"
            className={({ isActive }) =>
              isActive ? "side-link side-link-active" : "side-link"
            }
          >
            Alerts
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
