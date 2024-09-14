import type { ResourceId } from '../resource/resource-definition';

/** Base damage = ((totalAttack * attackMultiplier) + attackFlat + (hp * hpMultiplier) + (sumOfResistances * sumOfResistancesMultiplier) + (critRateFlat * critRateFlatMultiplier)) * resourceAmountMultiplier */
export interface BaseDamageModifiersDefinition {
  /** The attack deals damage per second according to the damage modifiers.
   * If not, the damage is assumed to be over the duration of the attack */
  damageDealtIsPerSecond: boolean;
  /** the "x%" part of "dealing damage equal to x% of ATK plus y to target" / `base damage = ATK * x% + y` */
  attackMultiplier: number;
  /** the "y" part of "dealing damage equal to x% of ATK plus y to target" / `base damage = ATK * x% + y` */
  // TODO: for weapon attacks, this varies based on skill level
  attackFlat: number;
  hpMultiplier?: number;
  sumOfResistancesMultiplier?: number;
  critRateFlatMultiplier?: number;

  /** Multiply damage by the amount of the resource times the multiplier */
  resourceAmountMultiplier?: {
    resourceId: ResourceId;
    multiplier: number;
  };
}
