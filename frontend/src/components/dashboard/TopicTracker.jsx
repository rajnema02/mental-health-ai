import { useSelector } from '../../store/reduxShim';
import Loader from '../common/Loader';

const TopicTracker = () => {
  const { topicStats, status } = useSelector((state) => state.stats);

  return (
    <div className="h-full">
      <h3 className="font-bold text-center mb-2">Top 5 Stressors (Today)</h3>
      {status === 'loading' ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <ul className="space-y-2">
          {topicStats.map((topic, index) => (
            <li key={index} className="flex justify-between items-center text-sm">
              <span className="font-semibold capitalize">{topic._id.replace('_', ' ')}</span>
              <span className="font-bold text-blue-600">{topic.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopicTracker;