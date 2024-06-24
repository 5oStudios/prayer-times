import { Radio, Group } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { setBackground } from '../../../lib/features/settings';
import { useDictionary } from '../../../app/[lang]/dictionary-provider';

export default function Themes() {
  const dispatch = useDispatch();
  const dictionary = useDictionary();
  return (
    <Radio.Group
      label={dictionary.settings.themes.label}
      onChange={(value: string) => {
        const index = parseInt(value, 10);
        dispatch(setBackground(index));
      }}
    >
      <Group mt="xs">
        <Radio value="0" label={dictionary.settings.themes.default} />
        <Radio value="1" label={dictionary.settings.themes.Blue} />
        <Radio value="3" label={dictionary.settings.themes.red} />
        <Radio value="2" label={dictionary.settings.themes.sunSet} />
      </Group>
    </Radio.Group>
  );
}
