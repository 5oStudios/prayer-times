import { Text } from '@mantine/core';
import { BaseDrawer } from '../base-drawer';
import { Orientation } from './orientation';
import { SaveButton } from './saveButton';
import styles from '../../assets/css/settings.module.css';
import { useDictionary } from '../../app/[lang]/dictionary-provider';

type SideDialogProps = {
  language: string;
};

export function Settings(props: SideDialogProps) {
  const dictionary = useDictionary();
  return (
    <>
      <BaseDrawer language={props.language}>
        <div className={props.language === 'ar' ? styles.alRight : ''}>
          <Text className={styles.title}>{dictionary.settings.orientation.title}</Text>
          <Orientation />
          <SaveButton />
        </div>
      </BaseDrawer>
    </>
  );
}
