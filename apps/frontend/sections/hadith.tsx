'use client';

import React, { useEffect } from 'react';
import { Flex, Text } from '@mantine/core';
import localFont from 'next/font/local';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Hadith } from '@islamic-kit/hadith';
import { StarSvg } from '../assets/hadith/star';
import {
  NewsType,
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
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isVertical = orientation === '';

  const hadith: Hadith[] = [
    {
      title: 'برنامج تجريبي',
      id: '1',
      translations: [],
    },
  ];
  const direction = lang === 'ar' ? 'right' : 'left';

  useEffect(() => {
    // @ts-expect-error - This expression is not callable.
    dispatch(fetchHadithList(lang));
  }, [dispatch, lang]);

  return (
    <div
      style={{
        overflow: 'hidden',
        maxWidth: isVertical ? '100vw' : '100vh',
      }}
    >
      <HadithTicker hadith={hadith} direction={direction} />
    </div>
  );
};

const HadithTicker = ({ hadith, direction }: { hadith: Hadith[]; direction: 'right' | 'left' }) => {
  const news: NewsType[] = useSelector(selectNews);
  const orientation = useSelector(selectOrientation);
  return (
    <div className="ticker-bg" style={{ width: orientation === '' ? '100vw' : '100vh' }}>
      <div className={orientation === '' ? 'marquee-content-vr' : 'marquee-content-side'}>
        <div
          className="marquee-content"
          style={{ animationDirection: direction === 'right' ? 'reverse' : 'normal' }}
        >
          <Flex style={{ overflow: 'hidden' }}>
            {news.length === 0
              ? hadith.map(({ title, id }) => (
                  <Flex key={id} justify="center" align="center" style={{ marginRight: '50px' }}>
                    <Text
                      className="font-class-name"
                      style={{
                        color: 'white',
                        fontSize: '45px',
                        width: 'max-content',
                        paddingInline: '10px',
                      }}
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
                  <Flex key={index} justify="center" align="center" style={{ marginRight: '50px' }}>
                    <Text
                      className="font-class-name"
                      style={{
                        color: 'white',
                        fontSize: '45px',
                        width: 'max-content',
                        paddingInline: '10px',
                      }}
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
        </div>
      </div>
    </div>
  );
};
