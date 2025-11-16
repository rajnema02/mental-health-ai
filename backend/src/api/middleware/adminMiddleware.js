const jwt = require("jsonwebtoken");
const Official = require("../models/official"); // IMPORTANT: case-sensitive

// =============================================
//        ADMIN AUTH MIDDLEWARE
// =============================================
const adminMiddleware = async (req, res, next) => {
  try {
    let token;

    // ---- 1. Extract token from Authorization header ----
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ---- 2. If token missing ----
    if (!token) {
      return res.status(401).json({
        message: "Not authorized: No token provided",
      });
    }

    // ---- 3. Verify token using ADMIN secret ----
    const decoded = jwt.verify(token, process.env.JWT_SECRET_OFFICIAL);

    // ---- 4. Fetch admin user ----
    const adminUser = await Official.findById(decoded.id).select("-password");

    if (!adminUser) {
      return res.status(401).json({
        message: "Not authorized: Admin not found",
      });
    }

    // ---- 5. Role check ----
    if (adminUser.role !== "admin") {
      return res.status(403).json({
        message: "Access denied: Not an admin",
      });
    }

    // Attach admin info to request object
    req.admin = adminUser;

    next();
  } catch (err) {
    console.error("ADMIN AUTH ERROR:", err);
    return res.status(401).json({
      message: "Not authorized: Invalid or expired token",
    });
  }
};

module.exports = adminMiddleware;
