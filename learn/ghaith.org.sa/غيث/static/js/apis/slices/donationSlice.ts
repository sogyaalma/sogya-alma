import { createSlice } from "@reduxjs/toolkit";
import {
  getCardTypes,
  getCompanyBanks,
  getUmrahTypes,
  toPrintBankTransferReceipt,
  toPrintReceipt,
} from "../actions/donation.actions";

const initialState = {
  cardTypes: [] as any,
  donationTypes: [] as any,
  umrahTypes: [] as any,
  banks: [] as any,
  printRequest: {} as any,
  printBankReceipt: {} as any,
  loadingPrint: false,
  loading: false,
  loadingPrintBankReceipt: false,
  error: null as unknown | null,
};
export const donationSlice = createSlice({
  name: "donation",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCardTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCardTypes.fulfilled, (state, action) => {
        state.cardTypes = action.payload;
        state.loading = false;
      })
      .addCase(getCardTypes.rejected, (state, action) => {
        state.cardTypes = [];
        state.loading = false;
        state.error = action.payload;
      });
    /////// donation type ///////

    ///// get company banks ////////////
    builder
      .addCase(getCompanyBanks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompanyBanks.fulfilled, (state, action) => {
        state.banks = action.payload;
        state.loading = false;
      })
      .addCase(getCompanyBanks.rejected, (state, action) => {
        state.banks = [];
        state.loading = false;
        state.error = action.payload;
      }); /////// umrah type ///////
    builder
      .addCase(getUmrahTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUmrahTypes.fulfilled, (state, action) => {
        state.umrahTypes = action.payload?.umrah_types;
        state.loading = false;
      })
      .addCase(getUmrahTypes.rejected, (state, action) => {
        state.umrahTypes = [];
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(toPrintReceipt.pending, (state) => {
        state.loadingPrint = true;
      })
      .addCase(toPrintReceipt.fulfilled, (state, action) => {
        state.printRequest = action.payload;
        state.loadingPrint = false;
      })
      .addCase(toPrintReceipt.rejected, (state, action) => {
        state.printRequest = {};
        state.loadingPrint = false;
        state.error = action.payload;
      });
    builder
      .addCase(toPrintBankTransferReceipt.pending, (state) => {
        state.loadingPrintBankReceipt = true;
      })
      .addCase(toPrintBankTransferReceipt.fulfilled, (state, action) => {
        state.printBankReceipt = action.payload;
        state.loadingPrintBankReceipt = false;
      })
      .addCase(toPrintBankTransferReceipt.rejected, (state, action) => {
        state.printBankReceipt = {};
        state.loadingPrintBankReceipt = false;
        state.error = action.payload;
      });
  },
});

export default donationSlice.reducer;
