import express from "express";
import {
  handleForgetPass,
  handleResetPass,
  successMsg,
} from "../controller/mail/mail.user.js";
import handleSignUp from "../controller/auth/auth.signup.js";
import handleLogin from "../controller/auth/auth.login.js";
import handleLogout from "../controller/auth/auth.logout.js";
import handleUserName from "../controller/auth/auth.user.js";
import handleRefreshToken from "../controller/auth/auth.refresh.js";
import authenticateToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/signup", handleSignUp);
router.get("/user", handleUserName);
router.post("/forgetpass", handleForgetPass);
router.post("/reset-password/:token", handleResetPass);
router.post("/logout", handleLogout);
router.post("/refresh-token", handleRefreshToken);

// Protected Routes
router.get("/dashboard", authenticateToken, successMsg);

export default router;
