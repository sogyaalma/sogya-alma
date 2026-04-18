import { createSlice } from "@reduxjs/toolkit";
import {
  getAllNews,
  getNewsDetails,
  getNewsCategories,
  getAllMediaEyes,
  getAllEvents,
  getEventDetails,
  getMediaEyesDetails,
  getMagazineData,
} from "../actions/news.actions";

const initialState = {
  news: {
    loading: false,
    error: null as unknown | null,
    data: [] as any,
  },
  magazine: [] as any,
  newsDetails: [] as any,
  newsCategories: [] as any,
  loading: false,
  error: null as unknown | null,
};
export const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNews.pending, (state) => {
        state.news.loading = true;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.news.data = action.payload;
        state.news.loading = false;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.news.data = [];
        state.news.loading = false;
        state.error = action.payload;
      })
      // get all media eyes
      .addCase(getAllMediaEyes.pending, (state) => {
        state.news.loading = true;
      })
      .addCase(getAllMediaEyes.fulfilled, (state, action) => {
        state.news.data = action.payload;
        state.news.loading = false;
      })
      .addCase(getAllMediaEyes.rejected, (state, action) => {
        state.news.data = [];
        state.news.loading = false;
        state.error = action.payload;
      })
      // get all events
      .addCase(getAllEvents.pending, (state) => {
        state.news.loading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.news.data = action.payload;
        state.news.loading = false;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.news.data = [];
        state.news.loading = false;
        state.error = action.payload;
      })
      // getNewsDetails cases
      .addCase(getNewsDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewsDetails.fulfilled, (state, action) => {
        state.newsDetails = action.payload;
        state.loading = false;
      })
      .addCase(getNewsDetails.rejected, (state, action) => {
        state.newsDetails = null;
        state.loading = false;
        state.error = action.error.message;
      }) // get Event details cases
      .addCase(getEventDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventDetails.fulfilled, (state, action) => {
        state.newsDetails = action.payload;
        state.loading = false;
      })
      .addCase(getEventDetails.rejected, (state, action) => {
        state.newsDetails = null;
        state.loading = false;
        state.error = action.error.message;
      }) // get media eyes details cases
      .addCase(getMediaEyesDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMediaEyesDetails.fulfilled, (state, action) => {
        state.newsDetails = action.payload;
        state.loading = false;
      })
      .addCase(getMediaEyesDetails.rejected, (state, action) => {
        state.newsDetails = null;
        state.loading = false;
        state.error = action.error.message;
      })
      //get news categories
      .addCase(getNewsCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewsCategories.fulfilled, (state, action) => {
        state.newsCategories = action.payload;
        state.loading = false;
      })
      .addCase(getNewsCategories.rejected, (state, action) => {
        state.newsCategories = null;
        state.loading = false;
        state.error = action.error.message;
      }) // getNewsDetails cases
      .addCase(getMagazineData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMagazineData.fulfilled, (state, action) => {
        state.magazine = action.payload;
        state.loading = false;
      })
      .addCase(getMagazineData.rejected, (state, action) => {
        state.magazine = null;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
