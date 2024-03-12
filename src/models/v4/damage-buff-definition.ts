import type { WeaponElementalType } from '../../constants/elemental-type';

export interface DamageBuffDefinition {
  id: string;
  displayName: string;
  description: string;

  value: number;
  /** The elemental types the damage buff applies to */
  elementalTypes: WeaponElementalType[];
  /** Damage buffs in the same category are additive. If they are not, they are multiplicative */
  category:
    | 'Relic passive'
    | 'Enemy debuff'
    | 'DMG buff category 1'
    | 'DMG buff category 2'
    | '[TEMP_TRAIT]'
    | '[TEMP_UNKNOWN]';
  maxStacks: number;

  /** in ms */
  duration?: number;
  /** in ms */
  cooldown?: number;

  /** Assumptions, compromises made etc. */
  remarks?: string;

  elementalWeaponRequirement?: {
    weaponElementalType: WeaponElementalType;
    numOfWeapons: number;
  };
}
