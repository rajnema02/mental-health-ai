import mongoose from "mongoose";

const dataPointSchema = new mongoose.Schema(
  {
    topic: String,
    emotion: String,
    risk_level: String,

    location_geo: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: [Number], // [lng, lat]
    },

    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

dataPointSchema.index({ location_geo: "2dsphere" });

export default mongoose.model("DataPoint", dataPointSchema);
