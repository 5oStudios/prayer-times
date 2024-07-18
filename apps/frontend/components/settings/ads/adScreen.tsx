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
  const [first, setFirst] = useState(0);
  useEffect(() => {
    const runAdChecker = () => {
      console.log('enableAd = ', enableAd);
      console.log('showAzkar = ', showAzkar);
      console.log('hideScreen = ', hideScreen);
      console.log('showAzan = ', showAzan);
      console.log('showCounter = ', showCounter);

      if (enableAd && !showAzkar && !hideScreen && !showAzan && !showCounter) {
        setShow(true);
        setFirst(1);
        console.log('Ad is running');
        console.log('Ad duration', adDuration);
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

    const intervalId = setInterval(
      runAdChecker,
      (everyHowManyMinute + adDuration * first) * 60 * 1000
    );

    return () => clearInterval(intervalId);
  }, [
    enableAd,
    everyHowManyMinute,
    adDuration,
    showAzkar,
    hideScreen,
    showAzan,
    showCounter,
    first,
  ]);

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
        <div style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <Image src={adImg} alt="Ad Image" layout="fill" objectFit="contain" />
        </div>
      </div>
    )
  );
}
