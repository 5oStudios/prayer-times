'use client';

import { useEffect, useState } from 'react';
import { NativeSelect, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Coordinates } from '@islamic-kit/prayer-times';
import useLocalStorage from 'use-local-storage';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { selectAutoLocation, selectCity, setCity } from '../../../lib/features/settings';
import style from '../../../assets/css/settings.module.css';
import { kuwaitCoordinates } from '../../../lib/features/times';
import { getCountries, getMethods } from '../../../lib/coordinatesActions/timeAction';
import { CalculationMethods } from '../../../lib/coordinatesActions/type';

export default function Location({ isArabic }: { isArabic: boolean }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useLocalStorage<Coordinates | null>('cachedPosition', null);
  const autoLocation = useSelector(selectAutoLocation);
  const city = useSelector(selectCity);
  const countries = getCountries();
  const [country, setCountry] = useState<keyof CalculationMethods['countries']>('Egypt');
  const [cities, setCities] = useState<string[]>();
  useEffect(() => {
    const citiesList = getMethods(country);
    setCities(citiesList);
    console.log('country: ', country, ' times:', city);
  }, [country]);

  const AutoSet = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        localStorage.setItem('cachedPosition', JSON.stringify(newCoordinates));
        setCoordinates(newCoordinates);
      },
      () => setCoordinates(kuwaitCoordinates)
    );
  };
  const setDefult = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.latitude,
        };
        localStorage.setItem('cachedPosition', JSON.stringify(newCoordinates));
        setCoordinates(newCoordinates);
      },
      () => setCoordinates(kuwaitCoordinates)
    );
  };
  useEffect(() => {
    if (autoLocation) AutoSet();
    else setDefult();
  }, []);
  return (
    <div style={{ marginTop: '1rem' }} className={isArabic ? style.alRight : ''}>
      <Text>{dictionary.settings.location.title}</Text>
      <div
        style={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}
        className={isArabic ? style.alRight : ''}
      >
        <NativeSelect
          // disabled={autoLocation}
          defaultValue={country}
          label={dictionary.settings.location.country}
          data={countries}
          value={country}
          style={{ width: '45%' }}
          onChange={(event) => {
            const selectedCountry = event.currentTarget
              .value as keyof CalculationMethods['countries'];
            setCountry(selectedCountry);
          }}
        />

        <NativeSelect
          // disabled={autoLocation}
          // value={cities[ }
          defaultValue={city}
          label={dictionary.settings.location.city}
          data={cities}
          value={city}
          onChange={(event) => {
            const selectedCity = event.currentTarget.value;
            dispatch(setCity(selectedCity));
          }}
          style={{ width: '45%' }}
        />
      </div>
      {/*<Switch*/}
      {/*  style={{ marginTop: '0.5rem' }}*/}
      {/*  defaultChecked={autoLocation}*/}
      {/*  onChange={() => {*/}
      {/*    dispatch(setAutoLocation(!autoLocation));*/}
      {/*    setTimeout(() => {*/}
      {/*      window.location.reload();*/}
      {/*    }, 100);*/}
      {/*  }}*/}
      {/*  label={dictionary.settings.location.autoSetting}*/}
      {/*/>*/}
    </div>
  );
}
