import express from "express";
import {
  register,
  login,
  validUser,
  googleAuth,
  logout,
  searchUsers,
} from "../controllers/user.js";
import { Auth } from "../middleware/user.js";
const router = express.Router();
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/valid", Auth, validUser);
router.get("/auth/logout", Auth, logout);
router.post("/api/google", googleAuth);
router.get("/api/user?", searchUsers);
export default router;
