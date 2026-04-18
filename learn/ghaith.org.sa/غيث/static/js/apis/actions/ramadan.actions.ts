import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrlApi } from "../../proxy";
import axios, { AxiosResponse } from "axios";

export const getRamadanList = createAsyncThunk(
  "ramadan/getRamadanList",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}target/ramadan`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getRamadanDayInformations = createAsyncThunk<
  AxiosResponse<any, any>,
  any
>("ramadan/getRamadanDayInformations", async (data) => {
  try {
    const response = await axios.post(`${baseUrlApi}ramadan/day`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});
export const getAvailableDays = createAsyncThunk(
  "ramadan/getAvailableDays",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}ramadan/available/days`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getRamadamanSetting = createAsyncThunk(
  "ramadan/getRamadamanSetting",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}ramadan/setting`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
