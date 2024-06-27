import { Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectShowAzanTime, selectCurrentPrayTimeName } from '../../lib/features/settings';
import { useDictionary } from '../../app/[lang]/dictionary-provider';

export default function Azan() {
  const dictionary = useDictionary();
  const show = useSelector(selectShowAzanTime);
  const prayName = useSelector(selectCurrentPrayTimeName);
  return show ? (
    <div className="azan-wrapper">
      <Text style={{ fontSize: '10rem', color: '#dfbb76' }}>{dictionary.azan}</Text>
      <Text style={{ fontSize: '8rem', color: '#ffffff', marginTop: '1rem' }}>{prayName}</Text>
    </div>
  ) : (
    <></>
  );
}
