import express from "express";
import {
  handleSignUp,
  handleLogin,
  handleLogout,
  verifyUser,
  successMsg,
  handleForgetPass,
  handleResetPass,
} from "../controller/Users.js";

const router = express.Router();

router.get("/verify", verifyUser, successMsg);

router.post("/signup", handleSignUp);

router.post("/login", handleLogin);

router.post("/forgetpass", handleForgetPass);

router.post("/reset-password/:token", handleResetPass);

router.get("/logout", handleLogout);

export default router;
