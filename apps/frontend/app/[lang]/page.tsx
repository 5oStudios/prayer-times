'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
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
import Timer from '../../components/settings/displayScreen/timer';
import Azan from '../../components/settings/azan';

export default function MainPage({ params: { lang } }: { params: { lang: SupportedLanguages } }) {
  const orientation = useSelector(selectOrientation);
  const backgroundImageIndex = useSelector(selectBackground);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const changeBG = backgroundImageIndex === 1 || backgroundImageIndex === 3;
  return (
    <div className={`${orientation}`}>
      <Azan />
        <BlackScreen />
        <Settings language={lang} />
      <div className={`screen-wrapper theme-red screen-wrapper${backgroundImageIndex}`}>
        <DisplayQRcode className={lang === 'ar' ? styles.alignLeftQR : styles.alignRightQR} />
        <Timer />
        <div className={`dates ${changeBG ? 'whiteText' : ''}`}>
          <DateSection language={lang} />
        </div>
        <div
          className={`mosquee-name ${changeBG ? 'whiteText' : ''} ${isTabletOrMobile ? styles.mobileTextSizeName : ''}`}
        >
          {useSelector(selectMasjidName)}
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
          className={`${changeBG ? 'whiteText' : ''}`}
        >
          <ClockSection lang={lang} />
          <AzkarSection lang={lang} />
        </div>
        <PrayerTimesSection lang={lang} />
        {/*<div className="emam-name">إمام المسجد: الشيخ مشاري العفاسي</div>*/}
        <div className="hadith-marquee">
          <HadithSection lang={lang} />
        </div>
      </div>
    </div>
  );
}
