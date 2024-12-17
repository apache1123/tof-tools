import { StyledModal } from "../../../presentational/common/Modal/StyledModal";
import type { GearSetPresetEditorProps } from "../GearSetPresetEditor/GearSetPresetEditor";
import { GearSetPresetEditor } from "../GearSetPresetEditor/GearSetPresetEditor";

export interface GearSetPresetEditorModalProps
  extends GearSetPresetEditorProps {
  open: boolean;
  onClose(): void;
}

export function GearSetPresetEditorModal({
  open,
  onClose,
  ...props
}: GearSetPresetEditorModalProps) {
  return (
    <StyledModal
      open={open}
      modalContent={<GearSetPresetEditor {...props} />}
      onClose={onClose}
      maxWidth={false}
      fullWidth
    />
  );
}
