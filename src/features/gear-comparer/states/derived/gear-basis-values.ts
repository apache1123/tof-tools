import BigNumber from 'bignumber.js';
import { derive, devtools } from 'valtio/utils';

import type { BasisValues } from '../../../../models/basis-values';
import type { GearComparerState } from '../../../../states/gear-comparer';
import { gearComparerState, userStatsState } from '../../../../states/states';
import type { UserStatsState } from '../../../../states/user-stats';
import { additiveSum } from '../../../../utils/math-utils';
import {
  calculateCritPercentFromFlat,
  calculateMultiplier,
} from '../../../../utils/stat-calculation-utils';
import type { ConditionalBuffValuesState } from './conditional-buff-values';
import { conditionalBuffValuesState } from './conditional-buff-values';

export interface GearBasisValuesState {
  basisValues: BasisValues;
}

export const gearBasisValuesState = derive<object, GearBasisValuesState>({
  basisValues: (get) =>
    getBasisValues(
      get(gearComparerState),
      get(userStatsState),
      get(conditionalBuffValuesState)
    ),
});
devtools(gearBasisValuesState, { name: 'gearBasisValues' });

function getBasisValues(
  gearComparerStateSnap: GearComparerState,
  userStatsSnap: UserStatsState,
  conditionalBuffValuesSnap: ConditionalBuffValuesState
): BasisValues {
  const {
    selectedLoadout: { elementalType, loadoutStats },
    selectedLoadoutGear,
  } = gearComparerStateSnap;

  const {
    activeElementalAttack: { baseAttack, attackPercent },
    critFlat,
    critPercent,
    critDamage,
  } = loadoutStats;

  // TODO: support these or not?
  const miscAttackPercent = 0;
  const miscCritRate = 0;
  const miscCritDamage = 0;
  const otherGearElementalDamage = 0;

  const passiveAttackPercent = BigNumber(attackPercent);

  const gearA = selectedLoadoutGear;
  const attackFlatWithoutGearA = BigNumber(baseAttack)
    .minus(gearA ? gearA.getTotalAttackFlat(elementalType) : 0)
    .toNumber();
  const passiveAttackPercentWithoutGearA = passiveAttackPercent
    .minus(gearA ? gearA.getTotalAttackPercent(elementalType) : 0)
    .toNumber();
  const critFlatWithoutGearA = BigNumber(critFlat)
    .minus(gearA ? gearA.getTotalCritFlat() : 0)
    .toNumber();
  const critPercentWithoutGearA = BigNumber(critPercent)
    .minus(gearA ? gearA.getTotalCritPercent() : 0)
    .toNumber();
  const critDamageWithoutGearA = critDamage;

  const {
    weaponAttackBuffValues,
    matrixAttackBuffValues,
    weaponCritRateBuffValues,
    matrixCritRateBuffValues,
    matrixCritDamageBuffValues,
  } = conditionalBuffValuesSnap;

  const basisAttackFlat = attackFlatWithoutGearA;

  const basisAttackPercent = additiveSum(
    [passiveAttackPercentWithoutGearA, miscAttackPercent]
      .concat(weaponAttackBuffValues)
      .concat(matrixAttackBuffValues)
  ).toNumber();

  const basisCritFlat = critFlatWithoutGearA;

  const basisCritPercent = additiveSum(
    [critPercentWithoutGearA, miscCritRate]
      .concat(weaponCritRateBuffValues)
      .concat(matrixCritRateBuffValues)
  ).toNumber();

  const { characterLevel } = userStatsSnap;
  const basisCritTotalPercent = additiveSum([
    calculateCritPercentFromFlat(basisCritFlat, characterLevel),
    basisCritPercent,
  ]).toNumber();

  const basisCritDamage = additiveSum(
    [critDamageWithoutGearA, miscCritDamage].concat(matrixCritDamageBuffValues)
  ).toNumber();

  const basisDamage = additiveSum([otherGearElementalDamage]).toNumber();

  const basisPassiveAttackPercent = passiveAttackPercentWithoutGearA;
  const basisPassiveCritPercent = critPercentWithoutGearA;

  const basisMultiplier = calculateMultiplier(
    BigNumber(basisAttackFlat),
    BigNumber(basisAttackPercent),
    BigNumber(basisCritTotalPercent),
    BigNumber(basisCritDamage),
    BigNumber(basisDamage)
  ).toNumber();

  return {
    basisAttackFlat,
    basisAttackPercent,
    basisCritFlat,
    basisCritPercent,
    basisCritTotalPercent,
    basisCritDamage,
    basisDamage,
    basisPassiveAttackPercent,
    basisPassiveCritPercent,
    basisMultiplier,
  };
}
