import React, { useState } from 'react';
import { Button, Text } from '@mantine/core';
import { BaseDrawer } from '../base-drawer';
import { Orientation } from './orientation';
import styles from '../../assets/css/settings.module.css';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import { publish } from '@enegix/events';

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
          <Text className={props.language === 'ar' ? styles.titleAr : styles.titleEn}>
            {dictionary.settings.title}
          </Text>
          <Orientation language={props.language} />
          <Button
            className={styles.saveButton}
            onClick={() => publish('save-settings')}
            variant="filled"
          >
            {dictionary.settings.save}
          </Button>
        </div>
      </BaseDrawer>
    </>
  );
}
