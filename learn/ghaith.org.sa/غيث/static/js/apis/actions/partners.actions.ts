import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { baseUrlApi } from "../../proxy";

/*--------------------------ADD PARTNERSHIP-------------------------------------------*/
export const addPartnership = createAsyncThunk<AxiosResponse<any, any>, any>(
  "partnership/add-partnership",
  async (partnership) => {
    try {
      const response = await axios.post(
        `${baseUrlApi}partnership`,
        partnership
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

/*--------------------------GET ALL ENTITIES BY CLASSFICATION-------------------------------------------*/
export const getEntitiesClassification = createAsyncThunk(
  "partnership/get-entities-classification",
  async () => {
    try {
      const response = await axios.get(
        `${baseUrlApi}partnership/entities/classification`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

/*--------------------------GET ALL TYPES-------------------------------------------*/
export const getAllTypes = createAsyncThunk(
  "partnership/get-types",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}partnership/types`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

/*--------------------------GET ALL AREAS-------------------------------------------*/
export const getAllAreas = createAsyncThunk(
  "partnership/get-areas",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}partnership/areas`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
