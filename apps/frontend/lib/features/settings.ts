import { createSlice } from '@reduxjs/toolkit';
import { selectOptions } from '@testing-library/user-event/dist/types/setup/directApi';
import { stat } from 'fs';
import { act } from 'react-dom/test-utils';

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
  hideScreen: boolean;
  url: string;
  enableURL: boolean;
} = {
  hadithTickerSpeed: 4000,
  language: 'ar',
  orientation: ORIENTATION.DEFAULT,
  masjidName: '',
  news: [],
  hideScreen: false,
  url: '',
  enableURL: false,
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
    selectHideScreen: (state) => state.hideScreen,
    selectURL: (state) => state.url,
    selectEnableURl: (state) => state.enableURL,
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
    setHideScreen: (state, action) => {
      state.hideScreen = action.payload;
    },
    addNews: (state, action) => {
      state.news.push(action.payload);
    },
    setURL: (state, action) => {
      state.url = action.payload;
    },
    setEnableURL: (state, action) => {
      state.enableURL = action.payload;
    },
  },
});

export const {
  setHadithTickerSpeed,
  setLanguage,
  setOrientation,
  setMasjidName,
  addNews,
  setHideScreen,
  setURL,
  setEnableURL,
} = settingsSlice.actions;

export const {
  selectHadithTickerSpeed,
  selectLanguage,
  selectOrientation,
  selectMasjidName,
  selectNews,
  selectHideScreen,
  selectURL,
  selectEnableURl,
} = settingsSlice.selectors;

export default settingsSlice;
