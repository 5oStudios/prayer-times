'use client';

import Ticker from 'nice-react-ticker';
import { Flex, Text } from '@mantine/core';
import localFont from 'next/font/local';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Hadith } from '@islamic-kit/hadith';
import { StarSvg } from '../assets/hadith/star';
import { selectHadithTickerSpeed } from '../lib/features/settings/settings';
import { fetchHadithList, selectHadith } from '../lib/features/hadith';

const font = localFont({ src: '../assets/fonts/SFArabicRounded/SFArabicRounded-Regular.woff2' });

export const HadithSection = () => {
  const tickerSpeed = useSelector(selectHadithTickerSpeed);
  const hadith = useSelector(selectHadith);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-expect-error - This fix this
    dispatch(fetchHadithList());
  }, [dispatch]);

  return (
    <div
      style={{
        overflow: 'hidden',
        maxWidth: '100vw',
      }}
    >
      <HadithTicker hadith={hadith} speed={tickerSpeed} />
    </div>
  );
};

const HadithTicker = ({ hadith, speed }: { hadith: Hadith[]; speed: number }) => (
  <Ticker slideSpeed={speed}>
    <Flex>
      {hadith.map(({ title, id }) => (
        <Flex justify="center" align="center">
          <Text
            className={font.className}
            key={id}
            style={{ color: 'white', fontSize: '45px', width: 'max-content' }}
          >
            {title}
          </Text>
          <StarSvg
            style={{
              fill: 'white',
              marginInline: 24,
            }}
          />
        </Flex>
      ))}
    </Flex>
  </Ticker>
);
