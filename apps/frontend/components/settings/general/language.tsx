import React from 'react';
import { useRouter } from 'next/navigation';
import { Text, Radio, Group } from '@mantine/core';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';

function Language({ language }: { language: string }) {
  const dictionary = useDictionary();
  const router = useRouter();
  const lang = language;
  const handleChange = (value: string) => {
    router.push(`/${value}`);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <Text> {dictionary.settings.language.description}</Text>
      <Radio.Group onChange={handleChange} name={dictionary.settings.language.title} value={lang}>
        <Group mt="xs">
          <Radio value="ar" label={dictionary.settings.language.lang.arabic} />
          <Radio value="en" label={dictionary.settings.language.lang.english} />
        </Group>
      </Radio.Group>
    </div>
  );
}

export default Language;
