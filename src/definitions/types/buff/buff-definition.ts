import type { DamageBuffRestrictedTo } from "../../../models/v4/buff/damage-buff/damage-buff-restricted-to";

export interface BuffDefinition {
  value: number;

  /** Buff only applies to certain abilities */
  restrictedTo?: DamageBuffRestrictedTo;
}
