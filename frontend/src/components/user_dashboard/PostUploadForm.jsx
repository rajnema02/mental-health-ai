// src/components/user_dashboard/PostUploadForm.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../store/slices/userPostSlice";

// 🔹 Optional: small inline map using react-leaflet
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PostUploadForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.userPosts);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");

  // 🔹 Live location state
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [locationError, setLocationError] = useState("");

  // --------------------------------------------------
  //  GEOLOCATION: ask permission + track movement
  // --------------------------------------------------
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported in this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
        setLocationError("");
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocationError("Please allow location access to enable live map.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    // cleanup
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // --------------------------------------------------
  //  IMAGE HANDLER
  // --------------------------------------------------
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // --------------------------------------------------
  //  SUBMIT
  // --------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    // 🔹 Attach live GPS if available
    if (lat != null && lng != null) {
      const location_geo = {
        type: "Point",
        // IMPORTANT: GeoJSON expects [lng, lat]
        coordinates: [lng, lat],
      };
      formData.append("location_geo", JSON.stringify(location_geo));
    }

    dispatch(uploadPost(formData));

    // clear local UI (request is already dispatched)
    setImage(null);
    setPreview("");
    setCaption("");
  };

  return (
    <>
      <style>{`
        .upload-box input[type=file]{
          background:#0f1a2e; border:1px solid #1e3050;
          color:white; padding:10px; border-radius:8px;
        }
        .upload-preview{
          width:100%; border-radius:10px; margin-top:10px;
        }
        .upload-textarea{
          background:#0f1a2e; border:1px solid #1e3050; color:white;
          padding:10px; border-radius:8px; width:100%; height:100px;
        }
        .upload-btn{
          background:#1a73e8; padding:12px; border-radius:8px;
          color:white; font-weight:600; width:100%;
        }
        .location-note{
          font-size:0.8rem;
          color:#9ca3af;
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className="upload-box"
        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
      >
        <input type="file" accept="image/*" onChange={handleImage} required />

        {preview && (
          <img
            style={{ height: "200px", width: "250px" }}
            src={preview}
            className="upload-preview"
            alt="preview"
          />
        )}

        <textarea
          className="upload-textarea"
          placeholder="Write something..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {/* 🔹 Location status text */}
        <div className="location-note">
          {lat != null && lng != null ? (
            <>
              📍 Live location captured: <br />
              Lat: {lat.toFixed(5)}, Lng: {lng.toFixed(5)}
            </>
          ) : locationError ? (
            <>⚠ {locationError}</>
          ) : (
            <>Requesting your live location…</>
          )}
        </div>

        {/* 🔹 Small live map preview for the user */}
        {lat != null && lng != null && (
          <div style={{ height: "200px", width: "100%", borderRadius: "10px", overflow: "hidden" }}>
            <MapContainer
              center={[lat, lng]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Circle
                center={[lat, lng]}
                radius={40}
                pathOptions={{ color: "#1a73e8", fillColor: "#1a73e8", fillOpacity: 0.5 }}
              />
            </MapContainer>
          </div>
        )}

        <button
          type="submit"
          className="upload-btn"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Uploading..." : "Upload Post"}
        </button>
      </form>
    </>
  );
};

export default PostUploadForm;
