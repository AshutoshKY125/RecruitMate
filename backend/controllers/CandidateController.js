import Candidate from "../models/Candidate.js";

// Candidate create karne ka function
export const createCandidate = async (req, res) => {
  try {
    console.log("🟢 Request Body:", req.body);

    const { name, email, linkedin, github, leetcode, gfg, profile, resume_link, others } = req.body;
    
    if (!name || !email || !resume_link) {
      throw new Error("Name, Email, and Resume Link are required!");
    }

    const candidate = new Candidate({ name, email, linkedin, github, leetcode, gfg, profile, resume_link, others });
    await candidate.save();

    console.log("✅ Candidate Saved:", candidate);
    res.status(201).json({ message: "Candidate profile created successfully", candidate });
  } catch (error) {
    console.error("❌ Error creating candidate:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Sare candidates fetch karne ka function
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Specific candidate fetch karne ka function
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Candidate update karne ka function
export const updateCandidate = async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Candidate delete karne ka function
export const deleteCandidate = async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!deletedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
