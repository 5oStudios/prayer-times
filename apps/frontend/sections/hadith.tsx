import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Flex, Text } from '@mantine/core';
import localFont from 'next/font/local';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectHadithTickerSpeed,
  selectNews,
  selectOrientation,
  setHadithTickerSpeed,
} from '../lib/features/settings';
import { SupportedLanguages } from '../app/i18n/dictionaries';
import { HadithClient, Hadith } from '@islamic-kit/hadith';
import { StarSvg } from '../assets/hadith/star';
import { NewsType } from '../components/settings/news/news';

const font = localFont({ src: '../assets/fonts/SFArabicRounded/SFArabicRounded-Regular.woff2' });

export const HadithSection = ({ lang }: { lang: SupportedLanguages }) => {
  const dispatch = useDispatch();
  const orientation = useSelector(selectOrientation);

  useEffect(() => {
    if (orientation !== '') {
      dispatch(setHadithTickerSpeed(10));
    } else {
      dispatch(setHadithTickerSpeed(75));
    }
  }, [orientation, dispatch]);

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
  const [currentHadith, setCurrentHadith] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const news = useSelector(selectNews) as NewsType[];
  const hadithClient = new HadithClient({
    language: lang === 'ar' ? 'ARABIC' : 'ENGLISH',
    strategy: 'offline',
  });

  useEffect(() => {
    const fetchHadith = async () => {
      const response = await hadithClient.getHadithList({ index });

      if (Array.isArray(response)) {
        setCurrentHadith(response); // Handle direct array response
      } else {
        setCurrentHadith(response.data.map((hadith: Hadith) => hadith.content)); // Handle OnlineAPIResponse
      }
    };

    fetchHadith();
  }, [index, lang]);

  console.log(currentHadith);

  const isNews = news.length > 0;
  const data = isNews ? news.map((item) => item.content) : currentHadith;
  return (
    <Marquee
      className="ticker-bg"
      direction={direction}
      autoFill
      speed={speed}
      style={{ width: '100%' }}
      onCycleComplete={() => setIndex(index + 1)}
    >
      {data.map((item, id) => (
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

export default HadithTicker;
