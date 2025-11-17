// src/components/layout/AdminLayout.jsx
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <style>{`
        .admin-wrapper {
          display: flex;
          min-height: 100vh;
          background: #0d1526;
          color: white;
        }
        .admin-header {
          background: #141f33;
          padding: 14px;
          border-bottom: 1px solid #1e3050;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logout-btn {
          background: #e63946;
          padding: 6px 12px;
          border-radius: 8px;
          color: white;
        }
        .admin-main {
          padding: 18px;
        }
      `}</style>

      <div className="admin-wrapper">
        <Sidebar />

        <div style={{ flex: 1 }}>
          <header className="admin-header">
            <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Admin Dashboard
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span>{user?.name}</span>
              <button className="logout-btn" onClick={() => dispatch(logout())}>
                Logout
              </button>
            </div>
          </header>

          <main className="admin-main">{children}</main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
