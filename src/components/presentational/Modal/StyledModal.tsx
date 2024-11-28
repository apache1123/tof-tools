import CloseIcon from "@mui/icons-material/Close";
import type { DialogProps } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import type { ReactNode } from "react";

export interface StyledModalProps {
  open: boolean;
  modalContent?: ReactNode;
  modalTitle?: ReactNode;
  showConfirm?: boolean;
  showCancel?: boolean;
  /** Close button (an 'x') is always shown on the top right, unless explicitly set, for accessibility. A close button is also shown on the bottom right along with it, unless a 'Cancel' button is already shown. */
  hideClose?: boolean;
  isConfirmDisabled?: boolean;
  fullWidth?: boolean;
  maxWidth?: DialogProps["maxWidth"];
  ariaModalTitle?: string;
  ariaModalDescription?: string;

  onConfirm?(): void;

  onClose?(): void;
}

export function StyledModal({
  open,
  modalTitle,
  modalContent,
  showConfirm,
  showCancel,
  hideClose,
  isConfirmDisabled,
  onConfirm,
  onClose,
  fullWidth,
  maxWidth,
  ariaModalTitle,
  ariaModalDescription,
}: StyledModalProps) {
  const hasActions = showConfirm || showCancel || !hideClose;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      aria-labelledby={ariaModalTitle}
      aria-describedby={ariaModalDescription}
    >
      {modalTitle && <DialogTitle>{modalTitle}</DialogTitle>}
      {!modalTitle && !hideClose && <DialogTitle></DialogTitle>}
      {!hideClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey",
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <DialogContent>{modalContent}</DialogContent>
      {hasActions && (
        <DialogActions>
          {showCancel && (
            <Button onClick={onClose} variant="outlined" sx={{ ml: 1 }}>
              Cancel
            </Button>
          )}
          {showConfirm && (
            <Button
              onClick={onConfirm}
              disabled={isConfirmDisabled}
              variant="contained"
            >
              Confirm
            </Button>
          )}
          {!hideClose && !showCancel && (
            <Button onClick={onClose}>Close</Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}
