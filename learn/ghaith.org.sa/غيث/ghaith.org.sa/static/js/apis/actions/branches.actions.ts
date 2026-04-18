import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrlApi } from "../../proxy";
/*--------------------------GET ALL BRANCHES-----------------------------*/
export const getAllBranches = createAsyncThunk(
    "branches/get-branches",
    async () => {
      try {
        const response = await axios.get(`${baseUrlApi}branches`);
        return response?.data;
      } catch (error) {
        throw error;
      }
    }
  );
  