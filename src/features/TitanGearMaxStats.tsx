import { Box, Divider, Stack, Typography } from '@mui/material';

import type { CoreElementalType } from '../constants/elemental-type';
import type { Gear } from '../models/gear';
import { GearAttackStatsSummary } from './GearAttackStatsSummary';

export interface TitanGearMaxStatsProps {
  maxTitanGearSnap: Gear;
  elementalType?: CoreElementalType;
}

export function TitanGearMaxStats({
  maxTitanGearSnap,
  elementalType,
}: TitanGearMaxStatsProps) {
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
                {randomStat.valueString} +{' '}
                {randomStat.augmentIncreaseValueString} ={' '}
                <strong>{randomStat.totalValueString}</strong>
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
                {augmentStat.valueString} +{' '}
                {augmentStat.augmentIncreaseValueString} ={' '}
                <strong>{augmentStat.totalValueString}</strong>
              </Typography>
            );
          })}
        </Stack>
      </Box>
      {elementalType && (
        <>
          <Divider />
          <GearAttackStatsSummary
            gearSnap={maxTitanGearSnap}
            elementalType={elementalType}
          />
        </>
      )}
    </Stack>
  );
}
