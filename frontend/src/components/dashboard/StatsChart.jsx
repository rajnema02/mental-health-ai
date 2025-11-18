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
  const { emotionStats } = useSelector((s) => s.stats);

  const labels = [...Array(24).keys()].map((h) => `${h}:00`);
  const emotions = [...new Set(emotionStats.map((e) => e._id.emotion))];

  const datasets = emotions.map((emotion) => {
    const arr = new Array(24).fill(0);
    emotionStats.forEach((x) => {
      if (x._id.emotion === emotion) arr[x._id.hour] = x.count;
    });
    return { label: emotion, data: arr };
  });

  return <Line data={{ labels, datasets }} />;
};

export default StatsChart;
