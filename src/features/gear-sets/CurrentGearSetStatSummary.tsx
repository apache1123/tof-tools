import { Box, Paper, Stack, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../../components/ElementalStyledText/ElementalStyledText';
import type { GearSet } from '../../models/gear-set';
import { toPercentageString2dp } from '../../utils/number-utils';
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
              {(selectedGearSet as GearSet).getTotalAttackFlat()}
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Attack %</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              {toPercentageString2dp(
                (selectedGearSet as GearSet).getTotalAttackPercent()
              )}
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Damage %</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              {toPercentageString2dp(
                (selectedGearSet as GearSet).getTotalDamagePercent()
              )}
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              {(selectedGearSet as GearSet).getTotalCritFlat()}
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit %</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              {toPercentageString2dp(
                (selectedGearSet as GearSet).getTotalCritPercent()
              )}
            </ElementalStyledText>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
