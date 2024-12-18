import type { EditorModalProps } from "../../../presentational/common/Modal/EditorModal";
import { EditorModal } from "../../../presentational/common/Modal/EditorModal";
import type { GearSetPresetEditorProps } from "../GearSetPresetEditor/GearSetPresetEditor";
import { GearSetPresetEditor } from "../GearSetPresetEditor/GearSetPresetEditor";

export interface GearSetPresetEditorModalProps
  extends GearSetPresetEditorProps,
    EditorModalProps {}

export function GearSetPresetEditorModal({
  maxWidth = false,
  fullWidth = true,
  ...props
}: GearSetPresetEditorModalProps) {
  return (
    <EditorModal
      modalContent={<GearSetPresetEditor {...props} />}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      {...props}
    />
  );
}
