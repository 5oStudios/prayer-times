import React from 'react';
import { useSelector } from 'react-redux';
import { selectHideScreen } from '../lib/features/settings';
import styles from '../components/settings/accordion.module.css';

function BlackScreen() {
  const isHided = useSelector(selectHideScreen);
  return <div className={isHided ? styles.hideScreen : ''}></div>;
}

export default BlackScreen;
