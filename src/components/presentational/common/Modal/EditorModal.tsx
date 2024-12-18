import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";

import type { StyledModalProps } from "./StyledModal";
import { StyledModal } from "./StyledModal";

export interface EditorModalProps extends StyledModalProps {
  showDelete?: boolean;
  onDelete?(): void;
}

export function EditorModal({
  showDelete,
  onDelete,
  ...rest
}: EditorModalProps) {
  return (
    <StyledModal
      leftActions={
        showDelete && (
          <Button
            startIcon={<DeleteForeverIcon />}
            variant="outlined"
            color="error"
            onClick={() => {
              if (onDelete) onDelete();
            }}
          >
            Delete
          </Button>
        )
      }
      {...rest}
    />
  );
}
