import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../utils/reduxDebugger';
import { fetchMyPosts } from '../../store/slices/userPostSlice';
import Loader from '../common/Loader';

// Helper to format the date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

// Helper for styling risk
const getRiskBadge = (risk_level) => {
  switch (risk_level) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

const PostHistoryList = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.userPosts);

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

  if (status === 'loading' && posts.length === 0) {
    return <Loader />;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Private History</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">You haven't analyzed any posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border-b pb-4 last:border-b-0">
              <p className="text-xs text-gray-500 mb-1">{formatDate(post.createdAt)}</p>
              <div className="flex space-x-4">
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="text-gray-700 mb-2">"{post.caption}"</p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskBadge(
                        post.analysis.risk_level
                      )}`}
                    >
                      {post.analysis.risk_level} risk
                    </span>
                    <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full capitalize">
                      {post.analysis.emotion}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full capitalize">
                      {post.analysis.topic.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostHistoryList;