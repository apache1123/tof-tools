import type { AttackType } from '../../../constants/attack-type';
import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { WeaponName } from '../../../constants/weapon-definitions';

export interface AttackDamageModifiers {
  /** the "x%" part of "dealing damage equal to x% of ATK plus y to target" / `base damage = ATK * x% + y` */
  attackMultiplier: number;
  /** the "y" part of "dealing damage equal to x% of ATK plus y to target" / `base damage = ATK * x% + y` */
  // TODO: for weapon attacks, this varies based on skill level
  attackFlat: number;
  hpMultiplier?: number;
  sumOfResistancesMultiplier?: number;
  critFlatMultiplier?: number;
}

export interface AttackDefinition {
  id: string;
  displayName: string;
  description?: string;

  elementalType: WeaponElementalType;
  followLastWeaponElementalType?: boolean;

  type: AttackType;

  damageModifiers: AttackDamageModifiers;

  /** in ms */
  duration: number;
  /** in ms */
  cooldown: number;

  charge: number;

  requirements?: {
    hasFullCharge?: boolean;
    /** Can only be triggered when [weapon] is not active weapon e.g. the [weapon]'s discharge */
    notActiveWeapon?: WeaponName;
  };
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

  requirements: {
    hasFullCharge: true;
    notActiveWeapon: WeaponName;
  };
}
