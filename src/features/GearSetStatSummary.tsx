import { Box, Paper, Stack, Typography } from '@mui/material';

import { ElementalStyledText } from '../components/ElementalStyledText/ElementalStyledText';
import {
  NumericStringInteger,
  NumericStringPercentage2dp,
} from '../components/NumericString/NumericString';
import type { CoreElementalType } from '../constants/elemental-type';
import type { GearSet } from '../models/gear-set';

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
              <NumericStringInteger value={gearSetSnap.getTotalCritFlat()} />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit %</Typography>
          <Box>
            <ElementalStyledText elementalType={elementalType}>
              <NumericStringPercentage2dp
                value={gearSetSnap.getTotalCritPercent()}
              />
            </ElementalStyledText>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
