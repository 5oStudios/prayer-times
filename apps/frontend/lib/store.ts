import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './features/settings/settings';

const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
  },
});

export default store;
