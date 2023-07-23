import type { Theme } from '@mui/material';
import { Button, IconButton, type SxProps, Tooltip } from '@mui/material';
import { type ReactNode, useState } from 'react';

import type { StyledModalProps } from './StyledModal';
import { StyledModal } from './StyledModal';

export interface ButtonModalProps extends Omit<StyledModalProps, 'open'> {
  buttonText?: ReactNode;
  icon?: ReactNode;
  iconButton?: boolean;
  buttonSx?: SxProps<Theme>;
  ['aria-label']?: string;
}

export function ButtonModal({
  buttonText,
  modalContent,
  showConfirm,
  showCancel,
  isConfirmDisabled,
  onConfirm,
  onClose,
  icon,
  iconButton,
  'aria-label': ariaLabel,
  buttonSx,
  ariaModalTitle = 'modal-title',
  ariaModalDescription = 'modal-description',
}: ButtonModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    handleClose();
  };

  return (
    <>
      {iconButton && icon ? (
        <Tooltip title={buttonText} placement="right">
          <IconButton
            onClick={handleOpen}
            color="primary"
            aria-label={ariaLabel}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          onClick={handleOpen}
          variant="text"
          startIcon={icon}
          sx={buttonSx}
          aria-label={ariaLabel}
        >
          {buttonText}
        </Button>
      )}
      <StyledModal
        open={open}
        modalContent={modalContent}
        showConfirm={showConfirm}
        showCancel={showCancel}
        isConfirmDisabled={isConfirmDisabled}
        onConfirm={handleConfirm}
        onClose={handleClose}
        ariaModalTitle={ariaModalTitle}
        ariaModalDescription={ariaModalDescription}
      />
    </>
  );
}
