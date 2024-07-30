import { Dispatch } from 'redux';
import {
  getFormattedDate,
  getFormattedDateTomorrow,
  getMonthAbbreviation,
  getPrayerTimes,
} from './lib/kuwaitTimes/actions';
import {
  setTodayPrayerTimes,
  setEnableCountDown,
  setHideScreen,
  setShowAzanTime,
  setShowAzKar,
} from './lib/features/settings';

export const wait = async (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const minuetsToMilliseconds = (minuets: number) => minuets * 60 * 1000;

export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }

    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export function updateTimes(dispatch: Dispatch) {
  const getDate = getFormattedDate();
  const getMonth = getMonthAbbreviation();
  const getTimes = getPrayerTimes(getMonth, getDate);
  console.log('getTimes: ', getTimes?.times);
  dispatch(setTodayPrayerTimes(getTimes?.times));
}

export function updateTimesTomorrow(dispatch: Dispatch) {
  const getDate = getFormattedDateTomorrow();
  const getMonth = getMonthAbbreviation();
  const getTimes = getPrayerTimes(getMonth, getDate);
  console.log('getTimes: ', getTimes?.times);
  dispatch(setTodayPrayerTimes(getTimes?.times));
}

export function initReload(dispatch: Dispatch) {
  dispatch(setShowAzanTime(false));
  dispatch(setHideScreen(false));
  dispatch(setShowAzKar(false));
  dispatch(setEnableCountDown(false));
}
