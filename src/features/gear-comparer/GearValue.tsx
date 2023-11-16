import { Paper, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { NumericStringPercentage2dp } from '../../components/NumericString/NumericString';
import { getComparisonColor } from '../../utils/color-utils';
import { gearValuesState } from './states/derived/gear-values';
import { gearValuesComparisonState } from './states/derived/gear-values-comparison';
import { maxTitanGearValuesState } from './states/derived/max-titan-gear-values';
import { maxTitanGearValuesComparisonState } from './states/derived/max-titan-gear-values-comparison';

interface GearValueProps {
  position: 'selectedLoadoutGear' | 'replacementGear';
}

export function GearValue({ position }: GearValueProps) {
  const gearValuesSnap = useSnapshot(gearValuesState);
  const gearValuesComparisonSnap = useSnapshot(gearValuesComparisonState);
  const maxTitanGearValuesSnap = useSnapshot(maxTitanGearValuesState);
  const maxTitanGearValuesComparisonSnap = useSnapshot(
    maxTitanGearValuesComparisonState
  );

  return (
    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
      <Typography>Value: </Typography>
      <Typography
        fontSize="1.5rem"
        sx={{
          color: getComparisonColor(
            gearValuesComparisonSnap[`${position}HighestValue`]
          ),
        }}
        data-testid={`gear-value-${position}`}
      >
        <NumericStringPercentage2dp
          value={gearValuesSnap[`${position}Value`]}
        />
      </Typography>

      <Typography sx={{ mt: 3 }}>Value at max potential titan: </Typography>
      <Typography
        color={getComparisonColor(
          maxTitanGearValuesComparisonSnap[`${position}MaxTitanHighestValue`]
        )}
        data-testid={`gear-max-titan-value-${position}`}
      >
        <NumericStringPercentage2dp
          value={maxTitanGearValuesSnap[`${position}MaxTitanValue`]}
        />
      </Typography>
    </Paper>
  );
}
