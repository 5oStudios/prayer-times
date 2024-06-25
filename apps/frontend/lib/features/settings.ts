import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export enum ORIENTATION {
  DEFAULT = '',
  LEFT = 'vrLEFT',
  RIGHT = 'vrRIGHT',
}

export type NewsType = {
  title: string;
  content: string;
};

const initialState = {
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
      state.news.push(action.payload as never);
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

export default settingsSlice;

export const selectHadithTickerSpeed = (state: RootState) => state.settings.hadithTickerSpeed;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectOrientation = (state: RootState) => state.settings.orientation;
export const selectMasjidName = (state: RootState) => state.settings.masjidName;
export const selectNews = (state: RootState) => state.settings.news;
export const selectHideScreen = (state: RootState) => state.settings.hideScreen;
export const selectURL = (state: RootState) => state.settings.url;
export const selectEnableURL = (state: RootState) => state.settings.enableURL;
export const selectBackground = (state: RootState) => state.settings.background;
export const selectTimePeriod = (state: RootState) => state.settings.timePeriod;
