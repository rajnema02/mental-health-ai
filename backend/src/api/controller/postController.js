import UserPost from "../models/UserPosts.js";

export const uploadPost = async (req, res) => {
  const { caption } = req.body;
  const image = req.file?.path;

  if (!caption || !image) {
    return res
      .status(400)
      .json({ message: "Caption & Image are required" });
  }

  const post = await UserPost.create({
    caption,
    image,
    userId: req.user._id,
  });

  res.status(201).json(post);
};

export const getMyPosts = async (req, res) => {
  const posts = await UserPost.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(posts);
};
