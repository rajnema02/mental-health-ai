import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addLiveMapPoint } from '../store/slices/mapSlice';

let socket;

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) {
      socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');
    }

    socket.on('connect', () => {
      console.log('socket connected', socket.id);
    });

    socket.on('new-data-point', (point) => {
      if (point) dispatch(addLiveMapPoint(point));
    });

    return () => {
      if (socket) {
        socket.off('new-data-point');
        // don't disconnect to allow reuse
      }
    };
  }, [dispatch]);
};
