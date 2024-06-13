import { useDisclosure } from '@mantine/hooks';
import { Button, Drawer } from '@mantine/core';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ORIENTATION, selectOrientation } from '../lib/features/settings';
import { MenuSvg } from '../assets/icons/menu';

enum POSITION {
  DEFAULT = 'left',
  LEFT = 'bottom',
  RIGHT = 'top',
}
export const BaseDrawer = ({ children }: { children: ReactNode }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const orientation = useSelector(selectOrientation);
  const position = getComputedPosition(orientation);

  return (
    <>
      <Drawer opened={opened} onClose={close} position={position} withCloseButton={false}>
        <div className={`ct${orientation}`}>{children}</div>
      </Drawer>

      <Button
        variant="transparent"
        style={{
          position: 'absolute',
          // top: '5dvh',
          left: '.5dvw',
          opacity: 0.75,
          zIndex: 20,
          top: '2dvh',
        }}
        onClick={open}
      >
        <MenuSvg width="1em" height="1em" />
      </Button>
    </>
  );
};
function getComputedPosition(orientation: ORIENTATION) {
  switch (orientation) {
    case ORIENTATION.LEFT:
      return POSITION.LEFT;
    case ORIENTATION.RIGHT:
      return POSITION.RIGHT;
    default:
      return POSITION.DEFAULT;
  }
}
