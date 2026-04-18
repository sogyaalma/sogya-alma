import { createSlice } from "@reduxjs/toolkit";
import {
  getCertificateForJobs,
  getJobsOpportunities,
  toAddJobApplication,
} from "../actions/jobs.actions";

const initialState = {
  jobs: [] as any,
  application: {
    request: null as any,
    loading: false,
    error: null as unknown | null,
  },
  certificateJobs: [] as any,
  loading: false,
  error: null as unknown | null,
};
export const jobsSlice = createSlice({
  name: "jobs",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJobsOpportunities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getJobsOpportunities.fulfilled, (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
    });
    builder.addCase(getJobsOpportunities.rejected, (state, action) => {
      state.jobs = [];
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(toAddJobApplication.pending, (state) => {
      state.application.loading = true;
    });
    builder.addCase(toAddJobApplication.fulfilled, (state, action) => {
      state.application.request = action.payload;
      state.application.loading = false;
    });
    builder.addCase(toAddJobApplication.rejected, (state, action) => {
      state.application.request = null;
      state.application.loading = false;
      state.application.error = action.payload;
    });

    builder.addCase(getCertificateForJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCertificateForJobs.fulfilled, (state, action) => {
      state.certificateJobs = action.payload;
      state.loading = false;
    });
    builder.addCase(getCertificateForJobs.rejected, (state, action) => {
      state.certificateJobs = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default jobsSlice.reducer;
