import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FileInput, Button } from '@mantine/core';
import { setAzkarImage } from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';

export default function LoadAzkarImg() {
  const dictionary = useDictionary();
  const [fileImg, setFileImg] = useState<string>('');
  const dispatch = useDispatch();

  const handleFileChange = (file: File | null) => {
    if (file) {
      getBase64Image(file, (base64Image: string) => {
        setFileImg(base64Image);
        console.log('image =', base64Image);
      });
    } else {
      setFileImg('');
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
    <div style={{ width: '100%' }}>
      <FileInput
        style={{ marginTop: '0.5rem' }}
        onChange={handleFileChange}
        clearable
        label={dictionary.settings.displayScreen.uploadAzkarImage}
        placeholder={dictionary.settings.displayScreen.uploadAzkarImagePlaceholder}
      />
      <Button
        style={{ marginTop: '0.5rem' }}
        onClick={() => {
          dispatch(setAzkarImage(fileImg));
        }}
        variant="filled"
      >
        {dictionary.settings.add}
      </Button>
    </div>
  );
}
