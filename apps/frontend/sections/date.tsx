'use client';

import React from 'react';
import { toHijri } from 'hijri-converter';
import { Flex } from '@mantine/core';
import moment from 'moment';
import { localNumber } from '../components';
import 'moment/locale/ar';

interface HijriDateProps {
  language: string;
}

function HijriDateSection(props: HijriDateProps) {
  const lang = props.language === 'ar' ? 'ar' : 'en';
  moment.locale(lang);

  const geoDate = new Date();
  const hijriDate = toHijri(geoDate.getFullYear(), geoDate.getMonth() + 1, geoDate.getDate());

  const localizedHijriDay = localNumber(hijriDate.hd, lang);
  const localizedHijriYear = localNumber(hijriDate.hy, lang);
  const localizedGregorianDate = moment(geoDate).format('dddd، D MMMM YYYY');
  const localizedHijriDate = `${localizedHijriDay} ${getHijriMonthName(hijriDate.hm, lang)} ${localizedHijriYear}`;

  return (
    <Flex gap={3} className="hijri-date" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="gregorian-date">{localizedGregorianDate}</div>
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
