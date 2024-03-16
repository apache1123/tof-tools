import type { WeaponElementalType } from '../../../constants/elemental-type';
import type {
  WeaponName,
  WeaponType,
} from '../../../constants/weapon-definitions';
import type { WeaponResonance } from '../../../constants/weapon-resonance';

export interface BuffDefinition {
  id: string;
  displayName: string;
  description: string;
  maxStacks: number;

  // Order triggers from least specific to most specific. Check in this order for efficiency
  triggeredBy: {
    combatStart?: boolean;
    skillOfAnyWeapon?: boolean;
    dischargeOfAnyWeapon?: boolean;
    skillOfWeaponType?: WeaponType;
    dischargeOfWeaponType?: WeaponType;
    skillOfElementalType?: WeaponElementalType;
    dischargeOfElementalType?: WeaponElementalType;
    fullChargeOfWeapons?: WeaponName[];
    activeWeapon?: WeaponName;
    weaponAttacks?: string[];
  };

  duration: {
    value?: number;
    /** Buff ends when active weapon changes */
    followActiveWeapon?: boolean;
    /** Number between 0 to 1. e.g. 0.7 = buff only applies to 0.7 of the combat duration at the end. The starting 30% has no buffs. Useful for buffs like "increase damage dealt to targets with less than x% HP" */
    applyToEndSegmentOfCombat?: number;
    /** Buff lasts until combat ends */
    untilCombatEnd?: boolean;
  };
  /** Buff goes into cooldown when triggered and cannot be triggered again until cooldown ends */
  cooldown: number;

  // Order requirements from most specific to least specific. Check in this order for efficiency
  requirements?: {
    weaponInTeam?: WeaponName;
    weaponResonance?: WeaponResonance;
    elementalTypeWeaponsInTeam?: {
      elementalType: WeaponElementalType;
      numOfWeapons: number;
    };
    /** e.g. for every non-[elemental type] weapon equipped, increase damage by x% */
    notElementalTypeWeaponsInTeam?: {
      notElementalType: WeaponElementalType;
      numOfWeapons: number;
    };
    /** The specified number of different elemental weapon types must be in team */
    numOfDifferentElementalTypesInTeam?: number;
  };

  /** Assumptions, compromises made etc. */
  remarks?: string;
}