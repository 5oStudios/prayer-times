import { useDispatch, useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import { Center, Text, TextInput, Chip } from '@mantine/core';
import moment from 'moment';
import { setURL, selectURL, setEnableURL, selectEnableURl } from '../../../lib/features/settings';
import styles from '../../../assets/css/settings.module.css';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';

const QRCodeGenerator = () => {
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  const enableURl = useSelector(selectEnableURl);
  return (
    <div>
      <TextInput
        onChange={(e) => dispatch(setURL(e.target.value))}
        label={dictionary.settings.displaysQR.title}
        placeholder={dictionary.settings.displaysQR.placeholder}
      />
      <Chip
        defaultChecked={enableURl}
        color="green"
        style={{ marginTop: '1rem' }}
        onChange={() => {
          dispatch(setEnableURL(!enableURl));
        }}
      >
        {dictionary.settings.displaysQR.enable}
      </Chip>
    </div>
  );
};

type DisplayQRcodeProps = {
  className: string;
};
const DisplayQRcode = ({ className }: DisplayQRcodeProps) => {
  const url = useSelector(selectURL);
  const enableURl = useSelector(selectEnableURl);

  const isTodayFriday = moment().day() === 1;
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
