import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

type NewsType = {
  content: string;
};

export enum ORIENTATION {
  DEFAULT = '',
  LEFT = 'vrLEFT',
  RIGHT = 'vrRIGHT',
}

// export type NewsType = {
//   title: string;
//   content: string;
// };

export type SettingsState = {
  hadithTickerSpeed: number;
  orientation: ORIENTATION;
  masjidName: string;
  hideScreen: boolean;
  url: string;
  enableURL: boolean;
  background: number;
  timePeriod: number[];
  beforeAzanTimes: number[];
  currentTimePeriod: number;
  showAzanTime: boolean;
  currentPrayTimeName: string;
  onlyFriday: boolean;
  news: NewsType[];
  AkamaAfter: number;
  enableCountDown: boolean;
  showAzKar: boolean;
  azkarImage: string;
  ImamName: string;
  autoLocation: boolean;
  remainingTime: number;
  enableNextPrayDisplay: boolean;
  country: string;
  city: string;
  hideSunRise: boolean;
  adImg: string;
  adEveryHowManyMinutes: number;
  adDuration: number;
  enableAd: boolean;
  disableSunRiseAzan: boolean;
  arabicHadith: string[];
  englishHadith: string[];
  adjustPrayTimes: number[];
  todayPrayerTimes: string[];
};

const initialState: SettingsState = {
  hadithTickerSpeed: 4000,
  orientation: ORIENTATION.DEFAULT,
  masjidName: '',
  hideScreen: false,
  url: '',
  enableURL: false,
  background: 0,
  timePeriod: [2, 0, 2, 2, 2, 2],
  beforeAzanTimes: [25, 0, 20, 25, 10, 10],
  adjustPrayTimes: [0, 0, 0, 0, 0, 0],
  currentTimePeriod: 0,
  showAzanTime: false,
  currentPrayTimeName: '',
  onlyFriday: true,
  AkamaAfter: 1,
  enableCountDown: false,
  showAzKar: false,
  azkarImage: '',
  ImamName: '',
  autoLocation: false,
  remainingTime: 0,
  enableNextPrayDisplay: false,
  country: '',
  city: '',
  hideSunRise: false,
  adImg: '',
  adEveryHowManyMinutes: 1,
  adDuration: 1,
  enableAd: false,
  disableSunRiseAzan: false,
  arabicHadith: [],
  englishHadith: [],
  news: [],
  todayPrayerTimes: [],
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
    setBeforeAzanTimes: (state, action) => {
      state.beforeAzanTimes = action.payload;
    },
    setImamName: (state, action) => {
      state.ImamName = action.payload;
    },
    setAutoLocation: (state, action) => {
      state.autoLocation = action.payload;
    },
    setRemainingTime: (state, action) => {
      state.remainingTime = action.payload;
    },
    setEnableNextPrayDisplay: (state, action) => {
      state.enableNextPrayDisplay = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setHideSunRise: (state, action) => {
      state.hideSunRise = action.payload;
    },
    setAdImg: (state, action) => {
      state.adImg = action.payload;
    },
    setAdEveryHowManyMinutes: (state, action) => {
      state.adEveryHowManyMinutes = action.payload;
    },
    setAdDuration: (state, action) => {
      state.adDuration = action.payload;
    },
    setEnableAd: (state, action) => {
      state.enableAd = action.payload;
    },
    setDisableSunRiseAzan: (state, action) => {
      state.disableSunRiseAzan = action.payload;
    },
    setArabicHadith: (state, action) => {
      state.arabicHadith = action.payload;
    },
    setEnglishHadith: (state, action) => {
      state.englishHadith = action.payload;
    },
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setAdjustPrayTimes: (state, action) => {
      state.adjustPrayTimes = action.payload;
    },
    setTodayPrayerTimes: (state, action) => {
      state.todayPrayerTimes = action.payload;
    },
  },
});

export const {
  setHadithTickerSpeed,
  setOrientation,
  setMasjidName,
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
  setBeforeAzanTimes,
  setImamName,
  setAutoLocation,
  setRemainingTime,
  setEnableNextPrayDisplay,
  setCountry,
  setCity,
  setHideSunRise,
  setAdImg,
  setAdEveryHowManyMinutes,
  setAdDuration,
  setEnableAd,
  setDisableSunRiseAzan,
  setArabicHadith,
  setEnglishHadith,
  setNews,
  setAdjustPrayTimes,
  setTodayPrayerTimes,
} = settingsSlice.actions;

export default settingsSlice;

export const selectHadithTickerSpeed = (state: RootState) => state.settings.hadithTickerSpeed;
export const selectOrientation = (state: RootState) => state.settings.orientation;
export const selectMasjidName = (state: RootState) => state.settings.masjidName;
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
export const selectBeforeAzanTimes = (state: RootState) => state.settings.beforeAzanTimes;
export const selectImamName = (state: RootState) => state.settings.ImamName;
export const selectAutoLocation = (state: RootState) => state.settings.autoLocation;
export const selectRemainingTime = (state: RootState) => state.settings.remainingTime;
export const selectEnableNextPrayDisplay = (state: RootState) =>
  state.settings.enableNextPrayDisplay;
export const selectCountry = (state: RootState) => state.settings.country;
export const selectCity = (state: RootState) => state.settings.city;
export const selectHideSunRise = (state: RootState) => state.settings.hideSunRise;
export const selectAdImg = (state: RootState) => state.settings.adImg;
export const selectAdEveryHowManyMinutes = (state: RootState) =>
  state.settings.adEveryHowManyMinutes;
export const selectAdDuration = (state: RootState) => state.settings.adDuration;
export const selectEnableAd = (state: RootState) => state.settings.enableAd;
export const selectDisableSunRiseAzan = (state: RootState) => state.settings.disableSunRiseAzan;
export const selectArabicHadith = (state: RootState) => state.settings.arabicHadith;
export const selectEnglishHadith = (state: RootState) => state.settings.englishHadith;
export const selectNews = (state: RootState) => state.settings.news;
export const selectAdjustPrayTimes = (state: RootState) => state.settings.adjustPrayTimes;
export const selectTodayPrayerTimes = (state: RootState) => state.settings.todayPrayerTimes;
