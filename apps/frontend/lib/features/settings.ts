import { createSlice } from '@reduxjs/toolkit';

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
  background: number;
} = {
  hadithTickerSpeed: 4000,
  language: 'ar',
  orientation: ORIENTATION.DEFAULT,
  masjidName: '',
  news: [],
  hideScreen: false,
  url: '',
  enableURL: false,
  background: 0,
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
    selectBackground: (state) => state.background,
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
    setBackground: (state, action) => {
      state.background = action.payload;
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
  setBackground,
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
  selectBackground,
} = settingsSlice.selectors;

export default settingsSlice;
