import type { WeaponStarRequirement } from "../../../models/weapon/weapon-star-requirement";
import type { AttackAbilityDefinition } from "../attack/attack-ability-definition";

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
