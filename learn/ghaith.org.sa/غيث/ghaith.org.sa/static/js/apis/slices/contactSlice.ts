import { createSlice } from "@reduxjs/toolkit";
import {
  addTicket,
  getTicketsTypes,
  toAddContact,
  toPrintRequest,
} from "../actions/contact.actions";

const initialState = {
  ticketsTypes: [] as any,
  ticket: {} as any,
  printRequest: {} as any,
  contact:{} as any,
  isLoading:false,
  loading: false,
  error: null as unknown | null,
};
export const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTicketsTypes.fulfilled, (state, action) => {
        state.ticketsTypes = action.payload;
        state.loading = false;
      })
      .addCase(getTicketsTypes.rejected, (state, action) => {
        state.ticketsTypes = [];
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(addTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
        state.loading = false;
      })
      .addCase(addTicket.rejected, (state, action) => {
        state.ticket = {};
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(toPrintRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(toPrintRequest.fulfilled, (state, action) => {
        state.printRequest = action.payload;
        state.loading = false;
      })
      .addCase(toPrintRequest.rejected, (state, action) => {
        state.printRequest = {};
        state.loading = false;
        state.error = action.payload;
      });
      //ADD CONTACT
        builder.addCase(toAddContact.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(toAddContact.fulfilled, (state, action) => {
          state.contact = action.payload;
          state.isLoading = false;
        });
        builder.addCase(toAddContact.rejected, (state, action) => {
          state.contact = {};
          state.isLoading = false;
          state.error = action.payload;
        });
  },
});

export default contactSlice.reducer;
