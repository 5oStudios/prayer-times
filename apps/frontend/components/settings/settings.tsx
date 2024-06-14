import { BaseDrawer } from '../base-drawer';
import { Orientation } from './orientation';
import { SaveButton } from './saveButton';
import '../../assets/css/settings.module.css';

type SideDialogProps = {
  language: string;
};

export function Settings(props: SideDialogProps) {
  return (
    <>
      <BaseDrawer language={props.language}>
        <Orientation />
        <SaveButton />
      </BaseDrawer>
    </>
  );
}
