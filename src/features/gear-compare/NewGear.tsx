import { Card } from "@mui/material";

import type { Gear } from "../../models/gear/gear";
import { EditGearInline } from "../gear/EditGearInline";

export interface NewGearProps {
  gearProxy: Gear;
}

export function NewGear({ gearProxy }: NewGearProps) {
  return (
    <Card elevation={1} sx={{ p: 2 }}>
      <EditGearInline gearProxy={gearProxy} elevation={1} />
    </Card>
  );
}
