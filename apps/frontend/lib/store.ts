'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import hadithSlice from './features/hadith';
import timesSlice, { setNextPrayer } from './features/times';
// eslint-disable-next-line import/no-cycle
import settingsReducer from './features/settings';

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
  whitelist: ['settings'],
};

const rootReducer = combineReducers({
  settings: settingsReducer.reducer,
  hadith: hadithSlice.reducer,
  times: timesSlice.reducer,
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

  if (lastNextPrayer.id === nextPrayer?.id) return;

  if (nextPrayer) store.dispatch(setNextPrayer(nextPrayer));
});

const persister = persistStore(store);

export { store, persister };

export type RootState = ReturnType<typeof store.getState>;
