import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/jobroles";

export const fetchJobs = createAsyncThunk("job/fetchJobs", async (params) => {
  const res = await axios.get(API, { params });
  return res.data;
});

export const addJob = createAsyncThunk("job/addJob", async (job) => {
  const res = await axios.post(API, job);
  return res.data;
});

export const updateJob = createAsyncThunk("job/updateJob", async ({ id, job }) => {
  const res = await axios.put(`${API}/${id}`, job);
  return res.data;
});

export const deleteJob = createAsyncThunk("job/deleteJob", async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    filters: {
      search: "",
      department: "",
      sort: "newest"
    },
    selectedJob: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const idx = state.jobs.findIndex(j => j._id === action.payload._id);
        if (idx !== -1) state.jobs[idx] = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(j => j._id !== action.payload);
      });
  },
});

export const { setFilters, setSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
