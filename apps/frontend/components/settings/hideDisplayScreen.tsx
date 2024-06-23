import React, { useState } from 'react';
import { Text, Button } from '@mantine/core';
import './accordion.module.css';
import { useDispatch } from 'react-redux';
import { setHideScreen } from '../../lib/features/settings';

function HideDisplayScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
    console.log(isVisible);
    dispatch(setHideScreen(isVisible));
  };

  return (
    <div>
      <Text>hide Display Screen</Text>
      <Button variant="filled" onClick={toggleOverlay}>
        Hide manually
      </Button>
      <div className={`overlay ${isVisible ? 'visible' : ''}`}></div>
    </div>
  );
}

export default HideDisplayScreen;
