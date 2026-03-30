// src/components/dashboard/StatsChart.jsx
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const StatsChart = () => {
  const { emotionStats } = useSelector((state) => state.stats);

  const labels = [...Array(24).keys()].map((h) => `${h}:00`);
  const emotions = [...new Set(emotionStats.map((e) => e._id.emotion))];

  // Professional neon color palette for dark background
  const neonColors = [
    "#00f7ff",
    "#ff4d4d",
    "#ffb84d",
    "#b84dff",
    "#4dff88",
    "#ffd24d",
  ];

  const datasets = emotions.map((emotion, index) => {
    const data = new Array(24).fill(0);
    emotionStats.forEach((x) => {
      if (x._id.emotion === emotion) data[x._id.hour] = x.count;
    });

    return {
      label: emotion.toUpperCase(),
      data,
      borderColor: neonColors[index % neonColors.length],
      backgroundColor: neonColors[index % neonColors.length] + "55",
      pointBorderColor: neonColors[index % neonColors.length],
      pointBackgroundColor: neonColors[index % neonColors.length],
      borderWidth: 2,
      tension: 0.35,
    };
  });

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Line
        data={{ labels, datasets }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: "white", font: { size: 12 } },
            },
          },
          scales: {
            x: {
              ticks: { color: "#cbd5e1" },
              grid: { color: "#1e293b" },
            },
            y: {
              ticks: { color: "#cbd5e1" },
              grid: { color: "#1e293b" },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default StatsChart;
