require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Database connection
require("./db/connection");

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/", require("./routes/authRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("Hello from backend side!");
});
app.get("/query", (req, res) => {
  res.send("Hello from query side!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
