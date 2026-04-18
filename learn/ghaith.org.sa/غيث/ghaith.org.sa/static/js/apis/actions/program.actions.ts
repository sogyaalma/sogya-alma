import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrlApi } from "../../proxy";
import axios, { AxiosResponse } from "axios";
import CAxios from "../utils/CAxios";

interface GetProgramsParams {
  tag: string;
  partner_id?: string | number; // optional
}
interface GetKorba {
  tag: string;
}

export const getPrograms = createAsyncThunk(
  "homePage/programs",
  async (params: GetProgramsParams) => {
    try {
      const payload: any = { tag: params.tag };
      if (params.partner_id) {
        payload.partner_id = params.partner_id;
      }

      const response = await axios.post(`${baseUrlApi}programs`, payload);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getKorbaDetails = createAsyncThunk(
  "project/getKorbaDetails",
  async ({ access_token }: { access_token: string | undefined }) => {
    try {
      const response = await axios.get(`${baseUrlApi}korba/${access_token}`, {
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

export const getAllKorba = createAsyncThunk(
  "homePage/getAllKorba",
  async (params: GetKorba) => {
    try {
      const payload: any = { tag: params.tag };

      const response = await axios.post(`${baseUrlApi}korba`, payload);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const addOrRemoveFavorite = createAsyncThunk<
  AxiosResponse<any, any>,
  any
>("programs/favorite", async (data) => {
  try {
    const response = await CAxios.post(`programs/favorite`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
});
