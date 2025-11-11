import { Line } from 'react-chartjs-2';
import { useSelector } from '../../store/reduxShim';
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

const processChartData = (emotionStats) => {
  // We need to transform the data from the backend
  // { _id: { hour: 1, emotion: 'sadness' }, count: 10 }
  // to Chart.js format
  
  const labels = [...Array(24).keys()].map(h => `${h}:00`); // 0:00, 1:00, ... 23:00
  
  const emotions = [...new Set(emotionStats.map(e => e._id.emotion))];
  const datasets = emotions.map(emotion => {
    const data = new Array(24).fill(0);
    emotionStats.forEach(stat => {
      if (stat._id.emotion === emotion) {
        data[stat._id.hour] = stat.count;
      }
    });
    
    // Assign colors
    let borderColor = 'grey';
    if(emotion === 'anxiety') borderColor = 'orange';
    if(emotion === 'sadness') borderColor = 'blue';
    if(emotion === 'fear') borderColor = 'red';
    if(emotion === 'joy') borderColor = 'green';
    
    return {
      label: emotion,
      data: data,
      borderColor: borderColor,
      tension: 0.1
    }
  });

  return { labels, datasets };
}

const StatsChart = () => {
  const { emotionStats } = useSelector((state) => state.stats);
  const chartData = processChartData(emotionStats);

  return (
    <>
      <h3 className="font-bold text-center">Emotion Trend (Last 24h)</h3>
      <div className="h-[90%] w-full">
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </>
  );
};

export default StatsChart;