import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrlApi } from "../../proxy";
import axios, { AxiosResponse } from "axios";

export const getJobsOpportunities = createAsyncThunk(
  "jobs/getJobsOpportunities",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}jobs`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const toAddJobApplication = createAsyncThunk<
  AxiosResponse<any, any>,
  any
>("login/toLogin", async (job) => {
  try {
    const response = await axios.post(`${baseUrlApi}job/application`, job);
    return response?.data;
  } catch (error) {
    throw error;
  }
});

export const getCertificateForJobs = createAsyncThunk(
  "jobs/getCertificateForJobs",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}degree/types`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
