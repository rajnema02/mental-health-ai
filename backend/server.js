require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const connectDB = require('./src/config/db');
const socketManager = require('./src/services/socketManager');
const pipeline = require('./src/pipeline/index');
const adminAuthMiddleware = require('./src/api/middleware/adminMiddleware');

// --- Initialization ---
const app = express();
const server = http.createServer(app);

// Connect to Database
connectDB();

// --- Middleware ---
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// --- Socket.IO Setup ---
socketManager.init(server);

// --- API Routes ---

// NEW: User Auth Routes
app.use('/api/auth/user', require('./src/api/routes/userAuthRoutes'));

// NEW: User Post Routes (protected by userAuthMiddleware inside the file)
app.use('/api/posts', require('./src/api/routes/userPostRoutes'));

// Admin Auth Routes
app.use('/api/auth/official', require('./src/api/routes/authRoutes'));

app.use("/api/admin", require("./src/api/routes/adminRoutes"));


// Admin Protected Routes
app.use('/api/alerts', adminAuthMiddleware, require('./src/api/routes/alertRoutes'));
app.use('/api/stats', adminAuthMiddleware, require('./src/api/routes/statsRoutes'));

// --- Health Check Route ---
app.get('/', (req, res) => {
  res.send('Project Vesta Hybrid Backend is running.');
});

// --- Start Data Pipeline ---
pipeline.start();

// --- Start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});