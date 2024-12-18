import { DeleteButtonWithConfirm } from "../DeleteButtonWithConfirm/DeleteButtonWithConfirm";
import type { StyledModalProps } from "./StyledModal";
import { StyledModal } from "./StyledModal";

export interface EditorModalProps extends StyledModalProps {
  itemName?: string;
  showDelete?: boolean;
  onDelete?(): void;
}

export function EditorModal({
  itemName,
  showDelete,
  onDelete,
  ...rest
}: EditorModalProps) {
  return (
    <StyledModal
      leftActions={
        showDelete && (
          <DeleteButtonWithConfirm
            itemName={itemName ?? "this item"}
            onDelete={() => {
              if (onDelete) onDelete();
            }}
          />
        )
      }
      {...rest}
    />
  );
}
