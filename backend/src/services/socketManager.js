let io = null;

const init = (httpServer) => {
  io = require('socket.io')(httpServer, {
    cors: {
      origin: '*', // Allow all origins (for dev)
      // In production: origin: 'https://your-frontend-url.com'
    },
  });

  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
  
  console.log('Socket.IO initialized.');
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized!');
  }
  return io;
};

const broadcastDataPoint = (dataPoint) => {
    try {
        getIO().emit('new-data-point', dataPoint);
    } catch (error) {
        console.error('Socket error:', error.message);
    }
};

module.exports = {
  init,
  getIO,
  broadcastDataPoint,
};