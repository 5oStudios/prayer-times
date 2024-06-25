import React from 'react';
import { useRouter } from 'next/navigation';
import { Text, Radio, Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { selectLanguage, setLanguage } from '../../../lib/features/settings';

function Language() {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (value: string) => {
    dispatch(setLanguage(value as 'ar' | 'en'));
    router.push(`/${value}`);
  };

  return (
    <div>
      <Text> {dictionary.settings.language.description}</Text>
      <Radio.Group
        onChange={handleChange}
        name={dictionary.settings.language.title}
        value={useSelector(selectLanguage)}
      >
        <Group mt="xs">
          <Radio value="ar" label={dictionary.settings.language.lang.arabic} />
          <Radio value="en" label={dictionary.settings.language.lang.english} />
        </Group>
      </Radio.Group>
    </div>
  );
}

export default Language;
