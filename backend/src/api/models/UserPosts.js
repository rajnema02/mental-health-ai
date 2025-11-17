// models/UserPosts.js
import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },

    caption: { type: String, required: true },

    // Full URL saved here
    image: { type: String, required: true },

    ai_result: {
      emotion: { type: String, default: "neutral" },
      risk_level: { type: String, default: "low" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserPost", userPostSchema);
