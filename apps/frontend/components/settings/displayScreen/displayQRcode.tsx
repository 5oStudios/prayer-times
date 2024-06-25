import { useDispatch, useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import { Center, Text, TextInput, Checkbox } from '@mantine/core';
import moment from 'moment';
import { setURL, selectURL, setEnableURL, selectEnableURL } from '../../../lib/features/settings';
import styles from '../../../assets/css/settings.module.css';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';

const QRCodeGenerator = () => {
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const enableURl = useSelector(selectEnableURL);
  return (
    <div>
      <TextInput
        onChange={(e) => dispatch(setURL(e.target.value))}
        label={dictionary.settings.displaysQR.title}
        placeholder={dictionary.settings.displaysQR.placeholder}
      />
      <Checkbox
        defaultChecked={enableURl}
        style={{ marginTop: '1rem' }}
        label={dictionary.settings.displaysQR.enable}
        onChange={() => {
          dispatch(setEnableURL(!enableURl));
        }}
      />
    </div>
  );
};

type DisplayQRcodeProps = {
  className: string;
};
const DisplayQRcode = ({ className }: DisplayQRcodeProps) => {
  const url = useSelector(selectURL);
  const enableURl = useSelector(selectEnableURL);

  const isTodayFriday = moment().day() === 5;
  return (
    isTodayFriday &&
    enableURl && (
      <div className={className}>
        <QRCodeSVG value={url} />
        <Center>
          <Text className={styles.ArStyle} style={{ fontSize: '1.2rem' }}>
            الخطبه
          </Text>
        </Center>
      </div>
    )
  );
};

export { DisplayQRcode, QRCodeGenerator };
