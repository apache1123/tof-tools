import { Button } from "@mui/material";

import { InventoryLayout } from "../../../features/common/InventoryLayout";
import type { Gear, GearId } from "../../../models/gear/gear";
import { GearCard } from "../GearCard/GearCard";

export interface GearSelectorProps {
  gears: Gear[];
  onSelect(gearId: GearId): void;
  onAdd?(): void;
}

export function GearSelector({ gears, onSelect, onAdd }: GearSelectorProps) {
  return (
    <InventoryLayout
      filter={undefined}
      actions={
        <Button
          variant="contained"
          onClick={() => {
            if (onAdd) onAdd();
          }}
        >
          Add gear
        </Button>
      }
      items={gears.map((gear) => (
        <GearCard key={gear.id} gear={gear} onClick={() => onSelect(gear.id)} />
      ))}
    />
  );
}
