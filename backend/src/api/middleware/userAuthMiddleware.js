import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function userAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "User token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
