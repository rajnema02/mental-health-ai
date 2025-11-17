import express from "express";
import {
  registerUser,
  loginUser,
  registerAdmin,
  loginAdmin,
} from "../../api/controller/authController.js";

const router = express.Router();

// user
router.post("/user/signup", registerUser);
router.post("/user/login", loginUser);

// admin
router.post("/official/signup", registerAdmin);
router.post("/official/login", loginAdmin);

export default router;
