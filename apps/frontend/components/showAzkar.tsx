'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectAzkarImage, selectShowAzkar } from '../lib/features/settings';
import img from '../assets/images/azkar.png';

export default function Azkar() {
  const azkarImg = useSelector(selectAzkarImage);
  const ShowAzKar = useSelector(selectShowAzkar);

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
