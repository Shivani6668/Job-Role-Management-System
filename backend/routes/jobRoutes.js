import express from "express";
import {
  getAllJobRoles,
  createJobRole,
  updateJobRole,
  deleteJobRole
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getAllJobRoles);
router.post("/", createJobRole);
router.put("/:id", updateJobRole);
router.delete("/:id", deleteJobRole);

export default router;
