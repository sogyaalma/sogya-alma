import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrlApi } from "../../proxy";
import axios from "axios";

export const getSuccessPartners = createAsyncThunk(
  "home/getSuccessPartners",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}partners/success`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getHomeProjects = createAsyncThunk(
  "home/getHomeProjects",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}website/projects`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getDetailsProject = createAsyncThunk(
  "project/getDetailsProject",
  async (access_token: string | undefined) => {
    try {
      const response = await axios.get(
        `${baseUrlApi}website/projects/details/${access_token}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const toGetDonationMethods = createAsyncThunk(
  "cardTypes/toGetDonationMethods",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}donation_methods`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getQuotes = createAsyncThunk("home/getQuotes", async () => {
  try {
    const response = await axios.get(`${baseUrlApi}website/testimonial`);
    return response?.data;
  } catch (error) {
    throw error;
  }
});

export const getStatistics = createAsyncThunk(
  "home/getStatistics",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}website/statistic`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getBanners = createAsyncThunk(
  "home/getBanners",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}banners`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
