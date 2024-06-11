'use client';

import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import classes from '../../assets/css/NavbarLinksGroup.module.css';

export enum ORIENTATION {
  DEFUALT = '',
  LEFT = 'vrLEFT',
  RIGHT = 'vrRIGHT',
}

export type options = {
  label: string;
  direction: ORIENTATION;
};

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: options[];
  setRotate: (orientation: ORIENTATION) => void;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  setRotate,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.direction}
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        setRotate(link.direction);
      }}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <div className="rotateBtn">
        <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
          <Group justify="space-between" gap={0}>
            <Box>
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? 'rotate(-90deg)' : 'none',
                }}
              />
            )}
          </Group>
        </UnstyledButton>
        {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
      </div>
    </>
  );
}
