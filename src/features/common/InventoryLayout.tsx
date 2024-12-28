import { Paper, Stack } from "@mui/material";
import type React from "react";

import { CardList } from "../../components/common/CardList/CardList";

export interface InventoryLayoutProps {
  filter: React.ReactNode;
  actions: React.ReactNode;
  items: React.ReactNode;
}

/** The common layout to list items in an inventory-like fashion, with slots for a filter, actions and a list of items. */
export function InventoryLayout({
  filter,
  actions,
  items,
}: InventoryLayoutProps) {
  return (
    <Stack sx={{ gap: 2 }}>
      <Stack sx={{ gap: 1 }}>
        {filter && <Paper sx={{ p: 2 }}>{filter}</Paper>}
        {actions}
      </Stack>

      <CardList>{items}</CardList>
    </Stack>
  );
}
