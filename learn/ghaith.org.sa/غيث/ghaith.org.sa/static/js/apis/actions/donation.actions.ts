import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { baseUrlApi } from "../../proxy";

export const getCardTypes = createAsyncThunk(
  "cardTypes/get-cardTypes",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}card/types`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);


export const getCompanyBanks = createAsyncThunk(
  "bank/getCompanyBanks",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}company/banks`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addBankTransfer = createAsyncThunk<AxiosResponse<any, any>, any>(
  "bank/addBankTransfer",
  async (data) => {
    try {
      const response = await axios.post(`${baseUrlApi}bank/transfer`, data, {
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
export const getUmrahTypes = createAsyncThunk(
  "donationTypes/const getUmrahTypes",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}umrah`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const toPrintReceipt = createAsyncThunk<AxiosResponse<any, any>, any>(
  "donation/toPrintReceipt",
  async (token) => {
    const config = {
      responseType: "blob" as const,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrlApi}donation/receipt/${token}`, config);
    // Create a Blob URL for the PDF
    const pdfBlob = new Blob([data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss") + ".pdf";
    link.click();

    return data;
  }
);


export const toPrintBankTransferReceipt = createAsyncThunk<AxiosResponse<any, any>, any>(
  "donation/toPrintBankTransferReceipt",
  async (token) => {
    const config = {
      responseType: "blob" as const,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${baseUrlApi}bank/transfer/receipt/${token}`, config);
    // Create a Blob URL for the PDF
    const pdfBlob = new Blob([data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss") + ".pdf";
    link.click();

    return data;
  }
);