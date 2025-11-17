import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts } from '../../store/slices/userPostSlice';
import Loader from '../common/Loader';

const formatDate = (d) => new Date(d).toLocaleString();

const PostHistoryList = ({ posts: incoming }) => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector(s => s.userPosts);

  useEffect(() => { dispatch(fetchMyPosts()); }, [dispatch]);

  const list = incoming || posts;

  if (status === 'loading' && list.length === 0) return <Loader />;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Your History</h3>
      {list.length === 0 ? <div>No posts yet.</div> : (
        <ul>
          {list.map(p => (
            <li key={p._id} className="border-b py-2">
              <div className="text-xs text-gray-500">{formatDate(p.createdAt)}</div>
              <div className="mt-1">"{p.caption}"</div>
              <div className="text-sm text-gray-600 mt-1">
                Emotion: {p.ai_result?.emotion || 'N/A'} · Risk: {p.ai_result?.risk_level || 'N/A'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostHistoryList;
