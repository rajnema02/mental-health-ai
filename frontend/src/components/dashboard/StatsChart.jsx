import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const processChartData = (emotionStats=[]) => {
  const labels = [...Array(24).keys()].map(h => `${h}:00`);
  const emotions = [...new Set(emotionStats.map(e => e._id?.emotion))].filter(Boolean);
  const datasets = emotions.map((emotion) => {
    const data = new Array(24).fill(0);
    emotionStats.forEach(item => {
      if (item._id && item._id.emotion === emotion) {
        data[item._id.hour] = item.count;
      }
    });
    return { label: emotion, data, tension: 0.2 };
  });
  return { labels, datasets };
};

const StatsChart = () => {
  const { emotionStats } = useSelector((s) => s.stats);
  const chartData = processChartData(emotionStats);
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default StatsChart;
