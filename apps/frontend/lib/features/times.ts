import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Coordinates,
  MuslimPrayers,
  MuslimPrayersAr,
  PrayerTime,
  PrayerTimesClient,
  Shifting,
} from '@islamic-kit/prayer-times';
import { isPointInPolygon } from 'geolib';

export const kuwaitCoordinates = {
  latitude: 29.3759,
  longitude: 47.9774,
};

let sharedCoordinates: Coordinates = kuwaitCoordinates;
export const prayerTimesClient = new PrayerTimesClient({
  strategy: 'OFFLINE',
  // TODO: check if we really need it
  region: detectRegion(sharedCoordinates),
});

export const fetchTimes = createAsyncThunk(
  'times/fetchTimes',
  async ({ coordinates, shifting }: { coordinates: Coordinates; shifting: Shifting }) => {
    console.log('fetchTimes', coordinates, shifting);
    sharedCoordinates = coordinates;
    return prayerTimesClient.getTimings({
      date: new Date(),
      coordinates,
      shifting,
    });
  }
);

const initialState: {
  times: PrayerTime[];
  nextPrayer: PrayerTime;
  status: string;
  error: unknown;
} = {
  times: [],
  nextPrayer: {
    id: '',
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

function detectRegion(coordinates: Coordinates): 'Egyptian' | 'Kuwait' {
  const egyptPolygon = [
    { latitude: 22.0, longitude: 25.0 },
    { latitude: 22.0, longitude: 36.0 },
    { latitude: 31.0, longitude: 36.0 },
    { latitude: 31.0, longitude: 25.0 },
  ];
  if (isPointInPolygon(coordinates, egyptPolygon)) {
    return 'Egyptian';
  }
  return 'Kuwait';
}

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
