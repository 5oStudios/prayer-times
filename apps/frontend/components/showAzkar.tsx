'use client';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectAzkarImage, selectShowAzkar } from '../lib/features/settings';
import img from '../assets/images/azkar.png';

export default function Azkar() {
  const azkarImg = useSelector(selectAzkarImage);
  const ShowAzKar = useSelector(selectShowAzkar);

  console.log('azkar image = ', azkarImg);
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
      <Image
        src={azkarImg === '' || azkarImg === undefined ? img : azkarImg}
        alt="Azkar Image"
        style={{ height: '100%' }}
        width={700}
        height={500}
      />
    </div>
  ) : (
    <></>
  );
}
