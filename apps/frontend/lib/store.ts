import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './features/settings';
import hadithSlice from './features/hadith';
import timesSlice from './features/times';

const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    hadith: hadithSlice.reducer,
    times: timesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
