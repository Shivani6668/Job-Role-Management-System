import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  Select,
  Paper,
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob, fetchJobs, setFilters, setSelectedJob } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

// Utility hook for debounce
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // Cleanup on unmount or value change
  }, [value, delay]);

  return debouncedValue;
}

export default function JobListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { jobs, loading, filters } = useSelector((state) => state.job);

  // Local filters state
  const [searchText, setSearchText] = useState(filters.search || "");
  const [sortOrder, setSortOrder] = useState(filters.sort || "newest");
  const [department, setDepartment] = useState(filters.department || "");

  // Debounced search input value
  const debouncedSearchText = useDebounce(searchText, 500); // Adjust debounce time if needed

  // Fetch jobs when filters change
  useEffect(() => {
    dispatch(fetchJobs({ search: debouncedSearchText, department, sort: sortOrder }));
  }, [debouncedSearchText, department, sortOrder, dispatch]);

  // Delete job role
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job role?")) {
      dispatch(deleteJob(id));
    }
  };

  // UI Rendering
  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Job Roles
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/add")}>
          + Add Job Role
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={2}>
        {/* Search Field with Icon */}
        <TextField
          placeholder="Search by Job Title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Department Filter */}
        <Select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          displayEmpty
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Departments</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
        </Select>

        {/* Sort Filter */}
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>
      </Box>

      {/* Job Table or Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.jobTitle}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>{job.level}</TableCell>
                  <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/edit/${job._id}`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(job._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {jobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No job roles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
