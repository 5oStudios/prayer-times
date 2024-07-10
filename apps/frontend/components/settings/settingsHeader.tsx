import React from 'react';
import { CloseButton } from '@mantine/core';
import styles from '../../assets/css/settings.module.css';

type SettingHeaderProps = {
  language: string;
  closDrawer: () => void;
};

function SettingsHeader({ language, closDrawer }: SettingHeaderProps) {
  const containerClasses = `${language === 'ar' ? styles.alLeft : styles.alRight} ${language === 'ar' ? styles.marginLeft : styles.paddingRight}`;

  return (
    <div style={{ width: '100%', marginTop: '10px' }} className={containerClasses}>
      <CloseButton onClick={closDrawer} />
    </div>
  );
}

export default SettingsHeader;
