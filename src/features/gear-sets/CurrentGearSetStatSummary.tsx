import { Box, Paper, Stack, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../../components/ElementalStyledText/ElementalStyledText';
import {
  NumericStringInteger,
  NumericStringPercentage2dp,
} from '../../components/NumericString/NumericString';
import type { GearSet } from '../../models/gear-set';
import { gearSetsState } from './states/gear-sets';

export function CurrentGearSetStatSummary() {
  const { selectedGearSet } = useSnapshot(gearSetsState);

  if (!selectedGearSet?.elementalType) {
    return (
      <Paper sx={{ p: 2 }}>
        Select an element type above to see a summary of gear stats
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }} data-testid="current-gear-set-stat-summary">
      <Stack direction="row" spacing={5}>
        <Box>
          <Typography>Attack</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              <NumericStringInteger
                value={selectedGearSet.getTotalAttackFlat()}
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Attack %</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              <NumericStringPercentage2dp
                value={selectedGearSet.getTotalAttackPercent()}
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Damage %</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              <NumericStringPercentage2dp
                value={selectedGearSet.getTotalDamagePercent()}
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              <NumericStringInteger
                value={selectedGearSet.getTotalCritFlat()}
              />
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit %</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              <NumericStringPercentage2dp
                value={selectedGearSet.getTotalCritPercent()}
              />
            </ElementalStyledText>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
