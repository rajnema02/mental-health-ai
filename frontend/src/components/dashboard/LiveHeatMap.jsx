import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';


const mapCenter = [23.2599, 77.4126];
const riskColor = r => r==='high'?'red':r==='medium'?'orange':'blue';


const LiveHeatMap = () => {
const { dataPoints = [], status } = useSelector(state => state.map || {});


if (status === 'loading' && !dataPoints.length)
return <div>Loading...</div>;


if (!dataPoints.length)
return <div>No map data available.</div>;


return (
<>
<style>{`
.map-container{ height:400px; border-radius:10px; overflow:hidden; border:1px solid #1e3050; }
@media(max-width:600px){ .map-container{ height:300px; } }
`}</style>


<div className="map-container">
<MapContainer center={mapCenter} zoom={12} scrollWheelZoom style={{height:'100%', width:'100%'}}>
<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />


{dataPoints.map(point => {
if (!point?.location_geo?.coordinates) return null;
const [lng, lat] = point.location_geo.coordinates;


return (
<Circle key={point._id} center={[lat, lng]} radius={50} pathOptions={{ color:riskColor(point.risk_level), fillColor:riskColor(point.risk_level), fillOpacity:0.5 }}>
<Popup>
<div>
<strong>Risk:</strong> {point.risk_level}<br />
<strong>Emotion:</strong> {point.emotion}<br />
<strong>Topic:</strong> {point.topic}<br />
{new Date(point.createdAt).toLocaleString()}
</div>
</Popup>
</Circle>
);
})}
</MapContainer>
</div>
</>
);
};


export default LiveHeatMap;