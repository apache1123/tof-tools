import { Box, Stack, Typography } from '@mui/material';

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
    <Stack spacing={2}>
      <Box>
        <Typography variant="h6" gutterBottom>Random stats</Typography>
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
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>Augment stats</Typography>
        <Stack>
          {maxTitanGear.augmentStats.map((augmentStat, i) => {
            if (!augmentStat) {
              return undefined;
            }
            const { displayName } = getType(augmentStat);
            return (
              <Typography key={i} gutterBottom>
                <strong>{displayName}: </strong>
                {getValueToString(augmentStat)} +{' '}
                {getAugmentIncreaseValueToString(augmentStat)} ={' '}
                <strong>{getTotalValueWithAugmentString(augmentStat)}</strong>
              </Typography>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
}
