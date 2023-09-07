import { Box, Divider, Stack, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import type { CoreElementalType } from '../models/elemental-type';
import type { Gear } from '../models/gear';
import {
  getAugmentIncreaseValueToString,
  getTotalValueWithAugmentToString,
  getType,
  getValueToString,
} from '../models/random-stat';
import { GearAttackStatsSummary } from './GearAttackStatsSummary';

export interface TitanGearMaxStatsProps {
  maxTitanGearState: Gear;
  elementalType?: CoreElementalType;
}

export function TitanGearMaxStats({
  maxTitanGearState,
  elementalType,
}: TitanGearMaxStatsProps) {
  const maxTitanGearSnap = useSnapshot(maxTitanGearState);

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Random stats
        </Typography>
        <Stack>
          {maxTitanGearSnap.randomStats.map((randomStat, i) => {
            if (!randomStat) {
              return undefined;
            }
            const { displayName } = getType(randomStat);
            return (
              <Typography key={i} gutterBottom>
                <strong>{displayName}: </strong>
                {getValueToString(randomStat)} +{' '}
                {getAugmentIncreaseValueToString(randomStat)} ={' '}
                <strong>{getTotalValueWithAugmentToString(randomStat)}</strong>
              </Typography>
            );
          })}
        </Stack>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Augment stats
        </Typography>
        <Stack>
          {maxTitanGearSnap.augmentStats.map((augmentStat, i) => {
            if (!augmentStat) {
              return undefined;
            }
            const { displayName } = getType(augmentStat);
            return (
              <Typography key={i} gutterBottom>
                <strong>{displayName}: </strong>
                {getValueToString(augmentStat)} +{' '}
                {getAugmentIncreaseValueToString(augmentStat)} ={' '}
                <strong>{getTotalValueWithAugmentToString(augmentStat)}</strong>
              </Typography>
            );
          })}
        </Stack>
      </Box>
      {elementalType && (
        <>
          <Divider />
          <GearAttackStatsSummary
            gearState={maxTitanGearState}
            elementalType={elementalType}
          />
        </>
      )}
    </Stack>
  );
}
