import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import profileSlice from "./slices/profileSlice";
import donorSlice from "./slices/donorSlice";
import homeSlice from "./slices/homeSlice";
import programSlice from "./slices/programSlice";
import moyasarSlice from "./slices/moyassarSlice";
import beneficiarySlice from "./slices/beneficiarySlices";
import donationSlice from "./slices/donationSlice";
import ratingSlice from "./slices/ratingSlice";
import partnershipSlice from "./slices/partnersSlice";
import newsSlice from "./slices/newsSlice";
import photoVideoSlice from "./slices/photoVideosSlice";
import reportsSlice from "./slices/reportsSlice";
import contactSlice from "./slices/contactSlice";
import jobsSlice from "./slices/jobsSlice";
import committeesSlice from "./slices/committeesSlice";
import investmentsSlice from "./slices/EndowmentInvestmentSlice";
import branchesSlice from "./slices/branchesSlice";
import podcastsSlice from "./slices/podcastSlice";
import ramadanSlice from "./slices/ramadanSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    profile: profileSlice,
    donor: donorSlice,
    home: homeSlice,
    program: programSlice,
    moyassar: moyasarSlice,
    beneficiary: beneficiarySlice,
    donation: donationSlice,
    rating: ratingSlice,
    partnership: partnershipSlice,
    news: newsSlice,
    photoVideo: photoVideoSlice,
    reports: reportsSlice,
    contact: contactSlice,
    jobs: jobsSlice,
    committees: committeesSlice,
    investments: investmentsSlice,
    branches: branchesSlice,
    podcasts: podcastsSlice,
    ramadan: ramadanSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
