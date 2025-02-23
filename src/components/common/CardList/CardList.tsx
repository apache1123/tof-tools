import { Stack, type StackProps } from "@mui/material";
import type { PropsWithChildren } from "react";

import type { PropsWithSx } from "../../__helpers__/props-with-sx";

export interface CardListProps extends PropsWithChildren, PropsWithSx {
  direction?: StackProps["direction"];
  gap?: StackProps["gap"];
}

/** Common component for displaying a list of card-like components, flex-wrapping around for responsiveness */
export function CardList({
  direction = "row",
  gap = 2,
  children,
  sx,
}: CardListProps) {
  return (
    <Stack direction={direction} sx={{ flexWrap: "wrap", gap, ...sx }}>
      {children}
    </Stack>
  );
}
