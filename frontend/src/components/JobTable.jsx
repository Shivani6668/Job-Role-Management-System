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
  Tooltip,
  TableSortLabel,
  TablePagination,
  useTheme,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useMemo, useState } from "react";

export default function JobTable({ jobs, onEdit, onDelete, searchText = "" }) {
  const theme = useTheme();

  const [orderBy, setOrderBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      const valA = a[orderBy];
      const valB = b[orderBy];

      if (typeof valA === "string") {
        return order === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else if (valA instanceof Date || typeof valA === "number") {
        return order === "asc" ? valA - valB : valB - valA;
      }

      return 0;
    });
  }, [jobs, order, orderBy]);

  const highlightMatch = (text) => {
    if (!searchText) return text;

    const regex = new RegExp(`(${searchText})`, "gi");
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <mark
          key={idx}
          style={{
            backgroundColor: "#ffeeba",
            padding: "0 2px",
            borderRadius: 2,
          }}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const paginatedJobs = useMemo(
    () =>
      sortedJobs.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [sortedJobs, page, rowsPerPage]
  );

  const isDarkMode = theme.palette.mode === "dark";

  if (jobs.length === 0) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 4,
          backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          🚫 No job roles found.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: isDarkMode
                  ? "#2e2e2e"
                  : "linear-gradient(90deg, #e3f2fd, #ffffff)",
              }}
            >
              {[
                { label: "Job Title", key: "jobTitle" },
                { label: "Department", key: "department" },
                { label: "Level", key: "level" },
                { label: "Created At", key: "createdAt" },
              ].map(({ label, key }) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : "asc"}
                    onClick={() => handleSort(key)}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {label}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedJobs.map((job) => (
              <TableRow
                key={job._id}
                hover
                sx={{
                  transition: "background 0.2s",
                  "&:hover": {
                    backgroundColor: isDarkMode ? "#2a2a2a" : "#f1f8ff",
                  },
                }}
              >
                <TableCell>{highlightMatch(job.jobTitle)}</TableCell>
                <TableCell>{highlightMatch(job.department)}</TableCell>
                <TableCell>{highlightMatch(job.level)}</TableCell>
                <TableCell>
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(job._id)}
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <IconButton
                      color="error"
                      onClick={() => onDelete(job._id)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={jobs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& .MuiTablePagination-toolbar": {
            px: 2,
          },
        }}
      />
    </Paper>
  );
}
