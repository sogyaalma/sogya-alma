import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrlApi } from "../../proxy";

export const toGetPhotoAlbum = createAsyncThunk(
  "album/toGetPhotoAlbum",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}photo/album`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const toGetVideoAlbum = createAsyncThunk(
  "album/toGetVideoAlbum",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}video`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const toGetCertificateAwards = createAsyncThunk(
  "album/toGetCertificateAwards",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}certificates/awards`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const toGetPermitsAssociation = createAsyncThunk(
  "album/toGetPermitsAssociation",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}permits`);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
