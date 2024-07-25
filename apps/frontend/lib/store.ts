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

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

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
