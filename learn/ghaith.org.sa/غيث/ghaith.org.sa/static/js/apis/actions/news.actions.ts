import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrlApi } from "../../proxy";
/*--------------------------GET ALL NEWS---------------------------*/
export const getAllNews = createAsyncThunk("news/get-news", async () => {
  try {
    const response = await axios.get(`${baseUrlApi}news`);
    return response?.data;
  } catch (error) {
    throw error;
  }
});
export const getNewsDetails = createAsyncThunk(
  "news/get-news-details",
  async (access_token: string) => {
    try {
      const response = await axios.get(`${baseUrlApi}news/${access_token}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
// get news category
export const getNewsCategories = createAsyncThunk(
  "news/get-news-categories",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}news/category`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllMediaEyes = createAsyncThunk(
  "news/get-media-eyes",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}media/eyes`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllEvents = createAsyncThunk("news/get-events", async () => {
  try {
    const response = await axios.get(`${baseUrlApi}events`);
    return response?.data;
  } catch (error) {
    throw error;
  }
});

////////////////// get events details ////////////////////
export const getEventDetails = createAsyncThunk(
  "news/get-event-details",
  async (access_token: string) => {
    try {
      const response = await axios.get(`${baseUrlApi}events/${access_token}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
////////////////// get events details ////////////////////
export const getMediaEyesDetails = createAsyncThunk(
  "news/get-media_eyes-details",
  async (access_token: string) => {
    try {
      const response = await axios.get(
        `${baseUrlApi}media/eyes/${access_token}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
/////////////////// get magazine cover ///////////////
export const getMagazineData = createAsyncThunk("news/magazine", async () => {
  try {
    const response = await axios.get(`${baseUrlApi}magazine`);
    return response?.data;
  } catch (error) {
    throw error;
  }
});
