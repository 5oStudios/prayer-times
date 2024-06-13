import { createSlice } from '@reduxjs/toolkit';

// TODO: make helper
export enum ORIENTATION {
  DEFAULT = '',
  LEFT = 'vrLEFT',
  RIGHT = 'vrRIGHT',
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    hadithTickerSpeed: 4000,
    language: 'ar',
    orientation: ORIENTATION.DEFAULT,
  },
  selectors: {
    selectHadithTickerSpeed: (state) => state.hadithTickerSpeed,
    selectLanguage: (state) => state.language,
    selectOrientation: (state) => state.orientation,
  },
  reducers: {
    setHadithTickerSpeed: (state, action) => {
      state.hadithTickerSpeed = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setOrientation: (state, action) => {
      state.orientation = action.payload;
    },
  },
});

export const { setHadithTickerSpeed, setLanguage, setOrientation } = settingsSlice.actions;

export const { selectHadithTickerSpeed, selectLanguage, selectOrientation } =
  settingsSlice.selectors;

export default settingsSlice;
