import { Text } from '@mantine/core';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { MuslimPrayers, PrayerTime } from '@islamic-kit/prayer-times';
import { publish, subscribe } from '@enegix/events';
import { useDispatch, useSelector } from 'react-redux';
import { ClockSection } from '../../sections/clock';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import { SupportedLanguages } from '../../app/i18n/dictionaries';
import {
  selectBeforeAzanTimes,
  selectDisableSunRiseAzan,
  selectShowAzanDuration,
  setCurrentTimePeriod,
  setEnableAd,
  setEnableCountDown,
} from '../../lib/features/settings';
import { initReload, minuetsToMilliseconds, wait } from '../../utils';

export default function Azan({ language }: { language: SupportedLanguages }) {
  const dictionary = useDictionary();
  const isArabic = language === 'ar';
  const [show, setShow] = useState<boolean>(false);
  const [prayTime, setPrayTime] = useState<PrayerTime | null>(null);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const disableSunRiseAzan = useSelector(selectDisableSunRiseAzan);
  const showAzanDuration = useSelector(selectShowAzanDuration);
  const beforeAzanTimes = useSelector(selectBeforeAzanTimes);
  const dispatch = useDispatch();

  const shouldPlayAzan = (prayer: PrayerTime) => {
    const isSunrise = prayer.id === MuslimPrayers.sunrise;
    if (!isSunrise) return true;
    return !disableSunRiseAzan;
  };

  useEffect(() => {
    subscribe<PrayerTime>('next-prayer', async (prayer) => {
      if (!shouldPlayAzan(prayer)) return;
      // const minutes = (beforeAzanTimes?.find((time) => time.id === prayer.id)?.minutes) ?? 2;

      setPrayTime(prayer);
      setShow(true);

      dispatch(setEnableAd(false));

      await wait(minuetsToMilliseconds(showAzanDuration));

      dispatch(setEnableCountDown(true));
      dispatch(setCurrentTimePeriod(prayer));
      const minutes = beforeAzanTimes?.find((time) => time.id === prayer.id)?.minutes ?? 2;
      setShow(false);
      publish('start-countdown', {
        prayer,
        minutes, //Test it
        // showAzanDuration,//check beforeAzanTimes
      });
    });
       // Cleanup function called on component unmount
       return () => {
        initReload(dispatch);
      };
  }, []);

  if (!prayTime) return;
  if (!show) return;

  // eslint-disable-next-line consistent-return
  return (
    <div
      className="azan-wrapper"
      style={{
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isTabletOrMobile ? (
        <ClockSection lang={language} style={{ color: 'white' }} />
      ) : (
        <ClockSection lang={language} className="clock-section-azan" />
      )}
      <Text style={{ fontSize: isPortrait ? '3rem' : '5rem', color: '#dfbb76' }}>
        {dictionary.azan}
      </Text>
      <Text style={{ fontSize: isPortrait ? '5rem' : '12rem', color: '#ffffff' }}>
        {isArabic ? prayTime.name.ar : prayTime.name.en}
      </Text>
    </div>
  );
}
