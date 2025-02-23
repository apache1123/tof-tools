import { Card } from "@mui/material";

import type { CoreElementalType } from "../../definitions/elemental-type";
import type { Gear } from "../../models/gear/gear";
import { GearDetailsInline } from "../gear/GearDetailsInline";

export interface GearCompareGearProps {
  gearProxy: Gear;
  prioritizedElement: CoreElementalType | undefined;
}

export function GearCompareGear({
  gearProxy,
  prioritizedElement,
}: GearCompareGearProps) {
  return (
    <Card elevation={1} sx={{ p: 2 }}>
      <GearDetailsInline
        gearProxy={gearProxy}
        prioritizedElement={prioritizedElement}
        elevation={1}
      />
    </Card>
  );
}
