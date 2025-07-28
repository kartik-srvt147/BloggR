import express from "express";
import { GoogleLogin, login, signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", GoogleLogin);
export default router;
