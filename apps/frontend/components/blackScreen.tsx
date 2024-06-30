import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { selectHideScreen } from '../lib/features/settings';
import NoPhone from '../assets/images/no-mobile.png';

function BlackScreen() {
  const isHided = useSelector(selectHideScreen);

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
