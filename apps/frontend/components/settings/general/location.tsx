'use client';

import { useEffect, useState } from 'react';
import { NativeSelect, Text, Switch } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Coordinates } from '@islamic-kit/prayer-times';
import useLocalStorage from 'use-local-storage';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import {
  selectAutoLocation,
  selectCity,
  selectCountry,
  setAutoLocation,
  setCity,
  setCountry,
} from '../../../lib/features/settings';
import style from '../../../assets/css/settings.module.css';
import { getCities } from '../../../lib/coordinatesActions/actions';
import { getPrayerTimes } from '../../../lib/kuwaitTimes/actions';

const kuwaitCoordinates = {
  latitude: 29.3759,
  longitude: 47.9774,
};

export default function Location({ isArabic }: { isArabic: boolean }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const autoLocation = useSelector(selectAutoLocation);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const citiesList = getCities();
    setCities(citiesList);
    console.log('cities = ', citiesList);
    console.log('times = ', getPrayerTimes('july', '23'));
  }, []);

  return (
    <div style={{ marginTop: '1rem' }} className={isArabic ? style.alRight : ''}>
      <Text>{dictionary.settings.location.title}</Text>
      <div
        style={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}
        className={isArabic ? style.alRight : ''}
      >
        <NativeSelect
          disabled={autoLocation}
          defaultValue={'الكويت'}
          label={dictionary.settings.location.country}
          data={['الكويت']}
          style={{ width: '45%' }}
        />

        <NativeSelect
          disabled={autoLocation}
          value={cities[0]}
          label={dictionary.settings.location.city}
          data={cities}
          onChange={(event) => {
            const selectedCity = event.currentTarget.value;
            dispatch(setCity(selectedCity));
          }}
          style={{ width: '45%' }}
        />
      </div>
      <Switch
        style={{ marginTop: '0.5rem' }}
        defaultChecked={autoLocation}
        onChange={() => {
          dispatch(setAutoLocation(!autoLocation));
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }}
        label={dictionary.settings.location.autoSetting}
      />
    </div>
  );
}
