import { Box, TextField, Select, MenuItem, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function JobFilters({
  searchText,
  onSearchTextChange,
  department,
  onDepartmentChange,
  sortOrder,
  onSortOrderChange,
}) {
  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField
        placeholder="Search by Job Title"
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><Search /></InputAdornment>
          ),
        }}
        sx={{ minWidth: 250 }}
      />

      <Select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        displayEmpty
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">All Departments</MenuItem>
        <MenuItem value="Engineering">Engineering</MenuItem>
        <MenuItem value="Sales">Sales</MenuItem>
        <MenuItem value="HR">HR</MenuItem>
      </Select>

      <Select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="newest">Newest First</MenuItem>
        <MenuItem value="oldest">Oldest First</MenuItem>
      </Select>
    </Box>
  );
}
