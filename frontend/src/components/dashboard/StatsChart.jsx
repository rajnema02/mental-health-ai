// src/components/dashboard/StatsChart.jsx
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Convert backend stats → chart.js data
const processChartData = (emotionStats = []) => {
  const labels = [...Array(24).keys()].map((h) => `${h}:00`);
  const emotions = [...new Set(emotionStats.map((e) => e?._id?.emotion).filter(Boolean))];

  const datasets = emotions.map((emotion) => {
    const data = new Array(24).fill(0);

    emotionStats.forEach((item) => {
      const hour = Number(item?._id?.hour);
      const emo = item?._id?.emotion;
      if (emo === emotion && Number.isInteger(hour) && hour >= 0 && hour < 24) {
        data[hour] = item.count || 0;
      }
    });

    let borderColor = 'grey';
    if (emotion === 'anxiety') borderColor = 'orange';
    if (emotion === 'sadness') borderColor = 'blue';
    if (emotion === 'fear') borderColor = 'red';
    if (emotion === 'joy') borderColor = 'green';

    return {
      label: emotion,
      data,
      borderColor,
      tension: 0.25,
      borderWidth: 2,
      fill: false,
    };
  });

  return { labels, datasets };
};

const StatsChart = () => {
  const { emotionStats = [], loading } = useSelector((state) => state.stats || {});
  const chartData = processChartData(emotionStats);

  if (loading && (!emotionStats || emotionStats.length === 0)) {
    return <p className="text-center text-gray-500">Loading chart...</p>;
  }

  if (!chartData.datasets || chartData.datasets.length === 0) {
    return <p className="text-center text-gray-500">No emotion data available.</p>;
  }

  return (
    <>
      <h3 className="font-bold text-center mb-2">Emotion Trend (Last 24h)</h3>
      <div className="h-[90%] w-full">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
    </>
  );
};

export default StatsChart;
