import type { EditorModalProps } from "../../../presentational/common/Modal/EditorModal";
import { EditorModal } from "../../../presentational/common/Modal/EditorModal";
import type { MatrixEditorProps } from "../MatrixEditor/MatrixEditor";
import { MatrixEditor } from "../MatrixEditor/MatrixEditor";

export interface MatrixEditorModalProps
  extends MatrixEditorProps,
    EditorModalProps {}

export function MatrixEditorModal({ ...props }: MatrixEditorModalProps) {
  return <EditorModal modalContent={<MatrixEditor {...props} />} {...props} />;
}
