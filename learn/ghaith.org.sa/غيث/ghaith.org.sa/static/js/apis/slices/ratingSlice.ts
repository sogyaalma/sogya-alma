import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false as boolean,
  print: false as boolean,
  res_model: null as number | null,
  reason: "" as string,
  res_ids: null as any,
  rated_partner_id: null as any,
  message: "" as string,
  accessTokenPrint: "" as string,
};

export const ratingSlice = createSlice({
  name: "rating",
  initialState: initialState,
  reducers: {
    setRatingVisible: (state, action) => {
      state.isOpen = action.payload;
    },
    setResModel: (state, action) => {
      state.res_model = action.payload;
    },

    setReason: (state, action) => {
      state.reason = action.payload;
    },
    setResIds: (state, action) => {
      state.res_ids = action.payload;
    },
    setRatedPartnerId: (state, action) => {
      state.rated_partner_id = action.payload;
    },
    setPrinting: (state, action) => {
      state.print = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setAccessTokenPrint: (state, action) => {
      state.accessTokenPrint = action.payload;
    },
  },
});

export const {
  setRatingVisible,
  setResModel,
  setReason,
  setResIds,
  setRatedPartnerId,
  setPrinting,
  setAccessTokenPrint,
  setMessage,
} = ratingSlice.actions;

export default ratingSlice.reducer;
