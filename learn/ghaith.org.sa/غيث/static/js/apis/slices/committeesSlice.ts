import { createSlice } from "@reduxjs/toolkit";
import { toGetCommittees } from "../actions/committees.actions";

const initialState = {
  committes: [] as any,
  loading: false,
  error: null as unknown | null,
};
export const committeesSlice = createSlice({
  name: "committees",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(toGetCommittees.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetCommittees.fulfilled, (state, action) => {
        state.committes = action?.payload?.data;
        state.loading = false;
      })
      .addCase(toGetCommittees.rejected, (state, action) => {
        state.committes = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default committeesSlice.reducer;
