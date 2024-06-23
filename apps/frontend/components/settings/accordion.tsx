import { Accordion as MantineAccordion } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Orientation } from './orientation';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import styles from './accordion.module.css';
import Language from './language';
import MasjidName from './masjidName';
import NewsForm from './news';

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
  ];

  const items = groceries.map((item) => (
    <MantineAccordion.Item key={item.value} value={item.value}>
      <MantineAccordion.Control icon={item.emoji}>{item.value}</MantineAccordion.Control>
      <MantineAccordion.Panel>
        {item.value === dictionary.settings.general && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <MasjidName />
            <Orientation language={language} />
            <Language />
          </div>
        )}
        {item.value === dictionary.settings.news && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <NewsForm />
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
