import { createSlice } from "@reduxjs/toolkit";
import {
  addPartnership,
  getAllAreas,
  getAllTypes,
  getEntitiesClassification,
} from "../actions/partners.actions";

/* Intiatlisation of initialeState */
const initialState = {
  entities: [] as any,
  partnership: {} as any,
  partnershipTypes: [] as any,
  areas: [] as any,
  loading: false as boolean,
  isLoading: false as boolean,
  error: null as unknown | null,
};

export const partnershipSlice = createSlice({
  name: "partnership",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*------------------ADD PARTNERSHIP------------------ */
    builder.addCase(addPartnership.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addPartnership.fulfilled, (state, action) => {
      state.partnership = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addPartnership.rejected, (state, action) => {
      state.partnership = {};
      state.isLoading = false;
      state.error = action.payload;
    });
    /*------------------ALL ENTITIES------------------ */

    builder.addCase(getEntitiesClassification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEntitiesClassification.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    });
    builder.addCase(getEntitiesClassification.rejected, (state, action) => {
      state.entities = {};
      state.loading = false;
      state.error = action.payload;
    });
    /*------------------ALL TYPES------------------ */
    builder.addCase(getAllTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTypes.fulfilled, (state, action) => {
      state.partnershipTypes = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllTypes.rejected, (state, action) => {
      state.partnershipTypes = {};
      state.loading = false;
      state.error = action.payload;
    });
    /*------------------ALL AREAS------------------ */
    builder.addCase(getAllAreas.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAreas.fulfilled, (state, action) => {
      state.areas = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllAreas.rejected, (state, action) => {
      state.areas = {};
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default partnershipSlice.reducer;
