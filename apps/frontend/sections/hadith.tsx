'use client';

import Marquee from 'react-fast-marquee';
import { Flex, Text } from '@mantine/core';
import localFont from 'next/font/local';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Hadith } from '@islamic-kit/hadith';
import { useMediaQuery } from 'react-responsive';
import { StarSvg } from '../assets/hadith/star';
import {
  NewsType,
  selectHadithTickerSpeed,
  selectNews,
  selectOrientation,
  setHadithTickerSpeed,
} from '../lib/features/settings';
import { fetchHadithList } from '../lib/features/hadith';
import { SupportedLanguages } from '../app/i18n/dictionaries';

const font = localFont({ src: '../assets/fonts/SFArabicRounded/SFArabicRounded-Regular.woff2' });

export const HadithSection = ({ lang }: { lang: SupportedLanguages }) => {
  const dispatch = useDispatch();
  const orientation = useSelector(selectOrientation);
  if (orientation !== '') dispatch(setHadithTickerSpeed(10));
  else dispatch(setHadithTickerSpeed(75));
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const tickerSpeed = useSelector(selectHadithTickerSpeed);
  // const hadith = useSelector(selectHadith);
  const hadith: Hadith[] = [
    {
      title: 'برنامج تجريبي',
      id: '1',
      translations: [],
    },
  ];
  const direction = lang === 'ar' ? 'right' : 'left';

  useEffect(() => {
    // @ts-expect-error - This fix this
    dispatch(fetchHadithList(lang));
  }, [dispatch, lang]);

  return (
    <div
      style={{
        overflow: 'hidden',
        maxWidth: isTabletOrMobile ? '100vh' : '100vw',
      }}
    >
      <HadithTicker hadith={hadith} speed={tickerSpeed} direction={direction} />
    </div>
  );
};

const HadithTicker = ({
  hadith,
  speed,
  direction,
}: {
  hadith: Hadith[];
  speed: number;
  direction: 'right' | 'left';
}) => {
  const news: NewsType[] = useSelector(selectNews);

  return (
    <Marquee className="ticker-bg" direction={direction} speed={speed} autoFill>
      <Flex style={{ overflow: 'hidden' }}>
        {news.length === 0
          ? hadith.map(({ title, id }) => (
              <Flex key={id} justify="center" align="center">
                <Text
                  className="font-class-name"
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
            ))
          : news.map((item, index) => (
              <Flex key={index} justify="center" align="center">
                <Text
                  className="font-class-name"
                  style={{ color: 'white', fontSize: '45px', width: 'max-content' }}
                >
                  {item.content}
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
};
