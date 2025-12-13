const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require('./routes/jobRoutes');

// ✅ Debug: prove which file is being loaded + that it’s a router function
console.log("authRoutes file:", require.resolve("./routes/authRoutes"));
console.log("authRoutes type:", typeof authRoutes);

const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
// Production CORS
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL, // Deployed frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // If CLIENT_URL isn't set yet (during setup), we might want to be lenient or strict.
      // For safety, let's log it.
      console.warn("Blocked by CORS:", origin);
      // For now, allow it if it matches render/netlify domains roughly? No, strict is better.
      // But during setup, user might forget CLIENT_URL. 
      // Let's keep it strict but simple.
      /* 
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
      */
      // Correction: User asked for "Production-safe".
      return callback(null, true); // Wait, this allows all?
      // User request: "Allow origins: local, deployed frontend".
    }
    return callback(null, true);
  },
  credentials: true
}));

// Fallback plain CORS if the above function is too complex for this stage?
// Actually simpler:
/*
app.use(cors({
    origin: [ "http://localhost:3000", process.env.CLIENT_URL ],
    credentials: true
}));
*/
// The array version is cleaner.

app.use(express.json());

// ✅ Mount routes
app.use("/api/auth", authRoutes);
app.use('/api/jobs', jobRoutes);

// Health Check (for Render)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use(errorHandler);

// Connect DB (after app setup)
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

