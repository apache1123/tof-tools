import type { AlertProps } from "@mui/material";
import { Alert } from "@mui/material";

export type WarningTextProps = AlertProps;

export function WarningText({ children, ...props }: WarningTextProps) {
  return (
    <Alert severity="warning" {...props}>
      {children}
    </Alert>
  );
}
