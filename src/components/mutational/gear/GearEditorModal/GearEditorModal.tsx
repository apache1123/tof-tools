import type { EditorModalProps } from "../../../presentational/common/Modal/EditorModal";
import { EditorModal } from "../../../presentational/common/Modal/EditorModal";
import type { GearEditorProps } from "../GearEditor/GearEditor";
import { GearEditor } from "../GearEditor/GearEditor";

export interface GearEditorModalProps
  extends GearEditorProps,
    EditorModalProps {}

export function GearEditorModal({ ...props }: GearEditorModalProps) {
  return <EditorModal modalContent={<GearEditor {...props} />} {...props} />;
}
