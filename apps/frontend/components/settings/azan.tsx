import { Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  selectShowAzanTime,
  selectCurrentPrayTimeName,
  selectOrientation,
} from '../../lib/features/settings';
import { ClockSection } from '../../sections/clock';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import { SupportedLanguages } from '../../app/i18n/dictionaries';

export default function Azan({ language }: { language: SupportedLanguages }) {
  const dictionary = useDictionary();
  const show = useSelector(selectShowAzanTime);
  const prayName = useSelector(selectCurrentPrayTimeName);
  const orientation = useSelector(selectOrientation);
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  return show ? (
    <div className="azan-wrapper">
      <ClockSection
        lang={language}
        style={{
          color: 'white',
          fontSize: '2rem',
          position: 'absolute',
          top: orientation === '' ? '2vh' : '2vw',
        }}
      />
      <Text style={{ fontSize: isPortrait ? '3rem' : '5rem', color: '#dfbb76' }}>
        {dictionary.azan}
      </Text>
      <Text
        style={{ fontSize: isPortrait ? '5rem' : '12rem', color: '#ffffff', marginTop: '1rem' }}
      >
        {prayName}
      </Text>
    </div>
  ) : (
    <></>
  );
}
