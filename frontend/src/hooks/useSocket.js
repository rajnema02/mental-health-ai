// src/hooks/useSocket.js
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addLiveMapPoint } from "../store/slices/mapSlice";

let socket = null;

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) {
      socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");
    }

    socket.on("connect", () => {
      console.log("🔥 Socket connected:", socket.id);
    });

    socket.on("new-data-point", (point) => {
      console.log("📡 Live point received:", point);
      dispatch(addLiveMapPoint(point));   // ✅ FIXED
    });

    return () => {
      if (socket) socket.off("new-data-point");
    };
  }, []);
};
