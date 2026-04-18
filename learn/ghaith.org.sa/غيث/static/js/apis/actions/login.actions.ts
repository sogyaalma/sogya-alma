import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrlApi } from "../../proxy";
import axios, { AxiosResponse } from "axios";

interface MobilePayload {
  mobile: string;
}
interface OTPProps {
  otp: string;
  login?: string;
}
interface OTPBeneficiaryProps {
  otp: string;
  access_token?: string;
}

export const getRecaptchaKey = createAsyncThunk(
  "login/getRecaptchaKey",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}recaptcha/keys`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const toLoginBeneficiary = createAsyncThunk(
  "login/toLoginBeneficiary",
  async (mobile: MobilePayload) => {
    try {
      const response = await axios.post(
        `${baseUrlApi}beneficiary/login`,
        mobile
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const toLoginDonor = createAsyncThunk(
  "login/toLoginDonor",
  async (mobile: MobilePayload) => {
    try {
      const response = await axios.post(`${baseUrlApi}donor/login`, mobile);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

//// to verify otp
export const toVerifyOtp = createAsyncThunk<AxiosResponse<any, any>, OTPProps>(
  "login/toVerifyOtp",
  async ({ otp, login }: OTPProps) => {
    const config = { headers: { "Content-Type": "application/json" } };

    // unified endpoint
    const endpoint = `${baseUrlApi}login/verify/otp`;

    // request payload
    const data = { otp, login };

    return await axios.post(endpoint, data, config);
  }
);

///// to regenerate OTP ///////////

export const toRegenerateOtp = createAsyncThunk<AxiosResponse<any, any>, any>(
  "login/toRegenerateOtp",
  async ({ mobile }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    return await axios.post(`${baseUrlApi}regenerate/otp`, { mobile }, config);
  }
);

////// to register Donor ///////

export const toRegisterDonor = createAsyncThunk(
  "login/toRegisterDonor",
  async (data: any) => {
    try {
      const response = await axios.post(
        `${baseUrlApi}donor/registration`,
        data,
        {
          headers: {
            "Accept-Language": "*",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

///////// to verify otp
export const toVerifyOtpBeneficiary = createAsyncThunk<
  AxiosResponse<any, any>,
  OTPBeneficiaryProps
>(
  "login/toVerifyOtpBeneficiary",
  async ({ otp, access_token }: OTPBeneficiaryProps) => {
    const config = { headers: { "Content-Type": "application/json" } };

    const endpoint = `${baseUrlApi}verify/otp`;

    const data = { otp, access_token };

    return await axios.post(endpoint, data, config);
  }
);

//////// to regenerate otp beneficiary //////////
export const toRegenerateOtpBeneficiary = createAsyncThunk<
  AxiosResponse<any, any>,
  any
>("recipient/toRegenerateOtpBeneficiary", async ({ id, res_model, mobile }) => {
  const config = { headers: { "Content-Type": "application/json" } };
  return await axios.post(
    `${baseUrlApi}regenerate/otp`,
    { id, res_model, mobile },
    config
  );
});
