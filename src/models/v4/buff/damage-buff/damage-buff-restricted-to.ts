import type { AttackType } from "../../../../definitions/attack-type";
import type { AttackId } from "../../../../definitions/types/attack/attack-ability";
import type { WeaponName } from "../../../../definitions/weapons/weapon-definitions";

export interface DamageBuffRestrictedTo {
  /** Damage buff only applies to attacks of this weapon */
  weapon?: WeaponName;
  /** Damage buff only applies to attacks of this attack type */
  attackType?: AttackType;
  /** Damage buff only applies to these attacks */
  attacks?: AttackId[];
}
