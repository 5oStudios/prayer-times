import React from 'react';
import { Input, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { selectMasjidName, setMasjidName } from '../../../lib/features/settings';

export default function MasjidName() {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const masjidName = useSelector(selectMasjidName);

  const handleNameChange = (value: string) => {
    dispatch(setMasjidName(value));
  };

  return (
    <div style={{ width: '100%', marginTop: '1rem' }}>
      <Text>{dictionary.settings.masjidName.title}</Text>
      <Input
        value={masjidName}
        placeholder={dictionary.settings.masjidName.description}
        onChange={(event) => handleNameChange(event.currentTarget.value)}
      />
    </div>
  );
}
