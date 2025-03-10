import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { useSnapshot } from "valtio";

import type { PropsWithElevation } from "../../components/__helpers__/props-with-elevation";
import { SectionSubheading } from "../../components/common/SectionHeading/SectionSubheading";
import { GearStars } from "../../components/gear/GearStars/GearStars";
import { GearSummary } from "../../components/gear/GearSummary/GearSummary";
import { GearTypeIcon } from "../../components/gear/GearTypeIcon/GearTypeIcon";
import type { CoreElementalType } from "../../definitions/elemental-type";
import type { Gear } from "../../models/gear/gear";
import { EditGearAugmentStats } from "./EditGearAugmentStats";
import { EditGearRandomStats } from "./EditGearRandomStats";
import { EditGearRarity } from "./EditGearRarity";
import { EditGearTitanStats } from "./EditGearTitanStats";
import { GearRollBreakdown } from "./GearRollBreakdown";
import { MaxTitanGearPreview } from "./MaxTitanGearPreview";

export interface GearDetailsInlineProps extends PropsWithElevation {
  gearProxy: Gear;
  prioritizedElement?: CoreElementalType;
}

export function GearDetailsInline({
  gearProxy,
  prioritizedElement,
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

      <Paper elevation={(elevation ?? 0) + 1} sx={{ px: 2, py: 1 }}>
        <SectionSubheading>Summary</SectionSubheading>
        <GearSummary summary={gear.getSummary()} />
      </Paper>

      <EditGearRandomStats gearProxy={gearProxy} />

      <EditGearAugmentStats gearProxy={gearProxy} />

      <EditGearTitanStats gearProxy={gearProxy} />

      <Box>
        <Accordion elevation={(elevation ?? 0) + 1}>
          <AccordionSummary>Max titan preview</AccordionSummary>
          <AccordionDetails>
            <MaxTitanGearPreview
              gear={gear}
              prioritizedElement={prioritizedElement}
              elevation={(elevation ?? 0) + 2}
            />
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
