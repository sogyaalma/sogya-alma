import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrlApi } from "../../proxy";
/*--------------------------GET ALL podcasts-----------------------------*/
export const getAllPodcasts = createAsyncThunk(
    "podcast/get-podcasts",
    async () => {
      try {
        const response = await axios.get(`${baseUrlApi}podcast`);
        return response?.data;
      } catch (error) {
        throw error;
      }
    }
  );
  