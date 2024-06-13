'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { HadithSection } from '../../sections/hadith';
import { PrayerTimesSection } from '../../sections/times';
import { SupportedLanguages } from '../i18n/dictionaries';
import '../../assets/css/global.css';
import { AzkarSection } from '../../sections/azkar';
import { ClockSection } from '../../sections/clock';
import DateSection from '../../sections/date';
import { selectOrientation } from '../../lib/features/settings';
import { SideDialog } from '../../components/side-dialog/side-dialog';

export default function MainPage({ params: { lang } }: { params: { lang: SupportedLanguages } }) {
  const orientation = useSelector(selectOrientation);
  return (
    <div className={`${orientation}`}>
      <div className="screen-wrapper theme-red ">
        <SideDialog />
        <div className="dates">
          <DateSection language={lang} />
        </div>
        <div className="mosquee-name">برنامج تجريبي</div>
        <ClockSection lang={lang} />
        <AzkarSection lang={lang} />
        <PrayerTimesSection lang={lang} />
        {/*<div className="emam-name">إمام المسجد: الشيخ مشاري العفاسي</div>*/}
        <div className="hadith-marquee">
          <HadithSection lang={lang} />
        </div>
      </div>
    </div>
  );
}
