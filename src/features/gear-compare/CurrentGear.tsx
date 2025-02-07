import { Card } from "@mui/material";

import type { Gear } from "../../models/gear/gear";
import { EditGearInline } from "../gear/EditGearInline";

export interface CurrentGearProps {
  gearProxy: Gear;
}

export function CurrentGear({ gearProxy }: CurrentGearProps) {
  return (
    <Card elevation={1} sx={{ p: 2 }}>
      <EditGearInline gearProxy={gearProxy} elevation={1} />
    </Card>
  );
}
