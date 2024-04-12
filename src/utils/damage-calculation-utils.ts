import type BigNumber from 'bignumber.js';

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
