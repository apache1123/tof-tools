import type {
  DialogProps} from '@mui/material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import type { ReactNode } from 'react';

export interface StyledModalProps {
  open: boolean;
  modalContent?: ReactNode;
  modalTitle?: ReactNode;
  showConfirm?: boolean;
  showCancel?: boolean;
  isConfirmDisabled?: boolean;
  onConfirm?(): void;
  onClose?(): void;
  fullWidth?: boolean;
  maxWidth?: DialogProps["maxWidth"];
  ariaModalTitle?: string;
  ariaModalDescription?: string;
}

export function StyledModal({
  open,
  modalTitle,
  modalContent,
  showConfirm,
  showCancel,
  isConfirmDisabled,
  onConfirm,
  onClose,
  fullWidth,
  maxWidth,
  ariaModalTitle,
  ariaModalDescription,
}: StyledModalProps) {
  const hasActions = showConfirm || showCancel;

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
      <DialogContent dividers={!!modalTitle || hasActions}>
        <DialogContentText>{modalContent}</DialogContentText>
      </DialogContent>
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
        </DialogActions>
      )}
    </Dialog>
  );
}
