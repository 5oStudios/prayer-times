import { useEffect, useState } from 'react';
// import Marquee from 'react-fast-marquee';
import { Flex, Text } from '@mantine/core';
import localFont from 'next/font/local';
import { useDispatch, useSelector } from 'react-redux';
import { Marquee } from '@devnomic/marquee';
import { Hadith, HadithClient } from '@islamic-kit/hadith';
import {
  selectHadithTickerSpeed,
  selectNews,
  selectOrientation,
  setHadithTickerSpeed,
} from '../lib/features/settings';
import { SupportedLanguages } from '../app/i18n/dictionaries';
import { StarSvg } from '../assets/hadith/star';
// eslint-disable-next-line import/no-cycle
import { NewsType } from '../components/settings/news/news';
import '@devnomic/marquee/dist/index.css';
import { useRouter } from 'next/navigation';

const font = localFont({ src: '../assets/fonts/SFArabicRounded/SFArabicRounded-Regular.woff2' });

export const HadithSection = ({ lang }: { lang: SupportedLanguages }) => {
  const dispatch = useDispatch();
  const orientation = useSelector(selectOrientation);

  useEffect(() => {
    if (orientation !== '') {
      dispatch(setHadithTickerSpeed(10));
    } else {
      dispatch(setHadithTickerSpeed(90));
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
  const router = useRouter();
  const [currentDuration, setCurrentDuration] = useState<number>(0);
  const hadithClient = new HadithClient({
    language: lang === 'ar' ? 'ARABIC' : 'ENGLISH',
    strategy: 'offline',
  });

  useEffect(() => {
    const fetchHadith = async () => {
      const response = await hadithClient.getHadithList({ index });

      if (Array.isArray(response)) {
        setCurrentHadith((prevHadith) => [...prevHadith, ...response.map((data) => data)]);
      } else {
        setCurrentHadith(response.data.map((hadith: Hadith) => hadith.content)); // Handle OnlineAPIResponse
      }
    };

    fetchHadith();
  }, [index, lang]);

  const reverse = direction === 'right';
  const isNews = news.length > 0;
  const data = isNews ? news.map((item) => item.content) : currentHadith;

  // function updateTickerDuration() {
  //   const screenWidth = window.innerWidth;
  //   const duration = isNews ? screenWidth : screenWidth / 0.5;
  //   setCurrentDuration(duration);
  //   document.querySelector('.ticker-inner')?.setAttribute('style', `--duration:${duration}s`);
  // }
  function updateTickerDuration() {
    const screenWidth = window.innerWidth;
    const dataLength = data.length; // Assuming data is an array
    const durationPerItem = screenWidth / dataLength; // Adjust this calculation based on your needs
    const totalDuration = durationPerItem * dataLength;
    setCurrentDuration(totalDuration);
    document.querySelector('.ticker-inner')?.setAttribute('style', `--duration:${totalDuration}s`);
  }

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setIndex((idx) => idx + 1);
  //     updateTickerDuration();
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    updateTickerDuration();
    window.removeEventListener('resize', updateTickerDuration);
  }, [data, isNews]);

  return (
    <div style={{ width: '100vw' }}>
      {isNews ? (
        <Marquee
          direction="left"
          reverse={reverse}
          pauseOnHover={false}
          className="marquee-bg"
          innerClassName="innerNews fullWidth"
        >
          {data.map((item, id) => (
            <HadithComponent id={id} item={item} key={id} afterStar />
          ))}
        </Marquee>
      ) : (
        <Marquee
          direction="left"
          reverse={reverse}
          pauseOnHover={false}
          className="ticker-bg"
          innerClassName="ticker-inner"
        >
          {data.map((item, id) => (
            <HadithComponent id={id} item={item} key={id} afterStar={false} />
          ))}
        </Marquee>
      )}
    </div>
  );
};

const HadithComponent = ({
  id,
  item,
  afterStar,
}: {
  id: number;
  item: string;
  afterStar: boolean;
}) => (
  <Flex>
    <Flex key={id} justify="center" align="center">
      {afterStar && (
        <StarSvg
          style={{
            fill: 'white',
            marginInline: 24,
          }}
        />
      )}
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

const calculateDuration = () => {
  const screenWidth = window.innerWidth;
  const baseDuration = 5; // Base duration in seconds

  // Adjust the duration based on screen width
  const duration = baseDuration * (screenWidth / 1920); // Assuming 1920px as the reference width

  return `${duration}s`;
};
