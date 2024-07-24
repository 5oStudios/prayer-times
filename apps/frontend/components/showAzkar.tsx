'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { subscribe } from '@enegix/events';
import { selectAzkarImage, selectShowAzkar, setShowAzKar } from '../lib/features/settings';
import img from '../assets/images/azkar.png';
import { minuetsToMilliseconds, wait } from '../utils';

export default function Azkar() {
  const azkarImg = useSelector(selectAzkarImage);
  const ShowAzKar = useSelector(selectShowAzkar);
  const dispatch = useDispatch();

  useEffect(() => {
    subscribe('show-azkar', async () => {
      dispatch(setShowAzKar(true));
      await wait(minuetsToMilliseconds(2));
      dispatch(setShowAzKar(false));
    });
  }, []);

  return ShowAzKar ? (
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
        <Image
          src={azkarImg === '' || azkarImg === undefined ? img : azkarImg}
          alt="Azkar Image"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
