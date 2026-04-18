import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrlApi } from "../../proxy";
import axios, { AxiosResponse } from "axios";
import CAxios from "../utils/CAxios";
import dayjs from "dayjs";

export const getPaymentStatistics = createAsyncThunk<AxiosResponse<any, any>>(
  "beneficiary/getPaymentStatistics",
  async () => {
    try {
      let response = await CAxios.get(`beneficiary/statistic/payment`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getProductStatistics = createAsyncThunk<AxiosResponse<any, any>>(
  "beneficiary/getProductStatistics",
  async () => {
    try {
      let response = await CAxios.get(`beneficiary/statistic/product`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getDisbursementList = createAsyncThunk<
  any,
  {
    limit?: number;
    page?: number;
    date_from?: string;
    date_to?: string;
  }
>("profile/beneficiary/disbursement", async (data) => {
  try {
    const response = await CAxios.post(
      `${baseUrlApi}profile/beneficiary/disbursement`,
      data,
    );
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});
export const getBeneficiaryProduts = createAsyncThunk<
  any,
  {
    limit?: number;
    page?: number;
    date_from?: string;
    date_to?: string;
  }
>("profile/beneficiary/products", async (data) => {
  try {
    const response = await CAxios.post(
      `${baseUrlApi}profile/beneficiary/products`,
      data,
    );
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});
export const getBeneficiaryPayments = createAsyncThunk<
  any,
  {
    limit?: number;
    page?: number;
    date_from?: string;
    date_to?: string;
  }
>("profile/beneficiary/payments", async (data) => {
  try {
    const response = await CAxios.post(
      `${baseUrlApi}profile/beneficiary/payments`,
      data,
    );
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});
export const getBeneficiaryRequests = createAsyncThunk<
  any,
  {
    limit?: number;
    page?: number;
    date_from?: string;
    date_to?: string;
    service_id?: string;
  }
>("profile/beneficiary/requests", async (data) => {
  try {
    const response = await CAxios.post(
      `${baseUrlApi}profile/beneficiary/requests`,
      data,
    );
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});

/////// to get Service types //////////////
export const getOtherServiceTypes = createAsyncThunk(
  "beneficiary/getOtherServiceTypes",
  async () => {
    try {
      const response = await CAxios.get(`${baseUrlApi}other/service`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);

/////// family statements
export const getStatements = createAsyncThunk<
  any,
  {
    limit?: number;
    page?: number;
  }
>("beneficiary/statements", async (data) => {
  try {
    const response = await CAxios.post(
      `${baseUrlApi}beneficiary/statements`,
      data,
    );
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});
export const addStatementRequest = createAsyncThunk<
  AxiosResponse<any, any>,
  any
>("beneficiary/statement", async (data) => {
  try {
    const response = await CAxios.post(`beneficiary/statement`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
});
export const toPrintstatement = createAsyncThunk<AxiosResponse<any, any>, any>(
  "statement/toPrintstatement",
  async (token) => {
    const config = {
      responseType: "blob" as const,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await CAxios.get(`statement/print/${token}`, config);
    // Create a Blob URL for the PDF
    const pdfBlob = new Blob([data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss") + ".pdf";
    link.click();

    return data;
  },
);

//////////// GET BENEFICIARY REPORTS ////////////////
export const getBeneficiaryReports = createAsyncThunk<
  any,
  {
    limit?: number;
    page?: number;
    category?: string;
  }
>("profile/beneficiary/reports", async (data) => {
  try {
    const response = await CAxios.post(
      `${baseUrlApi}profile/beneficiary/reports`,
      data,
    );
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
});

export const toEditProfile = createAsyncThunk<AxiosResponse<any, any>, any>(
  "profile/beneficiary/edit",
  async (data) => {
    try {
      const response = await CAxios.post(`profile/beneficiary/edit`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
/****************** To get family states ******************/
export const getFamilyStates = createAsyncThunk(
  "beneficiary/getFamilyStates",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}family/states`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getAllIncomeSources = createAsyncThunk<AxiosResponse<any, any>>(
  "recipient/getAllIncomeSources",
  async () => {
    try {
      let response = await CAxios.get(`${baseUrlApi}source/income`);
      return response;
    } catch (error) {
      throw error;
    }
  },
);
/****************** To get health states ******************/
export const getHealthState = createAsyncThunk(
  "beneficiary/getHealthState",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}health/states`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
/****************** To get health states ******************/
export const getCountries = createAsyncThunk(
  "beneficiary/getCountries",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}countries`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
/****************** To get health states ******************/
export const getAcademicLevels = createAsyncThunk(
  "beneficiary/academic/levels",
  async () => {
    try {
      const response = await CAxios.get(`${baseUrlApi}academic/levels`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
); /****************** To get education mode ******************/
export const getEducationMode = createAsyncThunk(
  "beneficiary/education/mode",
  async () => {
    try {
      const response = await CAxios.get(`${baseUrlApi}education/mode`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
/****************** To get states ******************/
export const getStates = createAsyncThunk("beneficiary/getStates", async () => {
  try {
    const response = await axios.get(`${baseUrlApi}states`);
    return response?.data;
  } catch (error) {
    throw error;
  }
});
/******************* To register Beneficiary Step 1  *****************/
export const ToRegisterBeneficiaryStep1 = createAsyncThunk(
  "login/ToRegisterBeneficiaryStep1",
  async (data: any) => {
    try {
      const response = await axios.post(
        `${baseUrlApi}beneficiary/register`,
        data,
        {
          headers: {
            "Accept-Language": "*",
          },
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const ToRegisterBeneficiaryStep2 = createAsyncThunk(
  "login/ToRegisterBeneficiaryStep2",
  async (data: any) => {
    try {
      const response = await axios.post(
        `${baseUrlApi}beneficiary/register/2`,
        data,
        {
          headers: {
            "Accept-Language": "*",
          },
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
);
export const CheckAvailableServices = createAsyncThunk(
  "beneficiary/CheckAvailableServices",
  async () => {
    try {
      const response = await axios.get(
        `${baseUrlApi}profile/available/services`,
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getServiceTypes = createAsyncThunk(
  "beneficiary/getServiceTypes",
  async () => {
    try {
      const response = await CAxios.get(`${baseUrlApi}service/types`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);

//// TO ADD SERVICE REQUEST ///
export const addServicesRequest = createAsyncThunk<
  AxiosResponse<any, any>,
  any
>("beneficiary/addServicesRequest", async (data) => {
  try {
    const response = await CAxios.post(`beneficiary/register/service`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
});
/****************** To get zakat values ******************/
export const getZakatValues = createAsyncThunk(
  "home/getZakatValues",
  async () => {
    try {
      const response = await axios.get(`${baseUrlApi}zakat/details`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
);
//////////// to archive family member //////////
export const deleteFamilyMember = createAsyncThunk<
  any,
  {
    partner_id?: any;
  }
>("profile/beneficiary/archive", async (data) => {
  try {
    const response = await CAxios.post(`${baseUrlApi}member/archive`, data);
    return response;
  } catch (error) {
    throw error;
  }
});
