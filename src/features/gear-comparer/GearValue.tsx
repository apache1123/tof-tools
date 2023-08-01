import { Paper, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { getComparisonColor } from '../../utils/color-utils';
import { toPercentageString2dp } from '../../utils/number-utils';
import { gearValuesStore } from './stores/derived/gear-values';
import { gearValuesComparisonStore } from './stores/derived/gear-values-comparison';
import type { GearComparerGearPosition } from './stores/gear-comparer-gear';

interface GearValueProps {
  position: GearComparerGearPosition;
}

export function GearValue({ position }: GearValueProps) {
  const gearValuesSnap = useSnapshot(gearValuesStore);
  const gearValuesComparisonSnap = useSnapshot(gearValuesComparisonStore);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography align="center">Value: </Typography>
      <Typography
        fontSize="1.5rem"
        align="center"
        sx={{
          color: getComparisonColor(
            gearValuesComparisonSnap[`Is${position}HighestValue`]
          ),
        }}
      >
        {toPercentageString2dp(gearValuesSnap[`${position}Value`])}
      </Typography>
    </Paper>
  );
}
