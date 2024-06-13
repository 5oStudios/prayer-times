import { Group, Radio } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { setOrientation } from '../../lib/features/settings';

export const Orientation = () => {
  const dispatch = useDispatch();

  const handleOrientation = (value: string) => {
    dispatch(setOrientation(value));
  };

  return (
    <>
      <h3>Rotate Window</h3>
      <Radio.Group name="Rotate" label="Select rotate option" onChange={handleOrientation}>
        <Group mt="xs">
          <Radio value="" label="Vertical" />
          <Radio value="vrLEFT" label="Left" />
          <Radio value="vrRIGHT" label="Right" />
        </Group>
      </Radio.Group>
    </>
  );
};
