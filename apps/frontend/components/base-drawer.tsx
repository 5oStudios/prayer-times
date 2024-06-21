'use client';

import { Button } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import Drawer from 'react-modern-drawer';
import { selectRotateDirection } from '../lib/features/rotateWindowState';
import { MenuSvg } from '../assets/icons/menu';
import 'react-modern-drawer/dist/index.css';

type BaseDrawer = {
  children: ReactNode;
  language: string;
  isOpen: boolean;
  toggleDrawer: () => void;
};

export const BaseDrawer = ({ children, language, isOpen, toggleDrawer }: BaseDrawer) => {
  const isArabic: boolean = language === 'ar';
  const orientation = useSelector(selectRotateDirection);
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction={isArabic ? 'right' : 'left'}
        style={{
          width: '20vw',
          height: '96%',
          overflowX: 'hidden',
          overflowY: 'hidden',
          borderRadius: '10px',
          backgroundColor: 'white',
          margin: '1rem',
        }}
        enableOverlay={false}
      >
        <div style={{ padding: '1rem' }}>{children}</div>
      </Drawer>
      <Button
        variant="transparent"
        style={{
          position: 'absolute',
          left: isArabic ? 'auto' : '0.5dvw',
          right: isArabic ? '0.5dvw' : 'auto',
          opacity: 0.75,
          zIndex: 20,
          top: orientation === '' ? '2dvh' : '22vh',
        }}
        onClick={toggleDrawer}
      >
        <MenuSvg width="1em" height="1em" />
      </Button>
    </>
  );
};
