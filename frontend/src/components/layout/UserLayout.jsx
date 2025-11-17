// src/components/layout/UserLayout.jsx
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const UserLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <style>{`
        .user-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: #0d1526;
          color: white;
        }
        .user-header {
          background: #141f33;
          padding: 14px 20px;
          border-bottom: 1px solid #1e3050;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logout-btn {
          background: #e63946;
          padding: 6px 12px;
          border-radius: 6px;
          color: white;
          font-size: 0.9rem;
        }
        .user-main {
          padding: 20px;
        }
      `}</style>

      <div className="user-wrapper">
        <header className="user-header">
          <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
            User Dashboard
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span>{user?.name}</span>
            <button className="logout-btn" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </div>
        </header>

        <main className="user-main">{children}</main>
      </div>
    </>
  );
};

export default UserLayout;
