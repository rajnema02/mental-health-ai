import UserLayout from '../components/layout/UserLayout';
import PostUploadForm from '../components/user_dashboard/PostUploadForm';
import PostHistoryList from '../components/user_dashboard/PostHistoryList';
import { useDispatch } from 'react-redux';
import { fetchMyPosts } from '../store/slices/userPostSlice';
import { useEffect } from 'react';

const UserDashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(fetchMyPosts()); }, [dispatch]);

  return (
    <UserLayout>
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="mb-4 text-gray-600">Upload a caption and (optional) image to get private analysis.</p>
        <PostUploadForm />
        <PostHistoryList />
      </div>
    </UserLayout>
  );
};

export default UserDashboardPage;
