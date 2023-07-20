import type { Theme } from '@mui/material';
import { Button, IconButton, type SxProps, Tooltip } from '@mui/material';
import { type ReactNode, useState } from 'react';

import type { StyledModalProps } from './StyledModal';
import { StyledModal } from './StyledModal';

export interface ButtonModalProps extends Omit<StyledModalProps, 'open'> {
  buttonText?: ReactNode;
  buttonSx?: SxProps<Theme>;
  iconButtonIcon?: ReactNode;
  iconButtonAriaLabel?: string;
}

export function ButtonModal({
  buttonText,
  modalContent,
  showConfirm,
  showCancel,
  isConfirmDisabled,
  onConfirm,
  onClose,
  iconButtonIcon,
  iconButtonAriaLabel,
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
      {iconButtonIcon ? (
        <Tooltip title={buttonText} placement="right">
          <IconButton
            onClick={handleOpen}
            color="primary"
            aria-label={iconButtonAriaLabel}
          >
            {iconButtonIcon}
          </IconButton>
        </Tooltip>
      ) : (
        <Button onClick={handleOpen} variant="text" sx={buttonSx}>
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
