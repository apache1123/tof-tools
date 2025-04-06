import type { AlertProps } from "@mui/material";
import { Alert } from "@mui/material";

export type InfoTextProps = AlertProps;

export function InfoText({ children, ...props }: InfoTextProps) {
  return (
    <Alert severity="info" {...props}>
      {children}
    </Alert>
  );
}
