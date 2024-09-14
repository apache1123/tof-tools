import BigNumber from 'bignumber.js';

export function calculateCritRatePercentFromFlat(
  critRateFlat: BigNumber.Value,
  charLevel: BigNumber.Value
): number {
  // Rough crit rate formula from maygi spreadsheet
  // Crit rate% = Crit rate flat / (a * lvl^2 + b * lvl + c)
  const a = BigNumber(-3.71);
  const b = BigNumber(1151);
  const c = BigNumber(-49787);

  return BigNumber(critRateFlat)
    .dividedBy(
      a
        .multipliedBy(BigNumber(charLevel).exponentiatedBy(2))
        .plus(b.multipliedBy(charLevel))
        .plus(c)
    )
    .toNumber();
}
