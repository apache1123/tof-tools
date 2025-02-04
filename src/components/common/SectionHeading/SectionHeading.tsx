import { Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export interface SectionHeadingProps extends PropsWithChildren, PropsWithSx {}

/** Standardised heading element for a section of a page */
export function SectionHeading({ children, sx }: SectionHeadingProps) {
  return (
    <Typography variant="h5" sx={{ mb: 4, ...sx }}>
      {children}
    </Typography>
  );
}
