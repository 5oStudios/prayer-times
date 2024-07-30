'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import deepEqual from 'fast-deep-equal';
import hadithSlice from './features/hadith';
import timesSlice, { setNextPrayer } from './features/times';
// eslint-disable-next-line import/no-cycle
import settingsReducer from './features/settings';
import { adjustedTimesSlice } from './features/adjustedTimes';

const LOCAL_STORAGE_VERSION_KEY = 'localStorageVersion';
const CURRENT_VERSION = '1.0.0';

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const isBrowser = typeof window !== 'undefined';
const storage = isBrowser ? createWebStorage('local') : createNoopStorage();


if (isBrowser) {
  // Get the current version stored in localStorage
  const storedVersion = localStorage.getItem(LOCAL_STORAGE_VERSION_KEY);

  // Check if the stored version is different from the current version
  if (storedVersion !== CURRENT_VERSION) {
    // Clear localStorage if versions do not match
    localStorage.clear();
    // Set the new version in localStorage
    localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, CURRENT_VERSION);
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings', 'adjustedTimes'],
};

const rootReducer = combineReducers({
  settings: settingsReducer.reducer,
  hadith: hadithSlice.reducer,
  times: timesSlice.reducer,
  adjustedTimes: adjustedTimesSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  const lastNextPrayer = store.getState().times.nextPrayer;
  const nextPrayer = store.getState().times.times.find((time) => time.isNext);

  console.log({ nextPrayer });
  if (lastNextPrayer?.id === nextPrayer?.id) return;

  if (nextPrayer) store.dispatch(setNextPrayer(nextPrayer));
});

let lastAdjustedTimes: { id: string; extraMinutes: number }[] = [];
store.subscribe(() => {
  const nextAdjustedTimes = store.getState().adjustedTimes;

  if (deepEqual(lastAdjustedTimes, nextAdjustedTimes)) return;

  lastAdjustedTimes = nextAdjustedTimes;

  const previousTimes = store.getState().times.times;

  const adjustedTimes = previousTimes.map((time) => {
    const adjustedTime = nextAdjustedTimes.find((t) => t.id === time.id);
    if (adjustedTime) {
      const newTime = new Date(time.time);
      newTime.setMinutes(newTime.getMinutes() + adjustedTime.extraMinutes);
      return { ...time, adjustedTime: newTime };
    }
    return time;
  });

  if (deepEqual(previousTimes, adjustedTimes)) return;
  console.log({ previousTimes, adjustedTimes, isEqual: deepEqual(previousTimes, adjustedTimes) });

  store.dispatch(timesSlice.actions.setTimes(adjustedTimes));
});

const persister = persistStore(store);

export { store, persister };

export type RootState = ReturnType<typeof store.getState>;
