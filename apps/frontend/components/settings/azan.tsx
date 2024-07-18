import { useState } from 'react';
import { Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  selectShowAzanTime,
  selectCurrentPrayTimeName,
  selectDisableSunRiseAzan,
} from '../../lib/features/settings';
import { ClockSection } from '../../sections/clock';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import { SupportedLanguages } from '../../app/i18n/dictionaries';
const getIndex = (name: string, list: string[]) => {
  const prayerName = name.charAt(0).toUpperCase() + name.slice(1);
  console.log('namexxxxx', prayerName);
  console.log('getindex ;', prayerName);
  const i = list.indexOf(prayerName);
  console.log('getindex ;', i);
  return i;
};
export default function Azan({ language }: { language: SupportedLanguages }) {
  const dictionary = useDictionary();
  const show = useSelector(selectShowAzanTime);
  const prayName = useSelector(selectCurrentPrayTimeName);
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const arabicPrayerName = ['الفجر', 'الشروق', 'الظهر', 'العصر', 'المغرب', 'العشاء'];
  const englishPrayerName = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const isArabic = language === 'ar';
  const index = getIndex(prayName, englishPrayerName);
  console.log('actualIndex ;', index);
  // const actualIndex = index === 0 ? 5 : index - 1;
  // console.log('actualIndex ;', actualIndex);
  
  return show ? (
    <div
      className="azan-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isTabletOrMobile ? (
        <ClockSection lang={language} style={{ color: 'white' }} />
      ) : (
        <ClockSection lang={language} className="clock-section-azan" />
      )}
      <Text style={{ fontSize: isPortrait ? '3rem' : '5rem', color: '#dfbb76' }}>
        {dictionary.azan}
      </Text>
      <Text style={{ fontSize: isPortrait ? '5rem' : '12rem', color: '#ffffff' }}>
        {isArabic ? arabicPrayerName[index] : englishPrayerName[index]}
      </Text>
    </div>
  ) : (
    <></>
  );
}
