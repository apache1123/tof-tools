import { StyledModal } from "../../presentational/Modal/StyledModal";
import type { WeaponEditorProps } from "../WeaponEditor/WeaponEditor";
import { WeaponEditor } from "../WeaponEditor/WeaponEditor";

export interface WeaponEditorModalProps extends WeaponEditorProps {
  open: boolean;
  onClose: () => void;
}

export function WeaponEditorModal({
  weaponState,
  open,
  onClose,
}: WeaponEditorModalProps) {
  return (
    <StyledModal
      open={open}
      modalContent={<WeaponEditor weaponState={weaponState} />}
      onClose={onClose}
    />
  );
}
