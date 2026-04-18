import { createSlice } from "@reduxjs/toolkit";
import { getAllBranches } from "../actions/branches.actions";

const initialState = {
  branches: [] as any,
  loading: false,
  error: null as unknown | null,
};
export const branchesSlice = createSlice({
  name: "branches",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBranches.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBranches.fulfilled, (state, action) => {
        state.branches = action.payload;
        state.loading = false;
      })
      .addCase(getAllBranches.rejected, (state, action) => {
        state.branches = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default branchesSlice.reducer;
 