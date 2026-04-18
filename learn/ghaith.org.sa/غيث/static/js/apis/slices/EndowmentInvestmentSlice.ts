import { createSlice } from "@reduxjs/toolkit";
import { toGetInvestments } from "../actions/EndowmentInvestment.actions";

const initialState = {
  investments: [] as any,
  loading: false,
  error: null as unknown | null,
};
export const investmentsSlice = createSlice({
  name: "investments",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(toGetInvestments.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetInvestments.fulfilled, (state, action) => {
        state.investments = action?.payload?.data;
        state.loading = false;
      })
      .addCase(toGetInvestments.rejected, (state, action) => {
        state.investments = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default investmentsSlice.reducer;
