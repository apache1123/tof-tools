import { Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export interface SectionSubheadingProps
  extends PropsWithChildren,
    PropsWithSx {}

export function SectionSubheading({ children, sx }: SectionSubheadingProps) {
  return (
    <Typography variant="h6" sx={{ mb: 1, ...sx }}>
      {children}
    </Typography>
  );
}
