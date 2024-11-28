import { StyledModal } from "../../presentational/Modal/StyledModal";
import type { GearEditorProps } from "../GearEditor/GearEditor";
import { GearEditor } from "../GearEditor/GearEditor";

export interface GearEditorModalProps extends GearEditorProps {
  open: boolean;
  onClose: () => void;
}

export function GearEditorModal({
  gearState,
  open,
  onClose,
}: GearEditorModalProps) {
  return (
    <StyledModal
      open={open}
      modalContent={<GearEditor gearState={gearState} />}
      onClose={onClose}
    />
  );
}
