// controllers/postController.js
import fs from "fs";
import path from "path";
import UserPost from "../models/UserPosts.js";

export const uploadPost = async (req, res) => {
  try {
    const caption = req.body.caption;
    const image = req.file?.path || req.body.image;

    if (!caption || !image) {
      return res.status(400).json({ message: "Caption & Image required" });
    }

    const ai_result = req.body.ai_result
      ? JSON.parse(req.body.ai_result)
      : { emotion: "neutral", risk_level: "low" };

    const location_geo = req.body.location_geo
      ? JSON.parse(req.body.location_geo)
      : { type: "Point", coordinates: [77.4126, 23.2599] };

    const post = await UserPost.create({
      userId: req.user?._id,
      caption,
      image,
      ai_result,
      topic: req.body.topic || "general",
      location_geo,
    });

    // Payload for the MAP
    const payload = {
      _id: post._id,
      caption: post.caption,
      emotion: post.ai_result?.emotion,
      risk_level: post.ai_result?.risk_level,
      topic: post.topic,
      location_geo: post.location_geo,
      createdAt: post.createdAt,
    };

    const io = req.app.get("io");
    if (io) io.emit("new-data-point", payload);

    return res.status(201).json(post);
  } catch (err) {
    console.error("UPLOAD POST ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getMyPosts = async (req, res) => {
  try {
    const posts = await UserPost.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json(posts);
  } catch (err) {
    console.error("getMyPosts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await UserPost.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (String(post.userId) !== String(req.user._id))
      return res.status(403).json({ message: "Not authorized" });

    try {
      const BASE = (process.env.BASE_URL || "").replace(/\/$/, "");
      let filePath = post.image;

      if (BASE && filePath.startsWith(BASE)) {
        filePath = filePath.replace(BASE, "");
      }

      filePath = filePath.replace(/^\/+/, "");

      const fullPath = path.join(process.cwd(), filePath);

      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    } catch (error) {
      console.warn("File deletion warning:", error);
    }

    await UserPost.findByIdAndDelete(req.params.id);

    return res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("deletePost error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
