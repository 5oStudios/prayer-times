import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './features/settings';
import hadithSlice from './features/hadith';
import timesSlice from './features/times';
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
    settings: JSON.parse(localStorage.getItem('settings') || '{}'),
  },
});
export default store;

subscribe('save-settings', () => {
  const settings = store.getState().settings;
  localStorage.setItem('settings', JSON.stringify(settings));
});
