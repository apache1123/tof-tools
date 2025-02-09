import { Card } from "@mui/material";

import type { Gear } from "../../models/gear/gear";
import { GearDetailsInline } from "../gear/GearDetailsInline";

export interface CurrentGearProps {
  gearProxy: Gear;
}

export function CurrentGear({ gearProxy }: CurrentGearProps) {
  return (
    <Card elevation={1} sx={{ p: 2 }}>
      <GearDetailsInline gearProxy={gearProxy} elevation={1} />
    </Card>
  );
}
