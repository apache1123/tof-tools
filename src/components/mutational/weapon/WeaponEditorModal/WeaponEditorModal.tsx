import { StyledModal } from "../../../presentational/common/Modal/StyledModal";
import type { WeaponEditorProps } from "../WeaponEditor/WeaponEditor";
import { WeaponEditor } from "../WeaponEditor/WeaponEditor";

export interface WeaponEditorModalProps extends WeaponEditorProps {
  open: boolean;
  onClose: () => void;
}

export function WeaponEditorModal({
  weaponProxy,
  allMatricesProxy,
  open,
  onClose,
}: WeaponEditorModalProps) {
  return (
    <StyledModal
      open={open}
      modalContent={
        <WeaponEditor
          weaponProxy={weaponProxy}
          allMatricesProxy={allMatricesProxy}
        />
      }
      onClose={onClose}
      maxWidth={false}
      fullWidth
    />
  );
}
