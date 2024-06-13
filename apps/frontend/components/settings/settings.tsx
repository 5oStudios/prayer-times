import { BaseDrawer } from '../base-drawer';
import { Orientation } from './orientation';

type SideDialogProps = {
  language: string;
};

export function Settings(props: SideDialogProps) {
  return (
    <>
      <BaseDrawer language={props.language}>
        <Orientation />
      </BaseDrawer>
    </>
  );
}
