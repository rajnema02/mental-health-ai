import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },

    caption: { type: String, required: true },

    image: { type: String, required: true },

    ai_result: {
      emotion: { type: String, default: "neutral" },
      risk_level: { type: String, default: "low" },
    },

    topic: { type: String, default: "general" },

    location_geo: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng,lat]
        default: [77.4126, 23.2599],
        index: "2dsphere",
      },
    },
  },
  { timestamps: true }
);

userPostSchema.index({ location_geo: "2dsphere" });

export default mongoose.model("UserPost", userPostSchema);
