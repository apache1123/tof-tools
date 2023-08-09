import { Box, Paper, Stack, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../../components/ElementalStyledText/ElementalStyledText';
import type { GearSet } from '../../models/gear-set';
import {
  getTotalAttackFlat,
  getTotalAttackPercent,
  getTotalCritFlat,
  getTotalCritPercent,
  getTotalDamagePercent,
} from '../../models/gear-set';
import { toPercentageString2dp } from '../../utils/number-utils';
import { gearSetsStore } from './stores/gear-sets';

export function CurrentGearSetStatSummary() {
  const { selectedGearSet } = useSnapshot(gearSetsStore);

  if (!selectedGearSet?.elementalType) {
    return (
      <Paper sx={{ p: 2 }}>
        Select an element type above to see a summary of gear stats
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={5}>
        <Box>
          <Typography>Attack</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              {getTotalAttackFlat(selectedGearSet as GearSet)}
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Attack %</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              {toPercentageString2dp(
                getTotalAttackPercent(selectedGearSet as GearSet)
              )}
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Damage %</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              {toPercentageString2dp(
                getTotalDamagePercent(selectedGearSet as GearSet)
              )}
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              {getTotalCritFlat(selectedGearSet as GearSet)}
            </ElementalStyledText>
          </Box>
        </Box>

        <Box>
          <Typography>Crit %</Typography>
          <Box>
            <ElementalStyledText elementalType={selectedGearSet.elementalType}>
              {toPercentageString2dp(
                getTotalCritPercent(selectedGearSet as GearSet)
              )}
            </ElementalStyledText>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}
