'use client';

import React, { useEffect, useState } from 'react';
import { toHijri } from 'hijri-converter';
import { Flex } from '@mantine/core';
import moment from 'moment';
import 'moment/locale/ar';

interface HijriDateProps {
  language: string;
}
function HijriDateSection(props: HijriDateProps) {
  const lang = props.language === 'ar' ? 'ar' : 'en';
  moment.locale(lang);

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const geoDate = currentDate;
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

function toArabicNumber(number: { toString: () => string }) {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return number.toString().replace(/\d/g, (digit) => arabicDigits[digit as any]);
}

function localNumber(number: number, lang: string) {
  return lang === 'ar' ? toArabicNumber(number) : number.toString();
}
