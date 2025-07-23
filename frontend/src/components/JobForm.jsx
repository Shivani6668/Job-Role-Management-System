import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%)",
        p: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={5}
        sx={{
          borderRadius: "30px",
          p: 5,
          width: "100%",
          maxWidth: 600,
          backgroundColor: "#ffffff",
          boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
          {isEditing ? "Edit Job Role" : "Create Job Role"}
        </Typography>

        <Typography variant="body2" mb={3} color="text.secondary">
          Fill in the job details below and submit the form.
        </Typography>

        <TextField
          fullWidth
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          margin="normal"
          variant="outlined"
          sx={{ borderRadius: "12px", backgroundColor: "#f8f9ff" }}
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
          variant="outlined"
          sx={{ borderRadius: "12px", backgroundColor: "#f8f9ff" }}
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
          variant="outlined"
          sx={{ borderRadius: "12px", backgroundColor: "#f8f9ff" }}
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
          variant="outlined"
          sx={{ borderRadius: "12px", backgroundColor: "#f8f9ff" }}
        />

        <Button
          type="submit"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "30px",
            fontWeight: "bold",
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            color: "#fff",
            textTransform: "none",
            '&:hover': {
              background: "linear-gradient(to right, #5b0eb8, #1e63d6)"
            }
          }}
        >
          {isEditing ? "Update Job Role" : "Create Job Role"}
        </Button>
      </Paper>
    </Box>
  );
}
