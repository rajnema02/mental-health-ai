// src/components/dashboard/LiveHeatMap.jsx
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';

// Center of Bhopal
const mapCenter = [23.2599, 77.4126];

// Risk color helper
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
  // read from state.map (mapSlice stores dataPoints)
  const { dataPoints = [], status } = useSelector((state) => state.map || {});

  if (status === 'loading' && dataPoints.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded shadow">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  if (!Array.isArray(dataPoints) || dataPoints.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded shadow">
        <p className="text-gray-600">No map data available.</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {dataPoints.map((point) => {
        if (
          !point ||
          !point.location_geo ||
          !Array.isArray(point.location_geo.coordinates) ||
          point.location_geo.coordinates.length < 2
        ) {
          return null; // skip invalid data
        }

        const [lng, lat] = point.location_geo.coordinates;

        return (
          <Circle
            key={point._id || `${lat}-${lng}-${Math.random()}`}
            center={[lat, lng]}
            radius={50}
            pathOptions={{
              color: getRiskColor(point.risk_level),
              fillColor: getRiskColor(point.risk_level),
              fillOpacity: 0.5,
            }}
          >
            <Popup>
              <div className="text-sm">
                <div><strong>Risk:</strong> {point.risk_level || 'N/A'}</div>
                <div><strong>Emotion:</strong> {point.emotion || 'N/A'}</div>
                <div><strong>Topic:</strong> {point.topic ? point.topic.replace('_', ' ') : 'N/A'}</div>
                <div className="text-xs text-gray-500 mt-1">{point.createdAt ? new Date(point.createdAt).toLocaleString() : ''}</div>
              </div>
            </Popup>
          </Circle>
        );
      })}
    </MapContainer>
  );
};

export default LiveHeatMap;
