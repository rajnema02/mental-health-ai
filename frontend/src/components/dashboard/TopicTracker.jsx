// src/components/dashboard/TopicTracker.jsx
import { useSelector } from "react-redux";
import Loader from "../common/Loader";

const TopicTracker = () => {
  const { topicStats, status } = useSelector((s) => s.stats);

  if (status === "loading")
    return <div style={{ padding: "12px" }}><Loader /></div>;

  return (
    <>
      <div style={{ color: "white" }}>
        <h3 style={{ fontWeight: "600", marginBottom: "6px" }}>
          Top Stressors
        </h3>

        <ul>
          {topicStats.map((t) => (
            <li
              key={t._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderBottom: "1px solid #1e3050",
              }}
            >
              <span style={{ textTransform: "capitalize" }}>
                {t._id.replace("_", " ")}
              </span>
              <span style={{ fontWeight: "700" }}>{t.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TopicTracker;
