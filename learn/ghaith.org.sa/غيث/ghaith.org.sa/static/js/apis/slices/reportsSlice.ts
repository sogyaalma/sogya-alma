import { createSlice } from "@reduxjs/toolkit";
import {
  toGetAnnualReports,
  toGetFeedback,
  toGetFinancialStatements,
  toGetGoalsPrograms,
  toGetOperationalPlans,
  toGetPerformanceReports,
  toGetQualityDevelopment,
  toGetRegualationsSystems,
  toGetOfficials,
  toGetAssociationData,
  toGetMediaReports,
} from "../actions/reports.actions";

const initialState = {
  reports: [] as any,
  color: {} as any,
  loading: false,
  error: null as unknown | null,
};
export const reportsSlice = createSlice({
  name: "reports",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(toGetAnnualReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetAnnualReports.fulfilled, (state, action) => {
        state.color = action?.payload?.data?.color;
        state.reports = action?.payload?.data?.annual_reports;
        state.loading = false;
      })
      .addCase(toGetAnnualReports.rejected, (state, action) => {
        state.reports = [];
        state.color = {};
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(toGetQualityDevelopment.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetQualityDevelopment.fulfilled, (state, action) => {
        state.color = action?.payload?.data?.color;
        state.reports = action?.payload?.data?.quality_development;
        state.loading = false;
      })
      .addCase(toGetQualityDevelopment.rejected, (state, action) => {
        state.reports = [];
        state.color = {};
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(toGetPerformanceReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetPerformanceReports.fulfilled, (state, action) => {
        state.color = action?.payload?.data?.color;
        state.reports = action?.payload?.data?.performance_reports;
        state.loading = false;
      })
      .addCase(toGetPerformanceReports.rejected, (state, action) => {
        state.reports = [];
        state.color = {};
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(toGetRegualationsSystems.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetRegualationsSystems.fulfilled, (state, action) => {
        state.color = action?.payload?.data?.color;
        state.reports = action?.payload?.data?.regulations;
        state.loading = false;
      })
      .addCase(toGetRegualationsSystems.rejected, (state, action) => {
        state.reports = [];
        state.color = {};
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(toGetOperationalPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetOperationalPlans.fulfilled, (state, action) => {
        state.color = action?.payload?.data?.color;
        state.reports = action?.payload?.data?.operational_plans;
        state.loading = false;
      })
      .addCase(toGetOperationalPlans.rejected, (state, action) => {
        state.reports = [];
        state.color = {};
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(toGetFinancialStatements.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetFinancialStatements.fulfilled, (state, action) => {
        state.color = action?.payload?.data?.color;
        state.reports = action?.payload?.data?.financial_statement;
        state.loading = false;
      })
      .addCase(toGetFinancialStatements.rejected, (state, action) => {
        state.reports = [];
        state.color = {};
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(toGetGoalsPrograms.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetGoalsPrograms.fulfilled, (state, action) => {
        state.color = action?.payload?.data?.color;
        state.reports = action?.payload?.data?.goals_programs;
        state.loading = false;
      })
      .addCase(toGetGoalsPrograms.rejected, (state, action) => {
        state.reports = [];
        state.color = {};
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(toGetFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetFeedback.fulfilled, (state, action) => {
        state.color = action?.payload?.data?.color;
        state.reports = action?.payload?.data?.feedback;
        state.loading = false;
      })
      .addCase(toGetFeedback.rejected, (state, action) => {
        state.reports = [];
        state.color = {};
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(toGetOfficials.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetOfficials.fulfilled, (state, action) => {
        state.color = action?.payload?.data?.color;
        state.reports = action?.payload?.data?.officials_details;
        state.loading = false;
      })
      .addCase(toGetOfficials.rejected, (state, action) => {
        state.reports = [];
        state.color = {};
        state.loading = false;
        state.error = action.payload;
      });

    /// to get association DATA////
    builder
      .addCase(toGetAssociationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetAssociationData.fulfilled, (state, action) => {
        state.color = action?.payload?.data?.color;
        state.reports = action?.payload?.data?.association_data_details;
        state.loading = false;
      })
      .addCase(toGetAssociationData.rejected, (state, action) => {
        state.reports = [];
        state.color = {};
        state.loading = false;
        state.error = action.payload;
      }); /// to get media reports ///
    builder
      .addCase(toGetMediaReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetMediaReports.fulfilled, (state, action) => {
        state.reports = action?.payload?.data;
        state.loading = false;
      })
      .addCase(toGetMediaReports.rejected, (state, action) => {
        state.reports = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reportsSlice.reducer;
