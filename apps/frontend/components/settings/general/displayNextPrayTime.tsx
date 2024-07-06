import { Switch, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEnableNextPrayDisplay,
  setEnableNextPrayDisplay,
} from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import style from '../../../assets/css/settings.module.css';

export default function DisplayNextPrayTime({ isArabic }: { isArabic: boolean }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const showNextPrayTime = useSelector(selectEnableNextPrayDisplay);
  const toggleNextPrayDisplay = () => {
    dispatch(setEnableNextPrayDisplay(!showNextPrayTime));
  };
  return (
    <div style={{ marginTop: '1rem' }} className={isArabic ? style.alRight : ''}>
      <Text>{dictionary.settings.nextPrayTime.title}</Text>
      <Switch
        style={{ marginTop: '0.5' }}
        defaultChecked={showNextPrayTime}
        onChange={toggleNextPrayDisplay}
      />
    </div>
  );
}
