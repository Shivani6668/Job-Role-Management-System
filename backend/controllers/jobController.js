import JobRole from "../models/JobRole.js";

// GET: All Job Roles
export const getAllJobRoles = async (req, res) => {
  try {
    const { search, department, sort } = req.query;
    let query = {};

    if (search) {
      query.jobTitle = { $regex: search, $options: "i" };
    }
    if (department) {
      query.department = department;
    }

    const sortBy = sort === "oldest" ? "createdAt" : "-createdAt";

    const jobs = await JobRole.find(query).sort(sortBy);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// POST: Create a Job Role
export const createJobRole = async (req, res) => {
  try {
    const { jobTitle, department, level, description } = req.body;

    const job = new JobRole({ jobTitle, department, level, description });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: "Failed to create job role", error });
  }
};

// PUT: Update a Job Role
export const updateJobRole = async (req, res) => {
  try {
    const updatedJob = await JobRole.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedJob) return res.status(404).json({ message: "Job Role not found" });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
  }
};

// DELETE: Delete a Job Role
export const deleteJobRole = async (req, res) => {
  try {
    const deleted = await JobRole.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Job Role not found" });

    res.status(200).json({ message: "Job Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
