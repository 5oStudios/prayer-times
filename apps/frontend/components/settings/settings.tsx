import { useState } from 'react';
import { Text } from '@mantine/core';
import { BaseDrawer } from '../base-drawer';
import { Orientation } from './orientation';
import { SaveButton } from './saveButton';
import styles from '../../assets/css/settings.module.css';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import SettingsHeader from './settingsHeader';

type SideDialogProps = {
  language: string;
};

export function Settings(props: SideDialogProps) {
  const dictionary = useDictionary();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <BaseDrawer language={props.language} isOpen={isOpen} toggleDrawer={toggleDrawer}>
        <div className={props.language === 'ar' ? styles.alRight : ''}>
          <SettingsHeader language={props.language} closDrawer={toggleDrawer} />
          <Text className={props.language === 'ar' ? styles.titleAr : styles.titleEn}>
            {dictionary.settings.title}
          </Text>
          <Orientation language={props.language} />
          <SaveButton />
        </div>
      </BaseDrawer>
    </>
  );
}
