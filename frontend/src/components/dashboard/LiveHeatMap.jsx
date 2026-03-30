// src/components/dashboard/LiveHeatMap.jsx
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet missing icon issue in Vite
delete L.Icon.Default.prototype._getIconUrl;

const riskColor = (risk) => {
  if (!risk) return "blue";
  return risk === "high" ? "red" : risk === "medium" ? "orange" : "blue";
};

const LiveHeatMap = () => {
  const { dataPoints = [] } = useSelector((state) => state.map);

  if (!dataPoints.length) {
    return (
      <div style={{ color: "white", padding: "12px" }}>No map data available.</div>
    );
  }

  return (
    <>
    <div
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid #1e3050",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <MapContainer
        center={[23.2599, 77.4126]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

        {dataPoints.map((p, index) => {
          const coords = p?.location_geo?.coordinates;
          if (!coords || coords.length !== 2) return null;

          const [lng, lat] = coords;

          return (
            <Circle
              key={p._id || index}
              center={[lat, lng]}
              radius={70}
              pathOptions={{
                color: riskColor(p?.ai_result?.risk_level),
                fillColor: riskColor(p?.ai_result?.risk_level),
                fillOpacity: 0.55,
              }}
            >
              <Popup>
                <strong>Emotion:</strong> {p.ai_result?.emotion} <br />
                <strong>Risk:</strong> {p.ai_result?.risk_level} <br />
                <strong>Topic:</strong> {p.topic} <br />
                <strong>Time:</strong>{" "}
                {p.createdAt ? new Date(p.createdAt).toLocaleString() : "N/A"}
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>

      
    </div>
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.6)",
          padding: "8px 14px",
          borderRadius: "8px",
          display: "flex",
          gap: "18px",
          color: "white",
          fontSize: "0.9rem",
          border: "1px solid #1e3050",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "blue",
            }}
          ></span>
          Low Risk
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "orange",
            }}
          ></span>
          Medium Risk
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "red",
            }}
          ></span>
          High Risk
        </div>
      </div>
    </>
  );
};

export default LiveHeatMap;
