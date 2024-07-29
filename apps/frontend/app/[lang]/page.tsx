'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { publish } from '@enegix/events';
import { MuslimPrayers, MuslimPrayersAr, PrayerTime } from '@islamic-kit/prayer-times';
import Image from 'next/image';
import { HadithSection } from '../../sections/hadith';
import { PrayerTimesSection } from '../../sections/times';
import { SupportedLanguages } from '../i18n/dictionaries';
import '../../assets/css/global.css';
import { AzkarSection } from '../../sections/azkar';
import { ClockSection } from '../../sections/clock';
import DateSection from '../../sections/date';
import { Settings } from '../../components';
import {
  selectBackground,
  selectImamName,
  selectMasjidName,
  selectOrientation,
  setEnableCountDown,
  setHideScreen,
  setShowAzanTime,
  setShowAzKar,
  setTodayPrayerTimes,
} from '../../lib/features/settings';
import BlackScreen from '../../components/blackScreen';
import { DisplayQRcode } from '../../components/settings/displayScreen/displayQRcode';
import styles from '../../assets/css/settings.module.css';
import Timer from '../../components/settings/displayScreen/timer';
import Azan from '../../components/settings/azan';
import Loading from '../../components/loading';
import Azkar from '../../components/showAzkar';
import { useDictionary } from './dictionary-provider';
import NextPrayTime from '../../components/nextPrayTime';
import AdScreen from '../../components/settings/ads/adScreen';
import {
  getFormattedDate,
  getMonthAbbreviation,
  getPrayerTimes,
} from '../../lib/kuwaitTimes/actions';
import refreshSvg from '../../assets/icons/refresh.svg';

export default function MainPage({ params: { lang } }: { params: { lang: SupportedLanguages } }) {
  const orientation = useSelector(selectOrientation);
  const backgroundImageIndex = useSelector(selectBackground);
  const imamName = useSelector(selectImamName);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const isArabic = lang === 'ar';
  const [currentDate, setCurrentDate] = useState(getFormattedDate());

  useEffect(() => {
    const updateTimes = () => {
      const getDate = getFormattedDate();
      const getMonth = getMonthAbbreviation();
      const getTimes = getPrayerTimes(getMonth, getDate);
      console.log('getTimes: ', getTimes?.times);
      dispatch(setTodayPrayerTimes(getTimes?.times));
      dispatch(setShowAzanTime(false));
      dispatch(setHideScreen(false));
      dispatch(setShowAzKar(false));
      dispatch(setEnableCountDown(false));
    };

    updateTimes(); // Initial call

    const intervalId = setInterval(() => {
      const newDate = getFormattedDate();
      if (newDate !== currentDate) {
        setCurrentDate(newDate);
        updateTimes();
      }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, dispatch]);

  const changeBG = backgroundImageIndex === 1 || backgroundImageIndex === 3;
  return (
    <div className={`${orientation}`}>
      <Settings language={lang} changeBtnColor={changeBG} />
      <button
        type="button"
        onClick={() => window.location.reload()}
        style={{
          all: 'unset', // Reset all styles to remove default button appearance
          position: 'absolute',
          top: '3dvh',
          left: isArabic ? '2vw' : 'auto',
          right: isArabic ? 'auto' : '2vw',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <Image src={refreshSvg} alt="refresh button" width={25} height={25} />
      </button>

      <div className={`screen-wrapper theme-red screen-wrapper${backgroundImageIndex}`}>
        <AdScreen />
        <BlackScreen />
        <Azkar />
        <Loading />
        <Azan language={lang} />
        <DisplayQRcode className={lang === 'ar' ? styles.alignLeftQR : styles.alignRightQR} />
        <Timer changeTextColor={changeBG} />
        <NextPrayTime lang={lang} changeTextColor={changeBG} />
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
        {/* <div className="emam-name">إمام المسجد: الشيخ مشاري العفاسي</div> */}
        <div className="emam-name" style={{ color: changeBG ? 'white' : 'black' }}>
          {imamName.length > 0 ? `${dictionary.settings.imamName.ImamElMasjid} : ${imamName}` : ''}
        </div>

        {/* <div className="hadith-marquee">
          <HadithSection lang={lang} />
        </div> */}
      </div>
    </div>
  );
}
