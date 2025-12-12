const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// ✅ Force dotenv to load backend/.env specifically
dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
