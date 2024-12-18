import type { ButtonProps, IconButtonProps } from "@mui/material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { type ReactNode, useState } from "react";

import type { StyledModalProps } from "./StyledModal";
import { StyledModal } from "./StyledModal";

export interface ButtonModalProps extends Omit<StyledModalProps, "open"> {
  buttonText?: ReactNode;
  icon?: ReactNode;
  iconButton?: boolean;
  openByDefault?: boolean;
  buttonProps?: ButtonProps;
  iconButtonProps?: IconButtonProps;
}

export function ButtonModal({
  buttonText,
  onConfirm,
  onClose,
  icon,
  iconButton,
  openByDefault,
  buttonProps,
  iconButtonProps,
  ...rest
}: ButtonModalProps) {
  const [open, setOpen] = useState(openByDefault ?? false);

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
          <IconButton onClick={handleOpen} color="primary" {...iconButtonProps}>
            {icon}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          onClick={handleOpen}
          variant="outlined"
          startIcon={icon}
          {...buttonProps}
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
