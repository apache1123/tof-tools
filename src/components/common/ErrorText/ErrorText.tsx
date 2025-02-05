import type { TypographyProps } from "@mui/material";
import { Typography } from "@mui/material";

export type ErrorTextProps = TypographyProps;

export function ErrorText({ children, ...props }: ErrorTextProps) {
  return (
    <Typography
      {...props}
      sx={{
        fontStyle: "italic",
        color: (theme) => theme.palette.error.main,
        ...props.sx,
      }}
    >
      {children}
    </Typography>
  );
}
