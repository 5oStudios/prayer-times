import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    hadithTickerSpeed: 4000,
    language: 'ar',
  },
  selectors: {
    selectHadithTickerSpeed: (state) => state.hadithTickerSpeed,
    selectLanguage: (state) => state.language,
  },
  reducers: {
    setHadithTickerSpeed: (state, action) => {
      state.hadithTickerSpeed = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setHadithTickerSpeed, setLanguage } = settingsSlice.actions;

export const { selectHadithTickerSpeed, selectLanguage } = settingsSlice.selectors;

export default settingsSlice;
