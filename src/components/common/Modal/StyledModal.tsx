import CloseIcon from "@mui/icons-material/Close";
import type { ButtonProps, DialogProps } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import type { ReactNode } from "react";

export interface StyledModalProps {
  open: boolean;
  modalContent?: ReactNode;
  modalTitle?: ReactNode;
  showConfirm?: boolean;
  confirmButtonProps?: ButtonProps;
  showCancel?: boolean;
  cancelButtonProps?: ButtonProps;
  /** Close button (an 'x') is always shown on the top right, unless explicitly set, for accessibility. A close button is also shown on the bottom right along with it, unless a 'Cancel' button is already shown. */
  hideClose?: boolean;
  closeButtonProps?: ButtonProps;
  isConfirmDisabled?: boolean;
  /** Custom actions on the bottom left of the modal */
  leftActions?: ReactNode;
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
  confirmButtonProps,
  showCancel,
  cancelButtonProps,
  hideClose,
  closeButtonProps,
  isConfirmDisabled,
  onConfirm,
  onClose,
  leftActions,
  fullWidth,
  maxWidth,
  ariaModalTitle,
  ariaModalDescription,
}: StyledModalProps) {
  const hasRightActions = showConfirm || showCancel || !hideClose;
  const hasActions = hasRightActions || !leftActions;

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
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" sx={{ gap: 0.5, alignItems: "end" }}>
            {leftActions}
          </Stack>

          <Stack direction="row" sx={{ gap: 0.5, alignItems: "end" }}>
            {showCancel && (
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{ ml: 1 }}
                {...cancelButtonProps}
              >
                Cancel
              </Button>
            )}
            {showConfirm && (
              <Button
                onClick={onConfirm}
                disabled={isConfirmDisabled}
                variant="contained"
                {...confirmButtonProps}
              >
                Confirm
              </Button>
            )}
            {!hideClose && !showCancel && (
              <Button onClick={onClose} {...closeButtonProps}>
                Close
              </Button>
            )}
          </Stack>
        </DialogActions>
      )}
    </Dialog>
  );
}
