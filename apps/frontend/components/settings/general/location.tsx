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
import { getCities, getCoordinates, getCountries } from '../../../lib/coordinatesActions/actions';

const kuwaitCoordinates = {
  latitude: 29.3759,
  longitude: 47.9774,
};

export default function Location({ isArabic }: { isArabic: boolean }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const countryLoc = useSelector(selectCountry);
  const cityloc = useSelector(selectCity);
  const [coordinates, setCoordinates] = useLocalStorage<Coordinates | null>('cachedPosition', null);
  const autoLocation = useSelector(selectAutoLocation);
  const countries = getCountries();
  const [cities, setCities] = useState([]);
  const [cityData, setCityData] = useState<string>(cityloc);
  const [countryC, setCountryC] = useState<string>(countryLoc);

  useEffect(() => {
    if (countryLoc) {
      const data = getCities(countryLoc);
      const citiesData = data.map((city: { name: string }) => city.name);
      setCities(citiesData);
    }
  }, []);

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

  useEffect(() => {
    if (autoLocation) AutoSet();
    console.log('country = ', countryLoc, ' ', 'city = ', cityloc);
  }, []);

  const onCountrySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    setCountryC(selectedCountry);
    dispatch(setCountry(selectedCountry));
    const data = getCities(selectedCountry);
    const citiesData = data.map((city: { name: string }) => city.name);
    console.log(citiesData);
    setCities(citiesData);
  };
  const onCitySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setCityData(selectedCity);
    console.log(selectedCity);
    dispatch(setCity(selectedCity));
    const data = getCoordinates(countryC, selectedCity);
    console.log('lat = ', data?.latitude, ' ', 'long = ', data?.longitude);
    setCoordinates({ latitude: data?.latitude, longitude: data?.longitude });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div style={{ marginTop: '1rem' }} className={isArabic ? style.alRight : ''}>
      <Text>{dictionary.settings.location.title}</Text>
      <div
        style={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}
        className={isArabic ? style.alRight : ''}
      >
        <NativeSelect
          disabled={autoLocation}
          defaultValue={countryC}
          label={dictionary.settings.location.country}
          data={countries}
          onChange={onCountrySelect}
          style={{ width: '45%' }}
        />
        <NativeSelect
          disabled={autoLocation}
          value={cityData}
          label={dictionary.settings.location.city}
          data={cities}
          onChange={onCitySelect}
          style={{ width: '45%' }}
        />
      </div>
      <Switch
        style={{ marginTop: '0.5rem' }}
        defaultChecked={autoLocation}
        onChange={() => {
          dispatch(setAutoLocation(!autoLocation));
          AutoSet();
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }}
        label={dictionary.settings.location.autoSetting}
      />
    </div>
  );
}
