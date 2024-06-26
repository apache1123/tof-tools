import type { ResourceId } from '../resource/resource-definition';

/** Base damage = ((totalAttack * attackMultiplier) + attackFlat + (hp * hpMultiplier) + (sumOfResistances * sumOfResistancesMultiplier) + (critFlat * critFlatMultiplier)) * resourceStackMultiplier */
export interface AttackDamageModifiers {
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
  critFlatMultiplier?: number;

  /** Multiply damage by the number of stacks of the resource times the multiplier */
  resourceAmountMultiplier?: {
    resourceId: ResourceId;
    multiplier: number;
  };

  /** This attack is unaffected by any damage buffs except for titan rare stats */
  canOnlyBeBuffedByTitans?: boolean;
}
