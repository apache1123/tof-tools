import type { AttackType } from "../../../definitions/attack-type";
import type { ElementalType } from "../../../definitions/elemental-type";
import type { AttackId } from "../../../definitions/types/attack/attack-ability-definition";
import type { WeaponDefinitionId } from "../../../definitions/weapons/weapon-definitions";
import type { BaseDamageModifiers } from "../../damage-modifiers/base-damage-modifiers";
import type { FinalDamageModifiers } from "../../damage-modifiers/final-damage-modifiers";
import type { Message } from "../message";

export interface AttackHit extends Message {
  readonly time: number;
  readonly damageElement: ElementalType;
  readonly baseDamageModifiers: BaseDamageModifiers;
  readonly finalDamageModifiers: FinalDamageModifiers;
  readonly weaponId: WeaponDefinitionId;
  readonly attackId: AttackId;
  readonly attackType: AttackType;

  /** Whether to override filters/requirements and apply all buffs to this attack hit (if the buff is an elemental buff, as long as the attack hit has the same elemental type). Usually buffs that can be applied to this attack hit will be filtered based on the attack type etc. */
  readonly applyAllBuffs: boolean;
}
