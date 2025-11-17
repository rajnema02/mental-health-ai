import mongoose from "mongoose";

const alertZoneSchema = new mongoose.Schema(
  {
    name: String,
    zone: {
      type: { type: String, enum: ["Polygon"], required: true },
      coordinates: [[[Number]]],
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
