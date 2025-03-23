import { Schema, model } from 'mongoose';
const CandidateSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    leetcode: { type: String, default: "" },
    gfg: { type: String, default: "" },
    profile: { type: String, default: "" },
    resume_link: { type: String, required: true },
    others: { type: String, default: "" }
  }, { timestamps: true });
  
export default model("Candidate", CandidateSchema);
  