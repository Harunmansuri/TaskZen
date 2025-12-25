import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.route.js";

// Load env variables
dotenv.config();

// Init app
const app = express();
const PORT = process.env.PORT || 4002;
// ✅ Built-in Express body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// -------------------- Middleware --------------------
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Built-in Express body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));


// Logger (development only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// -------------------- Database --------------------
connectDB();

// -------------------- Routes --------------------
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/", taskRoutes);


// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API is running 🚀" });
});

// -------------------- 404 Handler --------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// -------------------- Global Error Handler --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// -------------------- Server --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
