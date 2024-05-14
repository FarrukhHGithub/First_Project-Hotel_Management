import User from "../Model/User.js";
import upload from "../utils/multer.js";
export const updateUser = async (req, res, next) => {
  try {
    // First, handle the file upload
    upload.single("photos")(req, res, async function (err) {
      if (err) {
        console.error("Error uploading images:", err);
        return res.status(500).json({ error: "Error uploading images" });
      }

      try {
        const photos = req.file;
        console.log("Uploaded photos:", photos.path);
        console.log("Request Body:", req.body);

        // Now that we have uploaded photos, let's update the user
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: { ...req.body, photo: photos.path } },
          { new: true }
        );

        // If updateUser is null, it means user not found
        if (!updateUser) {
          return res.status(404).send({
            success: false,
            message: "User not found.",
          });
        }

        // If updateUser is found, send back the updated user
        const { password, ...userData } = updateUser._doc;

        res.status(200).send({
          success: true,
          message: "User has been updated successfully.",
          user: userData,
        });
      } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ error: "Error updating user" });
      }
    });
  } catch (err) {
    console.error("Error in file upload:", err);
    return res.status(500).json({ error: "Error in file upload" });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "User has been deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    const { password, ...userData } = user._doc;

    res.status(200).send({
      success: true,
      message: "User has been displayed successfully.",
      user: userData,
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log("get users api triggered");

    // Exclude password field from all user data
    const allUsers = users.map((user) => {
      const { password, ...userData } = user._doc;
      return userData;
    });
    res.status(200).json({
      success: true,
      message: "All the users have been displayed successfully.",
      users: allUsers,
    });
  } catch (err) {
    next(err);
  }
};