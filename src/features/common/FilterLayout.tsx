import { Button, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export interface FilterLayoutProps {
  title?: string;
  filterContent: ReactNode;
  onResetFilter(): void;
}

/** The common layout for the filter section in an inventory */
export function FilterLayout({
  title,
  filterContent,
  onResetFilter,
}: FilterLayoutProps) {
  return (
    <Stack sx={{ gap: 2 }}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">{title ?? "Filter"}</Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onResetFilter()}
        >
          Reset
        </Button>
      </Stack>

      {filterContent}
    </Stack>
  );
}
