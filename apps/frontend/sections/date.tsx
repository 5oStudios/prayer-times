'use client';

import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { toHijri } from 'hijri-converter';
import { Flex } from '@mantine/core';
import moment from 'moment';
import 'moment/locale/ar';
import styles from '../assets/css/settings.module.css';

type HijriDateProps = {
  language: string;
};
function HijriDateSection(props: HijriDateProps) {
  const lang = props.language === 'ar' ? 'ar' : 'en';
  moment.locale(lang);

  const [currentDate, setCurrentDate] = useState(new Date());
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  const geoDate = currentDate;
  const hijriDate = toHijri(geoDate.getFullYear(), geoDate.getMonth() + 1, geoDate.getDate());

  const localizedHijriDay = localNumber(hijriDate.hd);
  const localizedHijriYear = localNumber(hijriDate.hy);

  const localizedGregorianDate = moment(geoDate).format('dddd، D MMMM YYYY');
  const localizedHijriDate = `${localizedHijriDay} ${getHijriMonthName(hijriDate.hm, lang)} ${localizedHijriYear}`;

  return (
    <Flex
      gap={3}
      className={`hijri-date ${styles.textSize}  ${isTabletOrMobile ? styles.mobileTextSize : ''}`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="gregorian-date">{toEnglishNumber(localizedGregorianDate)}</div>
      <div className="qobtic-date" />
      <div className="hijri-date">{localizedHijriDate}</div>
    </Flex>
  );
}

export default HijriDateSection;

function getHijriMonthName(month: number, locale: 'en' | 'ar' = 'en'): string {
  const hijriMonths = {
    en: [
      'Muharram',
      'Safar',
      "Rabi' al-Awwal",
      "Rabi' al-Thani",
      'Jumada al-Awwal',
      'Jumada al-Thani',
      'Rajab',
      "Sha'ban",
      'Ramadan',
      'Shawwal',
      "Dhu al-Qi'dah",
      'Dhu al-Hijjah',
    ],
    ar: [
      'محرم',
      'صفر',
      'ربيع الأول',
      'ربيع الثاني',
      'جمادى الأول',
      'جمادى الثاني',
      'رجب',
      'شعبان',
      'رمضان',
      'شوال',
      'ذو القعدة',
      'ذو الحجة',
    ],
  };

  const monthNames = hijriMonths[locale] || hijriMonths.en;
  return monthNames[month - 1] || '';
}

function localNumber(number: number) {
  return number.toString();
}

function toEnglishNumber(number: { toString: () => string }) {
  const englishDigits = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
  };
  return number.toString().replace(/[٠-٩]/g, (digit) => englishDigits[digit as never]);
}
