import { Switch, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectHideSunRise, setHideSunRise } from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import style from '../../../assets/css/settings.module.css';

function HideSunRise({ isArabic }: { isArabic: boolean }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const hideSunRise = useSelector(selectHideSunRise);

  const toggleNextPrayDisplay = () => {
    dispatch(setHideSunRise(!hideSunRise));
  };

  return (
    <div
      style={{
        marginTop: '1.5rem',
        display: 'flex',
        flexDirection: isArabic ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
      className={isArabic ? style.alRight : ''}
    >
      <Text>{dictionary.settings.displayScreen.hideSunrisePrayer}</Text>
      <Switch
        style={{ marginTop: '0.5' }}
        defaultChecked={hideSunRise}
        onChange={toggleNextPrayDisplay}
      />
    </div>
  );
}

export default HideSunRise;
