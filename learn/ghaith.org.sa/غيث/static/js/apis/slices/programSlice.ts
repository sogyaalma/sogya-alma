import { createSlice } from "@reduxjs/toolkit";
import { getAllKorba, getKorbaDetails, getPrograms } from "../actions/program.actions";

const initialState = {
  programs: [] as any,
  korbas: [] as any,
  detailsKorba: {
    statusKorba: "idle",
    korba: {} as any,
  },
  loading: false,
  error: null as unknown | null,
};
export const programSlice = createSlice({
  name: "program",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getPrograms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPrograms.fulfilled, (state, action) => {
        state.programs = action.payload.result;
        state.loading = false;
      })
      .addCase(getPrograms.rejected, (state, action) => {
        state.programs = [];
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllKorba.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllKorba.fulfilled, (state, action) => {
        state.korbas = action.payload.result;
        state.loading = false;
      })
      .addCase(getAllKorba.rejected, (state, action) => {
        state.korbas = [];
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getKorbaDetails.pending, (state) => {
        state.detailsKorba.statusKorba = "loading";
      })
      .addCase(getKorbaDetails.fulfilled, (state, action) => {
        state.detailsKorba.korba = action.payload;
        state.detailsKorba.statusKorba = "succeeded";
      })
      .addCase(getKorbaDetails.rejected, (state, action) => {
        state.detailsKorba.korba = {};
        state.error = action.payload;
      });
  },
});

export default programSlice.reducer;
