import Category from "../models/category.model.js";

export const addCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = new Category({
      name,
      slug,
    });

    await category.save();
    res
      .status(200)
      .json({ success: true, message: "Category created successfully" });
  } catch (error) {
    console.log("Error in addCategory controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const showAllCategories = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in showAllCategories controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const showCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in showCategory controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in updateCategory controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in deleteCategory controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
