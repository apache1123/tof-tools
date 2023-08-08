import { Stack, Typography } from '@mui/material';

import type { Gear } from '../models/gear';
import {
  getAugmentIncreaseValueToString,
  getTotalValueWithAugmentString,
  getType,
  getValueToString,
} from '../models/random-stat';

export interface TitanGearMaxStatsProps {
  maxTitanGear: Gear;
}

export function TitanGearMaxStats({ maxTitanGear }: TitanGearMaxStatsProps) {
  return (
    <Stack>
      {maxTitanGear.randomStats.map((randomStat, i) => {
        if (!randomStat) {
          return undefined;
        }
        const { displayName } = getType(randomStat);
        return (
          <Typography key={i} gutterBottom>
            <strong>{displayName}: </strong>
            {getValueToString(randomStat)} +{' '}
            {getAugmentIncreaseValueToString(randomStat)} ={' '}
            <strong>{getTotalValueWithAugmentString(randomStat)}</strong>
          </Typography>
        );
      })}
    </Stack>
  );
}
