import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mantine/core';
import styles from '../../assets/css/settings.module.css';
import { ORIENTATION, selectOrientation } from '../../lib/features/settings';

type SettingButtonProps = {
  borderRadius: string;
  children: ReactNode;
  value: string;
  noBorder?: boolean;
  onChange: (value: ORIENTATION) => void;
};

function SettingButton({ borderRadius, children, noBorder, value, onChange }: SettingButtonProps) {
  const orientation = useSelector(selectOrientation);
  const selected = orientation === value;
  return (
    <Button
      className={`${styles.button} ${selected ? styles.buttonSelected : ''} ${noBorder ? styles.noBorder : ''}`}
      style={{ borderRadius }}
      onClick={() => {
        onChange(value as ORIENTATION);
      }}
    >
      {children}
    </Button>
  );
}

export default SettingButton;
