import { createSlice } from "@reduxjs/toolkit";
import {
  getBeneficiaryDetails,
  getDonorDetails,
  getFamilyMembersDetails,
} from "../actions/profile.actions";

const initialState = {
  loading: false,
  DonorDetails: [] as any,
  BeneficiaryDetails: [] as any,
  familyMembers: [] as any,
  error: null as unknown | null,
};
export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    ///// GET DONOR PROFIL SLICE/////////
    builder.addCase(getDonorDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDonorDetails.fulfilled, (state, action) => {
      state.DonorDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getDonorDetails.rejected, (state, action) => {
      state.DonorDetails = [];
      state.loading = false;
      state.error = action.payload;
    });
    ///// GET Beneficiary PROFIL SLICE/////////
    builder.addCase(getBeneficiaryDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBeneficiaryDetails.fulfilled, (state, action) => {
      state.BeneficiaryDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getBeneficiaryDetails.rejected, (state, action) => {
      state.BeneficiaryDetails = [];
      state.loading = false;
      state.error = action.payload;
    });

    ///// GET FAMILY MEMBERS DETAILS/////////

    builder.addCase(getFamilyMembersDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFamilyMembersDetails.fulfilled, (state, action) => {
      state.familyMembers = action.payload;
      state.loading = false;
    });
    builder.addCase(getFamilyMembersDetails.rejected, (state, action) => {
      state.familyMembers = [];
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default profileSlice.reducer;
