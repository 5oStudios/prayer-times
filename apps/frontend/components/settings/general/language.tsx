import React from 'react';
import { useRouter } from 'next/navigation';
import { Text, Radio, Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import { selectLanguage, setLanguage } from '../../../lib/features/settings';
import styles from '../../../assets/css/settings.module.css';

function Language() {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const router = useRouter();
  const lang = useSelector(selectLanguage);
  const isArabic = lang === 'ar';
  const handleChange = (value: string) => {
    dispatch(setLanguage(value as 'ar' | 'en'));
    router.push(`/${value}`);
  };

  return (
    <div style={{ width: '100%' }} className={isArabic ? styles.alRight : ''}>
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
