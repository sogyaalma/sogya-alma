import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gift: null as any,
  donation_type: false as any,
  donation_type_name: "" as string,
  model_id: false as any,
  model: "" as string,
  mobile: "" as string,
  type: "" as string,
  program_id: false as any,
  share_quantity: false as any,
  share_id: false as any,
  umrah_id: false as any,
  umrahLines: [] as any,
  ramadan_lines: [] as any,
  beneficiary_request_id: false as any,
};
export const moyasarSlice = createSlice({
  name: "moyasar",
  initialState: initialState,
  reducers: {
    setDonationTypeId: (state, action) => {
      state.donation_type = action.payload?.id;
      state.donation_type_name = action.payload?.name;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setModelId: (state, action) => {
      state.model_id = action.payload;
    },
    setGift: (state, action) => {
      state.gift = action.payload;
    },
    setMobile: (state, action) => {
      state.mobile = action.payload;
    },

    setProgramId: (state, action) => {
      state.program_id = action.payload?.id;
      state.donation_type_name = action.payload?.name;
    },
    setBeneficiaryRequestId: (state, action) => {
      state.beneficiary_request_id = action.payload;
      state.donation_type_name = "صدقة";
    },
    setShareQuantity: (state, action) => {
      state.share_quantity = action.payload;
    },
    setShareId: (state, action) => {
      state.share_id = action.payload;
    },
    setUmrahId: (state, action) => {
      state.umrah_id = action.payload;
    },
    setRamadanLines: (state, action) => {
      state.donation_type_name = "إفطار صائم";
      state.ramadan_lines = action.payload;
    },
    setUmrahLines: (state, action) => {
      state.umrahLines = action.payload.map((line: any) => ({
        beneficiary_name: line.beneficiary_name,
        mobile: line.mobile,
        gender: line.gender,
        is_dead: line.is_dead || false,
        execution_date: line.execution_date,
        beneficiary_name_voice_recording_ids:
          line.beneficiary_name_voice_recording_ids || [],
      }));
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setDonationTypeId,
  setMobile,
  setModel,
  setModelId,
  setGift,
  setProgramId,
  setShareQuantity,
  setShareId,
  setUmrahLines,
  setUmrahId,
  setBeneficiaryRequestId,
  setRamadanLines,
} = moyasarSlice.actions;

export default moyasarSlice.reducer;
