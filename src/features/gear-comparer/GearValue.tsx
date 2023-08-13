import { Paper, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { getComparisonColor } from '../../utils/color-utils';
import { toPercentageString2dp } from '../../utils/number-utils';
import { gearValuesState } from './states/derived/gear-values';
import { gearValuesComparisonState } from './states/derived/gear-values-comparison';
import { maxTitanGearValuesState } from './states/derived/max-titan-gear-values';
import { maxTitanGearValuesComparisonState } from './states/derived/max-titan-gear-values-comparison';
import type { GearComparerGearPosition } from './states/gear-comparer-gear';

interface GearValueProps {
  position: GearComparerGearPosition;
}

export function GearValue({ position }: GearValueProps) {
  const gearValuesSnap = useSnapshot(gearValuesState);
  const gearValuesComparisonSnap = useSnapshot(gearValuesComparisonState);
  const maxTitanGearValuesSnap = useSnapshot(maxTitanGearValuesState);
  const maxTitanGearValuesComparisonSnap = useSnapshot(
    maxTitanGearValuesComparisonState
  );

  return (
    <Paper sx={{ p: 2, textAlign: 'center' }}>
      <Typography>Value: </Typography>
      <Typography
        fontSize="1.5rem"
        sx={{
          color: getComparisonColor(
            gearValuesComparisonSnap[`Is${position}HighestValue`]
          ),
        }}
        data-testid={`gear-value-${position}`}
      >
        {toPercentageString2dp(gearValuesSnap[`${position}Value`])}
      </Typography>

      <Typography sx={{ mt: 3 }}>Value at max potential titan: </Typography>
      <Typography
        color={getComparisonColor(
          maxTitanGearValuesComparisonSnap[`Is${position}MaxTitanHighestValue`]
        )}
      >
        {toPercentageString2dp(
          maxTitanGearValuesSnap[`${position}MaxTitanValue`]
        )}
      </Typography>
    </Paper>
  );
}
