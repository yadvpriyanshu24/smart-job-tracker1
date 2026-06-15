import express from "express";

import upload from "../middleware/resumeUpload.js";

import { uploadResume } from "../controllers/aiUploadController.js";

const router =
  express.Router();

router.post(
  "/upload-resume",
  upload.single(
    "resume"
  ),
  uploadResume
);

export default router;