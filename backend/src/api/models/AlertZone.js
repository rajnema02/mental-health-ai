// models/AlertZone.js
import mongoose from "mongoose";

const alertZoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    zone: {
      type: {
        type: String,
        enum: ["Polygon"],
        required: true,
      },
      coordinates: {
        type: [[[Number]]], // Correct 3D array
        required: true,
      },
    },

    official: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Official",
      required: true,
    },
  },
  { timestamps: true }
);

alertZoneSchema.index({ zone: "2dsphere" });

export default mongoose.model("AlertZone", alertZoneSchema);
