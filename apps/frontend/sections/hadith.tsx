import { useEffect, useState } from 'react';
import { Hadith, HadithClient } from '@islamic-kit/hadith';
import Ticker from 'nice-react-ticker';
import { Flex, Text } from '@mantine/core';
import localFont from 'next/font/local';
import { StarSvg } from '../assets/hadith/star';

const font = localFont({ src: '../assets/fonts/SFArabicRounded/SFArabicRounded-Regular.woff2' });

export const HadithSection = () => {
  const hadithClient = new HadithClient({
    language: 'ARABIC',
  });

  const [hadith, setHadith] = useState<Hadith[]>([]);

  useEffect(() => {
    hadithClient
      .getHadithList({
        page: 1,
        perPage: 10,
        categoryId: 1,
      })
      .then(({ data }) => {
        setHadith(data);
      });
  }, []);

  return (
    <div
      style={{
        overflow: 'hidden',
        maxWidth: '100vw',
      }}
    >
      <HadithTicker hadith={hadith} />
    </div>
  );
};

const HadithTicker = ({ hadith }: { hadith: Hadith[] }) => (
  <Ticker slideSpeed={150}>
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
