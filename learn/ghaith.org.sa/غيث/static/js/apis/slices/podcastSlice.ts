import { createSlice } from "@reduxjs/toolkit";
import { getAllPodcasts } from "../actions/podcast.actions";

const initialState = {
  podcasts: [] as any,
  loading: false,
  error: null as unknown | null,
};
export const podcastsSlice = createSlice({
  name: "podcasts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPodcasts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPodcasts.fulfilled, (state, action) => {
        state.podcasts = action.payload;
        state.loading = false;
      })
      .addCase(getAllPodcasts.rejected, (state, action) => {
        state.podcasts = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default podcastsSlice.reducer;
 