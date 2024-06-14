import React from 'react';
import { Button } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { saveLocalStorage } from '../../lib/features/rotateWindowState';
import styles from '../../assets/css/settings.module.css';
import { useDictionary } from '../../app/[lang]/dictionary-provider';

export function SaveButton() {
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const handleClick = () => {
    dispatch(saveLocalStorage());
  };

  return (
    <Button className={styles.saveButton} onClick={handleClick} variant="filled">
      {dictionary.settings.save}
    </Button>
  );
}

export default SaveButton;
