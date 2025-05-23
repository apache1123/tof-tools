import "simplebar-react/dist/simplebar.min.css";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import type { Props as SimpleBarProps } from "simplebar-react";
import SimpleBar from "simplebar-react";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export interface ScrollbarProps extends SimpleBarProps, PropsWithSx {
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
Scrollbar.displayName = "Scrollbar";
