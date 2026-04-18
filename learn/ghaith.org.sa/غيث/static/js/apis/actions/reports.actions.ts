import axios, { AxiosResponse } from "axios";
import { baseUrlApi } from "../../proxy";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get annual reports
export const toGetAnnualReports = createAsyncThunk<AxiosResponse<any, any>>(
  "reports/toGetAnnualReports",
  async () => {
    try {
      let response = await axios.get(`${baseUrlApi}annual/reports`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// get quality development
export const toGetQualityDevelopment = createAsyncThunk<
  AxiosResponse<any, any>
>("reports/toGetQualityDevelopment", async () => {
  try {
    let response = await axios.get(`${baseUrlApi}quality/development`);
    return response;
  } catch (error) {
    throw error;
  }
});

// get performance reports
export const toGetPerformanceReports = createAsyncThunk<
  AxiosResponse<any, any>
>("reports/toGetPerformanceReports", async () => {
  try {
    let response = await axios.get(`${baseUrlApi}performance/reports`);
    return response;
  } catch (error) {
    throw error;
  }
});

// get regulations systems
export const toGetRegualationsSystems = createAsyncThunk<
  AxiosResponse<any, any>
>("reports/toGetRegualationsSystems", async () => {
  try {
    let response = await axios.get(`${baseUrlApi}regulations/systems`);
    return response;
  } catch (error) {
    throw error;
  }
});

// get operational plans
export const toGetOperationalPlans = createAsyncThunk<AxiosResponse<any, any>>(
  "reports/toGetOperationalPlans",
  async () => {
    try {
      let response = await axios.get(`${baseUrlApi}operational/plans`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// get financial statements
export const toGetFinancialStatements = createAsyncThunk<
  AxiosResponse<any, any>
>("reports/toGetFinancialStatements", async () => {
  try {
    let response = await axios.get(`${baseUrlApi}financial/statements`);
    return response;
  } catch (error) {
    throw error;
  }
});

// get goals programs
export const toGetGoalsPrograms = createAsyncThunk<AxiosResponse<any, any>>(
  "reports/toGetGoalsPrograms",
  async () => {
    try {
      let response = await axios.get(`${baseUrlApi}goals/programs`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// get feedback
export const toGetFeedback = createAsyncThunk<AxiosResponse<any, any>>(
  "reports/toGetFeedback",
  async () => {
    try {
      let response = await axios.get(`${baseUrlApi}feedback`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
// get officials
export const toGetOfficials = createAsyncThunk<AxiosResponse<any, any>>(
  "officials/details",
  async () => {
    try {
      let response = await axios.get(`${baseUrlApi}officials/details`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
// get officials
export const toGetAssociationData = createAsyncThunk<AxiosResponse<any, any>>(
  "reports/toGetAssociationData",
  async () => {
    try {
      let response = await axios.get(`${baseUrlApi}association/data/details`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
// get media reporst
export const toGetMediaReports = createAsyncThunk<AxiosResponse<any, any>>(
  "reports/toGetMediaReports",
  async () => {
    try {
      let response = await axios.get(`${baseUrlApi}media/report`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
