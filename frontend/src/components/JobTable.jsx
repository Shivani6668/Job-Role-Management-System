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
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  Box,
  Stack,
  Pagination,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useMemo, useState } from "react";

export default function JobTable({ jobs, onEdit, onDelete, searchText = "" }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const paginatedJobs = useMemo(
    () =>
      sortedJobs.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [sortedJobs, page, rowsPerPage]
  );

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
         No job roles found.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      {isMobile ? (
        <>
          <Stack spacing={2}>
            {paginatedJobs.map((job) => (
              <Card
                key={job._id}
                elevation={4}
                sx={{
                  borderRadius: 4,
                  backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  px: 2,
                  py: 1.5,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {highlightMatch(job.jobTitle)}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body1" gutterBottom>
                    <strong>Department:</strong> {highlightMatch(job.department)}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Level:</strong> {highlightMatch(job.level)}
                  </Typography>
                  <Typography variant="body2" gutterBottom color="text.secondary">
                    <strong>Created At:</strong>{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </Typography>
                  <Box mt={2} textAlign="right">
                    <Tooltip title="Edit" arrow>
                      <IconButton onClick={() => onEdit(job._id)} color="primary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton onClick={() => onDelete(job._id)} color="error">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Mobile Pagination */}
          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(jobs.length / rowsPerPage)}
              page={page + 1}
              onChange={(e, value) => setPage(value - 1)}
              color="primary"
            />
          </Box>
        </>
      ) : (
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
                  {[{ label: "Job Title", key: "jobTitle" },
                    { label: "Department", key: "department" },
                    { label: "Level", key: "level" },
                    { label: "Created At", key: "createdAt" }].map(({ label, key }) => (
                    <TableCell key={key}>
                      <TableSortLabel
                        active={orderBy === key}
                        direction={orderBy === key ? order : "asc"}
                        onClick={() => handleSort(key)}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
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

          <TablePagination
            component="div"
            count={jobs.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ "& .MuiTablePagination-toolbar": { px: 2 } }}
          />
        </Paper>
      )}
    </>
  );
}
