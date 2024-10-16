import React, { useState } from 'react';
import { Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { BaseDrawer } from '../base-drawer';
import styles from '../../assets/css/settings.module.css';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import SettingsAccordion from './accordion';
import { selectOrientation } from '../../lib/features/settings';

type SideDialogProps = {
  language: string;
  changeBtnColor: boolean;
};

export function Settings(props: SideDialogProps) {
  const dictionary = useDictionary();
  const orientation = useSelector(selectOrientation);
  return (
    <>
      <BaseDrawer language={props.language} changeBtnColor={props.changeBtnColor}>
        <div
          className={`${props.language === 'ar' ? styles.alRight : ''} ${orientation === '' ? styles.scrollableContainerVR : styles.scrollableContainer}`}
        >
          <Text className={props.language === 'ar' ? styles.titleAr : styles.titleEn}>
            {dictionary.settings.title}
          </Text>
          <SettingsAccordion language={props.language} />
        </div>
      </BaseDrawer>
    </>
  );
}
