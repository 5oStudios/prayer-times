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

// const adjustMinutes = (date: Date, minutes: number) => {
//   const newDate = new Date(date);
//   newDate.setMinutes(newDate.getMinutes() + minutes);
//   return newDate;
// };

const timesSlice = createSlice({
  name: 'times',
  initialState,
  reducers: {
    setNextPrayer(state, action) {
      state.nextPrayer = action.payload;
    },
    setTimes(state, action) {
      state.times = action.payload;
    },
    // adjustPrayerTime(state, action: { payload: { id: string; minutes: number } }) {
    //   const { id, minutes } = action.payload;
    //   const targetPrayer = state.times.find((prayer) => prayer.id === id);
    //   if (!targetPrayer) return;
    //   const adjustedTime = adjustMinutes(targetPrayer.time, minutes);
    //
    //   const newPrayer = Object.assign(targetPrayer, { time: adjustedTime });
    //   state.times = state.times.map((prayer) => (prayer.id === id ? newPrayer : prayer));
    // },
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

export const { setNextPrayer, setTimes } = timesSlice.actions;

export const { selectTimes, selectTimesStatus, selectTimesError, selectNextPrayer } =
  timesSlice.selectors;
