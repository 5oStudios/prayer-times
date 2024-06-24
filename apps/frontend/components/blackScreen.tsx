import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { selectHideScreen } from '../lib/features/settings';
import NoPhone from '../assets/images/no-mobile.png';

function BlackScreen() {
  const isHided = useSelector(selectHideScreen);

  const backgroundDivStyle = {
    display: isHided ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    zIndex: 10,
    transition: 'opacity 0.5s ease-in-out, visibility 0.5s',
  };

  // Conditional rendering based on isHided
  return isHided ? (
    <div style={backgroundDivStyle}>
      <Image src={NoPhone} alt="close mobile" width={400} height={400} />
    </div>
  ) : (
    <div></div> // This empty div is optional if you prefer not to render anything when isHided is false
  );
}

export default BlackScreen;
