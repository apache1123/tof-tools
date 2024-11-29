import type { AbilityId } from "../../../models/ability/ability-id";
import type { AttackElementalType } from "../../../models/attack/attack-elemental-type";
import type { AttackHitCount } from "../../../models/attack/attack-hit-count";
import type { BaseDamageModifiersDefinition } from "../../../models/damage-modifiers/base-damage-modifiers-definition";
import type { FinalDamageModifiersDefinition } from "../../../models/damage-modifiers/final-damage-modifiers-definition";
import type { AttackType } from "../../attack-type";
import type { AbilityDefinition } from "../ability/ability-definition";

export type AttackId = AbilityId;

export interface AttackAbilityDefinition extends AbilityDefinition {
  id: AttackId;
  type: AttackType;
  elementalType: AttackElementalType;
  /** An attack that the character active performs, and when performing it can perform no other foreground attacks. Has animations etc. that the character is sometimes animation-locked into. As opposed to a background attack in which the character can still perform other attacks */
  isForegroundAttack: boolean;

  baseDamageModifiers: BaseDamageModifiersDefinition;
  finalDamageModifiers: FinalDamageModifiersDefinition;
  hitCount: AttackHitCount;

  /** Needed for some attacks to stop them from triggering further events e.g. swift cut is a discharge that is also triggered by a discharge */
  doesNotTriggerEvents?: boolean;
}
