import Interviewer from "../models/Interviewer.js";

// Create a new job posting
export const createJob = async (req, res) => {
  try {
    const { job_id, job_role, job_description } = req.body;

    const existingJob = await Interviewer.findOne({ job_id });
    if (existingJob) {
      return res.status(400).json({ message: "Job ID already exists" });
    }

    const newJob = new Interviewer({ job_id, job_role, job_description });
    await newJob.save();

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all job postings
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Interviewer.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get a specific job posting by job_id
export const getJobById = async (req, res) => {
  try {
    const { job_id } = req.params;
    const job = await Interviewer.findOne({ job_id });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update a job posting
export const updateJob = async (req, res) => {
  try {
    const { job_id } = req.params;
    const updatedJob = await Interviewer.findOneAndUpdate({ job_id }, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete a job posting
export const deleteJob = async (req, res) => {
  try {
    const { job_id } = req.params;
    const deletedJob = await Interviewer.findOneAndDelete({ job_id });

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
