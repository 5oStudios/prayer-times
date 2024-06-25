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
import { Settings } from '../../components';
import { selectBackground, selectOrientation, selectMasjidName } from '../../lib/features/settings';
import BlackScreen from '../../components/blackScreen';
import { DisplayQRcode } from '../../components/settings/displayScreen/displayQRcode';
import styles from '../../assets/css/settings.module.css';

export default function MainPage({ params: { lang } }: { params: { lang: SupportedLanguages } }) {
  const orientation = useSelector(selectOrientation);
  const backgroundImageIndex = useSelector(selectBackground);
  console.log('backgound:', backgroundImageIndex);
  return (
    <div className={`${orientation}`}>
      <div className={`screen-wrapper theme-red screen-wrapper${backgroundImageIndex}`}>
        <Settings language={lang} />
        <BlackScreen />
        <DisplayQRcode className={lang === 'ar' ? styles.alignLeftQR : styles.alignRightQR} />
        <div className="dates">
          <DateSection language={lang} />
        </div>
        <div className="mosquee-name">{useSelector(selectMasjidName)}</div>
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
