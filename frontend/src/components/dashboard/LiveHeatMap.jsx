import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;

const riskColor = (risk) => {
  if (!risk) return "blue";
  return risk === "high" ? "red" : risk === "medium" ? "orange" : "blue";
};

const LiveHeatMap = () => {
  const { dataPoints = [] } = useSelector((s) => s.map || {});

  console.log("🔥 LiveHeatMap received:", dataPoints);

  if (!dataPoints.length) {
    return (
      <div style={{ color: "white", padding: "10px" }}>
        No map data available.
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[23.2599, 77.4126]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 9999 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

        {dataPoints.map((p, i) => {
          const coords = p?.location_geo?.coordinates;
          if (!coords || coords.length !== 2) return null;

          const [lng, lat] = coords;

          console.log("📍 Plotting point →", { lat, lng });

          return (
            <Circle
              key={p._id || i}
              center={[lat, lng]}
              radius={70}
              pathOptions={{
                color: riskColor(p?.ai_result?.risk_level),
                fillColor: riskColor(p?.ai_result?.risk_level),
                fillOpacity: 0.55,
              }}
            >
              <Popup>
                <strong>Emotion:</strong> {p.ai_result?.emotion || "N/A"} <br />
                <strong>Risk:</strong> {p.ai_result?.risk_level || "N/A"} <br />
                <strong>Topic:</strong> {p.topic || "N/A"} <br />
                <strong>Time:</strong>{" "}
                {p.createdAt
                  ? new Date(p.createdAt).toLocaleString()
                  : "N/A"}
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default LiveHeatMap;