import { Text } from '@mantine/core';
import { BaseDrawer } from '../base-drawer';
import { useDisclosure } from '@mantine/hooks';
import { Orientation } from './orientation';
import { SaveButton } from './saveButton';
import styles from '../../assets/css/settings.module.css';
import { useDictionary } from '../../app/[lang]/dictionary-provider';
import SettingsHeader from './settingsHeader';

type SideDialogProps = {
  language: string;
};

export function Settings(props: SideDialogProps) {
  const dictionary = useDictionary();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <BaseDrawer language={props.language} open={open} close={close} opened={opened}>
        <div className={props.language === 'ar' ? styles.alRight : ''}>
          <SettingsHeader language={props.language} closDrawer={close} />
          <Text className={styles.title}>{dictionary.settings.title}</Text>
          <Orientation />
          <SaveButton />
        </div>
      </BaseDrawer>
    </>
  );
}
