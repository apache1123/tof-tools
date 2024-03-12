import type { WeaponElementalType } from '../../constants/elemental-type';
import type { WeaponName } from '../../constants/weapon-definitions';
import type { WeaponResonance } from '../../constants/weapon-resonance';
import type { DamageBuffDefinition } from './damage-buff-definition';

export interface SimulacrumTraitPassiveDamageBuffDefinition
  extends Omit<DamageBuffDefinition, 'duration' | 'cooldown'> {
  /** Number between 0 to 1. e.g. 0.7 = buff only applies to 0.7 of the combat duration at the end. The starting 30% has no buffs. Useful for buffs like "increase damage dealt to targets with less than x% HP" */
  applyToEndSegmentOfCombat?: number;

  /** Weapon must be in team */
  weaponRequirement?: WeaponName;
  /** The specified number of different elemental weapon types must be in team */
  differentWeaponElementalTypeRequirement?: {
    numOfDifferentElementalTypes: number;
  };
  weaponResonanceRequirement?: WeaponResonance;
}

export interface SimulacrumTraitConditionalDamageBuffDefinition
  extends DamageBuffDefinition {
  triggeredByAnyWeaponSkill?: boolean;
  triggeredByCombatStart?: boolean;
  triggeredByWeaponAttack?: string;
  triggeredByActiveWeapon?: WeaponName;
  triggeredByElementalTypeSkill?: WeaponElementalType;
  triggeredByElementalTypeDischarge?: WeaponElementalType;

  /** e.g. for every non-[elemental type] weapon equipped, increase damage by x% */
  notElementalTypeWeaponRequirement?: {
    notElementalType: WeaponElementalType;
    numOfWeapons: number;
  };
}
