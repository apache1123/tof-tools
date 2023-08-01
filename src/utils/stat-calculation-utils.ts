import BigNumber from 'bignumber.js';

export function calculateCritPercentFromFlat(
  critFlat: BigNumber,
  charLevel: BigNumber
): BigNumber {
  // Rough crit formula from maygi spreadsheet
  // Crit % = Crit flat / (a * lvl^2 + b * lvl + c)
  const a = BigNumber(-3.71);
  const b = BigNumber(1151);
  const c = BigNumber(-49787);

  const critPercent = critFlat.dividedBy(
    a
      .multipliedBy(charLevel.exponentiatedBy(2))
      .plus(b.multipliedBy(charLevel))
      .plus(c)
  );
  return critPercent;
}

export function calculateMultiplier(
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
