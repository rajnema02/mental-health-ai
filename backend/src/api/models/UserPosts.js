import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  caption: String,
  imageUrl: String,
  ai_result: Object,
});

export default mongoose.model("UserPost", userPostSchema);
