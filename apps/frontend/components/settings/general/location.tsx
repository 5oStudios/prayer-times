import { useEffect } from 'react';
import { NumberInput, Text, Switch } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Coordinates } from '@islamic-kit/prayer-times';
import useLocalStorage from 'use-local-storage';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { selectAutoLocation, setAutoLocation } from '../../../lib/features/settings';
import style from '../../../assets/css/settings.module.css';

const kuwaitCoordinates = {
  latitude: 29.3759,
  longitude: 47.9774,
};

export default function Location({ isArabic }: { isArabic: boolean }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useLocalStorage<Coordinates | null>('cachedPosition', null);
  const autoLocation = useSelector(selectAutoLocation);

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
    // console.log('done');
  };

  useEffect(() => {
    if (autoLocation) AutoSet();
  }, []);

  const handleLongitudeChange = (value: number | string) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (!Number.isNaN(numericValue)) {
      setCoordinates((prev) => ({
        longitude: numericValue,
        latitude: prev?.latitude ?? 0,
      }));
    }
  };

  const handleLatitudeChange = (value: number | string) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (!Number.isNaN(numericValue)) {
      setCoordinates((prev) => ({
        longitude: prev?.longitude ?? 0,
        latitude: numericValue,
      }));
    }
  };

  return (
    <div style={{ marginTop: '1rem' }} className={isArabic ? style.alRight : ''}>
      <Text>{dictionary.settings.location.title}</Text>
      <div
        style={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}
        className={isArabic ? style.alRight : ''}
      >
        <NumberInput
          disabled={autoLocation}
          label={dictionary.settings.location.latitude}
          placeholder={dictionary.settings.location.latitude}
          value={coordinates?.latitude}
          onChange={handleLatitudeChange}
        />
        <NumberInput
          disabled={autoLocation}
          label={dictionary.settings.location.longitude}
          placeholder={dictionary.settings.location.longitude}
          value={coordinates?.longitude}
          onChange={handleLongitudeChange}
        />
      </div>
      <Switch
        style={{ marginTop: '0.5rem' }}
        defaultChecked={autoLocation}
        onChange={() => {
          dispatch(setAutoLocation(!autoLocation));
          AutoSet();
        }}
        label={dictionary.settings.location.autoSetting}
      />
    </div>
  );
}
