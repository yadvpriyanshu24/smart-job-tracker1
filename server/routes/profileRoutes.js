import express from "express";



import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router =
  express.Router();

// Get Profile
router.get(
  "/",
  authMiddleware,
  getProfile
);

// Update Profile
router.put(
  "/",
  authMiddleware,
  updateProfile
);

export default router;