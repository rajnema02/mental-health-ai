// src/pages/UserDashboardPage.jsx
import UserLayout from "../components/layout/UserLayout";
import PostUploadForm from "../components/user_dashboard/PostUploadForm";
import PostHistoryList from "../components/user_dashboard/PostHistoryList";

import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts } from "../store/slices/userPostSlice";
import { useEffect } from "react";

const UserDashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

  return (
    <UserLayout>
      <>
        <style>{`
          .user-section {
            background: #141f33;
            border: 1px solid #1e3050;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            color: white;
          }
          .user-title {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 8px;
          }
          .user-subtext {
            color: #9ca3af;
            margin-bottom: 18px;
          }
        `}</style>

        <div className="user-section">
          <h1 className="user-title">Welcome, {user?.name}!</h1>
          <p className="user-subtext">
            Upload a caption and image to get a private AI analysis.  
            Your data is always confidential.
          </p>

          <PostUploadForm />
        </div>

        <div className="user-section">
          <PostHistoryList />
        </div>
      </>
    </UserLayout>
  );
};

export default UserDashboardPage;
