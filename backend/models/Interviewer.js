import { Schema, model } from 'mongoose';

const InterviewerSchema = new Schema({
  job_id: { type: String, required: true, unique: true },
  job_role: { type: String, required: true },
  job_description: { type: String, required: true }
}, { timestamps: true });

export default model("Interviewer", InterviewerSchema);
