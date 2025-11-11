import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { useSelector } from '../../store/reduxShim';
import 'leaflet/dist/leaflet.css';

// Center of Bhopal, MP
const mapCenter = [23.2599, 77.4126];

// Helper function to get color based on risk
const getRiskColor = (risk) => {
  switch (risk) {
    case 'high':
      return 'red';
    case 'medium':
      return 'orange';
    default:
      return 'blue';
  }
};

const LiveHeatMap = () => {
  const { dataPoints } = useSelector((state) => state.map);

  return (
    <MapContainer center={mapCenter} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {dataPoints.map((point) => (
        <Circle
          key={point._id}
          center={[
            point.location_geo.coordinates[1], // Latitude
            point.location_geo.coordinates[0], // Longitude
          ]}
          radius={50} // Radius in meters
          pathOptions={{
            color: getRiskColor(point.risk_level),
            fillColor: getRiskColor(point.risk_level),
            fillOpacity: 0.5,
          }}
        >
          <Popup>
            <strong>Risk:</strong> {point.risk_level} <br />
            <strong>Emotion:</strong> {point.emotion} <br />
            <strong>Topic:</strong> {point.topic}
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default LiveHeatMap;