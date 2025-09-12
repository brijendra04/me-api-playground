require("dotenv").config({ path: '../.env' }); // Specify the path to the .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/me-api-playground";

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

const profileRouter = require("./routes/profile");
app.use("/profile", profileRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
