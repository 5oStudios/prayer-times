'use client';

import Ticker from 'nice-react-ticker';
import Marquee from 'react-fast-marquee';
import { Flex, Text } from '@mantine/core';
import localFont from 'next/font/local';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Hadith } from '@islamic-kit/hadith';
import { StarSvg } from '../assets/hadith/star';
import { selectHadithTickerSpeed } from '../lib/features/settings';
import { fetchHadithList, selectHadith } from '../lib/features/hadith';
import { SupportedLanguages } from '../app/i18n/dictionaries';

const font = localFont({ src: '../assets/fonts/SFArabicRounded/SFArabicRounded-Regular.woff2' });

export const HadithSection = ({ lang }: { lang: SupportedLanguages }) => {
  const tickerSpeed = useSelector(selectHadithTickerSpeed);
  const hadith = useSelector(selectHadith);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-expect-error - This fix this
    dispatch(fetchHadithList(lang));
  }, [dispatch, lang]);

  console.log(hadith);

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

// TODO: make the scroller show all hadith
const HadithTicker = ({ hadith, speed }: { hadith: Hadith[]; speed: number }) => (
  <Marquee direction="left" autoFill>
    <Flex>
      {hadith.map(({ title, id }) => (
        <Flex key={id} justify="center" align="center">
          <Text
            className={font.className}
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
  </Marquee>
);
