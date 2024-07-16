'use client';

import Marquee from 'react-fast-marquee';
import { Flex, Text } from '@mantine/core';
import localFont from 'next/font/local';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef, use } from 'react';
import { Hadith } from '@islamic-kit/hadith';
import { useMediaQuery } from 'react-responsive';
import { StarSvg } from '../assets/hadith/star';
import {
  selectArabicHadith,
  selectEnglishHadith,
  selectHadithTickerSpeed,
  selectNews,
  selectOrientation,
  setArabicHadith,
  setEnglishHadith,
  setHadithTickerSpeed,
} from '../lib/features/settings';
// import { fetchHadithList } from '../lib/features/hadith';
import { SupportedLanguages } from '../app/i18n/dictionaries';
import { createContent, getHadith, hadithSupbaseType } from '../lib/database/actions';
import { getAllHadithArabic, getAllHadithEnglish } from '../lib/hadith/actions';

const font = localFont({ src: '../assets/fonts/SFArabicRounded/SFArabicRounded-Regular.woff2' });

export const HadithSection = ({ lang }: { lang: SupportedLanguages }) => {
  const dispatch = useDispatch();
  const orientation = useSelector(selectOrientation);
  if (orientation !== '') dispatch(setHadithTickerSpeed(10));
  else dispatch(setHadithTickerSpeed(75));
  const tickerSpeed = useSelector(selectHadithTickerSpeed);
  const direction = lang === 'ar' ? 'right' : 'left';

  return (
    <div
      style={{
        overflow: 'hidden',
        maxWidth: '100vw',
      }}
    >
      <HadithTicker speed={tickerSpeed} direction={direction} lang={lang} />
    </div>
  );
};

const HadithTicker = ({
  speed,
  direction,
  lang,
}: {
  speed: number;
  direction: 'right' | 'left';
  lang: SupportedLanguages;
}) => {
  const [hadith, setHadith] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    const fetchHadith = async () => {
      const hadithData =
        lang === 'ar' ? await getAllHadithArabic(index) : await getAllHadithEnglish(index);
      setHadith((prevNews) => [...prevNews, ...hadithData]);
    };
    fetchHadith();
  }, [index]);
  console.log({ hadith });
  return (
    <Marquee
      className="ticker-bg"
      direction={direction}
      autoFill
      speed={speed}
      style={{ width: '100%' }}
      onCycleComplete={() => setIndex(index + 1)}
    >
      {hadith.map((item, id) => (
        <HadithComponent id={id} item={item} key={id} />
      ))}
    </Marquee>
  );
};

const HadithComponent = ({ id, item }: { id: number; item: string }) => (
  <Flex>
    <Flex key={id} justify="center" align="center">
      <Text
        className={font.className}
        style={{ color: 'white', fontSize: '45px', width: 'max-content' }}
      >
        {item}
      </Text>
      <StarSvg
        style={{
          fill: 'white',
          marginInline: 24,
        }}
      />
    </Flex>
  </Flex>
);
