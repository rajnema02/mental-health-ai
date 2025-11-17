import express from "express";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "../backend/src/config/db.js";

import authRoutes from "./src/api/routes/authRoutes.js";
import postRoutes from "./src/api/routes/postRoutes.js";
import statsRoutes from "./src/api/routes/statsRoutes.js";
import alertsRoutes from "./src/api/routes/alertRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

/* ---------- MIDDLEWARE ---------- */
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  "/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  },
  express.static(path.join(process.cwd(), "uploads"))
);
/* ---------- DB CONNECT ---------- */
connectDB();

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/alerts", alertsRoutes);

/* ---------- SOCKET.IO ---------- */
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});

/* ---------- START SERVER ---------- */
server.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
