import { NumberInput, Text } from '@mantine/core';
import { PrayerTime } from '@islamic-kit/prayer-times';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTimes } from '../../../lib/features/times';
import { selectTimePeriod, setTimePeriod, setHideScreen } from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';

type PrayerTimesDictionary = {
  [key: string]: string;
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
  Sunset: string;
  Midnight: string;
};

function PrayTimesBanner() {
  const times = useSelector(selectTimes);
  const dictionary = useDictionary();
  return (
    <div style={{ width: '100%' }}>
      <Text style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {dictionary.settings.displayScreen.prayTimeBanner}
      </Text>

      {times.map((time, index) => (
        <PrayTimesBannerCard key={index} time={time} index={index} />
      ))}
    </div>
  );
}

function PrayTimesBannerCard({ time, index }: { time: PrayerTime; index: number }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const timePeriod = useSelector(selectTimePeriod);

  useEffect(() => {
    // console.log('time =',time.remaining);
    if (time.remaining === 0) {
      const delayInMillis = time.remaining * 60 * 1000;
      setTimeout(() => {
        dispatch(setHideScreen(true));
      }, delayInMillis);
      setHideScreen(false);
    }
  }, [time.remaining, dispatch]);

  const getPrayerTimeNames = (name: string) => {
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return (dictionary.times as PrayerTimesDictionary)[capitalized];
  };

  const handleChange = (value: number | string) => {
    const updatedTimePeriod = [...timePeriod];
    updatedTimePeriod[index] = typeof value === 'string' ? parseInt(value, 10) : value;
    dispatch(setTimePeriod(updatedTimePeriod));
  };

  return (
    <div style={{ display: 'flex' }}>
      <NumberInput
        label={getPrayerTimeNames(time.name)}
        defaultValue={timePeriod[index]}
        onChange={handleChange}
      />
    </div>
  );
}

export { PrayTimesBanner, PrayTimesBannerCard };
