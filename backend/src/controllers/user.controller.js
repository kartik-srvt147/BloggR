import User from "../models/user.model.js";

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
