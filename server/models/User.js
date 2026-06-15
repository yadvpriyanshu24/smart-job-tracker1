import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    default: "",
  },

  skills: {
    type: String,
    default: "",
  },

  education: {
    type: String,
    default: "",
  },

  experience: {
    type: String,
    default: "",
  },

  preferredRole: {
    type: String,
    default: "",
  },

  location: {
    type: String,
    default: "",
  },

  profileImage: {
    type: String,
    default: "",
  },
});

const User = mongoose.model(
  "User",
  userSchema
);

export default User;