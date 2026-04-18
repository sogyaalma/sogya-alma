import axios, { AxiosResponse } from "axios";
import { baseUrlApi } from "../../proxy";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get annual reports
export const toGetInvestments = createAsyncThunk<AxiosResponse<any, any>>(
  "governance/toGetInvestments",
  async () => {
    try {
      let response = await axios.get(`${baseUrlApi}endowment/investment`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);