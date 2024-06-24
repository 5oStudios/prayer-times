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
  timePeriod: number[];
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
  timePeriod: [0, 0, 0, 1, 0, 0],
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
    selectTimePeriod: (state) => state.timePeriod,
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
    setTimePeriod: (state, action) => {
      state.timePeriod = action.payload;
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
  setTimePeriod,
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
  selectTimePeriod,
} = settingsSlice.selectors;

export default settingsSlice;
