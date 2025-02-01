import { Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export interface SectionTitleProps extends PropsWithChildren, PropsWithSx {}

/** Standardised title element for a section of a page */
export function SectionTitle({ children, sx }: SectionTitleProps) {
  return (
    <Typography variant="h5" sx={{ mb: 3, ...sx }}>
      {children}
    </Typography>
  );
}
