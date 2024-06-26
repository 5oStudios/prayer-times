import { NumberInput, Text } from '@mantine/core';
import { PrayerTime } from '@islamic-kit/prayer-times';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTimes } from '../../../lib/features/times';
import { selectTimePeriod, setTimePeriod, setHideScreen } from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import styles from '../../../assets/css/settings.module.css';

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

function PrayTimesBanner({ isArabic }: { isArabic: boolean }) {
  const times = useSelector(selectTimes);
  const dictionary = useDictionary();
  return (
    <div style={{ width: '100%' }}>
      <Text style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {dictionary.settings.displayScreen.prayTimeBanner}
      </Text>
      <div className={isArabic ? styles.alRight : ''} style={{ width: '100%' }}>
        {times.map((time, index) => (
          <PrayTimesBannerCard key={index} time={time} index={index} isArabic={isArabic} />
        ))}
      </div>
    </div>
  );
}

function PrayTimesBannerCard({
  time,
  index,
  isArabic,
}: {
  time: PrayerTime;
  index: number;
  isArabic: boolean;
}) {
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
    <div
      className={isArabic ? styles.alRight : ''}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: '1rem',
      }}
    >
      <NumberInput defaultValue={timePeriod[index]} onChange={handleChange} />
      <Text style={{ width: '20%', marginLeft: '1rem' }}>{getPrayerTimeNames(time.name)}</Text>
    </div>
  );
}

export { PrayTimesBanner, PrayTimesBannerCard };
