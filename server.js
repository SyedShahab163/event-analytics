import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db.js";
import authRoutes from "./routes/auth.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Event Tracker Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.use("/api/auth", authRoutes);
