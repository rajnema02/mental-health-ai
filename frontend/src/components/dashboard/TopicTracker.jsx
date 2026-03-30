// src/components/dashboard/TopicTracker.jsx
import { useSelector } from "react-redux";

const TopicTracker = () => {
  const { topicStats } = useSelector((s) => s.stats);

  return (
    <div className="text-white">
      <h3 className="font-semibold mb-3 text-lg">Top Stressors</h3>

      <div className="space-y-2">
        {topicStats.map((t) => (
          <div
            key={t._id}
            className="
              flex justify-between 
              py-2 px-2
              border-b border-[#1e3050] 
              hover:bg-[#1a2540]
              hover:shadow-[0_0_10px_rgba(90,120,255,0.3)]
              transition-all duration-200
              rounded-md
            "
          >
            <span className="capitalize text-[#e2e8f0]">
              {t._id.replace("_", " ")}
            </span>&nbsp;&nbsp;-&nbsp;&nbsp;
            <span className="font-bold text-[#93c5fd]">{t.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicTracker;
