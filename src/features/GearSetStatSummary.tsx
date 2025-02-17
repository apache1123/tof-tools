import { Box, Paper, Stack, Typography } from "@mui/material";

import { NumericString } from "../components/common/NumericString/NumericString";
import { ElementalStyledText } from "../components/elemental/ElementalStyledText/ElementalStyledText";
import type { CoreElementalType } from "../definitions/elemental-type";
import type { GearSet } from "../models/gear/gear-set";

export interface GearSetStatSummaryProps {
  gearSetSnap: GearSet;
  elementalType: CoreElementalType;
}

export function GearSetStatSummary({
  gearSetSnap,
  elementalType,
}: GearSetStatSummaryProps) {
  return (
    <Paper sx={{ p: 2 }} data-testid="current-gear-set-stat-summary">
      <Typography variant="subtitle2" mb={2}>
        The following are the stat values for all gears added up together.
        Doesn&apos;t mean very much, but maybe will help you compare how good
        your gear is for one loadout vs. another.
      </Typography>
      <Stack direction="row" spacing={5}>
        <Box>
          <Typography>Attack</Typography>
          <Box>
            <ElementalStyledText elementalType={elementalType}>
              <NumericString
                value={gearSetSnap.getTotalAttackFlat(elementalType)}
                variant="integer"
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Attack %</Typography>
          <Box>
            <ElementalStyledText elementalType={elementalType}>
              <NumericString
                value={gearSetSnap.getTotalAttackPercent(elementalType)}
                variant="percentage2dp"
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Damage %</Typography>
          <Box>
            <ElementalStyledText elementalType={elementalType}>
              <NumericString
                value={gearSetSnap.getTotalDamagePercent(elementalType)}
                variant="percentage2dp"
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit</Typography>
          <Box>
            <ElementalStyledText elementalType={elementalType}>
              <NumericString
                value={gearSetSnap.getTotalCritRateFlat()}
                variant="integer"
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit %</Typography>
          <Box>
            <ElementalStyledText elementalType={elementalType}>
              <NumericString
                value={gearSetSnap.getTotalCritRatePercent()}
                variant="percentage2dp"
              />
            </ElementalStyledText>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
