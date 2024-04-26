import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Coordinates, PrayerTime, PrayerTimesClient } from '@islamic-kit/prayer-times';

export const prayerTimesClient = new PrayerTimesClient({
  strategy: 'OFFLINE',
  region: 'Kuwait',
});

export const fetchTimes = createAsyncThunk('times/fetchTimes', async (coordinates: Coordinates) =>
  prayerTimesClient.getTimings({
    date: new Date(),
    coordinates,
  })
);

const initialState: {
  times: PrayerTime[];
  status: string;
  error: unknown;
} = {
  times: [],
  status: 'idle',
  error: null,
};

const timesSlice = createSlice({
  name: 'times',
  initialState,
  reducers: {},
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
    selectTimesStatus: (state) => state.status,
    selectTimesError: (state) => state.error,
  },
});

export default timesSlice;

export const { selectTimes, selectTimesStatus, selectTimesError } = timesSlice.selectors;
