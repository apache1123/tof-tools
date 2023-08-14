import { Box, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../components/ElementalStyledText/ElementalStyledText';
import type { Gear } from '../models/gear';
import {
  getTotalAttackFlat,
  getTotalAttackPercent,
  getTotalCritFlat,
  getTotalCritPercent,
  getTotalDamagePercent,
} from '../models/gear';
import type { CoreElementalType } from '../models/stat-type';
import { toIntegerString, toPercentageString2dp } from '../utils/number-utils';

export interface GearAttackStatsSummaryProps {
  gearState: Gear;
  elementalType: CoreElementalType;
}

export function GearAttackStatsSummary({
  gearState,
  elementalType,
}: GearAttackStatsSummaryProps) {
  const gearSnap = useSnapshot(gearState);

  const totalAttackFlat = getTotalAttackFlat(gearSnap as Gear, elementalType);
  const totalAttackPercent = getTotalAttackPercent(
    gearSnap as Gear,
    elementalType
  );
  const totalCritFlat = getTotalCritFlat(gearSnap as Gear);
  const totalCritPercent = getTotalCritPercent(gearSnap as Gear);
  const totalDamagePercent = getTotalDamagePercent(
    gearSnap as Gear,
    elementalType
  );

  return (
    <Box>
      {!!totalAttackFlat && (
        <Typography>
          Attack{' '}
          <ElementalStyledText elementalType={elementalType}>
            {toIntegerString(totalAttackFlat)}
          </ElementalStyledText>
        </Typography>
      )}
      {!!totalAttackPercent && (
        <Typography>
          Attack{' '}
          <ElementalStyledText elementalType={elementalType}>
            {toPercentageString2dp(totalAttackPercent)}
          </ElementalStyledText>
        </Typography>
      )}
      {!!totalDamagePercent && (
        <Typography>
          Damage{' '}
          <ElementalStyledText elementalType={elementalType}>
            {toPercentageString2dp(totalDamagePercent)}
          </ElementalStyledText>
        </Typography>
      )}
      {!!totalCritFlat && (
        <Typography>
          Crit{' '}
          <ElementalStyledText elementalType={elementalType}>
            {toIntegerString(totalCritFlat)}
          </ElementalStyledText>
        </Typography>
      )}
      {!!totalCritPercent && (
        <Typography>
          Crit{' '}
          <ElementalStyledText elementalType={elementalType}>
            {toPercentageString2dp(totalCritPercent)}
          </ElementalStyledText>
        </Typography>
      )}
    </Box>
  );
}
