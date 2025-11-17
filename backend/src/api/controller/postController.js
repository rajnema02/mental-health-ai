// server/controllers/postController.js

import fs from "fs";
import path from "path";
import UserPost from "../models/UserPosts.js";

export const uploadPost = async (req, res) => {
  try {
    const { caption } = req.body;

    if (!caption || !req.file) {
      return res.status(400).json({ message: "Caption & image required" });
    }

    // FIXED — guarantee proper BASE_URL
    const BASE = (process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");

    // FIXED — guarantee correct local filename
    const fileName = req.file.filename;

    // FIXED — correct full URL ALWAYS
    const imageUrl = `${BASE}/uploads/${fileName}`;

    const post = await UserPost.create({
      caption,
      image: imageUrl,
      userId: req.user._id,
      ai_result: {
        emotion: "neutral",
        risk_level: "low",
      },
    });

    return res.status(201).json(post);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getMyPosts = async (req, res) => {
  try {
    const posts = await UserPost.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error("getMyPosts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await UserPost.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (String(post.userId) !== String(req.user._id))
      return res.status(403).json({ message: "Not authorized" });

    // DELETE IMAGE FILE SAFELY
    try {
      const BASE = (process.env.BASE_URL || "").replace(/\/$/, "");
      let filePath = post.image;

      if (BASE && filePath.startsWith(BASE)) {
        filePath = filePath.replace(BASE, "");
      }

      filePath = filePath.replace(/^\/+/, ""); // remove leading slash

      const fullPath = path.join(process.cwd(), filePath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } catch (error) {
      console.warn("File deletion warning:", error);
    }

    await UserPost.findByIdAndDelete(postId);

    return res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("deletePost error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
