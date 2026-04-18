import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { baseUrlApi } from "../../proxy";
import dayjs from "dayjs";

export const getTicketsTypes = createAsyncThunk(
  "contact/getTicketsTypes",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}helpdesk/tickets/types`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addTicket = createAsyncThunk(
  "contact/addTicket",
  async (data: any) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post(
        `${baseUrlApi}helpdesk/tickets`,
        data,
        config
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// to print request
export const toPrintRequest = createAsyncThunk<AxiosResponse<any, any>, any>(
  "recipient/toPrintRequest",
  async (ticketId) => {
    const config = {
      responseType: "blob" as const,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${baseUrlApi}helpdesk/tickets/print/${ticketId}`,
      config
    );
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
//ContactUs
export const toAddContact = createAsyncThunk<AxiosResponse<any, any>, any>(
  "contact/toAddContact",
  async (contact) => {
    try {
      const response = await axios.post(`${baseUrlApi}contact`, contact);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
