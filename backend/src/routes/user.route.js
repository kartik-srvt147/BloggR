import express from "express";
import { getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getUser/:userId", getUser);

export default router;
