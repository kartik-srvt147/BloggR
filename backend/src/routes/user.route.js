import express from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";
import upload from "../lib/multer.js";

const router = express.Router();

router.get("/getUser/:userId", getUser);
router.put("/updateUser/:userId", upload.single('file') ,updateUser);

export default router;
