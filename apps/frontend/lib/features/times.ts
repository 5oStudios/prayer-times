import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Coordinates,
  MuslimPrayers,
  MuslimPrayersAr,
  PrayerTime,
  PrayerTimesClient,
} from '@islamic-kit/prayer-times';

export const prayerTimesClient = new PrayerTimesClient({
  strategy: 'OFFLINE',
  region: 'Egyptian',
});

export const fetchTimes = createAsyncThunk('times/fetchTimes', async (coordinates: Coordinates) =>
  prayerTimesClient.getTimings({
    date: new Date(),
    coordinates,
  })
);

const initialState: {
  times: PrayerTime[];
  nextPrayer: PrayerTime;
  status: string;
  error: unknown;
} = {
  times: [],
  nextPrayer: {
    id: 'fajr',
    name: {
      ar: MuslimPrayersAr.fajr,
      en: MuslimPrayers.fajr,
    },
    time: new Date(),
    isNext: false,
    remaining: 0,
  },
  status: 'idle',
  error: null,
};

const timesSlice = createSlice({
  name: 'times',
  initialState,
  reducers: {
    setNextPrayer(state, action) {
      state.nextPrayer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTimes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.times = action.payload;
      })
      .addCase(fetchTimes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
  selectors: {
    selectTimes: (state) => state.times,
    selectNextPrayer: (state) => state.nextPrayer,
    selectTimesStatus: (state) => state.status,
    selectTimesError: (state) => state.error,
  },
});

export default timesSlice;

export const { setNextPrayer } = timesSlice.actions;

export const { selectTimes, selectTimesStatus, selectTimesError, selectNextPrayer } =
  timesSlice.selectors;
