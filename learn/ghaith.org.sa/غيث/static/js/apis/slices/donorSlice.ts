import { createSlice } from "@reduxjs/toolkit";
import {
  getContactMethods,
  getContactTime,
  getDeductions,
  getDeductionTypes,
  getDetailsProgram,
  getDonationList,
  getDonorFlow,
  getDonorMedals,
  getDonorReports,
  getProgramTypes,
  getSponsored,
} from "../actions/donor.actions";

const initialState = {
  programTypes: [] as any,
  deductionTypes: [] as any,
  contactMethods: [] as any,
  contactTime: [] as any,
  donorFlow: [] as any,
  donorMedals: [] as any,

  detailsProgram: {
    status: "idle",
    program: {} as any,
  },
  donorDonations: {
    loading: false,
    error: null as unknown | null,
    data: [] as any,
  },
  donorSponsored: {
    loading: false,
    error: null as unknown | null,
    data: [] as any,
  },
  donorDeductions: {
    loading: false,
    error: null as unknown | null,
    data: [] as any,
  },
  donorReports: {
    loading: false,
    error: null as unknown | null,
    data: [] as any,
  },
  TotaldonorDonations: 0 as number,
  TotaldonorSponsored: 0 as number,
  TotaldonorDeductions: 0 as number,
  TotaldonorReports: 0 as number,

  loading: false,
  error: null as unknown | null,
};
export const donorSlice = createSlice({
  name: "donor",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProgramTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProgramTypes.fulfilled, (state, action) => {
        state.programTypes = action.payload;
        state.loading = false;
      })
      .addCase(getProgramTypes.rejected, (state, action) => {
        state.programTypes = [];
        state.loading = false;
        state.error = action.payload;
      })
      ////////// program details //////////
      .addCase(getDetailsProgram.pending, (state) => {
        state.detailsProgram.status = "loading";
      })
      .addCase(getDetailsProgram.fulfilled, (state, action) => {
        state.detailsProgram.program = action.payload.result;
        state.detailsProgram.status = "succeeded";
      })
      .addCase(getDetailsProgram.rejected, (state, action) => {
        state.detailsProgram.program = {};
        state.error = action.payload;
      });
    //////////////// GET DONATION LIST //////////////
    builder.addCase(getDonationList.pending, (state) => {
      state.donorDonations.loading = true;
    });
    builder.addCase(getDonationList.fulfilled, (state, action) => {
      state.donorDonations.data = action.payload?.data;
      state.TotaldonorDonations = action.payload?.total_pages;
      state.donorDonations.loading = false;
    });
    builder.addCase(getDonationList.rejected, (state, action) => {
      state.TotaldonorDonations = 0;
      state.donorDonations.data = [];
      state.donorDonations.loading = false;
      state.error = action.payload;
    });
    //////////// donor flow ///////////
    builder
      .addCase(getDonorFlow.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDonorFlow.fulfilled, (state, action) => {
        state.donorFlow = action.payload;
        state.loading = false;
      })
      .addCase(getDonorFlow.rejected, (state, action) => {
        state.donorFlow = [];
        state.loading = false;
        state.error = action.payload;
      });
    //////////////// GET DONATION LIST //////////////
    builder.addCase(getSponsored.pending, (state) => {
      state.donorSponsored.loading = true;
    });
    builder.addCase(getSponsored.fulfilled, (state, action) => {
      state.donorSponsored.data = action.payload?.data;
      state.TotaldonorSponsored = action.payload?.total_pages;
      state.donorSponsored.loading = false;
    });
    builder.addCase(getSponsored.rejected, (state, action) => {
      state.TotaldonorSponsored = 0;
      state.donorSponsored.data = [];
      state.donorSponsored.loading = false;
      state.error = action.payload;
    });
    /////////////// GET DEDUCTION LIST /////////////////
    builder.addCase(getDeductions.pending, (state) => {
      state.donorDeductions.loading = true;
    });
    builder.addCase(getDeductions.fulfilled, (state, action) => {
      state.donorDeductions.data = action.payload?.data;
      state.TotaldonorDeductions = action.payload?.total_pages;
      state.donorDeductions.loading = false;
    });
    builder.addCase(getDeductions.rejected, (state, action) => {
      state.TotaldonorDeductions = 0;
      state.donorDeductions.data = [];
      state.donorDeductions.loading = false;
      state.error = action.payload;
    });

    //////////// deduction types ////////////
    builder
      .addCase(getDeductionTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeductionTypes.fulfilled, (state, action) => {
        state.deductionTypes = action.payload;
        state.loading = false;
      })
      .addCase(getDeductionTypes.rejected, (state, action) => {
        state.deductionTypes = [];
        state.loading = false;
        state.error = action.payload;
      });
    //////////// contact  methods ////////////
    builder
      .addCase(getContactMethods.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContactMethods.fulfilled, (state, action) => {
        state.contactMethods = action.payload;
        state.loading = false;
      })
      .addCase(getContactMethods.rejected, (state, action) => {
        state.contactMethods = [];
        state.loading = false;
        state.error = action.payload;
      });
    //////////// contact  Time ////////////
    builder
      .addCase(getContactTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContactTime.fulfilled, (state, action) => {
        state.contactTime = action.payload;
        state.loading = false;
      })
      .addCase(getContactTime.rejected, (state, action) => {
        state.contactTime = [];
        state.loading = false;
        state.error = action.payload;
      });
    /////// get donor medals /////////
    builder
      .addCase(getDonorMedals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDonorMedals.fulfilled, (state, action) => {
        state.donorMedals = action.payload;
        state.loading = false;
      })
      .addCase(getDonorMedals.rejected, (state, action) => {
        state.donorMedals = [];
        state.loading = false;
        state.error = action.payload;
      });
    ////////// get donor reports /////////
    builder.addCase(getDonorReports.pending, (state) => {
      state.donorReports.loading = true;
    });
    builder.addCase(getDonorReports.fulfilled, (state, action) => {
      state.donorReports.data = action.payload?.result;
      state.TotaldonorReports = action.payload?.total_pages;
      state.donorReports.loading = false;
    });
    builder.addCase(getDonorReports.rejected, (state, action) => {
      state.TotaldonorReports = 0;
      state.donorReports.data = [];
      state.donorReports.loading = false;
      state.error = action.payload;
    });
  },
});

export default donorSlice.reducer;
