import mongoose from "mongoose";

const profileSchema =
  new mongoose.Schema({
    userId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: String,
    email: String,
    skills: String,
    education: String,
    experience: String,
  });

export default mongoose.model(
  "Profile",
  profileSchema
);