import { configureStore } from '@reduxjs/toolkit';
import { TaskTimer } from 'tasktimer';
import { publish } from '@enegix/events';
import settingsSlice from './features/settings';
import hadithSlice from './features/hadith';
import timesSlice from './features/times';

const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    hadith: hadithSlice.reducer,
    times: timesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

store.subscribe(() => {
  const { times } = store.getState().times;

  const newPrayer = times.find((time) => time.isNext);
  if (!newPrayer) return;

  const now = new Date();

  const checkEvery = 1000;
  const tasksQueue = new TaskTimer(checkEvery);

  tasksQueue.add({
    id: 'notify',
    callback: () => {
      if (newPrayer.time.getTime() - now.getTime() <= 0) {
        console.log(`It's time for from store ${newPrayer.name}`);
        publish('next-prayer', newPrayer);
      } else {
        console.log(
          `Next prayer is ${newPrayer.name} in ${newPrayer.time.getTime() - now.getTime()}ms`
        );
      }
    },
    removeOnCompleted: true,
  });
  tasksQueue.start();
});
