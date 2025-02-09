import { Card } from "@mui/material";

import type { Gear } from "../../models/gear/gear";
import { GearDetailsInline } from "../gear/GearDetailsInline";

export interface NewGearProps {
  gearProxy: Gear;
}

export function NewGear({ gearProxy }: NewGearProps) {
  return (
    <Card elevation={1} sx={{ p: 2 }}>
      <GearDetailsInline gearProxy={gearProxy} elevation={1} />
    </Card>
  );
}
