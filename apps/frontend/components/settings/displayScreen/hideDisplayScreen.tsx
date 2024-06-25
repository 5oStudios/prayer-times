import React, { useState } from 'react';
import { Text, Button } from '@mantine/core';
import '../accordion.module.css';
import { useDispatch } from 'react-redux';
import { setHideScreen } from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';

function HideDisplayScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const toggleOverlay = () => {
    setIsVisible(!isVisible);
    console.log(!isVisible);
    dispatch(setHideScreen(!isVisible));
  };

  return (
    <div>
      <Text>{dictionary.settings.displayScreen.hideDisplayScreen}</Text>
      <Button variant="filled" onClick={toggleOverlay} style={{ marginTop: '0.5rem' }}>
        {dictionary.settings.displayScreen.hideManually}
      </Button>
      <div className={`overlay ${isVisible ? 'visible' : ''}`}></div>
    </div>
  );
}

export default HideDisplayScreen;
