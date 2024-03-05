import type { CommonWeaponDamageBuffId } from '../../constants/common-weapon-damage-buffs';
import type { WeaponElementalType } from '../../constants/elemental-type';
import type { WeaponName } from '../../constants/weapon-definitions';

export interface WeaponDamageBuffDefinition {
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
    | '[TEMP_UNKNOWN]';
  maxStacks: number;

  triggeredBy?: {
    combatActions?: 'combat-start'[];
    weaponActions?: {
      weaponName: WeaponName;
      action: 'full-charge';
    }[];
    weaponAttacks?: {
      weaponName: WeaponName;
      attackDefinitionId: string;
    }[];
  };
  endedBy?: 'combat-end'[];
  /** in ms */
  duration?: number;
  /** in ms */
  cooldown?: number;

  /** Assumptions, compromises made etc. */
  remarks?: string;
}

export interface CommonWeaponDamageBuffDefinition
  extends WeaponDamageBuffDefinition {
  id: CommonWeaponDamageBuffId;
}
