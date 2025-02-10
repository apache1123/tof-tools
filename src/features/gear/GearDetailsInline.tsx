import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
} from "@mui/material";
import { useSnapshot } from "valtio";

import type { PropsWithElevation } from "../../components/__helpers__/props-with-elevation";
import { GearStars } from "../../components/gear/GearStars/GearStars";
import { GearTypeIcon } from "../../components/gear/GearTypeIcon/GearTypeIcon";
import type { Gear } from "../../models/gear/gear";
import { EditGearAugmentStats } from "./EditGearAugmentStats";
import { EditGearRandomStats } from "./EditGearRandomStats";
import { EditGearRarity } from "./EditGearRarity";
import { GearRollBreakdown } from "./GearRollBreakdown";
import { MaxTitanGearPreview } from "./MaxTitanGearPreview";

export interface GearDetailsInlineProps extends PropsWithElevation {
  gearProxy: Gear;
}

export function GearDetailsInline({
  gearProxy,
  elevation,
}: GearDetailsInlineProps) {
  const gear = useSnapshot(gearProxy) as Gear;
  const { type, rarity } = gear;

  return (
    <Stack gap={3}>
      <Stack direction="row" gap={1} sx={{ alignItems: "start" }}>
        <GearTypeIcon id={type.id} rarity={rarity} />

        <Stack sx={{ gap: 1 }}>
          <EditGearRarity gearProxy={gearProxy} />

          <GearStars
            gear={gear}
            onStarsChange={(stars) => {
              gearProxy.stars = stars;
            }}
          />
        </Stack>
      </Stack>

      <EditGearRandomStats gearProxy={gearProxy} />

      <EditGearAugmentStats gearProxy={gearProxy} />

      <Box>
        <Accordion elevation={(elevation ?? 0) + 1}>
          <AccordionSummary>Max titan preview</AccordionSummary>
          <AccordionDetails>
            <MaxTitanGearPreview gear={gear} elevation={(elevation ?? 0) + 2} />
          </AccordionDetails>
        </Accordion>
        <Accordion elevation={(elevation ?? 0) + 1}>
          <AccordionSummary>Roll breakdown</AccordionSummary>
          <AccordionDetails>
            <GearRollBreakdown gear={gear} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Stack>
  );
}
