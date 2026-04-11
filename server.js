const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// Import model
const AirData = require("./models/AirData");

// Test route (basic)
app.get("/", (req, res) => {
  res.send("NEW SERVER RUNNING 🔥");
});

// FORCE TEST ROUTE ✅
app.get("/test", (req, res) => {
  res.send("Test OK ✅");
});

// Save data API
app.post("/api/data", async (req, res) => {
  try {
    const data = new AirData(req.body);
    await data.save();
    res.send("Data saved ✅");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get data API
app.get("/api/data", async (req, res) => {
  try {
    const data = await AirData.find();
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});