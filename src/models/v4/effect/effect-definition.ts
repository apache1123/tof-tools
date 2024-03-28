import type { WeaponElementalType } from '../../../constants/elemental-type';
import type {
  WeaponName,
  WeaponType,
} from '../../../constants/weapon-definitions';
import type { WeaponResonance } from '../../../constants/weapon-resonance';

export interface EffectDefinition {
  id: string;
  displayName: string;
  description: string;

  maxStacks: number;
  additionallyGainStacksBy?: {
    accumulatedDamageThreshold?: {
      /** e.g. dealing accumulated damage equal to 100 times of ATK */
      timesOfAttack?: number;
    };
  };

  /** Triggers are treated as an "OR" check i.e. the effect is triggered when any defined trigger passes check */
  triggeredBy: {
    // Order triggers from least specific to most specific. Check in this order for efficiency

    combatStart?: boolean;
    skillOfAnyWeapon?: boolean;
    dischargeOfAnyWeapon?: boolean;
    skillOfWeaponType?: WeaponType;
    dischargeOfWeaponType?: WeaponType;
    skillOfElementalType?: WeaponElementalType;
    dischargeOfElementalType?: WeaponElementalType;
    fullChargeOfWeapons?: WeaponName[];
    /** e.g. If [weapon] is in off-hand slot, ... */
    notActiveWeapon?: WeaponName;
    activeWeapon?: WeaponName;
    weaponAttacks?: string[];
  };

  duration: {
    value?: number;
    /** Effect ends when active weapon changes */
    followActiveWeapon?: boolean;
    /** Number between 0 to 1. e.g. 0.7 = effect only applies to 0.7 of the combat duration at the end. The starting 30% has no effect. Useful for effects like "increase damage dealt to targets with less than x% HP" */
    applyToEndSegmentOfCombat?: number;
    /** Effect lasts until combat ends */
    untilCombatEnd?: boolean;
  };
  /** Effect goes into cooldown when triggered and cannot be triggered again until cooldown ends */
  cooldown: number;

  /** Requirements are treated as a "AND" check i.e. the effect is triggered when all defined requirements pass check */
  requirements?: {
    // Order requirements from most specific to least specific. Check in this order for efficiency

    activeEffect?: string;
    anyWeaponInTeam?: WeaponName[];
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
