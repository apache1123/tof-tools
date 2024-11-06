import type { AttackType } from "../../../../definitions/attack-type";
import type { WeaponElementalType } from "../../../../definitions/elemental-type";
import type { AttackId } from "../../../../definitions/types/attack/attack-ability";
import type { Weapon } from "../../../weapon";
import type { BaseDamageModifiers } from "../../damage-modifiers/base-damage-modifiers";
import type { FinalDamageModifiers } from "../../damage-modifiers/final-damage-modifiers";
import type { Message } from "../message";

export interface AttackHit extends Message {
  readonly time: number;
  readonly elementalType: WeaponElementalType;
  readonly baseDamageModifiers: BaseDamageModifiers;
  readonly finalDamageModifiers: FinalDamageModifiers;
  readonly weapon: Weapon;
  readonly attackId: AttackId;
  readonly attackType: AttackType;
}
