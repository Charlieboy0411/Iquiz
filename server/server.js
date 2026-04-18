import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"));

// Routes
import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

// Socket Logic
import quizSocket from "./socket/quizSocket.js";
quizSocket(io);

server.listen(5000, () => console.log("Server running"));
