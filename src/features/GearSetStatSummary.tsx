import { Box, Paper, Stack, Typography } from "@mui/material";

import {
  NumericStringInteger,
  NumericStringPercentage2dp,
} from "../components/presentational/common/NumericString/NumericString";
import { ElementalStyledText } from "../components/presentational/elemental/ElementalStyledText/ElementalStyledText";
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
              <NumericStringInteger
                value={gearSetSnap.getTotalAttackFlat(elementalType)}
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Attack %</Typography>
          <Box>
            <ElementalStyledText elementalType={elementalType}>
              <NumericStringPercentage2dp
                value={gearSetSnap.getTotalAttackPercent(elementalType)}
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Damage %</Typography>
          <Box>
            <ElementalStyledText elementalType={elementalType}>
              <NumericStringPercentage2dp
                value={gearSetSnap.getTotalDamagePercent(elementalType)}
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit</Typography>
          <Box>
            <ElementalStyledText elementalType={elementalType}>
              <NumericStringInteger
                value={gearSetSnap.getTotalCritRateFlat()}
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit %</Typography>
          <Box>
            <ElementalStyledText elementalType={elementalType}>
              <NumericStringPercentage2dp
                value={gearSetSnap.getTotalCritRatePercent()}
              />
            </ElementalStyledText>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
