import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";

export default function JobFilters({
  searchText,
  onSearchTextChange,
  department,
  onDepartmentChange,
  sortOrder,
  onSortOrderChange,
}) {
  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 4,
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(135deg, #f0f4ff, #ffffff)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "#37474f", flexBasis: "100%" }}
      >
        <FilterList sx={{ mr: 1 }} /> Filter Jobs
      </Typography>

      {/* Search Box */}
      <TextField
        variant="outlined"
        placeholder="Search by Job Title"
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "#607d8b" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          minWidth: 250,
          backgroundColor: "#fff",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: "0 0 0 2px #90caf9",
            },
          },
        }}
      />

      {/* Department Filter */}
      <Select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        displayEmpty
        sx={{
          minWidth: 180,
          backgroundColor: "#fff",
          borderRadius: 2,
          "& .MuiSelect-select": {
            py: 1.4,
            px: 2,
            fontWeight: 500,
          },
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <MenuItem value="">All Departments</MenuItem>
        <MenuItem value="Engineering">Engineering</MenuItem>
        <MenuItem value="Sales">Sales</MenuItem>
        <MenuItem value="HR">HR</MenuItem>
      </Select>

      {/* Sort Filter */}
      <Select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
        sx={{
          minWidth: 180,
          backgroundColor: "#fff",
          borderRadius: 2,
          "& .MuiSelect-select": {
            py: 1.4,
            px: 2,
            fontWeight: 500,
          },
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <MenuItem value="newest">📅 Newest First</MenuItem>
        <MenuItem value="oldest">🕒 Oldest First</MenuItem>
      </Select>
    </Paper>
  );
}
