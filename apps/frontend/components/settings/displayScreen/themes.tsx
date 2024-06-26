import { Radio, Group } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { setBackground } from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import styles from '../../../assets/css/settings.module.css';

export default function Themes({ isArabic }: { isArabic: boolean }) {
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  return (
    <div className={isArabic ? styles.alRight : ''} style={{ width: '100%',marginTop:'2rem' }}>
      <Radio.Group
        style={{ width: '100%' }}
        label={dictionary.settings.themes.label}
        onChange={(value: string) => {
          const index = parseInt(value, 10);
          dispatch(setBackground(index));
        }}
      >
        <Group mt="xs" className={isArabic ? styles.alRight : ''} style={{ flexDirection: 'row' }}>
          <Radio value="0" label={dictionary.settings.themes.default} />
          <Radio value="1" label={dictionary.settings.themes.Blue} />
          <Radio value="3" label={dictionary.settings.themes.red} />
          <Radio value="2" label={dictionary.settings.themes.sunSet} />
        </Group>
      </Radio.Group>
    </div>
  );
}
