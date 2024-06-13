import { useDisclosure } from '@mantine/hooks';
import { Button, Drawer } from '@mantine/core';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ORIENTATION, selectRotateDirection } from '../lib/features/rotateWindowState';
import { MenuSvg } from '../assets/icons/menu';

enum POSITION {
  AR_DEFAULT = 'right',
  EN_DEFAULT = 'left',
  LEFT = 'top',
  RIGHT = 'bottom',
}

type BaseDrawer = {
  children: ReactNode;
  language: string;
};

export const BaseDrawer = ({ children, language }: BaseDrawer) => {
  const isArabic: boolean = language === 'ar';
  const [opened, { open, close }] = useDisclosure(false);
  const orientation = useSelector(selectRotateDirection);
  const position = getComputedPosition(orientation, isArabic);

  return (
    <>
      <Drawer opened={opened} onClose={close} position={position} withCloseButton={false}>
        <div className={`ct${orientation}`}>{children}</div>
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
        onClick={open}
      >
        <MenuSvg width="1em" height="1em" />
      </Button>
    </>
  );
};
function getComputedPosition(orientation: ORIENTATION, isArabic: boolean) {
  switch (orientation) {
    case ORIENTATION.LEFT:
      return isArabic ? POSITION.LEFT : POSITION.RIGHT;
    case ORIENTATION.RIGHT:
      return isArabic ? POSITION.RIGHT : POSITION.LEFT;
    default:
      return isArabic ? POSITION.AR_DEFAULT : POSITION.EN_DEFAULT;
  }
}
