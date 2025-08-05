import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
// import fs from "fs";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId }).lean().exec();

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User data found.",
      user,
    });
  } catch (error) {
    console.log("Error in getUser controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userId } = req.params;

    const user = await User.findById(userId);
    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;

    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "BloggR", resource_type: "auto" })
        .catch((error) => {
          console.log("Error in uploading image file", error.message);
          res.status(500).json({ message: "Internal server error" });
        });

      user.profilePic = uploadResult.secure_url;
    }

    await user.save();

    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    res.status(200).json({
      success: true,
      message: "Data updated",
      user: newUser,
    });
  } catch (error) {
    console.log("Error in updateUser controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};