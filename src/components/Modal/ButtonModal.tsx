import type { Theme } from '@mui/material';
import { Button, IconButton, type SxProps, Tooltip } from '@mui/material';
import { type ReactNode, useState } from 'react';

import type { StyledModalProps } from './StyledModal';
import { StyledModal } from './StyledModal';

export interface ButtonModalProps extends Omit<StyledModalProps, 'open'> {
  buttonText?: ReactNode;
  iconButtonIcon?: ReactNode;
  buttonSx?: SxProps<Theme>;
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
          <IconButton onClick={handleOpen} color="primary">
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
