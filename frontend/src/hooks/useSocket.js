import { useEffect, useRef } from 'react';
import { useDispatch } from '../store/reduxShim';
import { socket } from '../utils/socketClient';
// import { addLiveMapPoint } from '../store/slices/mapSlice';

export const useSocket = () => {
  const dispatch = useDispatch();
  const mounted = useRef(false);

  // useEffect(() => {
  //   if (mounted.current) return; // ✅ prevent StrictMode double-run
  //   mounted.current = true;

  //   if (!socket.connected) socket.connect();

  //   const onNewDataPoint = (dataPoint) => {
  //     if (dataPoint && typeof dataPoint === 'object') {
  //       try {
  //         dispatch(addLiveMapPoint(dataPoint));
  //       } catch (err) {
  //         console.error('Dispatch failed:', err);
  //       }
  //     }
  //   };

  //   socket.on('new-data-point', onNewDataPoint);

  //   return () => {
  //     socket.off('new-data-point', onNewDataPoint);
  //     socket.disconnect();
  //     mounted.current = false;
  //   };
  // }, [dispatch]);
};