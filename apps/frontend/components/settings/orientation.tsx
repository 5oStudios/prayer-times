import { Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { setOrientation } from '../../lib/features/rotateWindowState';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import styles from '../../assets/css/settings.module.css';
import SettingButton from './settingButton';

export const Orientation = () => {
  const dispatch = useDispatch();
  const dictionary = useDictionary();

  const handleOrientation = (value: string) => {
    dispatch(setOrientation(value));
  };

  return (
    <>
      <Text className={styles.subHeader}>{dictionary.settings.orientation.title}</Text>
      <Text>{dictionary.settings.orientation.label}</Text>
      <div style={{ marginTop: '0.5rem' }}>
        <SettingButton value="" borderRadius="10px 0 0 10px" onChange={handleOrientation}>
          {dictionary.settings.orientation.options.vertical}
        </SettingButton>
        <SettingButton value="vrLEFT" borderRadius="0 0 0 0" noBorder onChange={handleOrientation}>
          {dictionary.settings.orientation.options.left}
        </SettingButton>
        <SettingButton value="vrRIGHT" borderRadius="0 10px 10px 0" onChange={handleOrientation}>
          {dictionary.settings.orientation.options.right}
        </SettingButton>
      </div>
    </>
  );
};
