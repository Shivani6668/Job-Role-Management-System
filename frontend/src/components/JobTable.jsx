import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function JobTable({ jobs, onEdit, onDelete }) {
  if (jobs.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="subtitle1">No job roles found.</Typography>
      </Paper>
    );
  }

  return (
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
                <IconButton color="primary" onClick={() => onEdit(job._id)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(job._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
