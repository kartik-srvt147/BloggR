import express from "express";
import { addCategory, deleteCategory, showAllCategories, showCategory, updateCategory } from "../controllers/category.controller.js";

const router = express.Router();
router.post("/add", addCategory);
router.put("/update/:category_id", updateCategory);
router.get("/show/:category_id", showCategory);
router.get("/show-all-categories", showAllCategories);
router.delete("/delete/:category_id", deleteCategory);

export default router;
