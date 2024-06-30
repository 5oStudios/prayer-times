import { Button } from '@mantine/core';
import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import Drawer from 'react-modern-drawer';
import { MenuSvg } from '../assets/icons/menu';
import { selectOrientation } from '../lib/features/settings';
import SettingsHeader from './settings/settingsHeader';
import 'react-modern-drawer/dist/index.css';

type BaseDrawer = {
  children: ReactNode;
  language: string;
  isOpen: boolean;
  toggleDrawer: () => void;
};

export const BaseDrawer = ({ children, language, isOpen, toggleDrawer }: BaseDrawer) => {
  const isArabic = language === 'ar';
  const orientation = useSelector(selectOrientation);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction={isArabic ? 'right' : 'left'}
        style={{
          width: orientation === '' ? (isTabletOrMobile ? '80vw' : '25vw') : '50vh',
          height: '96%',
          overflowX: 'hidden',
          overflowY: 'hidden',
          borderRadius: '10px',
          backgroundColor: 'white',
          margin: '1rem',
        }}
        enableOverlay={false}
      >
        <SettingsHeader language={language} closDrawer={toggleDrawer} />

        <div style={{ padding: '1rem' }}>{children}</div>
      </Drawer>
      <Button
        variant="transparent"
        style={{
          position: 'absolute',
          left: isArabic ? 'auto' : '0.5dvw',
          right: isArabic ? '0.5dvw' : 'auto',
          opacity: 0.75,
          zIndex: 30,
          top:
            orientation === ''
              ? isTabletOrMobile
                ? '5dvh'
                : '2dvh'
              : isTabletOrMobile
                ? '2dvh'
                : '2vw',
        }}
        onClick={toggleDrawer}
      >
        <MenuSvg width="2em" height="2em" />
      </Button>
    </>
  );
};
