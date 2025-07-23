import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, deleteJob } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import JobTable from "../components/JobTable";
import JobFilters from "../components/JobFilters";
import useDebounce from "../hooks/useDebounce";

export default function JobListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobs, loading, filters } = useSelector((state) => state.job);

  const [searchText, setSearchText] = useState(filters.search || "");
  const [department, setDepartment] = useState(filters.department || "");
  const [sortOrder, setSortOrder] = useState(filters.sort || "newest");

  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    dispatch(fetchJobs({ search: debouncedSearch, department, sort: sortOrder }));
  }, [debouncedSearch, department, sortOrder]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job role?")) {
      dispatch(deleteJob(id));
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold">Job Roles</Typography>
        <Button variant="contained" onClick={() => navigate("/add")}>+ Add Job Role</Button>
      </Box>

      <JobFilters
        searchText={searchText}
        onSearchTextChange={setSearchText}
        department={department}
        onDepartmentChange={setDepartment}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
      ) : (
        <JobTable jobs={jobs} onEdit={(id) => navigate(`/edit/${id}`)} onDelete={handleDelete} />
      )}
    </Box>
  );
}
