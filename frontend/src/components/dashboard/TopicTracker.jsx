import { useSelector } from 'react-redux';
import Loader from '../common/Loader';

const TopicTracker = () => {
  const { topicStats, status } = useSelector((s) => s.stats);

  if (status === 'loading') return <div className="p-4"><Loader /></div>;

  return (
    <div>
      <h3 className="font-semibold mb-2">Top Stressors</h3>
      <ul>
        {topicStats.map((t) => (
          <li key={t._id} className="flex justify-between">
            <span className="capitalize">{t._id.replace('_',' ')}</span>
            <span className="font-bold">{t.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicTracker;
