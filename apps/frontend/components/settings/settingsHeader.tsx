import React from 'react';
import { CloseButton } from '@mantine/core';
import styles from '../../assets/css/settings.module.css';

type SettingHeaderProps = {
  language: string;
  closDrawer: () => void;
};

function SettingsHeader({ language, closDrawer }: SettingHeaderProps) {
  return (
    <div style={{ width: '100%' }} className={language === 'ar' ? styles.alLeft : styles.alRight}>
      <CloseButton onClick={closDrawer} />
    </div>
  );
}

export default SettingsHeader;
