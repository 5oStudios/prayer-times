'use client';

import { Accordion as MantineAccordion } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { MuslimPrayers, MuslimPrayersAr, PrayerTime } from '@islamic-kit/prayer-times';
import { publish } from '@enegix/events';
import { Orientation } from './general/orientation';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import styles from './accordion.module.css';
import style from '../../assets/css/settings.module.css';
import Language from './general/language';
import MasjidName from './general/masjidName';
import HideDisplayScreen from './displayScreen/hideDisplayScreen';
import { QRCodeGenerator } from './displayScreen/displayQRcode';
import Themes from './displayScreen/themes';
import LoadAzkarImg from './displayScreen/loadAzkarImg';
import AfterAzanTime from './displayScreen/afterAzanTime';
import ImamName from './general/imamName';
import Location from './general/location';
import DisplayNextPrayTime from './general/displayNextPrayTime';
import HideSunRise from './general/hideSunRise';
import AdsControl from './ads/adsControl';
import DiableSunRiseAzan from './general/diableSunRiseAzan';
import NewsForm from './news/news';
import AdjustTimes from './displayScreen/adjustTimes';

type SettingsAccordionProps = {
  language: string;
};

function SettingsAccordion({ language }: SettingsAccordionProps) {
  const dictionary = useDictionary();
  const groceries = [
    {
      emoji: '︎⚙️',
      value: dictionary.settings.general,
    },
    {
      emoji: '📰',
      value: dictionary.settings.news,
    },
    {
      emoji: '📺',
      value: dictionary.settings.displayScreen.title,
    },
    {
      emoji: '📢',
      value: dictionary.settings.ads.title,
    },
    {
      emoji: '⏱️',
      value: dictionary.settings.prayerTime.title,
    },
  ];
  const isArabic = language === 'ar';
  const items = groceries.map((item) => (
    <MantineAccordion.Item key={item.value} value={item.value}>
      <MantineAccordion.Control icon={item.emoji}>{item.value}</MantineAccordion.Control>
      <MantineAccordion.Panel className={styles.fullWidth}>
        {item.value === dictionary.settings.general && (
          <div className={isArabic ? style.alRight : ''}>
            <MasjidName />
            <ImamName />
            <Orientation language={language} />
            <Language language={language} />
            <Location isArabic={isArabic} />
            <DisplayNextPrayTime isArabic={isArabic} />
            <HideSunRise isArabic={isArabic} />
            <DiableSunRiseAzan isArabic={isArabic} />
          </div>
        )}
        {item.value === dictionary.settings.news && (
          <div>
            <NewsForm language={language} />
          </div>
        )}
        {item.value === dictionary.settings.displayScreen.title && (
          <div className={isArabic ? style.alRight : ''}>
            <QRCodeGenerator isArabic={isArabic} />
            <LoadAzkarImg />
            <Themes isArabic={isArabic} />
            <HideDisplayScreen isArabic={isArabic} />
            <AfterAzanTime isArabic={isArabic} />
            <button
              onClick={() => {
                const data: PrayerTime = {
                  id: MuslimPrayers.fajr,
                  name: {
                    ar: MuslimPrayersAr.fajr,
                    en: MuslimPrayers.fajr,
                  },
                  time: new Date(),
                  isNext: true,
                  remaining: 3000,
                };
                publish('next-prayer', data);
              }}
            >
              TEST
            </button>
          </div>
        )}
        {item.value === dictionary.settings.ads.title && (
          <div>
            <AdsControl isArabic={isArabic} />
          </div>
        )}

        {item.value === dictionary.settings.prayerTime.title && (
          <div className={isArabic ? style.alRight : ''}>
            <AdjustTimes isArabic={isArabic} />
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                marginTop: '1rem',
                backgroundColor: '#479ea3',
                padding: 8,
                borderRadius: 4,
                color: 'white',
              }}
            >
              حفظ
            </button>
          </div>
        )}
      </MantineAccordion.Panel>
    </MantineAccordion.Item>
  ));
  return (
    <MantineAccordion
      className={styles.fullWidth}
      // defaultValue={dictionary.settings.general}
      chevron={<IconPlus />}
    >
      {items}
    </MantineAccordion>
  );
}
export default SettingsAccordion;
