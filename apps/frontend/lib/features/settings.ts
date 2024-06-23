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
  masjidName: string;
} = {
  hadithTickerSpeed: 4000,
  language: 'ar',
  orientation: ORIENTATION.DEFAULT,
  masjidName: '',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  selectors: {
    selectHadithTickerSpeed: (state) => state.hadithTickerSpeed,
    selectLanguage: (state) => state.language,
    selectOrientation: (state) => state.orientation,
    selectMasjidName: (state) => state.masjidName,
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
    setMasjidName: (state, action) => {
      state.masjidName = action.payload;
    },
  },
});

export const { setHadithTickerSpeed, setLanguage, setOrientation, setMasjidName } =
  settingsSlice.actions;

export const { selectHadithTickerSpeed, selectLanguage, selectOrientation, selectMasjidName } =
  settingsSlice.selectors;

export default settingsSlice;
