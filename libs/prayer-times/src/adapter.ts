import { SupportedPrayerTimes } from './interfaces';
import * as moment from 'moment';

export const timesAdapter = (times: SupportedPrayerTimes) => {
  return Object.entries(times).map(([name, time]) => ({
    name,
    time: formatTime(time),
  }));
};

const formatTime = (time: Date) => moment(time).format('h:mm A');
