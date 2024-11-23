import "simplebar-react/dist/simplebar.min.css";
import SimpleBar, { Props as SimpleBarProps } from "simplebar-react";
import { forwardRef, ReactNode } from "react";
import { Box, SxProps } from "@mui/material";

export interface ScrollbarProps extends SimpleBarProps {
  sx?: SxProps;
  children?: ReactNode;
}

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ sx, children, ...others }, ref) => (
    <Box
      component={SimpleBar}
      scrollableNodeProps={{ ref }}
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
      {...others}
    >
      {children}
    </Box>
  ),
);
