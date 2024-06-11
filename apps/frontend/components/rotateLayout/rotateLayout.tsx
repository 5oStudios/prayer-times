'use client';

import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Select } from '@mantine/core';
import { MenuSvg } from '../../assets/icons/menu';
import { Radio, Group } from '@mantine/core';

export enum ORIENTATION {
  DEFUALT = '',
  LEFT = 'vrLEFT',
  RIGHT = 'vrRIGHT',
}
enum POSITION {
  DEFUALT = 'left',
  LEFT = 'bottom',
  RIGHT = 'top',
}

export type options = {
  label: string;
  direction: ORIENTATION;
};

type SideNavProp = {
  setOriantation: (direction: ORIENTATION) => void;
  orientation: ORIENTATION;
};
export function SideNav({ setOriantation, orientation }: SideNavProp) {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<string | null>('');
  const [position, setPosition] = useState<POSITION>(POSITION.DEFUALT);
  const [contentOriantation, setContentOriantation] = useState<string>();
  useEffect(() => {
    if (value === 'Vertical') {
      setOriantation(ORIENTATION.DEFUALT);
      setPosition(POSITION.DEFUALT);
    } else if (value === 'Left') {
      setOriantation(ORIENTATION.LEFT);
      setPosition(POSITION.LEFT);
    } else if (value === 'Right') {
      setOriantation(ORIENTATION.RIGHT);
      setPosition(POSITION.RIGHT);
    }
  }, [value]);

  return (
    <>
      <Drawer opened={opened} onClose={close} position={position} withCloseButton={false}>
        <div className={`ct${orientation}`}>
          <h3>Rotate Window</h3>
          <Radio.Group name="Rotate" label="Select rotate option" onChange={(e) => setValue(e)}>
            <Group mt="xs">
              <Radio value="Vertical" label="Vertical" />
              <Radio value="Left" label="Left" />
              <Radio value="Right" label="Right" />
            </Group>
          </Radio.Group>
        </div>
      </Drawer>

      <Button
        variant="transparent"
        className={orientation === '' ? 'rotateBtnV' : 'rotateBtn'}
        onClick={open}
      >
        <MenuSvg width="1em" height="1em" />
      </Button>
    </>
  );
}
