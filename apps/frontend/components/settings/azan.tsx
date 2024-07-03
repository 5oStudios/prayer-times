import { Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectShowAzanTime, selectCurrentPrayTimeName } from '../../lib/features/settings';
import { ClockSection } from '../../sections/clock';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import { SupportedLanguages } from '../../app/i18n/dictionaries';

export default function Azan({ language }: { language: SupportedLanguages }) {
  const dictionary = useDictionary();
  const show = useSelector(selectShowAzanTime);
  const prayName = useSelector(selectCurrentPrayTimeName);
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return show ? (
    <div
      className="azan-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isTabletOrMobile ? (
        <ClockSection lang={language} style={{ color: 'white' }} />
      ) : (
        <ClockSection lang={language} className="clock-section-azan" />
      )}
      <Text style={{ fontSize: isPortrait ? '3rem' : '5rem', color: '#dfbb76' }}>
        {dictionary.azan}
      </Text>
      <Text style={{ fontSize: isPortrait ? '5rem' : '12rem', color: '#ffffff' }}>{prayName}</Text>
    </div>
  ) : (
    <></>
  );
}
