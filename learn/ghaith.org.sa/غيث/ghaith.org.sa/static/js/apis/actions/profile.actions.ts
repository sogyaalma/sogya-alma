import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import CAxios from "../utils/CAxios";

export const getDonorDetails = createAsyncThunk<AxiosResponse<any, any>>(
  "profile/getDonorDetails",
  async () => {
    try {
      let response = await CAxios.get(`profile/donor/details`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getBeneficiaryDetails = createAsyncThunk<AxiosResponse<any, any>>(
  "profile/getBeneficiaryDetails",
  async () => {
    try {
      let response = await CAxios.get(`profile/beneficiary/details`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getFamilyMembersDetails = createAsyncThunk<
  AxiosResponse<any, any>
>("profile/getFamilyMembersDetails", async () => {
  try {
    let response = await CAxios.get(`profile/beneficiary/members`);
    return response?.data;
  } catch (error) {
    throw error;
  }
});
