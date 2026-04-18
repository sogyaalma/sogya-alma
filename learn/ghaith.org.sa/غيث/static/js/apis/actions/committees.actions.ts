import axios, { AxiosResponse } from "axios";
import { baseUrlApi } from "../../proxy";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get annual reports
export const toGetCommittees = createAsyncThunk<AxiosResponse<any, any>>(
  "governance/toGetCommittees",
  async () => {
    try {
      let response = await axios.get(`${baseUrlApi}committees`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);