import express from "express";
import userAuth from "../middleware/userAuthMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { uploadPost, getMyPosts } from "../controller/postController.js";

const router = express.Router();

// MUST include multer middleware
router.post("/upload", userAuth, upload.single("image"), uploadPost);

router.get("/my-posts", userAuth, getMyPosts);

export default router;
