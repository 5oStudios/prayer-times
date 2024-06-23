import { createSlice } from '@reduxjs/toolkit';
import { access } from 'fs';

export enum ORIENTATION {
  DEFAULT = '',
  LEFT = 'vrLEFT',
  RIGHT = 'vrRIGHT',
}

export type NewsType = {
  title: string;
  content: string;
};

const initialState: {
  hadithTickerSpeed: number;
  language: 'ar' | 'en';
  orientation: ORIENTATION;
  masjidName: string;
  news: NewsType[];
} = {
  hadithTickerSpeed: 4000,
  language: 'ar',
  orientation: ORIENTATION.DEFAULT,
  masjidName: '',
  news: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  selectors: {
    selectHadithTickerSpeed: (state) => state.hadithTickerSpeed,
    selectLanguage: (state) => state.language,
    selectOrientation: (state) => state.orientation,
    selectMasjidName: (state) => state.masjidName,
    selectNews: (state) => state.news,
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
    addNews: (state, action) => {
      state.news = [...state.news, action.payload];
    },
  },
});

export const { setHadithTickerSpeed, setLanguage, setOrientation, setMasjidName, addNews } =
  settingsSlice.actions;

export const {
  selectHadithTickerSpeed,
  selectLanguage,
  selectOrientation,
  selectMasjidName,
  selectNews,
} = settingsSlice.selectors;

export default settingsSlice;
