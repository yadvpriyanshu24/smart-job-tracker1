import User from "../models/User.js";

// Get Profile
export const getProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch profile",
      });
    }
  };

// Update Profile
export const updateProfile =
  async (req, res) => {
    try {
      const updatedUser =
        await User.findByIdAndUpdate(
          req.user.id,
          req.body,
          {
            new: true,
          }
        ).select("-password");

      res.status(200).json({
        message:
          "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to update profile",
      });
    }
  };