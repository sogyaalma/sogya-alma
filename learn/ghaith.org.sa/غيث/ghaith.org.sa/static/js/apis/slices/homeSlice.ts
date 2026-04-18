import { createSlice } from "@reduxjs/toolkit";
import {
  getBanners,
  getDetailsProject,
  getHomeProjects,
  getQuotes,
  getStatistics,
  getSuccessPartners,
  toGetDonationMethods,
} from "../actions/home.actions";

const initialState = {
  donationMethods: [] as any,
  partners: [] as any,
  projects: [] as any,
  statistics: [] as any,
  banners: [] as any,
  detailsProject: {
    status: "idle",
    project: {} as any,
  },
  loading: false,
  error: null as unknown | null,
  quotes: [] as any,
};
export const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getSuccessPartners.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSuccessPartners.fulfilled, (state, action) => {
        state.partners = action.payload;
        state.loading = false;
      })
      .addCase(getSuccessPartners.rejected, (state, action) => {
        state.partners = [];
        state.loading = false;
        state.error = action.payload;
      });

    /////////// GET STATISTICS ////////////
    builder
      .addCase(getQuotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuotes.fulfilled, (state, action) => {
        state.quotes = action.payload;
        state.loading = false;
      })
      .addCase(getQuotes.rejected, (state, action) => {
        state.quotes = [];
        state.loading = false;
        state.error = action.payload;
      });
    /////////// GET PROJECTS ///////////
    builder
      .addCase(getHomeProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHomeProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(getHomeProjects.rejected, (state, action) => {
        state.projects = [];
        state.loading = false;
        state.error = action.payload;
      }); ////////// program details //////////
    builder
      .addCase(getDetailsProject.pending, (state) => {
        state.detailsProject.status = "loading";
      })
      .addCase(getDetailsProject.fulfilled, (state, action) => {
        state.detailsProject.project = action.payload;
        state.detailsProject.status = "succeeded";
      })
      .addCase(getDetailsProject.rejected, (state, action) => {
        state.detailsProject.project = {};
        state.error = action.payload;
      });
    builder
      .addCase(toGetDonationMethods.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetDonationMethods.fulfilled, (state, action) => {
        state.donationMethods = action.payload;
        state.loading = false;
      })
      .addCase(toGetDonationMethods.rejected, (state, action) => {
        state.donationMethods = [];
        state.loading = false;
        state.error = action.payload;
      });
    /////////// GET STATISTICS ////////////
    builder
      .addCase(getStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
        state.loading = false;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.statistics = [];
        state.loading = false;
        state.error = action.payload;
      });

    /////////// GET BANNERS ////////////
    builder
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
        state.loading = false;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.banners = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
