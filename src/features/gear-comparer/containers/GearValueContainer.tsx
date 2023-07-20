import { Paper, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { toPercentageString2dp } from '../../../utils/number-utils';
import type { GearComparerGearPosition } from '../stores/gear-comparer-gear';
import { gearValuesStore } from '../stores/gear-values';
import { gearValuesComparisonStore } from '../stores/gear-values-comparison';

interface GearValueContainerProps {
  position: GearComparerGearPosition;
}

export function GearValueContainer({ position }: GearValueContainerProps) {
  const gearValuesSnap = useSnapshot(gearValuesStore);
  const gearValuesComparisonSnap = useSnapshot(gearValuesComparisonStore);

  return (
    <Paper>
      <Typography align="center">Value: </Typography>
      <Typography
        fontSize="1.5rem"
        align="center"
        sx={{
          color: gearValuesComparisonSnap[`Is${position}HighestValue`]
            ? 'success.main'
            : 'error.main',
        }}
      >
        {toPercentageString2dp(gearValuesSnap[`${position}Value`])}
      </Typography>
    </Paper>
  );
}
