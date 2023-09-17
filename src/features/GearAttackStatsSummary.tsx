import { Box, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../components/ElementalStyledText/ElementalStyledText';
import type { CoreElementalType } from '../constants/elemental-type';
import type { Gear } from '../models/gear';
import { toIntegerString, toPercentageString2dp } from '../utils/number-utils';
import { calculateCritPercentFromFlat } from '../utils/stat-calculation-utils';
import { userStatsState } from './gear-comparer/states/user-stats/user-stats';

export interface GearAttackStatsSummaryProps {
  gearState: Gear;
  elementalType: CoreElementalType;
}

export function GearAttackStatsSummary({
  gearState,
  elementalType,
}: GearAttackStatsSummaryProps) {
  const gearSnap = useSnapshot(gearState);

  const totalAttackFlat = (gearSnap as Gear).getTotalAttackFlat(elementalType);
  const totalAttackPercent = (gearSnap as Gear).getTotalAttackPercent(
    elementalType
  );
  const totalCritFlat = (gearSnap as Gear).getTotalCritFlat();
  const totalCritPercent = (gearSnap as Gear).getTotalCritPercent();
  const totalDamagePercent = (gearSnap as Gear).getTotalDamagePercent(
    elementalType
  );

  const { characterLevel } = useSnapshot(userStatsState);
  const totalCritFlatToPercent = calculateCritPercentFromFlat(
    totalCritFlat,
    characterLevel
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
            {toIntegerString(totalCritFlat)} (
            {toPercentageString2dp(totalCritFlatToPercent)})
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
