import type { AttackAbilityDefinition } from "../../definitions/types/attack/attack-ability-definition";
import type { WeaponStarRequirement } from "./weapon-star-requirement";

export interface WeaponAttackDefinition extends AttackAbilityDefinition {
  starRequirement: WeaponStarRequirement;
}

export interface NormalAttackDefinition extends WeaponAttackDefinition {
  type: "normal";
}

export interface DodgeAttackDefinition extends WeaponAttackDefinition {
  type: "dodge";

  // TODO: dodge consumption
}

export interface SkillAttackDefinition extends WeaponAttackDefinition {
  type: "skill";
}

export interface DischargeAttackDefinition extends WeaponAttackDefinition {
  type: "discharge";
}
