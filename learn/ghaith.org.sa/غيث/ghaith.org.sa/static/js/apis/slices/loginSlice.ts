import { createSlice } from "@reduxjs/toolkit";
import {
  getRecaptchaKey,
  toLoginBeneficiary,
  toLoginDonor,
  toRegenerateOtp,
  toRegisterDonor,
  toVerifyOtp,
} from "../actions/login.actions";

const initialState = {
  recaptchaKey: {} as any,
  login: {} as any,
  verifyOtp: {} as any,
  regenrateOtp: {} as any,
  registerDonor: {} as any,

  loading: false,
  error: null as unknown | null,
};
export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getRecaptchaKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecaptchaKey.fulfilled, (state, action) => {
        state.recaptchaKey = action.payload;
        state.loading = false;
      })
      .addCase(getRecaptchaKey.rejected, (state, action) => {
        state.recaptchaKey = {};
        state.loading = false;
        state.error = action.payload;
      });

    //////////////// Beneficiary Login ///////////////////
    builder
      .addCase(toLoginBeneficiary.pending, (state) => {
        state.loading = true;
      })
      .addCase(toLoginBeneficiary.fulfilled, (state, action) => {
        state.login = action.payload;
        state.loading = false;
      })
      .addCase(toLoginBeneficiary.rejected, (state, action) => {
        state.login = {};
        state.loading = false;
        state.error = action.payload;
      });

    ///////////////// Donor Login //////////////////
    builder
      .addCase(toLoginDonor.pending, (state) => {
        state.loading = true;
      })
      .addCase(toLoginDonor.fulfilled, (state, action) => {
        state.login = action.payload;
        state.loading = false;
      })
      .addCase(toLoginDonor.rejected, (state, action) => {
        state.login = {};
        state.loading = false;
        state.error = action.payload;
      });

    /////////// TO VERIFY OTP /////////
    builder.addCase(toVerifyOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toVerifyOtp.fulfilled, (state, action) => {
      state.verifyOtp = action.payload;
      state.loading = false;
    });
    builder.addCase(toVerifyOtp.rejected, (state, action) => {
      state.verifyOtp = {};
      state.loading = false;
      state.error = action.payload;
    });

    ////// TO REGENERATE OTP ///////////
    /* regenerate otp */
    builder.addCase(toRegenerateOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toRegenerateOtp.fulfilled, (state, action) => {
      state.regenrateOtp = action.payload;
      state.loading = false;
    });
    builder.addCase(toRegenerateOtp.rejected, (state, action) => {
      state.regenrateOtp = {};
      state.loading = false;
      state.error = action.payload;
    });

    /////// TO REGISTER NEW DONOR /////////
    builder.addCase(toRegisterDonor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(toRegisterDonor.fulfilled, (state, action) => {
      state.registerDonor = action.payload;
      state.loading = false;
    });
    builder.addCase(toRegisterDonor.rejected, (state, action) => {
      state.registerDonor = {};
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default loginSlice.reducer;
