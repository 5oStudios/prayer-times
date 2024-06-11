'use client';

import React, { useState } from 'react';
import { HadithSection } from '../../sections/hadith';
import { PrayerTimesSection } from '../../sections/times';
import { SupportedLanguages } from '../i18n/dictionaries';
import '../../assets/css/global.css';
import { AzkarSection } from '../../sections/azkar';
import { ClockSection } from '../../sections/clock';
import DateSection from '../../sections/date';
import { LinksGroup, ORIENTATION } from '../../components/rotateLayout/rotateLayout';
import { RotateSvg } from '../../assets/icons/rotate';

export type options = {
  label: string;
  direction: ORIENTATION;
};

export default function MainPage({ params: { lang } }: { params: { lang: SupportedLanguages } }) {
  const content: options[] = [
    { label: 'vertical', direction: ORIENTATION.DEFUALT },
    { label: 'right', direction: ORIENTATION.RIGHT },
    { label: 'left', direction: ORIENTATION.LEFT },
  ];
  const [orientation, setOrientation] = useState<ORIENTATION>(ORIENTATION.DEFUALT);
  return (
    <div className={`${orientation}`}>
      <div className="screen-wrapper theme-red ">
        <LinksGroup icon={RotateSvg} label="" links={content} setRotate={setOrientation} />
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
