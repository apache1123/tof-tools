import type { AttackType } from '../../constants/attack-type';
import type { AttackDefinitionElementalType } from '../../constants/elemental-type';

export interface AttackDefinition {
  id: string;
  displayName: string;
  description?: string;

  elementalType: AttackDefinitionElementalType;
  type: AttackType;

  /** the "x%" part of "dealing damage equal to x% of ATK plus y to target" / `base damage = ATK * x% + y` */
  attackMultiplier: number;
  /** the "y" part of "dealing damage equal to x% of ATK plus y to target" / `base damage = ATK * x% + y` */
  // TODO: for weapon attacks, this varies based on skill level
  attackFlat: number;
  hpMultiplier?: number;
  sumOfResistancesMultiplier?: number;
  critFlatMultiplier?: number;

  /** in ms */
  duration: number;
  /** in ms */
  cooldown: number;

  charge: number;
}

export interface NormalAttackDefinition extends AttackDefinition {
  type: 'normal';
}

export interface DodgeAttackDefinition extends AttackDefinition {
  type: 'dodge';
}

export interface SkillAttackDefinition extends AttackDefinition {
  type: 'skill';
}

export interface DischargeAttackDefinition extends AttackDefinition {
  type: 'discharge';
}
