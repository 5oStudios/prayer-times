import { Group, Radio, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectRotateDirection, setOrientation } from '../../lib/features/rotateWindowState';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import styles from '../../assets/css/settings.module.css';

export const Orientation = () => {
  const dispatch = useDispatch();

  const orientation = useSelector(selectRotateDirection);
  const dictionary = useDictionary();

  const handleOrientation = (value: string) => {
    dispatch(setOrientation(value));
  };

  return (
    <>
      <Text className={styles.subHeader}>{dictionary.settings.orientation.title}</Text>
      <Radio.Group
        className={styles.paddingTop}
        label={dictionary.settings.orientation.label}
        onChange={handleOrientation}
        value={orientation}
      >
        <Group mt="xs">
          <Radio value="" label={dictionary.settings.orientation.options.vertical} />
          <Radio value="vrLEFT" label={dictionary.settings.orientation.options.left} />
          <Radio value="vrRIGHT" label={dictionary.settings.orientation.options.right} />
        </Group>
      </Radio.Group>
    </>
  );
};
