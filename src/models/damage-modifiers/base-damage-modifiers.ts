/** Base damage = ((totalAttack * attackMultiplier) + attackFlat + (hp * hpMultiplier) + (sumOfResistances * sumOfResistancesMultiplier) + (critRateFlat * critRateFlatMultiplier)) * resourceAmountMultiplier */
export interface BaseDamageModifiers {
  /** the "x%" part of "dealing damage equal to x% of ATK plus y to target" / `base damage = ATK * x% + y` */
  attackMultiplier: number;
  /** the "y" part of "dealing damage equal to x% of ATK plus y to target" / `base damage = ATK * x% + y` */
  // TODO: for weapon attacks, this varies based on skill level
  attackFlat: number;
  hpMultiplier: number;
  sumOfResistancesMultiplier: number;
  critRateFlatMultiplier: number;

  /** Multiply damage by the amount of the resource times the multiplier */
  resourceAmountMultiplier: number;
}
