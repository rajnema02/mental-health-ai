// src/components/dashboard/TopicTracker.jsx
import { useSelector } from 'react-redux';
import Loader from '../common/Loader';

const TopicTracker = () => {
  // statsSlice uses `loading` boolean
  const { topicStats = [], loading } = useSelector((state) => state.stats || {});

  return (
    <div className="h-full">
      <h3 className="font-bold text-center mb-2">Top 5 Stressors (Today)</h3>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <ul className="space-y-2">
          {(!Array.isArray(topicStats) || topicStats.length === 0) ? (
            <p className="text-gray-500 text-center text-sm">No topic data available.</p>
          ) : (
            topicStats.map((topic, index) => (
              <li key={index} className="flex justify-between items-center text-sm">
                <span className="font-semibold capitalize">
                  {(topic._id || '').toString().replace('_', ' ')}
                </span>
                <span className="font-bold text-blue-600">{topic.count ?? 0}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default TopicTracker;
