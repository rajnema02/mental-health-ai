import { useSelector } from '../store/reduxShim';
import UserLayout from '../components/layout/UserLayout';
import PostUploadForm from '../components/user_dashboard/PostUploadForm';
import PostHistoryList from '../components/user_dashboard/PostHistoryList';

const UserDashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.name}!
        </h1>
        <p className="mb-6 text-gray-600">
          Analyze your mental health privately. Upload an image and a caption to
          get an instant AI-powered analysis. Your data is 100% confidential.
        </p>
        <PostUploadForm />
        <PostHistoryList />
      </div>
    </UserLayout>
  );
};

export default UserDashboardPage;