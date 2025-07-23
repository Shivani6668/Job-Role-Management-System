import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

const levels = ["Junior", "Mid", "Senior", "Lead"];
const departments = ["Engineering", "Sales", "HR"];

export default function JobForm({ onSubmit, initialValues = {}, isEditing = false }) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    level: "",
    description: "",
  });

useEffect(() => {
  if (isEditing && initialValues) {
    setFormData({
      jobTitle: initialValues.jobTitle || "",
      department: initialValues.department || "",
      level: initialValues.level || "",
      description: initialValues.description || "",
    });
  }
}, [initialValues, isEditing]);



  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} maxWidth={600} mx="auto" mt={3}>
      <Typography variant="h6" mb={2}>
        {isEditing ? "Edit Job Role" : "Create Job Role"}
      </Typography>

      <TextField
        fullWidth
        label="Job Title"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
        required
        margin="normal"
      />

      <TextField
        select
        fullWidth
        label="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
        margin="normal"
      >
        {departments.map((dept) => (
          <MenuItem key={dept} value={dept}>
            {dept}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        label="Level"
        name="level"
        value={formData.level}
        onChange={handleChange}
        required
        margin="normal"
      >
        {levels.map((lvl) => (
          <MenuItem key={lvl} value={lvl}>
            {lvl}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {isEditing ? "Update Job Role" : "Create Job Role"}
      </Button>
    </Box>
  );
}
