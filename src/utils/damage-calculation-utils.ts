import type BigNumber from 'bignumber.js';

import type { AttackDamageModifiers } from '../models/v4/attack/attack-definition';

export function calculateTotalAttack(
  baseAttack: BigNumber,
  totalAttackPercent: BigNumber
) {
  return baseAttack.times(totalAttackPercent.plus(1));
}

export function calculateDamageMultiplier(
  attackFlat: BigNumber,
  attackPercent: BigNumber,
  critPercent: BigNumber,
  critDamagePercent: BigNumber,
  damagePercent: BigNumber
): BigNumber {
  return calculateTotalAttack(attackFlat, attackPercent)
    .multipliedBy(critPercent.multipliedBy(critDamagePercent).plus(1))
    .multipliedBy(damagePercent.plus(1));
}

export function calculateBaseDamage(
  totalAttack: BigNumber,
  attackDamageModifiers: AttackDamageModifiers
): BigNumber {
  const {
    attackMultiplier,
    attackFlat,
    // TODO:
    critFlatMultiplier,
    hpMultiplier,
    sumOfResistancesMultiplier,
  } = attackDamageModifiers;
  return totalAttack.times(attackMultiplier).plus(attackFlat);
}

export function calculateFinalDamage(
  baseDamage: BigNumber,
  totalDamagePercent: BigNumber,
  totalCritPercent: BigNumber,
  totalCritDamagePercent: BigNumber
) {
  return baseDamage
    .times(totalDamagePercent.plus(1))
    .times(totalCritPercent.times(totalCritDamagePercent).plus(1));
}
