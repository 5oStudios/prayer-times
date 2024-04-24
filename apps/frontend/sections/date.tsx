'use client';

import React from 'react';
import { toHijri } from 'hijri-converter';

interface HijriDateProps {
  language: string;
}

function HijriDateSection(props: HijriDateProps) {
  const geoDate = new Date();
  const hijriDate = toHijri(geoDate.getFullYear(), geoDate.getMonth() + 1, geoDate.getDate());

  return (
    <div dir={props.language === 'ar' ? 'rtl' : 'ltr'}>
      <h1>
        {props.language === 'ar'
          ? `اليوم هو: ${hijriDate.hd} ${getHijriMonthName(hijriDate.hm, 'ar')} ${hijriDate.hy}`
          : `Today's Hijri Date: ${hijriDate.hd} ${getHijriMonthName(hijriDate.hm)} ${hijriDate.hy}`}
      </h1>
    </div>
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
