import mongoose from "mongoose";

const jobRoleSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["Junior", "Mid", "Senior", "Lead"],
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model("JobRole", jobRoleSchema);
