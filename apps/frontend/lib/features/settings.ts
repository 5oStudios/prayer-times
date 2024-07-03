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

export type SettingsState = {
  hadithTickerSpeed: number;
  orientation: ORIENTATION;
  masjidName: string;
  news: NewsType[];
  hideScreen: boolean;
  url: string;
  enableURL: boolean;
  background: number;
  timePeriod: number[];
  currentTimePeriod: number;
  showAzanTime: boolean;
  currentPrayTimeName: string;
  onlyFriday: boolean;
  AkamaAfter: number;
  enableCountDown: boolean;
  showAzKar: boolean;
  azkarImage: string;
};

const initialState: SettingsState = {
  hadithTickerSpeed: 4000,
  orientation: ORIENTATION.DEFAULT,
  masjidName: '',
  news: [],
  hideScreen: false,
  url: '',
  enableURL: false,
  background: 0,
  timePeriod: [2, 0, 2, 2, 2, 2],
  currentTimePeriod: 0,
  showAzanTime: false,
  currentPrayTimeName: '',
  onlyFriday: true,
  AkamaAfter: 1,
  enableCountDown: false,
  showAzKar: false,
  azkarImage: '',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setHadithTickerSpeed: (state, action) => {
      state.hadithTickerSpeed = action.payload;
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
    setNews: (state, action) => {
      state.news = action.payload;
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
    setCurrentTimePeriod: (state, action) => {
      state.currentTimePeriod = action.payload;
    },
    setShowAzanTime: (state, action) => {
      state.showAzanTime = action.payload;
    },
    setCurrentPrayTimeName: (state, action) => {
      state.currentPrayTimeName = action.payload;
    },
    setOnlyFriday: (state, action) => {
      state.onlyFriday = action.payload;
    },
    setAkamaAfter: (state, action) => {
      state.AkamaAfter = action.payload;
    },
    setEnableCountDown: (state, action) => {
      state.enableCountDown = action.payload;
    },
    setShowAzKar: (state, action) => {
      state.showAzKar = action.payload;
    },
    setAzkarImage: (state, action) => {
      state.azkarImage = action.payload;
    },
  },
});

export const {
  setHadithTickerSpeed,
  setOrientation,
  setMasjidName,
  setNews,
  setHideScreen,
  setURL,
  setEnableURL,
  setBackground,
  setTimePeriod,
  setCurrentTimePeriod,
  setShowAzanTime,
  setCurrentPrayTimeName,
  setOnlyFriday,
  setAkamaAfter,
  setEnableCountDown,
  setShowAzKar,
  setAzkarImage,
} = settingsSlice.actions;

export default settingsSlice;

export const selectHadithTickerSpeed = (state: RootState) => state.settings.hadithTickerSpeed;
export const selectOrientation = (state: RootState) => state.settings.orientation;
export const selectMasjidName = (state: RootState) => state.settings.masjidName;
export const selectNews = (state: RootState) => state.settings.news;
export const selectHideScreen = (state: RootState) => state.settings.hideScreen;
export const selectURL = (state: RootState) => state.settings.url;
export const selectEnableURL = (state: RootState) => state.settings.enableURL;
export const selectBackground = (state: RootState) => state.settings.background;
export const selectTimePeriod = (state: RootState) => state.settings.timePeriod;
export const selectCurrentTimePeriod = (state: RootState) => state.settings.currentTimePeriod;
export const selectShowAzanTime = (state: RootState) => state.settings.showAzanTime;
export const selectCurrentPrayTimeName = (state: RootState) => state.settings.currentPrayTimeName;
export const selectOnlyFriday = (state: RootState) => state.settings.onlyFriday;
export const selectAkamaAfter = (state: RootState) => state.settings.AkamaAfter;
export const selectEnableCountDown = (state: RootState) => state.settings.enableCountDown;
export const selectShowAzkar = (state: RootState) => state.settings.showAzKar;
export const selectAzkarImage = (state: RootState) => state.settings.azkarImage;
