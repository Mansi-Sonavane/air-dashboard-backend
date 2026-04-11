const mongoose = require("mongoose");

const AirSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  aqi: Number,
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AirData", AirSchema);