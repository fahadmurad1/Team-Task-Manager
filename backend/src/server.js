// server/src/server.js (ya server.js)

// 1) Imports
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");

// Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

// 2) App init
const app = express();

// 3) Connect to Database
connectDB();

// 4) Core middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://taskmanager006.netlify.app",
        process.env.FRONTEND_URL
      ];
      
      // Allow Netlify preview URLs (*.netlify.app)
      if (!origin || origin.includes("netlify.app") || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5) Static public folder (for favicon etc.)
app.use(express.static(path.join(__dirname, "public")));

// 6) Favicon fallback (agar file na bhi ho to 204, 404 nahi)
app.get("/favicon.ico", (req, res) => res.status(204).end());

// 7) Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// 8) Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});

// 9) Error handling
app.use(errorHandler);

// 10) 404 handler (last me)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 11) Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
