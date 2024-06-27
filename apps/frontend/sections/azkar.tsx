'use client';

import { useEffect, useState } from 'react';
import { Flex } from '@mantine/core';
import localFont from 'next/font/local';
import { AzkarClient, Zekr } from '@islamic-kit/azkar';
import { useMediaQuery } from 'react-responsive';
import { QuoteOpenSvg } from '../assets/icons/quote-open';
import { QuoteCloseSvg } from '../assets/icons/quote-close';
import { SupportedLanguages } from '../app/i18n/dictionaries';
import style from '../assets/css/settings.module.css';

const font = localFont({ src: '../assets/fonts/SFArabicRounded/SFArabicRounded-Regular.woff2' });
const azkarClient = new AzkarClient();
const azkar = azkarClient.tasbih();
const chooseObjectFromArr = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const smallZekrLength = 150;
// @ts-expect-error - TODO: Fix this
const smallAzkar = azkar.filter((zekr: Zekr) => zekr.content.length <= smallZekrLength);
const getRandomZekr = () => chooseObjectFromArr(smallAzkar);

export const AzkarSection = ({ lang }: { lang: SupportedLanguages }) => {
  const [currentZekr, setCurrentZekr] = useState<Zekr>();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  useEffect(() => {
    setCurrentZekr(getRandomZekr());
    const intervalId = setInterval(() => {
      setCurrentZekr(getRandomZekr());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!currentZekr) return null;
  return (
    <>
      <Flex
        align="center"
        className={`azkar-section ${isTabletOrMobile ? style.mobileTextSize : ''}`}
      >
        <QuoteOpenSvg />
        <div className={`azkar-text ${font.className}`}>{currentZekr.content}</div>
        <QuoteCloseSvg />
      </Flex>
    </>
  );
};
