import React from 'react';
import { Input, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { setMasjidName } from '../../../lib/features/settings';

export default function MasjidName() {
  const dictionary = useDictionary();
  const dispatch = useDispatch();

  const handleNameChange = (value: string) => {
    dispatch(setMasjidName(value));
  };

  return (
    <div style={{ width: '100%' }}>
      <Text>{dictionary.settings.masjidName.title}</Text>
      <Input
        placeholder={dictionary.settings.masjidName.description}
        onChange={(event) => handleNameChange(event.currentTarget.value)}
      />
    </div>
  );
}
