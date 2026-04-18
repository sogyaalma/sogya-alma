import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import CAxios from "../utils/CAxios";

export const getMeesages = createAsyncThunk("profile/getMeesages", async () => {
  try {
    const response = await CAxios.get(`profile/beneficiary/messages`);
    return response?.data;
  } catch (error) {
    throw error;
  }
});

export const sendMessage = createAsyncThunk<AxiosResponse<any, any>, any>(
  "profile/beneficiary/discuss",
  async (data) => {
    try {
      const response = await CAxios.post(`profile/beneficiary/discuss`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const conversationRead = createAsyncThunk<AxiosResponse<any, any>, any>(
  "beneficiary/messages/mark_is_read",
  async (data) => {
    try {
      const response = await CAxios.post(
        `beneficiary/messages/mark_is_read`,
        data
      );

      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
