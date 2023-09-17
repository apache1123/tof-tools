import { Box, Divider, Stack, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import type { CoreElementalType } from '../constants/elemental-type';
import type { Gear } from '../models/gear';
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
            const { displayName } = randomStat.type;
            return (
              <Typography key={i} gutterBottom>
                <strong>{displayName}: </strong>
                {randomStat.getValueToString()} +{' '}
                {randomStat.getAugmentIncreaseValueToString()} ={' '}
                <strong>{randomStat.getTotalValueWithAugmentToString()}</strong>
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
            const { displayName } = augmentStat.type;
            return (
              <Typography key={i} gutterBottom>
                <strong>{displayName}: </strong>
                {augmentStat.getValueToString()} +{' '}
                {augmentStat.getAugmentIncreaseValueToString()} ={' '}
                <strong>
                  {augmentStat.getTotalValueWithAugmentToString()}
                </strong>
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
