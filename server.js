const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Import model
const AirData = require("./models/AirData");

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// ------------------------
// AUTO LIVE DATA OPTION 🔥
// ------------------------
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(async () => {
  try {
    const newData = new AirData({
      aqi: random(70, 180),
      temperature: random(22, 36),
      humidity: random(35, 75),
      time: new Date()
    });

    await newData.save();
    console.log("New Live Data Saved ✅");
  } catch (error) {
    console.log(error);
  }
}, 5000); // every 5 sec

// ------------------------
// ROUTES
// ------------------------
app.get("/", (req, res) => {
  res.send("NEW SERVER RUNNING 🔥");
});

app.get("/test", (req, res) => {
  res.send("Test OK ✅");
});

// Save data manually
app.post("/api/data", async (req, res) => {
  try {
    const data = new AirData(req.body);
    await data.save();
    res.send("Data saved ✅");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all data
app.get("/api/data", async (req, res) => {
  try {
    const data = await AirData.find();
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ------------------------
const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});