import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import  fetchInitialMapData  from "../store/slices/mapSlice";
import { fetchDashboardStats } from "../store/slices/statsSlice";

let socket;

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) {
      socket = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");
    }

    socket.on("new-data-point", (point) => {
      dispatch(fetchInitialMapData(point));
      dispatch(fetchDashboardStats()); // refresh stats live
    });
  }, []);
};
