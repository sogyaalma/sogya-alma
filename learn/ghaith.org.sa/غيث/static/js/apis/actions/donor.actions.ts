import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrlApi } from "../../proxy";
import axios, { AxiosResponse } from "axios";
import CAxios from "../utils/CAxios";

export const getProgramTypes = createAsyncThunk(
  "donor/getProgramTypes",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}program/types`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getDetailsProgram = createAsyncThunk(
  "project/getDetailsProgram",
  async ({
    access_token,
    partner_id,
  }: {
    access_token: string | undefined;
    partner_id: number;
  }) => {
    try {
      const response = await axios.post(
        `${baseUrlApi}programs/${access_token}`,
        { partner_id },
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

export const getDonationList = createAsyncThunk<
  any,
  {
    limit?: number;
    page?: number;
    date_from?: string;
    date_to?: string;
  }
>("profile/donations", async (data) => {
  try {
    const response = await CAxios.post(`${baseUrlApi}profile/donations`, data);
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});

////////// GET DONOR FLOW//////////////
export const getDonorFlow = createAsyncThunk("donor/getDonorFlow", async () => {
  try {
    const response = await CAxios.get(`profile/donor/flow`);
    return response?.data;
  } catch (error) {
    throw error;
  }
});
///////// GET DONOR SPONSORED /////////////
export const getSponsored = createAsyncThunk<
  any,
  {
    limit?: number;
    page?: number;
    date_from?: string;
    date_to?: string;
  }
>("profile/getSponsored", async (data) => {
  try {
    const response = await CAxios.post(`${baseUrlApi}profile/sponsored`, data);
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});
///////// GET DONOR SPONSORED /////////////
export const getDeductions = createAsyncThunk<
  any,
  {
    limit?: number;
    page?: number;
    date_from?: string;
    date_to?: string;
  }
>("profile/getDeductions", async (data) => {
  try {
    const response = await CAxios.post(`${baseUrlApi}profile/deductions`, data);
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});
////////// to get deduction types///////////
export const getDeductionTypes = createAsyncThunk(
  "donor/getDeductionTypes",
  async () => {
    try {
      const response = await CAxios.get(`${baseUrlApi}deduction/products`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getContactMethods = createAsyncThunk(
  "donor/getContactMethods",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}contact/methods`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getContactTime = createAsyncThunk(
  "donor/getContactTime",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}contact/times`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addDeductionRequest = createAsyncThunk<
  AxiosResponse<any, any>,
  any
>("donor/deductions", async (data) => {
  try {
    const response = await CAxios.post(`deductions`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
});

///////////// get medals ////////////
export const getDonorMedals = createAsyncThunk("donor/getMedals", async () => {
  try {
    const response = await CAxios.get(`profile/medals`);
    return response?.data;
  } catch (error) {
    throw error;
  }
});
//////
export const getDonorReports = createAsyncThunk<
  any,
  {
    limit?: number;
    page?: number;
    category?: string;
  }
>("profile/donor/reports", async (data) => {
  try {
    const response = await CAxios.post(
      `${baseUrlApi}profile/donor/reports`,
      data
    );
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});
export const EditDonorInformations = createAsyncThunk<
  AxiosResponse<any, any>,
  any
>("donor/edit", async (data) => {
  try {
    const response = await CAxios.post(`profile/donor/edit`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
});
export const toSendEditOtp = createAsyncThunk<AxiosResponse<any, any>, any>(
  "donor/edit/otp",
  async (data) => {
    try {
      const response = await CAxios.post(`send/edit/otp`, data, {
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
