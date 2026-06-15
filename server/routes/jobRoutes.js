import express from "express";

import {
  addJob,
  getJobs,
  deleteJob,
  updateJobStatus,
} from "../controllers/jobController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/add",
  authMiddleware,
  addJob
);

router.get(
  "/",
  authMiddleware,
  getJobs
);

router.delete(
  "/:id",
  authMiddleware,
  deleteJob
);

router.put(
  "/:id",
  authMiddleware,
  updateJobStatus
);

export default router;