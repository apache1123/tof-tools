import type { Theme } from '@mui/material';
import { Button, IconButton, type SxProps, Tooltip } from '@mui/material';
import { type ReactNode, useState } from 'react';

import type { StyledModalProps } from './StyledModal';
import { StyledModal } from './StyledModal';

export interface ButtonModalProps extends Omit<StyledModalProps, 'open'> {
  buttonText?: ReactNode;
  icon?: ReactNode;
  iconButton?: boolean;
  disabled?: boolean;
  buttonSx?: SxProps<Theme>;
  ['aria-label']?: string;
}

export function ButtonModal({
  buttonText,
  onConfirm,
  onClose,
  icon,
  iconButton,
  disabled,
  'aria-label': ariaLabel,
  buttonSx,
  ...rest
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
            disabled={disabled}
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
          disabled={disabled}
          sx={buttonSx}
          aria-label={ariaLabel}
        >
          {buttonText}
        </Button>
      )}
      <StyledModal
        {...rest}
        open={open}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
}
