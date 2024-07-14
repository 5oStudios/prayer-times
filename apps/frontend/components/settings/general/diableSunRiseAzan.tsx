import React from 'react';
import { Switch, Text } from '@mantine/core';
import { useDictionary } from 'apps/frontend/app/[lang]/dictionary-provider';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDisableSunRiseAzan,
  setDisableSunRiseAzan,
} from 'apps/frontend/lib/features/settings';

export default function DiableSunRiseAzan({ isArabic }: { isArabic: boolean }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const disableAzan = useSelector(selectDisableSunRiseAzan);
  console.log('disableAzan for sunrise ', disableAzan);
  const onChange = () => {
    dispatch(setDisableSunRiseAzan(!disableAzan));
    setTimeout(() => {
      window.location.reload();
    }, 100);
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
    >
      <Text>{dictionary.settings.displayScreen.hideSunRiseAzan}</Text>
      <Switch style={{ marginTop: '0.5' }} defaultChecked={disableAzan} onChange={onChange} />
    </div>
  );
}
