import axios from "axios";
import { baseUrlApi } from "../../proxy";
export const getKeys = async () => {
  try {
    const response = await axios.get(`${baseUrlApi}moyasar/keys`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getKeysByState = async (data: any) => {
  try {
    const response = await axios.post(`${baseUrlApi}state/moyasar/keys`, data, {
      headers: {
        "Accept-Language": "en",
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const toAddDonation = async (data: any) => {
  try {
    const response = await axios.post(
      `${baseUrlApi}donation/checkout/savepayment`,
      data,
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const toAddRating = async (data: any) => {
  try {
    const response = await axios.post(`${baseUrlApi}rating`, data);
    return response?.data;
  } catch (error) {
    throw error;
  }
};