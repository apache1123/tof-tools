import type BigNumber from 'bignumber.js';

export function calculateDamageMultiplier(
  attackFlat: BigNumber,
  attackPercent: BigNumber,
  critPercent: BigNumber,
  critDamagePercent: BigNumber,
  damagePercent: BigNumber
): BigNumber {
  return attackFlat
    .multipliedBy(attackPercent.plus(1))
    .multipliedBy(critPercent.multipliedBy(critDamagePercent).plus(1))
    .multipliedBy(damagePercent.plus(1));
}
