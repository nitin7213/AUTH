import express from "express";
import handlePost from "../controller/Users.js";

const router = express.Router();

router.post("/auth/signup", handlePost);

export default router;
