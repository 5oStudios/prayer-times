import { Accordion as MantineAccordion } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Orientation } from './general/orientation';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import styles from './accordion.module.css';
import style from '../../assets/css/settings.module.css';
import Language from './general/language';
import MasjidName from './general/masjidName';
import NewsForm from './news/news';
import HideDisplayScreen from './displayScreen/hideDisplayScreen';
import { QRCodeGenerator } from './displayScreen/displayQRcode';
import Themes from './displayScreen/themes';
import Toggle from './toggle';

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
  ];
  const isArabic = language === 'ar';
  const items = groceries.map((item) => (
    <MantineAccordion.Item key={item.value} value={item.value}>
      <MantineAccordion.Control icon={item.emoji}>{item.value}</MantineAccordion.Control>
      <MantineAccordion.Panel className={styles.fullWidth}>
        {item.value === dictionary.settings.general && (
          <div className={isArabic ? style.alRight : ''}>
            <MasjidName />
            <Orientation language={language} />
            <Language language={language} />
          </div>
        )}
        {item.value === dictionary.settings.news && (
          <div>
            <NewsForm />
          </div>
        )}
        {item.value === dictionary.settings.displayScreen.title && (
          <div className={isArabic ? style.alRight : ''}>
            <HideDisplayScreen isArabic={isArabic} />
            <QRCodeGenerator isArabic={isArabic} />
            <Themes isArabic={isArabic} />
            <Toggle />
          </div>
        )}
      </MantineAccordion.Panel>
    </MantineAccordion.Item>
  ));
  return (
    <MantineAccordion
      className={styles.fullWidth}
      defaultValue={dictionary.settings.general}
      chevron={<IconPlus />}
    >
      {items}
    </MantineAccordion>
  );
}
export default SettingsAccordion;
