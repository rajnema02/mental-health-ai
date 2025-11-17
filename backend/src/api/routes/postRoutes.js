import express from "express";
import userAuth from "../middleware/userAuthMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { uploadPost, getMyPosts, deletePost } from "../controller/postController.js";

const router = express.Router();

router.post("/upload", userAuth, upload.single("image"), uploadPost);
router.get("/my-posts", userAuth, getMyPosts);
router.delete("/:id", userAuth, deletePost); // <-- new

export default router;
