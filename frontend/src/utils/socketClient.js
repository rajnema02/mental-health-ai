import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_BACKEND_URL;
// We connect manually from a hook
export const socket = io(URL, { autoConnect: false });