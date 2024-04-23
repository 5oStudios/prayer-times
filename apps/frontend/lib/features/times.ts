import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PrayerTimesClient } from '@islamic-kit/prayer-times';

const prayerTimesClient = new PrayerTimesClient({
  region: 'Kuwait',
  school: 'HANAFI',
  strategy: 'ONLINE',
});

export const fetchTimes = createAsyncThunk('times/fetchTimes', async () =>
  prayerTimesClient.getTimings({
    date: new Date(),
    coordinates: {
      latitude: 10.0444,
      longitude: 31.2357,
    },
  })
);

const initialState: {
  times: { name: string; time: string }[];
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
