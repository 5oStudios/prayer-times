import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { PrayerTime } from '@islamic-kit/prayer-times';
import { publish, subscribe } from '@enegix/events';
import { selectHideScreen, selectTimePeriod, setHideScreen } from '../lib/features/settings';
import NoPhone from '../assets/images/no-mobile.png';
import { minuetsToMilliseconds, wait } from '../utils';

function BlackScreen() {
  const dispatch = useDispatch();
  const isHided = useSelector(selectHideScreen);
  const timesPeriod = useSelector(selectTimePeriod);
  useEffect(() => {
    subscribe<PrayerTime>('hide-screen', async (prayer) => {
      dispatch(setHideScreen(true));
      await wait(
        minuetsToMilliseconds(timesPeriod.find((time) => time.id === prayer.id)?.minutes || 2)
        // minuetsToMilliseconds(0.03)
      );
      dispatch(setHideScreen(false));
      publish('show-azkar');
    });
  }, []);

  return isHided ? (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        zIndex: 10,
        opacity: isHided ? 1 : 0,
        visibility: isHided ? 'visible' : 'hidden',
        transition: 'opacity 0.5s ease-in-out, visibility 0.5s',
      }}
    >
      <Image src={NoPhone} alt="close mobile" width={400} height={400} />
    </div>
  ) : (
    <div></div>
  );
}

export default BlackScreen;
