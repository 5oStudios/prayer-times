import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { hadithSupbaseType } from '../database/actions';

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
  news: hadithSupbaseType[];
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
  beforeAzanTimes: [25, 0, 20, 25, 10, 10],
  currentTimePeriod: 0,
  showAzanTime: false,
  currentPrayTimeName: '',
  onlyFriday: true,
  AkamaAfter: 1,
  enableCountDown: false,
  showAzKar: false,
  azkarImage: '',
  ImamName: '',
  autoLocation: true,
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
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: { payload: Partial<SettingsState> }) => ({
      ...state,
      ...action.payload,
    }),
  },
  selectors: {
    selectSettings: (state) => state,
  },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice;

export const { selectSettings } = settingsSlice.selectors;
