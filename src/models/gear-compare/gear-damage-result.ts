import type { DamageBreakdown } from "../damage-breakdown/damage-breakdown";
import type { DamageSummary } from "../damage-summary/damage-summary";

/** Gear damage result for a piece of gear in a gear set, including its potential max titan result, if max titan can be determined */
export interface GearDamageResult {
  /** The damage when the piece of gear is equipped, relative to the damage when that piece of gear is not equipped.
   * a.k.a. the damage increase with vs without that piece of gear
   */
  damageIncrease: number;
  damageSummary: DamageSummary;
  damageBreakdown: DamageBreakdown | undefined;

  maxTitan?: {
    damageIncrease: number;
    damageSummary: DamageSummary;
    damageBreakdown: DamageBreakdown | undefined;
  };
}
