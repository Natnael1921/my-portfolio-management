import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getProjects);

// IMPORTANT
router.post("/", protect, upload.single("image"), createProject);

router.put("/:id", protect, upload.single("image"), updateProject);

router.delete("/:id", protect, deleteProject);

export default router;
