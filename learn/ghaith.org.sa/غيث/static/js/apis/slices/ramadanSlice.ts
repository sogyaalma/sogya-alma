import { createSlice } from "@reduxjs/toolkit";
import {
  getAvailableDays,
  getRamadamanSetting,
  getRamadanDayInformations,
  getRamadanList,
} from "../actions/ramadan.actions";

const initialState = {
  ramadanList: [] as any,
  AvailableDays: [] as any,
  dayInformations: {} as any,
  loadingDay: false,
  loading: false,
  loadingAvailable: false,
  error: null as unknown | null,
  quotes: [] as any,
  ShowRamadan: false as boolean,
};
export const ramadanSlice = createSlice({
  name: "ramadan",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getRamadanList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRamadanList.fulfilled, (state, action) => {
        state.ramadanList = action.payload;
        state.loading = false;
      })
      .addCase(getRamadanList.rejected, (state, action) => {
        state.ramadanList = [];
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getRamadanDayInformations.pending, (state) => {
        state.loadingDay = true;
      })
      .addCase(getRamadanDayInformations.fulfilled, (state, action) => {
        state.dayInformations = action.payload;
        state.loadingDay = false;
      })
      .addCase(getRamadanDayInformations.rejected, (state, action) => {
        state.dayInformations = {};
        state.loadingDay = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAvailableDays.pending, (state) => {
        state.loadingAvailable = true;
      })
      .addCase(getAvailableDays.fulfilled, (state, action) => {
        state.AvailableDays = action.payload;
        state.loadingAvailable = false;
      })
      .addCase(getAvailableDays.rejected, (state, action) => {
        state.AvailableDays = {};
        state.loadingAvailable = false;
        state.error = action.payload;
      });
    builder
      .addCase(getRamadamanSetting.pending, (state) => {})
      .addCase(getRamadamanSetting.fulfilled, (state, action) => {
        state.ShowRamadan = action.payload?.open_ramadan_donation;
      })
      .addCase(getRamadamanSetting.rejected, (state, action) => {
        state.ShowRamadan = false;
        state.error = action.payload;
      });
  },
});

export default ramadanSlice.reducer;
