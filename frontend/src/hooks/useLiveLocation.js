import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateLocation } from "../store/slices/userLocationSlice";

export const useLiveLocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("❌ Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        dispatch(updateLocation([latitude, longitude]));

        // send to backend (optional)
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/location`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat: latitude, lng: longitude }),
        });
      },
      (err) => console.log("Location error:", err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
};
