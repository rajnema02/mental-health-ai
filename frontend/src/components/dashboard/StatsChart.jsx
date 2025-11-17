// src/components/dashboard/StatsChart.jsx
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatsChart = () => {
  const { emotionStats } = useSelector((state) => state.stats);

  const labels = [...Array(24).keys()].map((h) => `${h}:00`);
  const emotions = [...new Set(emotionStats.map((e) => e._id?.emotion))];

  const datasets = emotions.map((emotion) => {
    const data = new Array(24).fill(0);

    emotionStats.forEach((i) => {
      if (i._id?.emotion === emotion) data[i._id.hour] = i.count;
    });

    return { label: emotion, data, tension: 0.3, borderWidth: 2 };
  });

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <Line
          data={{ labels, datasets }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
              x: { ticks: { color: "white" } },
              y: { ticks: { color: "white" }, beginAtZero: true },
            },
          }}
        />
      </div>
    </>
  );
};

export default StatsChart;
