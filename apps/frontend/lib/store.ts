import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './features/settings';
import hadithSlice from './features/hadith';
import timesSlice from './features/times';
import { safeLocalStorage } from '../services/local-storage';
import { subscribe } from '@enegix/events';

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
  preloadedState: {
    settings: safeLocalStorage.getItem('settings'),
  },
});
export default store;

subscribe('save-settings', () => {
  const settings = store.getState().settings;
  safeLocalStorage.setItem('settings', settings);
});
