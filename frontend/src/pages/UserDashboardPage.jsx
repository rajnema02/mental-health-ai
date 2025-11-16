import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserLayout from "../components/layout/UserLayout";
import PostUploadForm from "../components/user_dashboard/PostUploadForm";
import PostHistoryList from "../components/user_dashboard/PostHistoryList";

import { fetchMyPosts } from "../store/slices/userPostSlice";

const UserDashboardPage = () => {
  const dispatch = useDispatch();

  // Get user and posts from Redux
  const { user } = useSelector((state) => state.auth);
  const { posts, status } = useSelector((state) => state.userPosts);

  // Load user post history on component mount
  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-4">

        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.name}!
        </h1>

        <p className="mb-6 text-gray-600">
          Analyze your mental health privately. Upload an image and a caption to get
          AI-powered analysis. Your data stays 100% confidential.
        </p>

        {/* Upload Form */}
        <PostUploadForm />

        {/* Loading Indicator */}
        {status === "loading" && (
          <p className="text-center text-gray-500 mt-4">Loading your analysis history...</p>
        )}

        {/* Post History */}
        <PostHistoryList posts={posts} />
      </div>
    </UserLayout>
  );
};

export default UserDashboardPage;
