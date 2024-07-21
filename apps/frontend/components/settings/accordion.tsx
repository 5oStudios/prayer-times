'use client';

import { Accordion as MantineAccordion } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Orientation } from './general/orientation';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import styles from './accordion.module.css';
import style from '../../assets/css/settings.module.css';
import Language from './general/language';
import MasjidName from './general/masjidName';
import HideDisplayScreen from './displayScreen/hideDisplayScreen';
import { QRCodeGenerator } from './displayScreen/displayQRcode';
import Themes from './displayScreen/themes';
import Toggle from './toggle';
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
            <AdjustTimes isArabic={isArabic} />
            <Toggle />
          </div>
        )}
        {item.value === dictionary.settings.ads.title && (
          <div>
            <AdsControl isArabic={isArabic} />
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
