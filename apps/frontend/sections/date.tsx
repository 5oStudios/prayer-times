'use client';

import React, { useState, useEffect } from 'react';

// Function to convert Gregorian date to Hijri date with language support
function getHijriDate(gDate: Date, language: string): string {
  const islamicMonths = {
    ar: [
      'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى',
      'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة',
    ],
    en: [
      'Muharram', 'Safar', 'Rabiʻ al-Awwal', 'Rabiʻ al-Thani', 'Jumada al-Awwal',
      'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah',
    ],
  };

  const hijriYear = gDate.getFullYear() - 622;
  const daysSinceEpoch = Math.floor((gDate.getTime() - new Date(622, 11, 19).getTime()) / 86400000);

  const monthIndex = Math.floor(daysSinceEpoch / 29.5);
  const dayOfMonth = daysSinceEpoch - monthIndex * 29.5;

  const hijriDay = Math.ceil(dayOfMonth);
  const monthNames = islamicMonths[language];
  const hijriMonth = monthNames[monthIndex % 12];
  const hijriYearString = hijriYear.toString();

  return `${hijriDay} ${hijriMonth}, ${hijriYearString}`;
}

interface HijriDateProps {
  language: string;
}

function HijriDate(props: HijriDateProps) {
  const [hijriDate, setHijriDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const convertedDate = getHijriDate(today, props.language);
    setHijriDate(convertedDate);
  }, [props.language]);

  return (
    <div dir={props.language === 'ar' ? 'rtl' : 'ltr'}>
      <h1>{props.language === 'ar' ? `اليوم هو: ${hijriDate}` : `Today's Hijri Date: ${hijriDate}`}</h1>
    </div>
  );
}

export default HijriDate;
