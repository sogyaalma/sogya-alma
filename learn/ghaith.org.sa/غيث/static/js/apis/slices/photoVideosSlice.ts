import { createSlice } from "@reduxjs/toolkit";
import {
  toGetCertificateAwards,
  toGetPermitsAssociation,
  toGetPhotoAlbum,
  toGetVideoAlbum,
} from "../actions/photoVideos.actions";

const initialState = {
  videos: [] as any,
  photos: [] as any,
  certificates: [] as any,
  awards: [] as any,
  permits: [] as any,

  loading: false,
  error: null as unknown | null,
};
export const photoVideoSlice = createSlice({
  name: "photoVideo",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(toGetPhotoAlbum.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetPhotoAlbum.fulfilled, (state, action) => {
        state.photos = action.payload;
        state.loading = false;
      })
      .addCase(toGetPhotoAlbum.rejected, (state, action) => {
        state.photos = [];
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(toGetVideoAlbum.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetVideoAlbum.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.loading = false;
      })
      .addCase(toGetVideoAlbum.rejected, (state, action) => {
        state.videos = [];
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(toGetCertificateAwards.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetCertificateAwards.fulfilled, (state, action) => {
        state.certificates = action.payload?.data.certificates;
        state.awards = action.payload?.data.awards;
        state.loading = false;
      })
      .addCase(toGetCertificateAwards.rejected, (state, action) => {
        state.certificates = [];
        state.awards = [];
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(toGetPermitsAssociation.pending, (state) => {
        state.loading = true;
      })
      .addCase(toGetPermitsAssociation.fulfilled, (state, action) => {
        state.permits = action.payload?.data?.permits;
        state.loading = false;
      })
      .addCase(toGetPermitsAssociation.rejected, (state, action) => {
        state.permits = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default photoVideoSlice.reducer;
