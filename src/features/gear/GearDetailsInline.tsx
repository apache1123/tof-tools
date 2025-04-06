import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Stack,
  Typography,
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
import { AugmentStatsOcr } from "./ocr/AugmentStatsOcr";
import { RandomStatsOcr } from "./ocr/RandomStatsOcr";
import { PossibleAugmentStats } from "./PossibleAugmentStats";

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
  const { type, rarity, isAugmented } = gear;

  const allPossibleAugmentStats = gear.getPossibleAugmentStats(true);

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

      <Box>
        <Stack direction="row" sx={{ mb: 0.5, gap: 1 }}>
          <SectionSubheading>Random Stats</SectionSubheading>
          {isAugmented && (
            <Typography
              variant="h6"
              sx={{ color: (theme) => theme.palette.titan.main }}
            >
              (Augmented)
            </Typography>
          )}
          <RandomStatsOcr
            gearTypeId={type.id}
            rarity={rarity}
            isAugmented={isAugmented}
            onConfirm={(randomStats) => {
              randomStats.forEach((randomStat, i) => {
                gearProxy.setRandomStat(i, randomStat);
              });
            }}
          />
        </Stack>

        <EditGearRandomStats gearProxy={gearProxy} />
      </Box>

      <Stack sx={{ gap: 1 }}>
        {isAugmented && (
          <>
            <Stack direction="row" sx={{ gap: 1 }}>
              <SectionSubheading>Augmentation Stats</SectionSubheading>

              <AugmentStatsOcr
                gear={gear}
                onConfirm={(augmentStats) => {
                  augmentStats.forEach((augmentStat, i) => {
                    gearProxy.setAugmentStat(i, augmentStat);
                  });
                }}
              />
            </Stack>

            <EditGearAugmentStats gearProxy={gearProxy} />
          </>
        )}

        <PossibleAugmentStats possibleAugmentStats={allPossibleAugmentStats} />
      </Stack>

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
