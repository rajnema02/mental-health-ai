import mongoose from "mongoose";

const dataPointSchema = new mongoose.Schema({
  topic: String,
  emotion: String,
  risk_level: String,
  timestamp: { type: Date, default: Date.now },
  location_geo: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number],
  },
});

dataPointSchema.index({ location_geo: "2dsphere" });

export default mongoose.model("DataPoint", dataPointSchema);
