'use client';

import { NumberInput, Switch, Text } from '@mantine/core';
import '../accordion.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { MuslimPrayers, PrayerTime } from '@islamic-kit/prayer-times';
import {
  selectHideScreen,
  selectShowAzanDuration,
  selectTimePeriod,
  setHideScreen,
  setShowAzanDuration,
  setTimePeriod,
} from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import styles from '../../../assets/css/settings.module.css';
import { selectTimes } from '../../../lib/features/times';

function HideDisplayScreen({ isArabic }: { isArabic: boolean }) {
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const hadithScreen = useSelector(selectHideScreen);
  const times = useSelector(selectTimes);
  const akamaAfter = useSelector(selectShowAzanDuration);

  const toggleOverlay = () => {
    dispatch(setHideScreen(!hadithScreen));
  };

  return (
    <div style={{ marginTop: '2rem' }} className={isArabic ? styles.rightAligned : ''}>
      <Text>{dictionary.settings.displayScreen.hideDisplayScreen}</Text>
      <Switch
        style={{ marginTop: '0.5rem' }}
        defaultChecked={hadithScreen}
        onClick={toggleOverlay}
        label={dictionary.settings.displayScreen.hideManually}
      />
      <Text style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {dictionary.settings.displayScreen.prayTimeBanner}
      </Text>
      <div
        className={`${isArabic ? styles.alRight : ''} ${styles.gridContainer}`}
        style={{ width: '100%' }}
      >
        {times.map(
          (time, index) =>
            time.id !== MuslimPrayers.sunrise && (
              <BlackScreenInputCard key={index} index={index} isArabic={isArabic} time={time} />
            )
        )}
      </div>
      <Text style={{ marginTop: '1rem', marginBottom: '1rem', width: '100%' }}>
        {dictionary.settings.AzanDuration}
      </Text>
      <NumberInput
        value={akamaAfter}
        onChange={(value) => {
          dispatch(setShowAzanDuration(value as number));
        }}
        styles={{
          input: { paddingLeft: isArabic ? '2rem' : '' },
        }}
        min={0}
      />
    </div>
  );
}

type BlackScreenInputCardProps = {
  time: PrayerTime;
  index: number;
  isArabic: boolean;
};

export function BlackScreenInputCard({ index, isArabic, time }: BlackScreenInputCardProps) {
  const dispatch = useDispatch();
  const timePeriod = useSelector(selectTimePeriod);

  const handleChange = (value: number | string) => {
    dispatch(
      setTimePeriod([
        ...timePeriod.filter((t) => t.id !== time.id),
        { id: time.id, minutes: Number(value) },
      ])
    );
  };

  const name = isArabic ? time.name.ar : time.name.en;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginBottom: '1rem',
      }}
    >
      <Text style={{ marginLeft: '1rem' }}>{name}</Text>
      <NumberInput
        value={timePeriod.find((t) => t.id === time.id)?.minutes}
        onChange={handleChange}
        styles={{
          input: { paddingLeft: isArabic ? '2rem' : '' },
        }}
        min={0}
      />
    </div>
  );
}

export default HideDisplayScreen;
const playAlert = () => {
  const audioAlert = new Audio('https://cdn.pixabay.com/audio/2023/01/01/audio_a178429b06.mp3');
  audioAlert.play();
};
