import { createSlice } from "@reduxjs/toolkit";
import {
  getAllIncomeSources,
  getBeneficiaryPayments,
  getBeneficiaryProduts,
  getBeneficiaryReports,
  getBeneficiaryRequests,
  getDisbursementList,
  getFamilyStates,
  getHealthState,
  getPaymentStatistics,
  getProductStatistics,
  getOtherServiceTypes,
  getStatements,
  getStates,
  toPrintstatement,
  CheckAvailableServices,
  getServiceTypes,
  getAcademicLevels,
  getEducationMode,
  getCountries,
  getZakatValues,
} from "../actions/beneficiary.actions";

const initialState = {
  payments: [] as any,
  incomeSources: [] as any,
  products: [] as any,
  familyStates: [] as any,
  healthState: [] as any,
  zakat: [] as any,
  academicLevels: [] as any,
  educationMode: [] as any,
  countries: [] as any,
  states: [] as any,
  disbursements: {
    loading: false,
    error: null as unknown | null,
    data: [] as any,
  },
  TotalDisbursements: 0 as number,
  paymentsList: {
    loadingPayment: false,
    error: null as unknown | null,
    data: [] as any,
  },
  productsList: {
    loadingProduct: false,
    error: null as unknown | null,
    data: [] as any,
  },
  requestsList: {
    loadingRequests: false,
    error: null as unknown | null,
    data: [] as any,
  },
  beneficiaryStatements: {
    loading: false,
    error: null as unknown | null,
    data: [] as any,
  },
  beneficiaryReports: {
    loading: false,
    error: null as unknown | null,
    data: [] as any,
  },
  TotalbeneficiaryReports: 0 as number,
  TotalPaymentsPages: 0 as number,
  TotalProductsPages: 0 as number,
  TotalRequestsPages: 0 as number,
  TotalbeneficiaryStatements: 0 as number,
  otherServiceTypes: [] as any,
  serviceTypes: [] as any,
  availableServices: [] as any,
  printRequest: {} as any,
  loadingPrint: false,
  loading: false,
  error: null as unknown | null,
  editMode: false as boolean,
};
export const beneficiarySlice = createSlice({
  name: "beneficiary",
  initialState: initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPaymentStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaymentStatistics.fulfilled, (state, action) => {
        state.payments = action.payload;
        state.loading = false;
      })
      .addCase(getPaymentStatistics.rejected, (state, action) => {
        state.payments = [];
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProductStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductStatistics.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProductStatistics.rejected, (state, action) => {
        state.products = [];
        state.loading = false;
        state.error = action.payload;
      });
    /////////////////// GET TOTAL DISBURSEMENTS ///////////////////////::
    builder.addCase(getDisbursementList.pending, (state) => {
      state.disbursements.loading = true;
    });
    builder.addCase(getDisbursementList.fulfilled, (state, action) => {
      state.disbursements.data = action.payload?.data;
      state.TotalDisbursements = action.payload?.total_pages;
      state.disbursements.loading = false;
    });
    builder.addCase(getDisbursementList.rejected, (state, action) => {
      state.TotalDisbursements = 0;
      state.disbursements.data = [];
      state.disbursements.loading = false;
      state.error = action.payload;
    });
    /////////////////// GET Payments List ///////////////////////::
    builder.addCase(getBeneficiaryPayments.pending, (state) => {
      state.paymentsList.loadingPayment = true;
    });
    builder.addCase(getBeneficiaryPayments.fulfilled, (state, action) => {
      state.paymentsList.data = action.payload?.data;
      state.TotalPaymentsPages = action.payload?.total_pages;
      state.paymentsList.loadingPayment = false;
    });
    builder.addCase(getBeneficiaryPayments.rejected, (state, action) => {
      state.TotalPaymentsPages = 0;
      state.paymentsList.data = [];
      state.paymentsList.loadingPayment = false;
      state.error = action.payload;
    });
    /////////////////// GET Products List ///////////////////////::
    builder.addCase(getBeneficiaryProduts.pending, (state) => {
      state.productsList.loadingProduct = true;
    });
    builder.addCase(getBeneficiaryProduts.fulfilled, (state, action) => {
      state.productsList.data = action.payload?.data;
      state.TotalProductsPages = action.payload?.total_pages;
      state.productsList.loadingProduct = false;
    });
    builder.addCase(getBeneficiaryProduts.rejected, (state, action) => {
      state.TotalProductsPages = 0;
      state.productsList.data = [];
      state.productsList.loadingProduct = false;
      state.error = action.payload;
    });
    /////////////////// GET Requests List ///////////////////////::
    builder.addCase(getBeneficiaryRequests.pending, (state) => {
      state.requestsList.loadingRequests = true;
    });
    builder.addCase(getBeneficiaryRequests.fulfilled, (state, action) => {
      state.requestsList.data = action.payload?.data;
      state.TotalRequestsPages = action.payload?.total_pages;
      state.requestsList.loadingRequests = false;
    });
    builder.addCase(getBeneficiaryRequests.rejected, (state, action) => {
      state.TotalRequestsPages = 0;
      state.requestsList.data = [];
      state.requestsList.loadingRequests = false;
      state.error = action.payload;
    });
    //////////////// GET SERVICE TYPES /////////////
    builder
      .addCase(getOtherServiceTypes.pending, (state) => {})
      .addCase(getOtherServiceTypes.fulfilled, (state, action) => {
        state.otherServiceTypes = action.payload;
        state.loading = false;
      })
      .addCase(getOtherServiceTypes.rejected, (state, action) => {
        state.otherServiceTypes = [];
        state.loading = false;
        state.error = action.payload;
      });
    //////////////// GET STATEMENT LIST //////////////
    builder.addCase(getStatements.pending, (state) => {
      state.beneficiaryStatements.loading = true;
    });
    builder.addCase(getStatements.fulfilled, (state, action) => {
      state.beneficiaryStatements.data = action.payload?.data;
      state.TotalbeneficiaryStatements = action.payload?.total_pages;
      state.beneficiaryStatements.loading = false;
    });
    builder.addCase(getStatements.rejected, (state, action) => {
      state.TotalbeneficiaryStatements = 0;
      state.beneficiaryStatements.data = [];
      state.beneficiaryStatements.loading = false;
      state.error = action.payload;
    });
    builder
      .addCase(toPrintstatement.pending, (state) => {
        state.loadingPrint = true;
      })
      .addCase(toPrintstatement.fulfilled, (state, action) => {
        state.printRequest = action.payload;
        state.loadingPrint = false;
      })
      .addCase(toPrintstatement.rejected, (state, action) => {
        state.printRequest = {};
        state.loadingPrint = false;
        state.error = action.payload;
      });
    ////////// get donor reports /////////
    builder.addCase(getBeneficiaryReports.pending, (state) => {
      state.beneficiaryReports.loading = true;
    });
    builder.addCase(getBeneficiaryReports.fulfilled, (state, action) => {
      state.beneficiaryReports.data = action.payload?.result;
      state.TotalbeneficiaryReports = action.payload?.total_pages;
      state.beneficiaryReports.loading = false;
    });
    builder.addCase(getBeneficiaryReports.rejected, (state, action) => {
      state.TotalbeneficiaryReports = 0;
      state.beneficiaryReports.data = [];
      state.beneficiaryReports.loading = false;
      state.error = action.payload;
    });

    /* get all income sources*/
    builder.addCase(getAllIncomeSources.pending, (state) => {});
    builder.addCase(getAllIncomeSources.fulfilled, (state, action) => {
      state.incomeSources = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllIncomeSources.rejected, (state, action) => {
      state.incomeSources = [];
      state.loading = false;
      state.error = action.payload;
    });
    /////////to get family states /////////////
    builder
      .addCase(getFamilyStates.pending, (state) => {})
      .addCase(getFamilyStates.fulfilled, (state, action) => {
        state.familyStates = action.payload;
        state.loading = false;
      })
      .addCase(getFamilyStates.rejected, (state, action) => {
        state.familyStates = [];
        state.loading = false;
        state.error = action.payload;
      });
    /////////to get health states /////////////
    builder
      .addCase(getHealthState.pending, (state) => {})
      .addCase(getHealthState.fulfilled, (state, action) => {
        state.healthState = action.payload;
        state.loading = false;
      })
      .addCase(getHealthState.rejected, (state, action) => {
        state.healthState = [];
        state.loading = false;
        state.error = action.payload;
      });
    /////////to get countries /////////////
    builder
      .addCase(getCountries.pending, (state) => {})
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.countries = [];
        state.loading = false;
        state.error = action.payload;
      });
    /////////to get academic levels /////////////
    builder
      .addCase(getAcademicLevels.pending, (state) => {})
      .addCase(getAcademicLevels.fulfilled, (state, action) => {
        state.academicLevels = action.payload;
        state.loading = false;
      })
      .addCase(getAcademicLevels.rejected, (state, action) => {
        state.academicLevels = [];
        state.loading = false;
        state.error = action.payload;
      });
    /////////to get academic levels /////////////
    builder
      .addCase(getEducationMode.pending, (state) => {})
      .addCase(getEducationMode.fulfilled, (state, action) => {
        state.educationMode = action.payload;
        state.loading = false;
      })
      .addCase(getEducationMode.rejected, (state, action) => {
        state.educationMode = [];
        state.loading = false;
        state.error = action.payload;
      });
    /////////to get states /////////////
    builder
      .addCase(getStates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.states = action.payload;
        state.loading = false;
      })
      .addCase(getStates.rejected, (state, action) => {
        state.states = [];
        state.loading = false;
        state.error = action.payload;
      });
    //////// TO GET AVAILABLE SERVICES ///////
    builder
      .addCase(CheckAvailableServices.pending, (state) => {})
      .addCase(CheckAvailableServices.fulfilled, (state, action) => {
        state.availableServices = action.payload.available_services;
        state.loading = false;
      })
      .addCase(CheckAvailableServices.rejected, (state, action) => {
        state.availableServices = [];
        state.loading = false;
        state.error = action.payload;
      });
    ////// TO GET SERVICES TYPES /////////
    builder
      .addCase(getServiceTypes.pending, (state) => {})
      .addCase(getServiceTypes.fulfilled, (state, action) => {
        state.serviceTypes = action.payload;
        state.loading = false;
      })
      .addCase(getServiceTypes.rejected, (state, action) => {
        state.otherServiceTypes = [];
        state.loading = false;
        state.error = action.payload;
      }); /////////to get states /////////////
    builder
      .addCase(getZakatValues.pending, (state) => {
        state.loading = true;
      })
      .addCase(getZakatValues.fulfilled, (state, action) => {
        state.zakat = action.payload;
        state.loading = false;
      })
      .addCase(getZakatValues.rejected, (state, action) => {
        state.zakat = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setEditMode } = beneficiarySlice.actions;
export default beneficiarySlice.reducer;
