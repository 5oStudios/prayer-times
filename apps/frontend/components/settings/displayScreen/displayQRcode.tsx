import { useDispatch, useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import { Center, Text, TextInput, Switch } from '@mantine/core';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';

import {
  setURL,
  selectURL,
  selectOnlyFriday,
  setEnableURL,
  selectEnableURL,
  setOnlyFriday,
} from '../../../lib/features/settings';
import styles from '../../../assets/css/settings.module.css';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';

const QRCodeGenerator = ({ isArabic }: { isArabic: boolean }) => {
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const enableURl = useSelector(selectEnableURL);
  const onlyFriday = useSelector(selectOnlyFriday);

  return (
    <div style={{ width: '100%', marginTop: '1rem' }} className={isArabic ? styles.alRight : ''}>
      <TextInput
        style={{ width: '100%' }}
        defaultValue={useSelector(selectURL)}
        onChange={(e) => dispatch(setURL(e.target.value))}
        label={dictionary.settings.displaysQR.title}
        placeholder={dictionary.settings.displaysQR.placeholder}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '1rem',
          gap: '1rem',
        }}
      >
        <Switch
          defaultChecked={enableURl}
          label={dictionary.settings.displaysQR.enable}
          onChange={() => {
            dispatch(setEnableURL(!enableURl));
          }}
        />
        <Switch
          defaultChecked={enableURl}
          label={dictionary.settings.displaysQR.onlyFriday}
          onChange={() => {
            dispatch(setOnlyFriday(!onlyFriday));
          }}
        />
      </div>
    </div>
  );
};

type DisplayQRcodeProps = {
  className: string;
};
const DisplayQRcode = ({ className }: DisplayQRcodeProps) => {
  const url = useSelector(selectURL);
  const enableURl = useSelector(selectEnableURL);
  const onlyFriday = useSelector(selectOnlyFriday);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isTodayFriday = moment().day() === 5;

  return (onlyFriday ? isTodayFriday : true) && enableURl && !isTabletOrMobile ? (
    <div className={className}>
      <QRCodeSVG value={url} />
      <Center>
        <Text className={styles.ArStyle} style={{ fontSize: '1.2rem' }}>
          الخطبه
        </Text>
      </Center>
    </div>
  ) : (
    <></>
  );
};

export { DisplayQRcode, QRCodeGenerator };
