import type { ElementalType } from "../../definitions/elemental-type";

export interface MiscellaneousBuff {
  // TODO: calculations for these buffs
  /** Increase the base attack of the specified elemental type to match the highest base attack of all other elemental types (if it is higher) */
  increaseElementalBaseAttackToMatchHighest?: ElementalType;
}
