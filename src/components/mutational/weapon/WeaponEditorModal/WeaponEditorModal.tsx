import type { EditorModalProps } from "../../../presentational/common/Modal/EditorModal";
import { EditorModal } from "../../../presentational/common/Modal/EditorModal";
import type { WeaponEditorProps } from "../WeaponEditor/WeaponEditor";
import { WeaponEditor } from "../WeaponEditor/WeaponEditor";

export interface WeaponEditorModalProps
  extends WeaponEditorProps,
    EditorModalProps {}

export function WeaponEditorModal({
  maxWidth = false,
  fullWidth = true,
  ...props
}: WeaponEditorModalProps) {
  return (
    <EditorModal
      modalContent={<WeaponEditor {...props} />}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      {...props}
    />
  );
}
