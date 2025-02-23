import type { AlertProps } from "@mui/material";
import { Alert } from "@mui/material";

export type ErrorTextProps = AlertProps;

export function ErrorText({ children, ...props }: ErrorTextProps) {
  return (
    <Alert severity="error" {...props}>
      {children}
    </Alert>
  );
}
