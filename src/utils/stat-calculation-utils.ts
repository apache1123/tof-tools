import BigNumber from 'bignumber.js';

export function calculateCritPercentFromFlat(
  critFlat: number,
  charLevel: number
): number {
  // Rough crit formula from maygi spreadsheet
  // Crit % = Crit flat / (a * lvl^2 + b * lvl + c)
  const a = BigNumber(-3.71);
  const b = BigNumber(1151);
  const c = BigNumber(-49787);

  return BigNumber(critFlat)
    .dividedBy(
      a
        .multipliedBy(BigNumber(charLevel).exponentiatedBy(2))
        .plus(b.multipliedBy(charLevel))
        .plus(c)
    )
    .toNumber();
}
