import jwt from "jsonwebtoken";
import Official from "../models/official.js";

export default async function adminAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Admin token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    const admin = await Official.findById(decoded.id);

    if (!admin) return res.status(401).json({ message: "Admin not found" });

    req.official = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
