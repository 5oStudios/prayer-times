import { Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import styles from '../../../assets/css/settings.module.css';
import SettingButton from '../settingButton';
import { setOrientation } from '../../../lib/features/settings';

type OrientationProps = {
  language: string;
};

export const Orientation = ({ language }: OrientationProps) => {
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const isArabic = language === 'ar';

  const handleOrientation = (value: string) => {
    dispatch(setOrientation(value));
  };

  return (
    <div>
      {/* <Text>
        {dictionary.settings.orientation.title}
      </Text> */}
      <Text>{dictionary.settings.orientation.label}</Text>
      <div className={isArabic ? styles.buttonContainerAR : styles.buttonContainerEN}>
        <SettingButton value="vrLEFT" borderRadius="10px 0 0 10px" onChange={handleOrientation}>
          {dictionary.settings.orientation.options.left}
        </SettingButton>
        <SettingButton value="" borderRadius="0" noBorder onChange={handleOrientation}>
          {dictionary.settings.orientation.options.vertical}
        </SettingButton>
        <SettingButton value="vrRIGHT" borderRadius="0 10px 10px 0" onChange={handleOrientation}>
          {dictionary.settings.orientation.options.right}
        </SettingButton>
      </div>
    </div>
  );
};
