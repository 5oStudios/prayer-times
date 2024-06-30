import React, { useState } from 'react';
import { Text, Switch } from '@mantine/core';
import '../accordion.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setHideScreen, selectHideScreen } from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import styles from '../../../assets/css/settings.module.css';

function HideDisplayScreen({ isArabic }: { isArabic: boolean }) {
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const value = useSelector(selectHideScreen);
  const toggleOverlay = () => {
    dispatch(setHideScreen(!value));
  };

  return (
    <div
      style={{ position: 'absolute', width: '100%', height: '100%', marginTop: '1rem' }}
      className={isArabic ? styles.alRight : ''}
    >
      <Text>{dictionary.settings.displayScreen.hideDisplayScreen}</Text>
      <Switch
        style={{ marginTop: '0.5rem' }}
        defaultChecked={value}
        onClick={toggleOverlay}
        label={dictionary.settings.displayScreen.hideManually}
      />
    </div>
  );
}

export default HideDisplayScreen;
