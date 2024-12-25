import { type ReactNode, useState } from "react";

import { Button, type ButtonProps } from "../Button/Button";
import type { StyledModalProps } from "./StyledModal";
import { StyledModal } from "./StyledModal";

export interface ButtonModalProps
  extends Omit<StyledModalProps, "open">,
    Omit<ButtonProps, "children"> {
  buttonContent?: ReactNode;
  openByDefault?: boolean;
}

export function ButtonModal({
  buttonContent,
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
      <Button
        icon={icon}
        iconButton={iconButton}
        buttonProps={buttonProps}
        iconButtonProps={iconButtonProps}
        onClick={handleOpen}
      >
        {buttonContent}
      </Button>

      <StyledModal
        {...rest}
        open={open}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
}
