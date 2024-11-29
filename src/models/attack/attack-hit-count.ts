export interface AttackHitCount {
  /** Number of weapon hits this attack counts as (for attacks that have a fixed duration). Leave as 0 if attack doesn't count as a weapon attack e.g. Detachment damage */
  numberOfHitsFixed?: number;
  /** If the attack is continuous and doesn't have a fixed duration */
  numberOfHitsPerSecond?: number;
}
