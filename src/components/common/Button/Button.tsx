import type {
  ButtonProps as MuiButtonProps,
  IconButtonProps,
} from "@mui/material";
import { Button as MuiButton, IconButton, Tooltip } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export interface ButtonProps extends PropsWithChildren, PropsWithSx {
  icon?: ReactNode;
  /** Use an icon button instead of a regular button */
  iconButton?: boolean;
  buttonProps?: MuiButtonProps;
  iconButtonProps?: IconButtonProps;
  onClick?(): void;
}

/** A MUI button or an icon button, with some defaults */
export function Button({
  children,
  icon,
  iconButton,
  buttonProps,
  iconButtonProps,
  onClick,
  sx,
}: ButtonProps) {
  function handleClick() {
    onClick?.();
  }

  return iconButton && icon ? (
    <Tooltip title={children} placement="right">
      <IconButton
        onClick={handleClick}
        color="primary"
        sx={{ ...sx }}
        {...iconButtonProps}
      >
        {icon}
      </IconButton>
    </Tooltip>
  ) : (
    <MuiButton
      onClick={handleClick}
      variant="outlined"
      startIcon={icon}
      sx={{ ...sx }}
      {...buttonProps}
    >
      {children}
    </MuiButton>
  );
}
