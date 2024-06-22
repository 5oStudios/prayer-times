import { createSlice } from '@reduxjs/toolkit';

export enum ORIENTATION {
  DEFAULT = '',
  LEFT = 'vrLEFT',
  RIGHT = 'vrRIGHT',
}

const initialState: {
  hadithTickerSpeed: number;
  language: 'ar' | 'en';
  orientation: ORIENTATION;
} = {
  hadithTickerSpeed: 4000,
  language: 'ar',
  orientation: ORIENTATION.DEFAULT,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
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
