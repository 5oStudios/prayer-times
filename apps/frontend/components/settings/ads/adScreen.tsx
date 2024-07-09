import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import {
  selectAdDuration,
  selectAdEveryHowManyMinutes,
  selectAdImg,
  selectEnableAd,
  selectEnableCountDown,
  selectHideScreen,
  selectShowAzanTime,
  selectShowAzkar,
} from '../../../lib/features/settings';
import { subscribe } from '@enegix/events';

export default function AdScreen() {
  const adImg = useSelector(selectAdImg);
  const enableAd = useSelector(selectEnableAd);
  const everyHowManyMinute = useSelector(selectAdEveryHowManyMinutes);
  const adDuration = useSelector(selectAdDuration);

  const showAzkar = useSelector(selectShowAzkar);
  const hideScreen = useSelector(selectHideScreen);
  const showAzan = useSelector(selectShowAzanTime);
  const showCounter = useSelector(selectEnableCountDown);

  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const runAdChecker = () => {
      if (enableAd && !showAzkar && !hideScreen && !showAzan && !showCounter) {
        setShow(true);
        console.log('Ad is running');
        setTimeout(
          () => {
            setShow(false);
          },
          adDuration * 60 * 1000
        );
      } else {
        setShow(false);
      }
    };

    const intervalId = setInterval(runAdChecker, everyHowManyMinute * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [enableAd, everyHowManyMinute, adDuration, showAzkar, hideScreen, showAzan, showCounter]);

  return (
    enableAd &&
    show && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: '30',
        }}
      >
        <Image src={adImg} alt="Ad Image" style={{ height: '100%' }} width={700} height={500} />
      </div>
    )
  );
}
