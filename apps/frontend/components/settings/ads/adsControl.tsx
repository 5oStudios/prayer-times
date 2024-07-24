import { FileInput, NumberInput, Switch, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';
import {
  selectAdDuration,
  selectAdEveryHowManyMinutes,
  selectAdImg,
  selectEnableAd,
  setAdDuration,
  setAdEveryHowManyMinutes,
  setAdImg,
  setEnableAd,
} from '../../../lib/features/settings';
import style from '../../../assets/css/settings.module.css';

export default function AdsControl({ isArabic }: { isArabic: boolean }) {
  const dictionary = useDictionary();
  const dispatch = useDispatch();
  const adImg = useSelector(selectAdImg);
  const everyHowManyMinute = useSelector(selectAdEveryHowManyMinutes);
  const adDuration = useSelector(selectAdDuration);
  const enableAd = useSelector(selectEnableAd);

  const handleFileChange = (file: File | null) => {
    if (file) {
      getBase64Image(file, (base64Image: string) => {
        dispatch(setAdImg(base64Image));
      });
    } else {
      dispatch(setAdImg(''));
    }
  };
  const getBase64Image = (img: File, callback: (base64Image: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      callback(reader.result as string);
    };
    reader.onerror = (error) => {
      console.error('Error converting image to Base64: ', error);
    };
  };

  return (
    <div>
      <FileInput
        clearable
        label={dictionary.settings.ads.labelFile}
        placeholder={dictionary.settings.ads.placeholderFile}
        onChange={handleFileChange}
      />
      <NumberInput
        defaultValue={everyHowManyMinute}
        style={{ marginTop: '1rem' }}
        label={dictionary.settings.ads.labelEveryHowManyMinute}
        placeholder={dictionary.settings.ads.placeholderEveryHowManyMinute}
        onChange={(e) => dispatch(setAdEveryHowManyMinutes(e))}
        min={1}
      />
      <NumberInput
        defaultValue={adDuration}
        style={{ marginTop: '1rem' }}
        label={dictionary.settings.ads.adDurationLabel}
        placeholder={dictionary.settings.ads.adDurationPlaceholder}
        onChange={(e) => dispatch(setAdDuration(e))}
        min={1}
      />
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
        <Text>{dictionary.settings.ads.enableAd}</Text>
        <Switch defaultChecked={enableAd} onChange={() => dispatch(setEnableAd(!enableAd))} />
      </div>
    </div>
  );
}
