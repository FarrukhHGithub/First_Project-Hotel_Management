import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { login, register } from "./Controller/auth.controller.js";
import authRoute from "./Routes/auth.routes.js";
import usersRoutes from "./Routes/user.routes.js";
import hotelsRoutes from "./Routes/hotel.routes.js";
import roomRoutes from "./Routes/room.routes.js";
import bookingRoutes from "./Routes/booking.routes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const app = express();
dotenv.config();

// Serve static files (images)

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

// Middlewares
const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Set endpoints
// Auth
app.post("/api/auth", authRoute);
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

// Users
app.use("/api/users", usersRoutes);   

// Hotels
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/booking", bookingRoutes);

const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Connection Error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected!");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB Connection Error:", error);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  DatabaseConnection();
  console.log(`Server listening on port ${port}`);
});
