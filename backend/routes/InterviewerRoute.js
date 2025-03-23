import express from "express";
import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from "../controllers/InterviewerController.js";

const router = express.Router();

router.post("/create", createJob);
router.get("/all", getAllJobs);
router.get("/:job_id", getJobById);
router.put("/:job_id", updateJob);
router.delete("/:job_id", deleteJob);

export default router;
