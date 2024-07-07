import { Button, Burger } from '@mantine/core';
import React, { ReactNode, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import Drawer from 'react-modern-drawer';
import { selectOrientation } from '../lib/features/settings';
import SettingsHeader from './settings/settingsHeader';
import 'react-modern-drawer/dist/index.css';
import { MenuSvg } from '../assets/icons/menu';

type BaseDrawer = {
  children: ReactNode;
  language: string;
  changeBtnColor: boolean;
};

export const BaseDrawer = ({ children, language, changeBtnColor }: BaseDrawer) => {
  const isArabic = language === 'ar';
  const orientation = useSelector(selectOrientation);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction={isArabic ? 'right' : 'left'}
        style={{
          width: orientation === '' ? (isTabletOrMobile ? '85vw' : '30vw') : '50vh',
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
          zIndex: 40,
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
        {/* <Burger color={changeBtnColor ? 'white' : 'black'} /> */}
        <MenuSvg style={{ fontSize: '3rem', color: changeBtnColor ? 'white' : 'black' }} />
      </Button>
    </>
  );
};
