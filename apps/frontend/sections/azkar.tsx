'use client';

import { useEffect, useState } from 'react';
import { Flex } from '@mantine/core';
import localFont from 'next/font/local';
import { AzkarClient } from '@islamic-kit/azkar';
import { QuoteOpenSvg } from '../assets/icons/quote-open';
import { QuoteCloseSvg } from '../assets/icons/quote-close';
import { SupportedLanguages } from '../app/i18n/dictionaries';

const font = localFont({ src: '../assets/fonts/SFArabicRounded/SFArabicRounded-Regular.woff2' });

export const AzkarSection = ({ lang } : { lang: SupportedLanguages }) => {
  const [currentZekr, setCurrentZekr] = useState<string>();
  const azkarClient = new AzkarClient();
  const azkar = azkarClient.tasbih();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setCurrentZekr(azkar[index].content);
    const getRandomZekr = () => {
      setCurrentZekr(azkar[index].content);
      setIndex((index + 1));
    };
    setInterval(getRandomZekr, 1000);
  });

  return (
    <>
      <Flex align="center" className="azkar-section">
        <QuoteOpenSvg />
        <div className={`azkar-text ${font.className}`}>
          {currentZekr}
        </div>
        <QuoteCloseSvg />
      </Flex>
    </>
  );
};
