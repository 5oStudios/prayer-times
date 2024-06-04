'use client';

import React from 'react';
import { toHijri } from 'hijri-converter';
import { localNumber } from '../components/times/times-card';

interface HijriDateProps {
  language: string;
}

function HijriDateSection(props: HijriDateProps) {
  const geoDate = new Date();
  const hijriDate = toHijri(geoDate.getFullYear(), geoDate.getMonth() + 1, geoDate.getDate());

  const localizedHijriDate = localNumber(hijriDate.hd, props.language);
  const localizedHijriYear = localNumber(hijriDate.hy, props.language);
  return (
    <div className="hijri-date" dir={props.language === 'ar' ? 'rtl' : 'ltr'}>
      {props.language === 'ar'
        ? `${localizedHijriDate} ${getHijriMonthName(hijriDate.hm, 'ar')} ${localizedHijriYear}`
        : `Today's Hijri Date: ${localizedHijriDate} ${getHijriMonthName(hijriDate.hm)} ${localizedHijriYear}`}
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
