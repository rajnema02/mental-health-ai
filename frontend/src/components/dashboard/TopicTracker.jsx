import { useSelector } from "react-redux";

const TopicTracker = () => {
  const { topicStats } = useSelector((s) => s.stats);

  return (
    <div className="text-white" >
      <h3 className="font-bold mb-2 text-white">Top Stressors</h3>

      {topicStats.map((t) => (
        <div
          key={t._id}
          className="flex justify-between border-b border-[#1e3050] py-1 text-white"
        >
          <span className="text-white">{t._id}</span>
          <span className="font-bold text-white">{t.count}</span>
        </div>
      ))}
    </div>
  );
};

export default TopicTracker;
