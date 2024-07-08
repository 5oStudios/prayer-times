import { TextInput, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectImamName, setImamName } from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';

export default function ImamName() {
  const dispatch = useDispatch();
  const imamName = useSelector(selectImamName);
  const dictionary = useDictionary();

  const handleInputChange = (value: string) => {
    dispatch(setImamName(value));
  };

  return (
    <div style={{ width: '100%', marginTop: '1rem' }}>
      <Text>{dictionary.settings.imamName.title}</Text>
      <TextInput
        value={imamName}
        placeholder={dictionary.settings.imamName.description}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
}
