import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../utils/socketClient";
import { addLiveMapPoint } from "../store/slices/mapSlice";

export const useSocket = () => {
  const dispatch = useDispatch();
  const mounted = useRef(false);

  useEffect(() => {
    // Prevent double execution in React StrictMode
    if (mounted.current) return;
    mounted.current = true;

    // Ensure socket is connected
    if (!socket.connected) {
      try {
        socket.connect();
      } catch (err) {
        console.error("Socket connection failed:", err);
      }
    }

    // Listener for incoming data
    const onNewDataPoint = (dataPoint) => {
      if (dataPoint && typeof dataPoint === "object") {
        dispatch(addLiveMapPoint(dataPoint));
      }
    };

    socket.on("new-data-point", onNewDataPoint);

    // Cleanup on unmount
    return () => {
      socket.off("new-data-point", onNewDataPoint);
      socket.disconnect();
      mounted.current = false;
    };
  }, [dispatch]);
};
